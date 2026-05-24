const NOTE_NAMES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const DEFAULT_STEPS = [0, 4, 7, 11, 7, 4, 2, 9].map((semitones, index) => ({
  active: index !== 3,
  semitones
}));

const state = {
  currentStep: 0,
  filterCutoff: 1800,
  masterVolume: 0.62,
  noteLength: 0.2,
  rootMidi: 48,
  running: false,
  steps: DEFAULT_STEPS.map((step) => ({ ...step })),
  supported: false,
  swing: 0.12,
  tempo: 108,
  waveform: "sawtooth"
};

const runtime = {
  analyser: null,
  context: null,
  destination: null,
  masterGain: null,
  stepTimer: null,
  subscribers: new Set()
};

function clamp(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, number));
}

function getAudioContextClass() {
  return globalThis.AudioContext || globalThis.webkitAudioContext || null;
}

function audioSupported() {
  return Boolean(getAudioContextClass());
}

state.supported = audioSupported();

function midiToHz(midi) {
  return 440 * Math.pow(2, (Number(midi) - 69) / 12);
}

export function formatMidiNote(midi) {
  const normalizedMidi = Math.round(clamp(midi, 0, 127, 60));
  const noteName = NOTE_NAMES[((normalizedMidi % 12) + 12) % 12] || "C";
  const octave = Math.floor(normalizedMidi / 12) - 1;
  return `${noteName}${octave}`;
}

function cloneStep(step) {
  return {
    active: Boolean(step?.active),
    semitones: Math.round(clamp(step?.semitones, -24, 24, 0))
  };
}

function getSnapshot() {
  return {
    currentStep: state.currentStep,
    filterCutoff: state.filterCutoff,
    masterVolume: state.masterVolume,
    noteLength: state.noteLength,
    rootMidi: state.rootMidi,
    rootNoteLabel: formatMidiNote(state.rootMidi),
    running: state.running,
    steps: state.steps.map((step, index) => ({
      ...cloneStep(step),
      index,
      midi: state.rootMidi + step.semitones,
      noteLabel: formatMidiNote(state.rootMidi + step.semitones)
    })),
    supported: state.supported,
    swing: state.swing,
    tempo: state.tempo,
    waveform: state.waveform
  };
}

function emit() {
  const snapshot = getSnapshot();
  runtime.subscribers.forEach((subscriber) => {
    try {
      subscriber(snapshot);
    } catch (error) {
      console.error("[jcn-web-audio-lab] subscriber update failed", error);
    }
  });
  return snapshot;
}

function applyMasterVolume() {
  if (runtime.masterGain) {
    runtime.masterGain.gain.value = state.masterVolume;
  }
}

function ensureAudioGraph() {
  const AudioContextClass = getAudioContextClass();

  if (!AudioContextClass) {
    throw new Error("Web Audio is not available in this browser.");
  }

  if (!runtime.context || runtime.context.state === "closed") {
    runtime.context = new AudioContextClass();
    runtime.masterGain = runtime.context.createGain();
    runtime.masterGain.gain.value = state.masterVolume;
    runtime.analyser = runtime.context.createAnalyser();
    runtime.analyser.fftSize = 2048;
    runtime.analyser.smoothingTimeConstant = 0.82;
    runtime.destination = runtime.context.destination;
    runtime.masterGain.connect(runtime.analyser);
    runtime.analyser.connect(runtime.destination);
  }

  applyMasterVolume();
  return runtime.context;
}

async function ensureRunningContext() {
  const context = ensureAudioGraph();

  if (context.state === "suspended") {
    await context.resume();
  }

  return context;
}

function stopScheduler() {
  if (runtime.stepTimer) {
    globalThis.clearTimeout(runtime.stepTimer);
    runtime.stepTimer = null;
  }
}

function getBaseStepMs() {
  return (60 / state.tempo / 2) * 1000;
}

function getNextDelayMs(nextStepIndex) {
  const baseStepMs = getBaseStepMs();
  const swingAmount = baseStepMs * state.swing * 0.45;
  const offset = nextStepIndex % 2 === 1 ? swingAmount : -swingAmount;
  return Math.max(45, baseStepMs + offset);
}

export async function triggerPreview(semitones = 0, accent = 0.95) {
  const context = await ensureRunningContext();
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const envelope = context.createGain();
  const filter = context.createBiquadFilter();
  const frequency = midiToHz(state.rootMidi + Number(semitones || 0));
  const safeCutoff = clamp(state.filterCutoff, 120, 12000, 1800);
  const duration = clamp(state.noteLength, 0.05, 0.9, 0.2);

  oscillator.type = state.waveform;
  oscillator.frequency.setValueAtTime(frequency, now);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(safeCutoff, now);
  filter.Q.setValueAtTime(1.2, now);

  envelope.gain.setValueAtTime(0.0001, now);
  envelope.gain.linearRampToValueAtTime(0.28 * clamp(accent, 0.1, 1.2, 0.95), now + 0.01);
  envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(filter);
  filter.connect(envelope);
  envelope.connect(runtime.masterGain);

  oscillator.start(now);
  oscillator.stop(now + duration + 0.04);
}

