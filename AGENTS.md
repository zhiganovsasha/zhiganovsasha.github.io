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

- The git directory is relocated outside Google Drive to `E:\gitdirs\my-personal-website.git`
  for performance. The `.git` file in this project is a gitfile pointer.
  Git tools work transparently, but plain file sync through Drive no longer
  backs up the repository history. Do not delete `E:\gitdirs\my-personal-website.git`.
- `main` is the stable branch. `dev` is the normal working branch.
- Start work by checking `git status --short --branch`. Preserve changes that
  are already present and may belong to the owner or another agent.
- Work directly on `dev`. Do not create additional branches or worktrees unless
  the owner explicitly asks for one.
- Do not switch away from `dev`, merge into `main`, commit, push, open a pull
  request, publish, or deploy unless the owner explicitly asks for that action.
- Stage only files that belong to the current task. Never discard unrelated
  changes to make the worktree clean.

## Dependencies, Node.js, and Google Drive

- The working tree is located inside Google Drive. Google Drive's background
  sync aggressively locks files and directories when many small files change.
- Never run `npm install`, `npm ci`, `npm update`, or delete/move `node_modules`
  inside the Google Drive folder without explicit approval from the owner. Doing
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
- Do not use the middle dot character as a separator anywhere in the project.
  Use commas, colons, slashes, dashes, or separate lines instead.
- Do not convert editorial section headings in case studies and visual explainers
  to Chicago Title Case. Keep the owner's sentence-case narrative headlines (e.g.
  "The input is never clean. The system is built for that.").
- Preserve authentic first-person statements ("I conceived, designed, and built...",
  "with me directing, reviewing...") in case study role descriptions and personal
  portfolio copy. Do not rewrite them into impersonal or documentation-style third person.
- Never add local filesystem paths from the owner's PC (for example `G:\...` or
  `E:\...`) to website articles, explainers, or published pages. Refer to files
  by repository-relative paths instead.

## Visual system and design rules

- Visual style: Instrumental Style (approved 2026-10-27). Tonal elevation uses
  `#f6f6f7` for page canvas (`--bg-canvas`), `#ffffff` for elevated cards and
  surfaces (`--bg-surface`), and `#ececee` for sunken fields/wells (`--bg-sunken`).
- Accent color: `#960018` (crimson) and subtle accent `--signal-subtle: rgba(150, 0, 24, 0.08)`.
- Sharp 90-degree corners: keep `border-radius: 0` across all interface components,
  including buttons, project cards, dialogue boxes, menus, chips, and the hero portrait.
  Do not introduce rounded corners or default radii.
- Rainbow / spectrum gradients:
  - Allowed placements:
    1. Home hero statement accent (`art, technology, and AI`).
    2. Case study titles in `/development/*` via `rainbowTitle: true`.
    3. Header brand and navigation links on hover via `data-text` overlay.
  - Prohibited placements:
    - Never apply rainbow gradients or rainbow borders to catalog project cards or direction
      cards in "What Would You Like to Explore?". Keep them crisp white surfaces.
  - Hover animation: two-layer cross-fade (`opacity: 0 -> 1`) with duration
    `260ms cubic-bezier(0.16, 1, 0.3, 1)`. Under `-webkit-background-clip: text`,
    the underlying base text must transition to `color: transparent` on hover to
    eliminate dark glyph anti-aliasing outlines/fringes.
- Spectrum randomizer:
  - Generative inline script in `Base.astro` rotates between three themes
    (Apple Intelligence, Instagram Sunset, Cyber Prismatic), varies gradient angles,
    and sets random initial phases and hover delays on `pointerenter`.

## Windows, paths, and text encoding

- This repository is used on Windows and may contain Cyrillic paths and text.
  Configure PowerShell and Python console I/O for UTF-8 before commands that may
  read or print Unicode content.
- Pass paths as separate arguments. In PowerShell use `-LiteralPath`; do not use
  `Invoke-Expression` or build commands by interpolating file paths or contents.
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

