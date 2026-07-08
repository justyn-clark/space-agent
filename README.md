# JCN Space Agent

Justyn Clark's browser-first AI workspace runtime.

This repository is now the JCN-owned Space Agent source tree. It keeps the useful browser-first runtime architecture, but the public docs, package metadata, and local setup guidance are no longer written as an upstream Agent Zero distribution. Treat this checkout as the place where my agent workspace, tools, widgets, music workflows, and local operating surfaces evolve.

## Run Locally

Use this path when you just want the app running on this machine without creating users or passwords.

Requirements:

- Node.js 20 or newer
- npm

```bash
npm install --omit=optional
npm run dev -- PORT=0 CUSTOMWARE_PATH="$HOME/.jcn/space-agent/customware" SINGLE_USER_APP=true
```

The server prints a line like:

```text
space server listening at http://127.0.0.1:49637
```

Open that URL in your browser. `PORT=0` lets macOS choose an open port. `CUSTOMWARE_PATH` keeps writable user and group state outside the source checkout. `SINGLE_USER_APP=true` signs you in as the local admin-style `user` account, which is the fastest development mode.

Stop the server with `Ctrl-C`.

## Run With A Login

Use this when you want the normal login flow and named local users.

```bash
npm install --omit=optional
node space set CUSTOMWARE_PATH="$HOME/.jcn/space-agent/customware"
node space user create justyn --password "change-me-now" --full-name "Justyn Clark" --groups _admin
node space serve
```

Then open the printed local URL and sign in as `justyn`.

Useful notes:

- `node space serve PORT=0` also works if you want a random free port.
- `node space get` shows stored runtime parameters.
- `node space help` lists the command surface.
- `node space help user` and `node space help group` show user and group command details.

## Development

For ordinary source work:

```bash
npm run dev -- PORT=0 CUSTOMWARE_PATH="$HOME/.jcn/space-agent/customware" SINGLE_USER_APP=true
```

`npm run dev` runs `server/dev_server.js`, watches `space`, `commands/`, and `server/`, and restarts the child `node space serve` process after server-side source changes.

For a direct server run without the watcher:

```bash
node space serve PORT=0 CUSTOMWARE_PATH="$HOME/.jcn/space-agent/customware" SINGLE_USER_APP=true
```

For a production-style source checkout:

```bash
node space supervise HOST=0.0.0.0 PORT=3000 CUSTOMWARE_PATH="$HOME/.jcn/space-agent/customware"
```

`supervise` owns zero-downtime child restarts and source-checkout update flow. It requires `CUSTOMWARE_PATH` so writable state survives source release swaps.

## Desktop Builds

The source tree still supports the thin Electron host.

```bash
npm run install:packaging
npm run package:desktop:macos:dev
```

The macOS dev package defaults to an unsigned unpacked app for local testing. Release-grade signing, notarization, and cross-platform packaging remain owned by the packaging docs and scripts.

## Validation

This repo does not currently define a single `npm test`, `npm run lint`, or `npm run format` suite with substantive commands. Use the smallest relevant checks for the area you changed.

Good baseline checks:

```bash
git diff --check
node tests/yaml_lite_test.mjs
node --test tests/spaces_prompt_context_test.mjs tests/spaces_widget_import_test.mjs
```

For app startup validation:

```bash
npm run dev -- PORT=0 CUSTOMWARE_PATH="$(mktemp -d)" SINGLE_USER_APP=true
```

Wait for the `space server listening at ...` line, open the URL, and stop the server when done.

## What This Runtime Is For

JCN Space Agent is meant to become a personal and extensible operating surface for:

- project awareness across the local JCN repo ecosystem
- browser-first agent tools and widgets
- local model and provider experimentation
- music tooling, Web Audio, MIDI, REAPER-adjacent workflows, and creative dashboards
- documentation-first agent development
- recoverable user and group customware through layered app files

The browser app in `app/` is the primary runtime. The Node.js server is infrastructure for page shells, auth, file APIs, module delivery, outbound fetch proxying, and optional desktop hosting.

## Documentation Map

Start here when changing the repo:

- [AGENTS.md](./AGENTS.md): binding repo-wide contract, architecture, docs policy, and AGENTS file index
- [app/AGENTS.md](./app/AGENTS.md): browser runtime, frontend-first rules, modules, and layers
- [server/AGENTS.md](./server/AGENTS.md): thin backend infrastructure, routing, auth, APIs, and server boundaries
- [commands/AGENTS.md](./commands/AGENTS.md): CLI command conventions and runtime parameters
- [packaging/AGENTS.md](./packaging/AGENTS.md): Electron host and desktop packaging
- [Spaces and widgets docs](./app/L0/_all/mod/_core/documentation/docs/app/spaces-and-widgets.md): space storage, widget contracts, and onboarding examples
- [CLI docs](./app/L0/_all/mod/_core/documentation/docs/cli/commands-and-runtime-params.md): `space` commands and runtime params

Documentation is part of the runtime contract in this repo. If code changes a stable surface, update the closest owning `AGENTS.md` and the matching supplemental docs in the same session.

## Project Identity

- Repository: `https://github.com/justyn-clark/space-agent`
- Package name: `jcn-space-agent`
- Desktop product name: `JCN Space Agent`
- Primary owner: Justyn Clark / Justyn Clark Network

Upstream-origin public links, community badges, and hosted-demo copy have been removed from this README. Any future public release links should point at the JCN-owned repository or a JCN-owned deployment.
