const PROJECT_ROOT = "/Users/justin/jcnagent/Agent/Projects";
const STORAGE_PREFIX = "spaceAgent.jcnCommandCenter";

const DOMAIN_COUNTS = [
  ["ai-protocol", 28],
  ["web-platform", 18],
  ["music", 10],
  ["cli-tools", 8],
  ["gamedev", 8],
  ["client-products", 6],
  ["creative", 6],
  ["starters", 5],
  ["reference", 5],
  ["infra", 4],
  ["devtools", 4],
  ["games", 4],
  ["ops", 1],
  ["design", 1],
  ["interview-prep", 1]
];

const PROJECTS = [
  {
    id: "space-agent",
    name: "Space Agent",
    domain: "web-platform",
    stack: "Browser runtime, Node infrastructure",
    path: `${PROJECT_ROOT}/web-platform/space-agent`,
    job: "Primary browser-first AI agent runtime and spaces canvas.",
    commands: ["npm install", "npm run dev", "node space serve"],
    leverage: ["Widget runtime", "Onscreen agent", "Documentation spine"]
  },
  {
    id: "jcn-pai",
    name: "Pai",
    domain: "ai-protocol",
    stack: "Go, TypeScript services, Telegram, Postgres",
    path: `${PROJECT_ROOT}/ai-protocol/jcn-pai`,
    job: "Front-door operating assistant for the Pi-native JCN AI stack.",
    commands: ["scripts/pai-start.sh", "npm run check", "go test ./..."],
    leverage: ["Telegram ingress", "Wakeplane scheduling", "Memory"]
  },
  {
    id: "pai-console",
    name: "Pai Console",
    domain: "ai-protocol",
    stack: "Go daemon, React Router, SQLite",
    path: `${PROJECT_ROOT}/ai-protocol/pi-console`,
    job: "Operator console for jobs, runs, schedules, repos, reports, and review items.",
    commands: ["make build", "npm run dev", "bin/pai-core serve"],
    leverage: ["Local state", "Worker process", "Runtime root ~/.pai"]
  },
  {
    id: "jcn-studio-mcp",
    name: "JCN Studio MCP",
    domain: "ai-protocol",
    stack: "Go daemon, Vite UI, SQLite",
    path: `${PROJECT_ROOT}/ai-protocol/jcn-studio-mcp`,
    job: "Local-first studio control plane for curated MCP services.",
    commands: ["make bootstrap", "make dev", "./bin/studio serve --config ./config"],
    leverage: ["Service registry", "Policies", "Receipts"]
  },
  {
    id: "project-aware-qa",
    name: "Project-Aware QA",
    domain: "ai-protocol",
    stack: "TypeScript Pi pack",
    path: `${PROJECT_ROOT}/ai-protocol/project-aware-qa-pack`,
    job: "Scans real codebases, infers test surfaces, ranks risk, and writes .qa reports.",
    commands: ["npm run lint", "npm run check", "npm test", "tsx scripts/scan.ts /path/to/repo"],
    leverage: ["Surface registry", "Risk plan", "Screenshot QA"]
  },
  {
    id: "loopexec",
    name: "loopexec",
    domain: "ai-protocol",
    stack: "Go CLI",
    path: `${PROJECT_ROOT}/ai-protocol/loopexec`,
    job: "Deterministic bounded execution loops with receipts and replay.",
    commands: ["go test ./...", "go build ./cmd/loopexec", "loopexec run --exec '...' --check '...'"],
    leverage: ["Computed halt reasons", "No-regression ratchet", "Receipts"]
  },
  {
    id: "devports",
    name: "devports",
    domain: "cli-tools",
    stack: "Rust CLI",
    path: `${PROJECT_ROOT}/cli-tools/devports`,
    job: "Tracks configured local services, ports, listeners, and LAN URLs.",
    commands: ["devports list", "devports urls", "devports start <service>"],
    leverage: ["Service config", "Port health", "LAN URLs"]
  },
  {
    id: "tmc",
    name: "tmux-mission-control",
    domain: "cli-tools",
    stack: "Go CLI, tmux",
    path: `${PROJECT_ROOT}/cli-tools/tmux-mission-control`,
    job: "Repeatable terminal workspaces from a YAML manifest.",
    commands: ["tmc dry-run --file project.yml", "tmc doctor --file project.yml", "tmc start --file project.yml"],
    leverage: ["Workspace boot", "Dry run", "Status inspection"]
  },
  {
    id: "jcn-pulse",
    name: "JCN Pulse",
    domain: "ops",
    stack: "Local scripts, Wakeplane schedules, reports",
    path: `${PROJECT_ROOT}/ops/jcn-pulse`,
    job: "Recurring intelligence layer for JCN and ORE.",
    commands: ["scripts/run-daily-pulse", "scripts/score-prospects", "scripts/run-weekly-ore"],
    leverage: ["Daily brief", "Prospect scoring", "Weekly ORE brief"]
  },
  {
    id: "jcn-soundkit",
    name: "JCN SoundKit",
    domain: "music",
    stack: "TypeScript monorepo, Web Audio, offline renderer",
    path: `${PROJECT_ROOT}/music/jcn-soundkit`,
    job: "Programmatic sound-design engine and preset catalog.",
    commands: ["pnpm check", "pnpm lab", "pnpm cli render out"],
    leverage: ["Sound intents", "Deterministic WAV render", "Visual Sound Lab"]
  },
  {
    id: "jbm-ingestion",
    name: "JBM Ingestion",
    domain: "music",
    stack: "Artifact-first ingestion CLI",
    path: `${PROJECT_ROOT}/music/jbm-ingestion`,
    job: "Canonical ingestion boundary for Just Beats Music audio and video.",
    commands: ["ingest", "resume", "inspect", "validate"],
    leverage: ["Run artifacts", "S3 placement", "DB write plan"]
  },
  {
    id: "jbm-go-mono",
    name: "JBM Go Mono",
    domain: "music",
    stack: "Go API, Postgres, Redis, S3",
    path: `${PROJECT_ROOT}/music/jbm-go-mono`,
    job: "Music API, playback URLs, streaming range requests, waveform jobs.",
    commands: ["go test ./...", "docker compose up -d", "curl /metrics"],
    leverage: ["Streaming", "Waveform worker", "Prometheus"]
  },
  {
    id: "note-book",
    name: "Note Book",
    domain: "music",
    stack: "React Router, NestJS, VexFlow, Web Audio, Web MIDI",
    path: `${PROJECT_ROOT}/music/note-book`,
    job: "Jazz theory, living notation, MIDI capture, and practice companion.",
    commands: ["pnpm --filter api seed", "pnpm dev", "pnpm build"],
    leverage: ["Chord search", "VexFlow", "MIDI Studio"]
  },
  {
    id: "reaper-studio",
    name: "REAPER Studio",
    domain: "music",
    stack: "TypeScript CLI, SQLite, REAPER bridge",
    path: `${PROJECT_ROOT}/music/reaper-studio`,
    job: "Local-first REAPER knowledge and live verified control plane.",
    commands: ["npm run build", "npm run reaper search", "npm run smoke:suite"],
    leverage: ["Action corpus", "Dry-run/apply/verify", "Bridge queue"]
  },
  {
    id: "transcript-forge",
    name: "Transcript Forge",
    domain: "web-platform",
    stack: "Python, SQLite FTS5, React Router",
    path: `${PROJECT_ROOT}/web-platform/transcript-forge`,
    job: "Local transcript ingestion, normalization, search, and exports.",
    commands: ["tf doctor", "tf ingest text --file samples/board-sync.txt", "tf search --query action"],
    leverage: ["FTS search", "Handoff export", "Provider abstraction"]
  },
  {
    id: "ore-dashboard",
    name: "ORE Dashboard",
    domain: "web-platform",
    stack: "React Router, Tailwind, MobX",
    path: `${PROJECT_ROOT}/web-platform/ore-dashboard`,
    job: "Pipeline visualization dashboard for Organic Revenue Engine campaigns.",
    commands: ["npm run dev", "npm run typecheck", "npm run build"],
    leverage: ["Prospect table", "Vertical selector", "API status"]
  },
  {
    id: "lyrascape",
    name: "Lyrascape",
    domain: "creative",
    stack: "React Router, worker, manifest engine",
    path: `${PROJECT_ROOT}/creative/lyrascape`,
    job: "Lyric-aware visual story engine with publish-safe playback artifacts.",
    commands: ["pnpm check", "pnpm example:build", "pnpm dev:web"],
    leverage: ["Manifest validation", "Runtime playback", "Credit-aware product shell"]
  },
  {
    id: "jcn-animation-studio",
    name: "JCN Animation Studio",
    domain: "creative",
    stack: "Remotion, SMALL, Pai, asset pipeline",
    path: `${PROJECT_ROOT}/creative/jcn-animation-studio`,
    job: "Spec-driven video production pipeline and review flow.",
    commands: ["npm run typecheck:all", "npm run build:all"],
    leverage: ["Stage gates", "Review packets", "Render specs"]
  },
  {
    id: "blaster",
    name: "Blaster",
    domain: "gamedev",
    stack: "Zig, raylib, generated WAV",
    path: `${PROJECT_ROOT}/gamedev/Zig/Blaster`,
    job: "Vertical shooter prototype with event-driven audio.",
    commands: ["zig build run", "python tools/generate_audio.py", "zig build test"],
    leverage: ["Gameplay loop", "Audio coverage", "Generated assets"]
  }
];

