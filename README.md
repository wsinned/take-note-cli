# take-note-cli

A Deno/TypeScript CLI for creating and managing weekly (and daily) markdown notes, designed for distribution as a standalone binary.

## Installation

### Recommended: eget (Linux/macOS)

[eget](https://github.com/zyedidia/eget) installs pre-built binaries directly from GitHub releases.

```bash
# Install take-note (Linux x86_64)
eget wsinned/take-note-cli --asset take-note_linux_x86_64 --to ~/.local/bin/take-note

# macOS Apple Silicon
eget wsinned/take-note-cli --asset take-note_darwin_aarch64 --to ~/.local/bin/take-note

# macOS Intel
eget wsinned/take-note-cli --asset take-note_darwin_x86_64 --to ~/.local/bin/take-note
```

To upgrade later, run the same command again.

> Install eget itself: see [zyedidia/eget](https://github.com/zyedidia/eget)

### Manual download

Download the appropriate binary for your platform from the [releases page](https://github.com/wsinned/take-note-cli/releases):

| Platform | Asset |
|----------|-------|
| Linux x86_64 | `take-note_linux_x86_64` |
| Linux arm64 (e.g. Raspberry Pi) | `take-note_linux_aarch64` |
| macOS Intel | `take-note_darwin_x86_64` |
| macOS Apple Silicon | `take-note_darwin_aarch64` |
| Windows x86_64 | `take-note_windows_x86_64.exe` |

Make the binary executable and move it to your PATH:
```bash
chmod +x take-note_linux_x86_64
mv take-note_linux_x86_64 ~/.local/bin/take-note
```

### From source (requires Deno)

```bash
git clone https://github.com/wsinned/take-note-cli.git
cd take-note-cli
deno task build
mv output/take-note ~/.local/bin/take-note
```

---

## Configuration

take-note reads from `~/.config/take-note/config.toml` if it exists. CLI flags always override config values.

```toml
[default]
notesFolder = "~/Documents/Notes/Weekly"
editor = "obsidian"           # obsidian | vscode | generic
template = "Templates/weekly-template.md"
batch = 1
```

### Named configs

Use multiple configs for different contexts (e.g. work vs personal):

```toml
[default]
notesFolder = "~/Documents/Personal/Weekly"
editor = "obsidian"

[work]
notesFolder = "~/Documents/Work/Weekly"
editor = "vscode"
batch = 2
```

Select a named config with `--config work`.

---

## Usage

```
take-note weekly [OPTIONS]
take-note daily [OPTIONS]
take-note --help
take-note --version
```

### Weekly notes

Open (or create) this week's note:
```bash
take-note weekly --when thisWeek
```

With a specific config profile:
```bash
take-note weekly --when thisWeek --config work
```

Override a config value for one invocation:
```bash
take-note weekly --when thisWeek --editor vscode
```

### `--when` options

| Value | Description |
|-------|-------------|
| `lastWeek` | Monday of last week |
| `thisWeek` | Monday of the current week |
| `nextWeek` | Monday of next week |

### Daily notes

Open (or create) today's note:
```bash
take-note daily --when today
```

### `--when` options (daily)

| Value | Description |
|-------|-------------|
| `yesterday` | Yesterday's date |
| `today` | Today's date |
| `tomorrow` | Tomorrow's date |

### Templates

Supply a template path relative to `notesFolder`. The placeholder `HEADER_DATE` is replaced with the note date formatted as `Monday 28 July 2025`.

```bash
take-note weekly --when thisWeek --template Templates/weekly-template.md
```

A template containing `# W/C HEADER_DATE` produces:
```markdown
# W/C Monday 28 July 2025
```

### Headless / automation mode

The `--noOpen` flag creates the file without opening an editor. Ideal for cron jobs and scripting.

```bash
# Text output (default)
take-note weekly --when thisWeek --noOpen
# Created: /home/user/Notes/2026/02/2026-02-16-Weekly-log.md

# JSON output (for scripts)
take-note weekly --when thisWeek --noOpen --format json

# Silent (exit code only, for cron)
take-note weekly --when thisWeek --noOpen --format silent
```

---

## Development

### Requirements

- [Deno](https://deno.land) v2.x

### Tasks

```bash
deno task start      # Run with default test options
deno task test       # Run all tests
deno task build      # Compile binary to output/take-note
```

### Project structure

```
take-note.ts                  # Entry point
commands/
  weeklyCommand/              # Weekly notes command
helpers/
  config-helper.ts            # TOML config loading & merging
  date-helper.ts              # Date calculations
  output-helper.ts            # Formatted output
  updateTemplateVariables.ts  # Template variable replacement
handlers/
  buildObsidianHandler.ts     # Obsidian editor integration
  buildVSCodeHandler.ts       # VSCode editor integration
  buildGenericHandler.ts      # Generic editor (uses $EDITOR)
options/
  whenOptions.ts              # --when flag parsing
  editorOptions.ts            # --editor flag parsing
```

---

## Roadmap

- [x] Weekly notes
- [x] Headless mode (`--noOpen`, `--format`)
- [x] Config file (`~/.config/take-note/config.toml`)
- [x] Named configs (`--config work`)
- [x] Binary distribution via GitHub releases
- [x] Daily notes
- [x] Batch creation (`--batch N`)
- [ ] Append mode (`--append "text"`)
- [ ] `take-note init` setup wizard
