# Project Context: take-note-cli

Current project state and key decisions for continuity between sessions.

## Current Status (April 2025)

- **Version:** 1.3.5
- **Deno/TypeScript CLI** for weekly/daily markdown notes
- **Binary distribution** via GitHub releases (Linux, macOS, Windows)

## Completed Features

### ✅ Weekly Notes
- Create weekly notes with `--when lastWeek|thisWeek|nextWeek`
- Template variable `HEADER_DATE` → "Monday 6 April 2026"
- Editor handlers: Obsidian, VSCode, generic

### ✅ Daily Notes
- Create daily notes with `--when yesterday|today|tomorrow`
- Same folder structure as weekly (`YYYY/MM/`)

### ✅ Headless Mode (`--noOpen`, `--format`)
- `--noOpen` creates files without opening editor
- `--format json|text|silent` for automation
- JSON output: `{ created: true, path: "...", date: "2026-04-06" }`

### ✅ Config File Support
- Location: `~/.config/take-note/config.toml`
- Named configs: `[default]`, `[work]`, etc.
- CLI flags override config values
- Config helper with TOML parsing

### ✅ Batch Creation (NEW in v1.3.x)
- `--batch N` creates N files forward from selected date
- Range: 1-8 files per command
- Only opens first file in editor (when not `--noOpen`)
- JSON output returns array of results
- Idempotent: re-running marks existing files as "found", not "created"

## Architecture Decisions

### Testing
- **Test directory:** Use `/tmp` path (not project dir) for devcontainer compatibility
- **Template logging:** `console.error` not `console.log` — keeps stdout clean for JSON
- **All 44 tests passing:** 35 original + 9 updated + 7 new batch tests

### Date Handling
- Weeks start on Monday (`weekStartsOn: 1`)
- Batch creates files N weeks apart (7-day intervals)
- Path format: `YYYY/MM/YYYY-MM-DD-Weekly-log.md`

### Output Helper
- `formatOutput()` accepts `FileResult | FileResult[]`
- Always returns arrays in JSON mode (even for single results)
- Text mode joins multiple results with newlines

## Project Structure

```
take-note.ts              # Entry point
commands/
  weeklyCommand/          # Weekly notes (with batch support)
  dailyCommand/           # Daily notes
helpers/
  config-helper.ts        # TOML config loading
  date-helper.ts          # Date calc + getBatchDates()
  output-helper.ts        # Format output for --noOpen
  getTemplateContent.ts   # Template loading (logs to stderr)
  updateTemplateVariables.ts  # HEADER_DATE replacement
handlers/                 # Editor integrations
options/                  # Flag parsing (when, editor)
```

## Remaining Roadmap (from IMPLEMENTATION_PLAN.md)

- [ ] **Append mode** (`--append "text"`) — add to current day's section without opening
- [ ] `take-note init` setup wizard
- [ ] VSCode workspace option
- [ ] Additional template variables (WEEK_NUMBER, CURRENT_DAY, etc.)

## Key Files to Read on Entry

When working on this project, read:
1. This file (PROJECT_CONTEXT.md) — current state
2. IMPLEMENTATION_PLAN.md — full roadmap and architecture
3. README.md — user-facing documentation

## Build & Release

```bash
# Build binary
deno task build

# Run tests
deno task test

# Install locally
cp output/take-note ~/.local/bin/

# GitHub Actions builds multi-platform releases automatically
# Tag format: v1.x.x
```

## Critical Notes

- **Batch size limits:** 1 (min) and 8 (max)
- **Batch config from file:** Fixed stricli default overriding config value (v1.3.4)
- **Exit code 1** for batch validation errors
- **Template paths:** Relative to `notesFolder` (e.g., `"Templates/weekly.md"`)
- **Subprocess tests:** Use absolute paths for `--notesFolder` to avoid resolution issues
- **Deno cache warming:** First test warms cache to prevent stderr pollution

---

*Last updated: 2026-05-06 after v1.3.5 release*