const RISK_REPOS = [
  {
    repo: "space-agent",
    status: "dirty",
    risk: 87,
    branch: "main ahead 1 behind 5",
    signals: ["untracked example space tree", "server tmp deletions", "agent config edits"],
    gate: "npm run check for app touchpoints plus focused YAML/source audit",
    next: "Separate current widget work from unrelated dirty files before any push."
  },
  {
    repo: "justbeatzmusic-web-api",
    status: "needs proof",
    risk: 76,
    branch: "time-sensitive",
    signals: ["player reliability", "dashboard/admin changes", "production smoke matters"],
    gate: "pnpm format, lint, test, build, proof:player-playback-contract",
    next: "Use production smoke only after local proof receipts pass."
  },
  {
    repo: "jcn-soundkit",
    status: "review",
    risk: 64,
    branch: "feature/release sensitive",
    signals: ["offline renderer", "CLI render/sprite", "resource exhaustion findings"],
    gate: "pnpm typecheck && pnpm lint && pnpm test && pnpm build",
    next: "Run catalog lint before expanding browser lab integrations."
  },
  {
    repo: "silversycamore.com",
    status: "remote first",
    risk: 72,
    branch: "origin/main authoritative",
    signals: ["remote-authoritative sync", "stash before pull", "no merge-base risk"],
    gate: "git fetch --prune origin && git diff --summary",
    next: "Preserve local work before any reset or pull attempt."
  },
  {
    repo: "jcnmap",
    status: "browser QA",
    risk: 61,
    branch: "rendered behavior",
    signals: ["Three.js readiness", "shader warm-up", "smoke screenshot flake"],
    gate: "npm run format/check/typecheck/build and PORT=5176 npm run test:smoke",
    next: "Trust readiness diagnostics when screenshots are unreliable."
  }
];

const SERVICES = [
  {
    name: "Space Agent dev supervisor",
    port: "dynamic",
    repo: "web-platform/space-agent",
    status: "local",
    command: "npm run dev",
    checks: ["login shell", "spaces route", "widget render reload"]
  },
  {
    name: "Pai Console core",
    port: "9100",
    repo: "ai-protocol/pi-console",
    status: "daemon",
    command: "make build && bin/pai-core serve",
    checks: ["/api/v1/status", "SQLite migrations", "worker heartbeat"]
  },
  {
    name: "JCN Studio MCP daemon",
    port: "4080",
    repo: "ai-protocol/jcn-studio-mcp",
    status: "daemon",
    command: "./bin/studio serve --config ./config",
    checks: ["service inventory", "policy load", "receipt writer"]
  },
  {
    name: "JCN Studio web",
    port: "4324",
    repo: "ai-protocol/jcn-studio-mcp",
    status: "ui",
    command: "pnpm --filter @jcn-studio/web dev",
    checks: ["Vite health", "daemon API base", "service list"]
  },
  {
    name: "Wakeplane",
    port: "8080",
    repo: "ai-protocol/jcn-pai",
    status: "scheduler",
    command: "bin/wakeplaned serve",
    checks: ["/healthz", "schedule list", "last run"]
  },
  {
    name: "ORE API",
    port: "8080",
    repo: "cli-tools/ore",
    status: "api",
    command: "go run ./cmd/ore-api",
    checks: ["prospects endpoint", "Postgres", "dashboard CORS"]
  },
  {
    name: "JBM Go Mono API",
    port: "config",
    repo: "music/jbm-go-mono",
    status: "api",
    command: "go run ./cmd/api",
    checks: ["/metrics", "/swagger", "range playback"]
  },
  {
    name: "Transcript Forge",
    port: "local",
    repo: "web-platform/transcript-forge",
    status: "workbench",
    command: "tf doctor && npm --prefix ui run dev",
    checks: ["SQLite FTS", "ingest sample", "search"]
  }
];

const EVIDENCE_ITEMS = [
  {
    type: "branch readiness",
    title: "Separate committed work from dirty drift",
    source: "justbeatzmusic-web-api",
    command: "git status --short --branch && git diff --stat origin/main..HEAD && small check --strict",
    proof: "Safe push only after format/lint/test/build and explicit production smoke."
  },
  {
    type: "browser QA",
    title: "3D preview readiness gate",
    source: "jcnmap",
    command: "PORT=5176 npm run test:smoke",
    proof: "ready=true, mode=play, active render counters, no console warnings."
  },
  {
    type: "security",
    title: "SoundKit bounded resource findings",
    source: "jcn-soundkit",
    command: "codex-security scan artifacts: findings.json, report.md, results.sarif",
    proof: "Four low resource-exhaustion findings, CLI-only suppressions documented."
  },
  {
    type: "release",
    title: "tmc public install path",
    source: "tmux-mission-control",
    command: "go install github.com/justyn-clark/tmux-mission-control/cmd/tmc@v0.1.1",
    proof: "tmc version --json reports v0.1.1 even with unknown build info."
  },
  {
    type: "audio",
    title: "Blaster generated WAV coverage",
    source: "Blaster",
    command: "zig build run",
    proof: "Audio device initializes and event-to-audio mappings fire."
  }
];

