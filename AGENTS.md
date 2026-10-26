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

