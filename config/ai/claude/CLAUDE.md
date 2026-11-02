@../agents/instructions.md

## Claude Code notes

- Verify with `npm run check` before claiming completion; report real command output.
- Ask before adding dependencies or expanding scope beyond the current phase.
- This file is loaded through the root `CLAUDE.md` pointer. Claude Code only auto-discovers `./CLAUDE.md` or `./.claude/CLAUDE.md`, so keep that pointer. Project settings (`settings.json`, commands, agents, skills) must still live in `./.claude/` at the root; see `config/ai/README.md`.