async function tick() {
  if (!state.running) {
    return;
  }

  const stepIndex = state.currentStep;
  const step = state.steps[stepIndex] || cloneStep({ active: false, semitones: 0 });

  if (step.active) {
    try {
      await triggerPreview(step.semitones, stepIndex % 4 === 0 ? 1.1 : 0.92);
    } catch (error) {
      console.error("[jcn-web-audio-lab] unable to trigger step", error);
      stop();
      throw error;
    }
  }

  state.currentStep = (stepIndex + 1) % state.steps.length;
  emit();
  scheduleNextTick();
}

function scheduleNextTick() {
  stopScheduler();
  const delayMs = getNextDelayMs(state.currentStep);
  runtime.stepTimer = globalThis.setTimeout(() => {
    void tick();
  }, delayMs);
}

export async function start() {
  await ensureRunningContext();
  state.running = true;
  emit();
  scheduleNextTick();
  return getSnapshot();
}

export function stop() {
  state.running = false;
  state.currentStep = 0;
  stopScheduler();
  return emit();
}

export async function toggleRunning() {
  if (state.running) {
    return stop();
  }
  return start();
}

export function setTempo(value) {
  state.tempo = Math.round(clamp(value, 60, 180, 108));
  if (state.running) {
    scheduleNextTick();
  }
  return emit();
}

export function setSwing(value) {
  state.swing = clamp(value, 0, 0.48, 0.12);
  if (state.running) {
    scheduleNextTick();
  }
  return emit();
}

export function setMasterVolume(value) {
  state.masterVolume = clamp(value, 0, 1, 0.62);
  applyMasterVolume();
  return emit();
}

export function setWaveform(value) {
  const nextWaveform = String(value || "").trim();
  const allowedWaveforms = ["sine", "triangle", "sawtooth", "square"];
  state.waveform = allowedWaveforms.includes(nextWaveform) ? nextWaveform : "sawtooth";
  return emit();
}

export function setNoteLength(value) {
  state.noteLength = clamp(value, 0.05, 0.9, 0.2);
  return emit();
}

export function setFilterCutoff(value) {
  state.filterCutoff = Math.round(clamp(value, 120, 12000, 1800));
  return emit();
}

export function setRootMidi(value) {
  state.rootMidi = Math.round(clamp(value, 24, 72, 48));
  return emit();
}

export function updateStep(index, patch = {}) {
  const normalizedIndex = Math.round(clamp(index, 0, state.steps.length - 1, 0));
  const previous = state.steps[normalizedIndex] || cloneStep({ active: false, semitones: 0 });
  state.steps[normalizedIndex] = {
    active: patch.active === undefined ? previous.active : Boolean(patch.active),
    semitones:
      patch.semitones === undefined
        ? previous.semitones
        : Math.round(clamp(patch.semitones, -24, 24, previous.semitones))
  };
  return emit();
}

export function subscribe(listener) {
  if (typeof listener !== "function") {
    throw new Error("A subscribe listener function is required.");
  }

  runtime.subscribers.add(listener);
  listener(getSnapshot());

  return () => {
    runtime.subscribers.delete(listener);
  };
}

export function read() {
  return getSnapshot();
}

export function sampleTimeDomain(length = 128) {
  if (!runtime.analyser) {
    return null;
  }

  const size = Math.max(32, Math.min(1024, Math.round(Number(length) || 128)));
  const values = new Uint8Array(size);
  runtime.analyser.getByteTimeDomainData(values);
  return values;
}

export function sampleFrequency(length = 64) {
  if (!runtime.analyser) {
    return null;
  }

  const size = Math.max(16, Math.min(runtime.analyser.frequencyBinCount, Math.round(Number(length) || 64)));
  const values = new Uint8Array(size);
  runtime.analyser.getByteFrequencyData(values);
  return values;
}

export function readLevel() {
  const values = sampleTimeDomain(128);

  if (!values) {
    return 0;
  }

  let total = 0;
  for (const value of values) {
    const normalized = (value - 128) / 128;
    total += normalized * normalized;
  }

  return Math.min(1, Math.sqrt(total / values.length) * 2.8);
}

export function destroy() {
  stop();

  if (runtime.context && runtime.context.state !== "closed") {
    void runtime.context.close();
  }

  runtime.analyser = null;
  runtime.context = null;
  runtime.destination = null;
  runtime.masterGain = null;
  return emit();
}
