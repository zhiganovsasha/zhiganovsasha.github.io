# Project instructions for AI agents

These instructions apply to Codex, Google Antigravity, OpenCode, and any other
agent working in this repository.

## Source of truth

- Treat this `AGENTS.md` as the single shared rules file. Do not create a
  parallel `GEMINI.md`, `CLAUDE.md`, or model-specific copy unless a tool cannot
  read `AGENTS.md` and the owner explicitly approves the exception.
- Read `docs/PROJECT-SPEC.md` before product, content, design, or implementation
  work. It contains the decisions approved by the owner on 2026-10-23.
- Use `docs/TODO.md` for deferred work. Do not silently turn a deferred item into
  current scope.
- The approved specification does not authorize implementation, publication, or
  deployment. Wait for an explicit instruction from the owner to begin each of
  those stages.
- Project skills live only in `.agents/skills/<skill-name>/SKILL.md`.
- Do not duplicate project skills into `.codex/skills`, `.opencode/skills`, or
  another agent-specific directory.
- Read a relevant skill completely before using it. A skill directory name and
  the YAML `name` in its `SKILL.md` must match.

## Git workflow

- Each machine works in its own local clone of this repository. On macOS it is at
  `~/Documents/agents/projects/my-personal-website`, where `.git` is a normal
  directory holding the full history. Git tools work normally there.
- The copy inside Google Drive (`My Drive/Agents/Projects/my-personal-website`)
  is a backup, not a working copy. There is no offline access to it; it opens
  online only. Do not try to run Git there: its `.git` is a stale gitfile
  pointer to a bare repository that is no longer reachable.
- `main` is the stable branch. `dev` is the normal working branch.
- Start work by checking `git status --short --branch`. Preserve changes that
  are already present and may belong to the owner or another agent.
- Work directly on `dev`.
- Do not switch away from `dev`, merge into `main`, commit, push, open a pull
  request, publish, or deploy unless the owner explicitly asks for that action.
- Stage only files that belong to the current task. Never discard unrelated
  changes to make the worktree clean.

## Dependencies, Node.js, and Google Drive

- The working tree is a local clone outside Google Drive, so ordinary Node.js
  commands (`npm install`, `npm ci`, `npm run build`) work normally there.
- The Google Drive copy is a backup only. Google Drive's background sync
  aggressively locks files and directories when many small files change.
- Never run `npm install`, `npm ci`, `npm update`, or delete/move `node_modules`
  inside the Google Drive backup folder without explicit approval from the owner. Doing
  so causes sync conflicts, file locking errors (`EPERM`, `ENOTEMPTY`, `TAR_ENTRY_ERROR`),
  and hangs the agent session indefinitely.
- Production builds and package installations are handled automatically by
  GitHub Actions (`.github/workflows/deploy.yml`) on Ubuntu runners upon push to
  `main`. Do not assume that a missing or broken local tool binary (like `astro`)
  requires reinstalling packages locally.
- If a local build or tool command fails with missing binaries or module errors,
  do not attempt destructive "fixes" (such as wiping `node_modules` or running
  `npm install` with long timeouts). Report the issue clearly to the owner in plain
  language and ask how to proceed.

## Publication

- Public repository: https://github.com/zhiganovsasha/zhiganovsasha.github.io
- Live site: https://zhiganovsasha.github.io
- The site is built by GitHub Actions (workflow `.github/workflows/deploy.yml`)
  on every push to `main` and deployed to GitHub Pages. The Pages source is set
  to GitHub Actions, not to legacy branch publishing. Do not change it back:
  the legacy Jekyll pipeline fails on this repository and sends failure emails
  to the owner.
- Normal release path: commit on `dev`, push `dev`, merge `dev` into `main`,
  push `main`. Never commit release work directly on `main`.
- When the owner asks you to publish or deploy, the task is not done when the
  push finishes. You MUST wait for the `Deploy to GitHub Pages` workflow run
  to complete (for example `gh run watch` or polling `gh run list`), then
  verify the live site responds correctly (HTTP 200 on the affected pages)
  before reporting success. If the run fails, investigate, fix, re-run, and
  only then report. Never report "deployed" while the workflow is still
  running or after it failed.
- GitHub sends failure emails to the owner for every failed run. An unfinished
  or unverified deploy means the owner learns about problems from an automated
  email instead of from you. That is a process failure.

## Working style

- The owner is not a programmer. Explain outcomes and any required manual steps
  in plain language.
- For a clear, limited change, implement it and run proportionate checks without
  adding an unnecessary design or planning phase.
- A request to analyze, review, or propose changes is read-only unless the owner
  also asks for implementation.
- Inspect the relevant project documentation before changing an unfamiliar
  area. Do not invent missing product facts, content, credentials, or commands.
- Prefer the smallest change that satisfies the request. Verify the changed
  behavior before reporting completion.

## Visual system and design rules

The single source of truth for UI, UX, styling, design tokens, and prohibited patterns is [DESIGN.md](DESIGN.md).
All interface work must strictly conform to its Instrumental Style, 5-step typographic scale, sharp 90-degree corners (`border-radius: 0`), and explicit prohibitions (no eyebrows/kickers/overlines, no resting shadows, no middle dot).

## Paths and text encoding

- This repository is used on macOS and may contain Cyrillic paths and text.
  Configure the shell and Python console I/O for UTF-8 (`LANG`, `LC_CTYPE`,
  `PYTHONIOENCODING`, `PYTHONUTF8`) before commands that may read or print
  Unicode content.
- Pass paths as separate arguments in quotes; do not build commands by
  interpolating file paths or contents and do not use `eval`.
- Before editing an existing non-empty text file, detect its encoding from the
  complete file: check for a BOM, then attempt strict UTF-8 decoding. If that
  fails, use a reliable detector and proceed only with high confidence.
- Preserve the original encoding, BOM state, and line endings of existing files.
  After editing, strictly decode the complete file again and check for damaged
  Cyrillic or Unicode replacement characters.
- New project text files should be UTF-8 without BOM with LF line endings.

## Safety and secrets

- Never add secrets, access tokens, private keys, credentials, or personal data
  to the repository.
- The public contact details explicitly approved in `docs/PROJECT-SPEC.md` are
  the only exception to the personal-data rule. Do not add any other personal
  details without fresh approval from the owner.
- Ask before destructive actions, external submissions, production changes, or
  anything that is difficult to undo.
- Local implementation does not authorize publication, deployment, or changes
  to external services.

## Project memory in MemPalace

Standard mining rules — in the global `~/.agents/AGENTS.md` (MemPalace section). Wing for this project: `my-personal-website` (hub `http://127.0.0.1:8766/mcp`).
