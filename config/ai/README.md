# AI assistant configuration

This folder holds the instructions for AI coding assistants. Human-facing docs are in [`README.md`](../../README.md) and [`docs/`](../../docs).

| Path                     | Purpose                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `agents/instructions.md` | **Canonical project rules** for every agent: scope, content rules, architecture, conventions, testing. Formerly `.agents/instructions.md`. |
| `claude/CLAUDE.md`       | Claude Code entry point. Imports the canonical rules and adds Claude-specific notes. Formerly `.claude/CLAUDE.md`.                         |

## How Claude Code finds these files

Claude Code auto-discovers project instructions only at **`./CLAUDE.md`** or **`./.claude/CLAUDE.md`** in the project root. It does not search `config/`. So the repository keeps a one-line root pointer:

```
CLAUDE.md                          →  @config/ai/claude/CLAUDE.md
config/ai/claude/CLAUDE.md         →  @../agents/instructions.md  (+ Claude notes)
config/ai/agents/instructions.md      (canonical rules)
```

`@path` imports resolve relative to the file that contains them. Don't delete or rename the root `CLAUDE.md`, or Claude Code will start without project instructions. Run `/memory` in Claude Code to see which files are loaded.

## Limitations

- **Project settings can't move.** Claude Code reads `settings.json`, `settings.local.json`, `commands/`, `agents/`, and `skills/` only from `./.claude/` at the project root. If you add any of them, create `./.claude/` for that purpose. `.claude/settings.local.json` (personal) is git-ignored.
- **Other tools** (Codex, Cursor, Copilot, …) look for their own files, such as a root `AGENTS.md`. To support one, add a pointer file in the location that tool expects, referencing `config/ai/agents/instructions.md`, rather than copying the rules.