const PULSE_WORK = [
  {
    lane: "Daily JCN Pulse",
    cadence: "daily",
    command: "scripts/run-daily-pulse",
    outputs: ["reports/daily/YYYY-MM-DD-jcn-pulse.md", "reports/daily/YYYY-MM-DD-jcn-pulse.json"],
    next: "Open latest brief, extract decisions, update follow-up queue."
  },
  {
    lane: "Prospect scoring",
    cadence: "daily",
    command: "scripts/score-prospects",
    outputs: ["data/normalized/latest-prospects.json", "data/exports/latest-target-list.csv"],
    next: "Compare score deltas and surface new qualified leads."
  },
  {
    lane: "Weekly ORE",
    cadence: "weekly",
    command: "scripts/run-weekly-ore",
    outputs: ["reports/weekly/YYYY-Www-ore-market-brief.md", "reports/weekly/YYYY-Www-target-list.csv"],
    next: "Prepare outbound batch and market positioning notes."
  },
  {
    lane: "Content publisher",
    cadence: "controlled",
    command: "python3 jcn_content_publisher.py publish-queued --site-id <site-id> --max-posts 5",
    outputs: ["publish.log", "JSONL attempts"],
    next: "Dry-run queued posts before mutating production."
  }
];

const QA_ADAPTERS = [
  ["node", "React Router, Remix, NestJS, forms, cache, Vitest/Jest/Playwright"],
  ["python", "FastAPI, Flask, Django, DRF, Pydantic, pytest"],
  ["go", "chi, gin, echo, fiber, gorilla, net/http, go test, vet"],
  ["rust", "axum, actix, Rocket, serde DTOs, cargo test/clippy"],
  ["phoenix", "Phoenix router, LiveView, controllers, Ecto, ExUnit"],
  ["generic", "Zig, Godot, Swift, C/C++, Ruby, PHP, and baseline test gaps"]
];

const MUSIC_SYSTEMS = [
  {
    name: "JBM ingestion",
    status: "canonical boundary",
    flow: "Upload metadata -> Intake -> Probe -> Enrich -> Decide -> Plan -> Execute",
    commands: ["validate", "ingest", "resume --from probe", "inspect <run_id>"],
    watch: ["run_summary.json", "decision.parquet", "db_write_plan.parquet"]
  },
  {
    name: "GoMono streaming",
    status: "playback and workers",
    flow: "auth -> metadata -> S3 play URL -> range stream -> waveform jobs",
    commands: ["go test ./...", "curl /metrics", "cmd/queue-monitor"],
    watch: ["Redis queue", "Prometheus", "S3 endpoint"]
  },
  {
    name: "JustBeatz web",
    status: "production player",
    flow: "admin publish -> web player -> playback proof -> telemetry",
    commands: ["pnpm run proof:player-playback-contract", "pnpm build"],
    watch: ["audio_playback_progress_confirmed", "stuck audio recovery"]
  },
  {
    name: "REAPER Studio",
    status: "live verified bridge",
    flow: "search -> plan -> dry-run -> apply -> verify receipt",
    commands: ["npm run smoke:suite", "npm run reaper"],
    watch: ["bridge queue", "workflow artifacts"]
  }
];

const SOUND_INTENTS = [
  { id: "ui.confirm.soft", label: "Confirm", color: "#7dd3fc", base: 660, steps: [0, 4, 7], shape: "sine" },
  { id: "arcade.coin.gold", label: "Coin", color: "#facc15", base: 880, steps: [0, 7, 12], shape: "triangle" },
  { id: "cyber.access.granted", label: "Access", color: "#5eead4", base: 330, steps: [0, 12, 19], shape: "sawtooth" },
  { id: "combat.laser.medium", label: "Laser", color: "#fb7185", base: 220, steps: [19, 12, 5], shape: "square" },
  { id: "ambient.pulse.deep", label: "Pulse", color: "#a78bfa", base: 110, steps: [0, 3, 10], shape: "sine" },
  { id: "notification.clean", label: "Notify", color: "#93c5fd", base: 720, steps: [0, 2, 7], shape: "triangle" }
];

const JAZZ_PROGRESSIONS = [
  { name: "ii V I", notes: [62, 65, 69, 72], quality: "Dm9 -> G13 -> C6/9" },
  { name: "Barry 6 diminished", notes: [60, 64, 67, 69], quality: "C6 plus passing diminished" },
  { name: "Minor turnaround", notes: [57, 60, 64, 67], quality: "Am7 -> D7b9 -> Gm6" },
  { name: "Drop 2 color", notes: [55, 64, 69, 74], quality: "Guide tones widened for guitar/piano" }
];

const REAPER_PRIMITIVES = [
  ["action.run", "Run a known REAPER action id with receipt verification."],
  ["track.create", "Create a new track with name and index constraints."],
  ["track.rename", "Rename a track and verify the post-state."],
  ["send.create", "Create a send from source track to destination track."],
  ["send.delete", "Remove a send and verify routing state."],
  ["fx.insert", "Insert an FX by canonical name onto a target track."],
  ["fx.delete", "Remove a target FX and verify the chain."]
];

const CREATIVE_STAGES = [
  { stage: "0 Init", owner: "Animation Studio", gate: "brief + constraints", artifact: "intent.small.md" },
  { stage: "1 Script", owner: "Animation Studio", gate: "approved brief", artifact: "script.md" },
  { stage: "2 Storyboard", owner: "Animation Studio", gate: "scene timing", artifact: "storyboard.json" },
  { stage: "3 Assets", owner: "Lyrascape", gate: "asset manifest complete", artifact: "asset-manifest.json" },
  { stage: "4 Composition", owner: "Remotion", gate: "timing locked", artifact: "composition-spec.json" },
  { stage: "5 Review", owner: "Review packet", gate: "preview built", artifact: "review-packet.json" },
  { stage: "6 Render", owner: "Delivery", gate: "approved, zero missing", artifact: "MP4, thumbnail, subtitles" }
];

let audioContext = null;
let activeMidi = null;

function getStorageKey(widgetId, name) {
  return `${STORAGE_PREFIX}.${widgetId}.${name}`;
}

function readJson(widgetId, name, fallback) {
  try {
    const raw = globalThis.localStorage?.getItem(getStorageKey(widgetId, name));
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(widgetId, name, value) {
  try {
    globalThis.localStorage?.setItem(getStorageKey(widgetId, name), JSON.stringify(value));
  } catch {
    // Local persistence is helpful, not required.
  }
}

function ensureAudioContext() {
  const AudioContextClass = globalThis.AudioContext || globalThis.webkitAudioContext;

  if (!AudioContextClass) {
    throw new Error("Web Audio is not available in this browser.");
  }

  if (!audioContext || audioContext.state === "closed") {
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }

  return audioContext;
}

function midiToHz(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function noteName(midi) {
  const names = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
  return `${names[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}

function makeElement(tagName, className, textContent) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (textContent !== undefined) {
    element.textContent = textContent;
  }
  return element;
}

function copyText(text) {
  if (globalThis.navigator?.clipboard?.writeText) {
    return globalThis.navigator.clipboard.writeText(text);
  }

  const area = document.createElement("textarea");
  area.value = text;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
  return Promise.resolve();
}

function commandBlock(command) {
  const block = makeElement("button", "jcc-command", command);
  block.type = "button";
  block.title = "Copy command";
  block.addEventListener("click", () => {
    void copyText(command);
    block.dataset.copied = "true";
    globalThis.setTimeout(() => {
      block.dataset.copied = "false";
    }, 900);
  });
  return block;
}

function stat(label, value, tone = "blue") {
  const node = makeElement("div", `jcc-stat jcc-tone-${tone}`);
  node.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  return node;
}

function progress(value, label) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));
  const node = makeElement("div", "jcc-progress");
  node.innerHTML = `
    <div class="jcc-progress-top"><span>${label}</span><strong>${safeValue}%</strong></div>
    <div class="jcc-progress-track"><div style="width:${safeValue}%"></div></div>
  `;
  return node;
}

function pill(label, tone = "blue") {
  return `<span class="jcc-pill jcc-tone-${tone}">${label}</span>`;
}

function renderShell(parent, widgetId, title, subtitle) {
  parent.innerHTML = "";
  parent.style.cssText = `
    all: initial;
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: #eef7ff;
  `;

  const style = makeElement("style");
  style.textContent = `
    .jcc {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: 12px;
      width: 100%;
      height: 100%;
      min-height: 0;
      color: #eef7ff;
    }
    .jcc * {
      box-sizing: border-box;
    }
    .jcc-head {
      display: flex;
      align-items: start;
      justify-content: space-between;
      gap: 12px;
      min-width: 0;
    }
    .jcc-title-wrap {
      display: grid;
      gap: 4px;
      min-width: 0;
    }
    .jcc-kicker {
      font-size: 10px;
      line-height: 1;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(125, 211, 252, 0.76);
      white-space: nowrap;
    }
    .jcc-title {
      margin: 0;
      font-size: 19px;
      line-height: 1.1;
      font-weight: 760;
      letter-spacing: 0;
      color: #f8fbff;
    }
    .jcc-subtitle {
      max-width: 56ch;
      margin: 0;
      font-size: 12px;
      line-height: 1.35;
      color: rgba(226, 238, 255, 0.68);
    }
    .jcc-body {
      min-height: 0;
      overflow: auto;
      scrollbar-width: thin;
      scrollbar-color: rgba(125, 211, 252, 0.42) transparent;
    }
    .jcc-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .jcc-grid {
      display: grid;
      gap: 10px;
    }
    .jcc-grid.two {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .jcc-grid.three {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .jcc-panel,
    .jcc-card {
      border: 1px solid rgba(148, 198, 255, 0.12);
      border-radius: 8px;
      background: rgba(5, 13, 27, 0.38);
      padding: 10px;
      min-width: 0;
    }
    .jcc-card {
      display: grid;
      gap: 8px;
    }
    .jcc-card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .jcc-card-title {
      font-size: 13px;
      font-weight: 720;
      line-height: 1.2;
      color: #f8fbff;
    }
    .jcc-card-copy {
      font-size: 12px;
      line-height: 1.35;
      color: rgba(226, 238, 255, 0.68);
    }
    .jcc-muted {
      color: rgba(226, 238, 255, 0.6);
    }
    .jcc-small {
      font-size: 11px;
      line-height: 1.3;
    }
    .jcc-list {
      display: grid;
      gap: 8px;
    }
    .jcc-list-row {
      display: grid;
      gap: 4px;
      padding: 9px;
      border: 1px solid rgba(148, 198, 255, 0.1);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.035);
    }
    .jcc-input,
    .jcc-select {
      min-width: 0;
      width: 100%;
      border: 1px solid rgba(148, 198, 255, 0.16);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.06);
      color: #eef7ff;
      padding: 8px 10px;
      font: inherit;
      font-size: 12px;
      outline: none;
    }
    .jcc-button,
    .jcc-chip {
      border: 1px solid rgba(148, 198, 255, 0.14);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.06);
      color: #eef7ff;
      padding: 8px 10px;
      font: inherit;
      font-size: 12px;
      font-weight: 680;
      cursor: pointer;
    }
    .jcc-button.primary {
      border-color: rgba(125, 211, 252, 0.55);
      background: linear-gradient(135deg, rgba(125, 211, 252, 0.95), rgba(94, 234, 212, 0.88));
      color: #06131f;
    }
    .jcc-chip[aria-pressed="true"] {
      border-color: rgba(125, 211, 252, 0.7);
      background: rgba(125, 211, 252, 0.15);
    }
    .jcc-command {
      display: block;
      width: 100%;
      border: 1px solid rgba(125, 211, 252, 0.16);
      border-radius: 8px;
      padding: 9px 10px;
      color: #b9f3ff;
      background: rgba(0, 0, 0, 0.22);
      font: 11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      text-align: left;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      cursor: pointer;
    }
    .jcc-command[data-copied="true"] {
      color: #bbf7d0;
      border-color: rgba(134, 239, 172, 0.42);
    }
    .jcc-stat {
      display: grid;
      gap: 2px;
      padding: 9px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .jcc-stat span {
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(226, 238, 255, 0.56);
    }
    .jcc-stat strong {
      font-size: 18px;
      line-height: 1;
      color: #f8fbff;
    }
    .jcc-pill {
      display: inline-flex;
      align-items: center;
      min-height: 20px;
      border-radius: 999px;
      padding: 3px 7px;
      font-size: 10px;
      font-weight: 720;
      line-height: 1;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.06);
      color: #eaf6ff;
    }
    .jcc-tone-blue { --jcc-tone: #7dd3fc; }
    .jcc-tone-green { --jcc-tone: #86efac; }
    .jcc-tone-yellow { --jcc-tone: #fde68a; }
    .jcc-tone-red { --jcc-tone: #fda4af; }
    .jcc-tone-purple { --jcc-tone: #c4b5fd; }
    .jcc-pill.jcc-tone-blue,
    .jcc-pill.jcc-tone-green,
    .jcc-pill.jcc-tone-yellow,
    .jcc-pill.jcc-tone-red,
    .jcc-pill.jcc-tone-purple {
      color: var(--jcc-tone);
      border-color: color-mix(in srgb, var(--jcc-tone) 32%, transparent);
      background: color-mix(in srgb, var(--jcc-tone) 12%, transparent);
    }
    .jcc-progress {
      display: grid;
      gap: 6px;
    }
    .jcc-progress-top {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-size: 11px;
      color: rgba(226, 238, 255, 0.72);
    }
    .jcc-progress-track {
      height: 8px;
      border-radius: 999px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.07);
    }
    .jcc-progress-track div {
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #7dd3fc, #86efac);
    }
    .jcc-canvas-stage {
      min-height: 120px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid rgba(148, 198, 255, 0.12);
      background: radial-gradient(circle at 20% 10%, rgba(125, 211, 252, 0.16), transparent 40%), #06101d;
    }
    .jcc-canvas {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 120px;
    }
    .jcc-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
    }
    .jcc-table th,
    .jcc-table td {
      padding: 7px 6px;
      border-bottom: 1px solid rgba(148, 198, 255, 0.09);
      text-align: left;
      vertical-align: top;
    }
    .jcc-table th {
      color: rgba(226, 238, 255, 0.58);
      font-weight: 680;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .jcc-check {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      font-size: 12px;
      line-height: 1.35;
      color: rgba(226, 238, 255, 0.78);
    }
    .jcc-check input {
      margin-top: 2px;
      accent-color: #7dd3fc;
    }
    @media (max-width: 720px) {
      .jcc-grid.two,
      .jcc-grid.three {
        grid-template-columns: 1fr;
      }
    }
  `;
  parent.appendChild(style);

  const root = makeElement("div", "jcc");
  root.dataset.widgetId = widgetId;
  root.innerHTML = `
    <div class="jcc-head">
      <div class="jcc-title-wrap">
        <div class="jcc-kicker">JCN Command Center</div>
        <h2 class="jcc-title">${title}</h2>
        <p class="jcc-subtitle">${subtitle}</p>
      </div>
    </div>
  `;
  const body = makeElement("div", "jcc-body");
  root.appendChild(body);
  parent.appendChild(root);
  return { root, body };
}

function renderProjectsAtlas(parent) {
  const { body } = renderShell(
    parent,
    "projects-atlas",
    "Projects Atlas",
    "Search the local ecosystem by domain, stack, purpose, and command surface."
  );
  let activeDomain = readJson("projects-atlas", "domain", "all");
  let selectedId = readJson("projects-atlas", "selected", "space-agent");

  const controls = makeElement("div", "jcc-grid");
  const search = makeElement("input", "jcc-input");
  search.placeholder = "Filter projects, stacks, paths, commands...";
  controls.appendChild(search);

  const domainRow = makeElement("div", "jcc-row");
  [["all", PROJECTS.length], ...DOMAIN_COUNTS.slice(0, 8)].forEach(([domain, count]) => {
    const chip = makeElement("button", "jcc-chip", `${domain} ${count}`);
    chip.type = "button";
    chip.setAttribute("aria-pressed", String(activeDomain === domain));
    chip.addEventListener("click", () => {
      activeDomain = domain;
      writeJson("projects-atlas", "domain", activeDomain);
      update();
    });
    domainRow.appendChild(chip);
  });
  controls.appendChild(domainRow);
  body.appendChild(controls);

  const summary = makeElement("div", "jcc-grid three");
  summary.append(stat("Repo roots", "80+", "blue"), stat("Domains", DOMAIN_COUNTS.length, "green"), stat("Music repos", "10", "purple"));
  body.appendChild(summary);

  const grid = makeElement("div", "jcc-grid two");
  const list = makeElement("div", "jcc-list");
  const detail = makeElement("div", "jcc-card");
  grid.append(list, detail);
  body.appendChild(grid);

  function matches(project, query) {
    const haystack = [project.name, project.domain, project.stack, project.path, project.job, ...project.commands, ...project.leverage]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query.toLowerCase());
  }

  function update() {
    domainRow.querySelectorAll(".jcc-chip").forEach((chip) => {
      chip.setAttribute("aria-pressed", String(chip.textContent.startsWith(activeDomain)));
    });

    const query = search.value.trim();
    const filtered = PROJECTS.filter((project) => (activeDomain === "all" || project.domain === activeDomain) && matches(project, query));
    list.innerHTML = "";
    filtered.slice(0, 12).forEach((project) => {
      const row = makeElement("button", "jcc-list-row");
      row.type = "button";
      row.innerHTML = `
        <div class="jcc-card-head">
          <div class="jcc-card-title">${project.name}</div>
          ${pill(project.domain, project.domain === "music" ? "purple" : "blue")}
        </div>
        <div class="jcc-card-copy">${project.stack}</div>
      `;
      row.addEventListener("click", () => {
        selectedId = project.id;
        writeJson("projects-atlas", "selected", selectedId);
        update();
      });
      list.appendChild(row);
    });

    const selected = PROJECTS.find((project) => project.id === selectedId) || filtered[0] || PROJECTS[0];
    detail.innerHTML = `
      <div class="jcc-card-head">
        <div class="jcc-card-title">${selected.name}</div>
        ${pill(selected.domain, "green")}
      </div>
      <div class="jcc-card-copy">${selected.job}</div>
      <div class="jcc-small jcc-muted">${selected.path}</div>
      <div class="jcc-row">${selected.leverage.map((item) => pill(item, "blue")).join("")}</div>
    `;
    selected.commands.forEach((command) => detail.appendChild(commandBlock(command)));
  }

  search.addEventListener("input", update);
  update();
}

function renderWorktreeRiskRadar(parent) {
  const { body } = renderShell(
    parent,
    "worktree-risk-radar",
    "Worktree Risk Radar",
    "Pre-push risk posture for repos where stale branches, dirty trees, and proof gaps are expensive."
  );
  const reviewed = readJson("worktree-risk-radar", "reviewed", {});
  const top = makeElement("div", "jcc-grid three");
  const avgRisk = Math.round(RISK_REPOS.reduce((sum, item) => sum + item.risk, 0) / RISK_REPOS.length);
  top.append(stat("Tracked", RISK_REPOS.length, "blue"), stat("Avg risk", avgRisk, "yellow"), stat("Reviewed", Object.values(reviewed).filter(Boolean).length, "green"));
  body.appendChild(top);

  const list = makeElement("div", "jcc-list");
  body.appendChild(list);
  RISK_REPOS.forEach((repo) => {
    const card = makeElement("div", "jcc-card");
    card.innerHTML = `
      <div class="jcc-card-head">
        <div class="jcc-card-title">${repo.repo}</div>
        ${pill(repo.status, repo.risk > 80 ? "red" : repo.risk > 68 ? "yellow" : "blue")}
      </div>
      <div class="jcc-small jcc-muted">${repo.branch}</div>
      <div class="jcc-row">${repo.signals.map((signal) => pill(signal, "purple")).join("")}</div>
      <div class="jcc-card-copy">${repo.next}</div>
    `;
    card.appendChild(progress(repo.risk, "Risk score"));
    card.appendChild(commandBlock(repo.gate));
    const check = makeElement("label", "jcc-check");
    const input = makeElement("input");
    input.type = "checkbox";
    input.checked = Boolean(reviewed[repo.repo]);
    input.addEventListener("change", () => {
      reviewed[repo.repo] = input.checked;
      writeJson("worktree-risk-radar", "reviewed", reviewed);
    });
    check.append(input, document.createTextNode(" Reviewed from current state, not memory"));
    card.appendChild(check);
    list.appendChild(card);
  });
}

function renderDevServicesBoard(parent) {
  const { body } = renderShell(
    parent,
    "dev-services-board",
    "Dev Services Board",
    "Ports, daemons, local workspaces, and the exact commands that bring them online."
  );
  const stats = makeElement("div", "jcc-grid three");
  stats.append(stat("Services", SERVICES.length, "blue"), stat("Known ports", "6", "green"), stat("Launchers", "devports/tmc", "purple"));
  body.appendChild(stats);

  const list = makeElement("div", "jcc-grid two");
  body.appendChild(list);
  SERVICES.forEach((service) => {
    const card = makeElement("div", "jcc-card");
    card.innerHTML = `
      <div class="jcc-card-head">
        <div class="jcc-card-title">${service.name}</div>
        ${pill(service.port, service.status === "daemon" ? "green" : "blue")}
      </div>
      <div class="jcc-small jcc-muted">${service.repo}</div>
      <div class="jcc-row">${service.checks.map((check) => pill(check, "purple")).join("")}</div>
    `;
    card.appendChild(commandBlock(service.command));
    list.appendChild(card);
  });
}

function renderEvidenceFeed(parent) {
  const { body } = renderShell(
    parent,
    "evidence-feed",
    "Evidence Feed",
    "A proof-first feed of checks, receipts, artifacts, and browser-visible verification patterns."
  );
  const types = ["all", ...new Set(EVIDENCE_ITEMS.map((item) => item.type))];
  let active = "all";
  const row = makeElement("div", "jcc-row");
  body.appendChild(row);
  const list = makeElement("div", "jcc-list");
  body.appendChild(list);

  types.forEach((type) => {
    const chip = makeElement("button", "jcc-chip", type);
    chip.type = "button";
    chip.setAttribute("aria-pressed", String(type === active));
    chip.addEventListener("click", () => {
      active = type;
      update();
    });
    row.appendChild(chip);
  });

  function update() {
    row.querySelectorAll(".jcc-chip").forEach((chip) => chip.setAttribute("aria-pressed", String(chip.textContent === active)));
    list.innerHTML = "";
    EVIDENCE_ITEMS.filter((item) => active === "all" || item.type === active).forEach((item) => {
      const card = makeElement("div", "jcc-card");
      card.innerHTML = `
        <div class="jcc-card-head">
          <div class="jcc-card-title">${item.title}</div>
          ${pill(item.type, "blue")}
        </div>
        <div class="jcc-small jcc-muted">${item.source}</div>
        <div class="jcc-card-copy">${item.proof}</div>
      `;
      card.appendChild(commandBlock(item.command));
      list.appendChild(card);
    });
  }
  update();
}

function renderPulseRevenuePublishing(parent) {
  const { body } = renderShell(
    parent,
    "pulse-revenue-publishing",
    "Pulse Revenue Publishing",
    "Recurring intelligence, prospect scoring, transcript ingestion, crawl receipts, and controlled publishing."
  );
  const grid = makeElement("div", "jcc-grid two");
  body.appendChild(grid);
  PULSE_WORK.forEach((lane) => {
    const card = makeElement("div", "jcc-card");
    card.innerHTML = `
      <div class="jcc-card-head">
        <div class="jcc-card-title">${lane.lane}</div>
        ${pill(lane.cadence, lane.cadence === "daily" ? "green" : "blue")}
      </div>
      <div class="jcc-card-copy">${lane.next}</div>
      <div class="jcc-row">${lane.outputs.map((output) => pill(output, "purple")).join("")}</div>
    `;
    card.appendChild(commandBlock(lane.command));
    grid.appendChild(card);
  });
}

function renderQaConsole(parent) {
  const { body } = renderShell(
    parent,
    "project-aware-qa-console",
    "Project-Aware QA Console",
    "Build surface registries, risk plans, verification runs, and report commands for any repo."
  );
  const selected = readJson("project-aware-qa-console", "repo", PROJECTS[0].path);
  const controls = makeElement("div", "jcc-grid");
  const select = makeElement("select", "jcc-select");
  PROJECTS.slice(0, 18).forEach((project) => {
    const option = makeElement("option");
    option.value = project.path;
    option.textContent = `${project.name} - ${project.domain}`;
    option.selected = project.path === selected;
    select.appendChild(option);
  });
  controls.appendChild(select);
  body.appendChild(controls);

  const commandGrid = makeElement("div", "jcc-grid");
  body.appendChild(commandGrid);
  const adapterGrid = makeElement("div", "jcc-grid two");
  body.appendChild(adapterGrid);

  function update() {
    writeJson("project-aware-qa-console", "repo", select.value);
    commandGrid.innerHTML = "";
    ["scan", "plan", "verify --tests --screenshots --max-routes 8", "report"].forEach((step) => {
      commandGrid.appendChild(commandBlock(`cd ${PROJECT_ROOT}/ai-protocol/project-aware-qa-pack && tsx scripts/${step.split(" ")[0]}.ts ${select.value}${step.includes(" ") ? ` ${step.slice(step.indexOf(" ") + 1)}` : ""}`));
    });
  }

  QA_ADAPTERS.forEach(([name, coverage]) => {
    const card = makeElement("div", "jcc-card");
    card.innerHTML = `
      <div class="jcc-card-head"><div class="jcc-card-title">${name}</div>${pill("adapter", "green")}</div>
      <div class="jcc-card-copy">${coverage}</div>
    `;
    adapterGrid.appendChild(card);
  });
  select.addEventListener("change", update);
  update();
}

function renderMusicOpsBoard(parent) {
  const { body } = renderShell(
    parent,
    "music-ops-board",
    "Music Ops Board",
    "JBM ingestion, GoMono streaming, JustBeatz web proof, SoundKit, Note Book, and REAPER operations."
  );
  const grid = makeElement("div", "jcc-grid two");
  body.appendChild(grid);
  MUSIC_SYSTEMS.forEach((system) => {
    const card = makeElement("div", "jcc-card");
    card.innerHTML = `
      <div class="jcc-card-head">
        <div class="jcc-card-title">${system.name}</div>
        ${pill(system.status, "blue")}
      </div>
      <div class="jcc-card-copy">${system.flow}</div>
      <div class="jcc-row">${system.watch.map((item) => pill(item, "purple")).join("")}</div>
    `;
    system.commands.forEach((command) => card.appendChild(commandBlock(command)));
    grid.appendChild(card);
  });
}

function drawIntentCanvas(canvas, color = "#7dd3fc") {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(240, Math.round(rect.width));
  const height = Math.max(120, Math.round(rect.height));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#06101d";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < width; i += 1) {
    const t = i / width;
    const amp = Math.exp(-t * 3.2);
    const y = height * 0.5 + Math.sin(t * Math.PI * 14) * amp * height * 0.32 + Math.sin(t * Math.PI * 39) * amp * height * 0.06;
    if (i === 0) {
      ctx.moveTo(i, y);
    } else {
      ctx.lineTo(i, y);
    }
  }
  ctx.stroke();
  ctx.fillStyle = "rgba(125, 211, 252, 0.08)";
  ctx.fillRect(0, height * 0.68, width, 1);
}

function playIntent(intent, volume = 0.55) {
  const context = ensureAudioContext();
  const now = context.currentTime;
  const output = context.createGain();
  output.gain.setValueAtTime(Math.max(0.05, Math.min(1, volume)) * 0.28, now);
  output.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
  output.connect(context.destination);

  intent.steps.forEach((step, index) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    const start = now + index * 0.075;
    const duration = intent.id.includes("laser") ? 0.34 : 0.24;
    osc.type = intent.shape;
    osc.frequency.setValueAtTime(intent.base * Math.pow(2, step / 12), start);
    if (intent.id.includes("laser")) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, intent.base * 0.35), start + duration);
    }
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(1, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(output);
    osc.start(start);
    osc.stop(start + duration + 0.03);
  });
}

function renderSoundKitIntentPad(parent) {
  const { body } = renderShell(
    parent,
    "soundkit-intent-pad",
    "SoundKit Intent Pad",
    "Audition named sound intents with browser-native Web Audio, then copy the SoundKit integration shape."
  );
  const current = readJson("soundkit-intent-pad", "intent", SOUND_INTENTS[0].id);
  const controlGrid = makeElement("div", "jcc-grid");
  const volume = makeElement("input", "jcc-input");
  volume.type = "range";
  volume.min = "0.1";
  volume.max = "1";
  volume.step = "0.05";
  volume.value = String(readJson("soundkit-intent-pad", "volume", 0.55));
  controlGrid.appendChild(volume);
  const canvasStage = makeElement("div", "jcc-canvas-stage");
  const canvas = makeElement("canvas", "jcc-canvas");
  canvasStage.appendChild(canvas);
  controlGrid.appendChild(canvasStage);
  body.appendChild(controlGrid);

  const pads = makeElement("div", "jcc-grid three");
  body.appendChild(pads);

  SOUND_INTENTS.forEach((intent) => {
    const button = makeElement("button", "jcc-card");
    button.type = "button";
    button.innerHTML = `
      <div class="jcc-card-head"><div class="jcc-card-title">${intent.label}</div>${pill(intent.id, "blue")}</div>
      <div class="jcc-card-copy">${intent.shape} layers at ${intent.base} Hz</div>
    `;
    button.style.borderColor = `${intent.color}66`;
    button.addEventListener("click", () => {
      writeJson("soundkit-intent-pad", "intent", intent.id);
      writeJson("soundkit-intent-pad", "volume", Number(volume.value));
      playIntent(intent, Number(volume.value));
      drawIntentCanvas(canvas, intent.color);
      snippet.innerHTML = "";
      snippet.appendChild(commandBlock(`sound.play("${intent.id}", { volume: ${Number(volume.value).toFixed(2)}, variation: true, seed: 1234 })`));
    });
    pads.appendChild(button);
  });

  const snippet = makeElement("div", "jcc-grid");
  body.appendChild(snippet);
  const selected = SOUND_INTENTS.find((intent) => intent.id === current) || SOUND_INTENTS[0];
  drawIntentCanvas(canvas, selected.color);
  snippet.appendChild(commandBlock(`sound.play("${selected.id}", { volume: ${Number(volume.value).toFixed(2)}, variation: true, seed: 1234 })`));
}

function drawWaveform(canvas, samples, color = "#7dd3fc") {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(260, Math.round(rect.width));
  const height = Math.max(120, Math.round(rect.height));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#06101d";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(148, 198, 255, 0.18)";
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let x = 0; x < width; x += 1) {
    const index = Math.floor((x / width) * samples.length);
    const y = height / 2 + (samples[index] || 0) * (height * 0.42);
    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

function renderAudioAssetInspector(parent) {
  const { body } = renderShell(
    parent,
    "audio-asset-inspector",
    "Audio Asset Inspector",
    "Drop an audio file to inspect duration, peak, RMS, waveform, and the matching audio-tool commands."
  );
  const fileInput = makeElement("input", "jcc-input");
  fileInput.type = "file";
  fileInput.accept = "audio/*";
  body.appendChild(fileInput);
  const stats = makeElement("div", "jcc-grid three");
  stats.append(stat("Duration", "-", "blue"), stat("Peak", "-", "yellow"), stat("RMS", "-", "green"));
  body.appendChild(stats);
  const canvasStage = makeElement("div", "jcc-canvas-stage");
  const canvas = makeElement("canvas", "jcc-canvas");
  canvasStage.appendChild(canvas);
  body.appendChild(canvasStage);
  const commands = makeElement("div", "jcc-grid");
  body.appendChild(commands);
  drawWaveform(canvas, Array.from({ length: 512 }, (_, index) => Math.sin(index / 12) * Math.exp(-index / 380)));
  commands.appendChild(commandBlock("audio-tool --json probe ./clip.wav"));
  commands.appendChild(commandBlock("audio-tool --json waveform ./clip.wav --out ./waveform.png"));
  commands.appendChild(commandBlock("audio-tool --json normalize ./clip.wav --out ./normalized.wav"));

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) {
      return;
    }
    const context = ensureAudioContext();
    const buffer = await file.arrayBuffer();
    const decoded = await context.decodeAudioData(buffer.slice(0));
    const data = decoded.getChannelData(0);
    const stride = Math.max(1, Math.floor(data.length / 1600));
    const samples = [];
    let peak = 0;
    let sum = 0;
    for (let index = 0; index < data.length; index += stride) {
      const value = data[index] || 0;
      peak = Math.max(peak, Math.abs(value));
      sum += value * value;
      samples.push(value);
    }
    const rms = Math.sqrt(sum / Math.max(1, samples.length));
    stats.innerHTML = "";
    stats.append(stat("Duration", `${decoded.duration.toFixed(2)}s`, "blue"), stat("Peak", peak.toFixed(3), "yellow"), stat("RMS", rms.toFixed(3), "green"));
    drawWaveform(canvas, samples, "#86efac");
    commands.innerHTML = "";
    commands.appendChild(commandBlock(`audio-tool --json probe "${file.name}"`));
    commands.appendChild(commandBlock(`audio-tool --json waveform "${file.name}" --out "${file.name}.png"`));
    commands.appendChild(commandBlock(`audio-tool --json normalize "${file.name}" --out "normalized-${file.name}"`));
  });
}

function playChord(notes) {
  const context = ensureAudioContext();
  const now = context.currentTime;
  const output = context.createGain();
  output.gain.setValueAtTime(0.18, now);
  output.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
  output.connect(context.destination);
  notes.forEach((midi, index) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "triangle";
    osc.frequency.value = midiToHz(midi);
    gain.gain.setValueAtTime(0.0001, now + index * 0.015);
    gain.gain.linearRampToValueAtTime(1, now + 0.04 + index * 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    osc.connect(gain);
    gain.connect(output);
    osc.start(now + index * 0.015);
    osc.stop(now + 1.35);
  });
}

function detectChord(notes) {
  const pcs = [...new Set(notes.map((note) => ((note % 12) + 12) % 12))].sort((a, b) => a - b);
  if (!pcs.length) {
    return "No notes held";
  }
  const root = pcs[0];
  const intervals = pcs.map((pc) => (pc - root + 12) % 12);
  const has = (value) => intervals.includes(value);
  if (has(4) && has(7) && has(11)) return `${noteName(root + 60).replace(/\d+$/, "")}maj7`;
  if (has(3) && has(7) && has(10)) return `${noteName(root + 60).replace(/\d+$/, "")}m7`;
  if (has(4) && has(7) && has(10)) return `${noteName(root + 60).replace(/\d+$/, "")}7`;
  if (has(3) && has(6) && has(9)) return `${noteName(root + 60).replace(/\d+$/, "")}dim7`;
  return `${pcs.map((pc) => noteName(pc + 60).replace(/\d+$/, "")).join(" ")} cluster`;
}

function renderMidiJazzPractice(parent) {
  const { body } = renderShell(
    parent,
    "midi-jazz-practice",
    "MIDI Jazz Practice",
    "Web MIDI chord detection, voicing capture, Barry Harris practice prompts, and quick Web Audio playback."
  );
  const held = new Set();
  const captured = readJson("midi-jazz-practice", "captured", []);
  const status = makeElement("div", "jcc-card");
  status.innerHTML = `<div class="jcc-card-title">No MIDI session yet</div><div class="jcc-card-copy">Use Chrome or Edge with a USB MIDI keyboard, or audition the progression pads below.</div>`;
  body.appendChild(status);
  const actions = makeElement("div", "jcc-row");
  const connect = makeElement("button", "jcc-button primary", "Connect MIDI");
  connect.type = "button";
  actions.appendChild(connect);
  body.appendChild(actions);
  const pads = makeElement("div", "jcc-grid two");
  body.appendChild(pads);
  const captureList = makeElement("div", "jcc-list");
  body.appendChild(captureList);

  function updateStatus() {
    const notes = [...held].sort((a, b) => a - b);
    status.innerHTML = `
      <div class="jcc-card-head"><div class="jcc-card-title">${detectChord(notes)}</div>${pill(`${notes.length} notes`, "green")}</div>
      <div class="jcc-card-copy">${notes.map(noteName).join(" ") || "Play notes or audition a pad."}</div>
    `;
  }

  function updateCaptured() {
    captureList.innerHTML = "";
    captured.slice(-5).reverse().forEach((entry) => {
      const row = makeElement("div", "jcc-list-row");
      row.innerHTML = `<div class="jcc-card-title">${entry.name}</div><div class="jcc-card-copy">${entry.notes}</div>`;
      captureList.appendChild(row);
    });
  }

  JAZZ_PROGRESSIONS.forEach((progression) => {
    const pad = makeElement("button", "jcc-card");
    pad.type = "button";
    pad.innerHTML = `
      <div class="jcc-card-head"><div class="jcc-card-title">${progression.name}</div>${pill("play", "blue")}</div>
      <div class="jcc-card-copy">${progression.quality}</div>
      <div class="jcc-small jcc-muted">${progression.notes.map(noteName).join(" ")}</div>
    `;
    pad.addEventListener("click", () => {
      playChord(progression.notes);
      captured.push({ name: progression.name, notes: progression.notes.map(noteName).join(" ") });
      writeJson("midi-jazz-practice", "captured", captured.slice(-20));
      updateCaptured();
    });
    pads.appendChild(pad);
  });

  connect.addEventListener("click", async () => {
    if (!navigator.requestMIDIAccess) {
      status.innerHTML = `<div class="jcc-card-title">Web MIDI unavailable</div><div class="jcc-card-copy">Chrome or Edge with a real MIDI device is required for live capture.</div>`;
      return;
    }
    activeMidi = await navigator.requestMIDIAccess();
    activeMidi.inputs.forEach((input) => {
      input.onmidimessage = (event) => {
        const [command, note, velocity] = event.data;
        if ((command & 0xf0) === 0x90 && velocity > 0) {
          held.add(note);
        } else if ((command & 0xf0) === 0x80 || ((command & 0xf0) === 0x90 && velocity === 0)) {
          held.delete(note);
        }
        updateStatus();
      };
    });
    status.innerHTML = `<div class="jcc-card-title">MIDI connected</div><div class="jcc-card-copy">${activeMidi.inputs.size} input(s) listening.</div>`;
  });

  updateStatus();
  updateCaptured();
}

function renderReaperControl(parent) {
  const { body } = renderShell(
    parent,
    "reaper-control",
    "REAPER Control",
    "Search safe primitives, draft a dry-run, and keep apply/verify separated for live sessions."
  );
  const query = makeElement("input", "jcc-input");
  query.placeholder = "Search action, track, send, receive, FX...";
  body.appendChild(query);
  const list = makeElement("div", "jcc-list");
  body.appendChild(list);
  const plan = makeElement("div", "jcc-grid");
  body.appendChild(plan);

  function update() {
    const needle = query.value.toLowerCase();
    list.innerHTML = "";
    REAPER_PRIMITIVES.filter(([name, description]) => `${name} ${description}`.toLowerCase().includes(needle)).forEach(([name, description]) => {
      const card = makeElement("button", "jcc-list-row");
      card.type = "button";
      card.innerHTML = `<div class="jcc-card-title">${name}</div><div class="jcc-card-copy">${description}</div>`;
      card.addEventListener("click", () => {
        plan.innerHTML = "";
        plan.appendChild(commandBlock(`cd ${PROJECT_ROOT}/music/reaper-studio && npm run reaper -- workflow init --primitive ${name}`));
        plan.appendChild(commandBlock(`cd ${PROJECT_ROOT}/music/reaper-studio && npm run reaper -- controller dry-run --primitive ${name}`));
        plan.appendChild(commandBlock(`cd ${PROJECT_ROOT}/music/reaper-studio && npm run reaper -- controller apply --primitive ${name} --verify`));
      });
      list.appendChild(card);
    });
  }
  query.addEventListener("input", update);
  update();
}

function renderCreativePipelineMonitor(parent) {
  const { body } = renderShell(
    parent,
    "creative-pipeline-monitor",
    "Creative Pipeline Monitor",
    "Stage-gate monitor for Animation Studio, Lyrascape, game prototypes, Remotion, and delivery artifacts."
  );
  body.appendChild(progress(63, "Representative pipeline maturity"));
  const table = makeElement("table", "jcc-table");
  table.innerHTML = `
    <thead><tr><th>Stage</th><th>Owner</th><th>Gate</th><th>Artifact</th></tr></thead>
    <tbody>
      ${CREATIVE_STAGES.map((stage) => `<tr><td>${stage.stage}</td><td>${stage.owner}</td><td>${stage.gate}</td><td>${stage.artifact}</td></tr>`).join("")}
    </tbody>
  `;
  body.appendChild(table);
  const commands = makeElement("div", "jcc-grid");
  commands.appendChild(commandBlock(`cd ${PROJECT_ROOT}/creative/jcn-animation-studio && npm run typecheck:all`));
  commands.appendChild(commandBlock(`cd ${PROJECT_ROOT}/creative/lyrascape && pnpm check`));
  commands.appendChild(commandBlock(`cd ${PROJECT_ROOT}/gamedev/Zig/Blaster && zig build run`));
  body.appendChild(commands);
}

const WIDGET_RENDERERS = {
  "projects-atlas": renderProjectsAtlas,
  "worktree-risk-radar": renderWorktreeRiskRadar,
  "dev-services-board": renderDevServicesBoard,
  "evidence-feed": renderEvidenceFeed,
  "pulse-revenue-publishing": renderPulseRevenuePublishing,
  "project-aware-qa-console": renderQaConsole,
  "music-ops-board": renderMusicOpsBoard,
  "soundkit-intent-pad": renderSoundKitIntentPad,
  "audio-asset-inspector": renderAudioAssetInspector,
  "midi-jazz-practice": renderMidiJazzPractice,
  "reaper-control": renderReaperControl,
  "creative-pipeline-monitor": renderCreativePipelineMonitor
};

export async function render(parent, currentSpace, context, widgetId) {
  const renderer = WIDGET_RENDERERS[widgetId];

  if (!renderer) {
    const { body } = renderShell(parent, widgetId, "Unknown Widget", `No renderer exists for ${widgetId}.`);
    body.appendChild(commandBlock(`Known widgets: ${Object.keys(WIDGET_RENDERERS).join(", ")}`));
    return undefined;
  }

  renderer(parent, currentSpace, context);
  return () => {
    if (activeMidi) {
      activeMidi.inputs.forEach((input) => {
        input.onmidimessage = null;
      });
    }
  };
}

export const commandCenterWidgets = Object.freeze(Object.keys(WIDGET_RENDERERS));
