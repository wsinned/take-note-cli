# take-note-cli TypeScript Implementation Plan

## Current Status

### Completed ✅
- Weekly notes creation
- Template variable replacement (`HEADER_DATE`)
- Editor handlers (Obsidian, VSCode, generic)
- `--when` flag (lastWeek, thisWeek, nextWeek)
- Folder structure creation (YYYY/MM/)
- File naming convention (`YYYY-MM-DD-Weekly-log.md`)

### Partially Implemented ⚠️
- Batch creation (flag exists but not implemented)
- Config file support (folder exists but not implemented)

### Not Started ❌
- Daily notes
- `--no-open` flag (headless mode)
- VSCode workspace option

---

## Implementation Roadmap

### Phase 1: Headless Mode (Priority 1)
**Goal:** Enable automated/headless usage without opening editors

#### New Flag: `--no-open`
```typescript
noOpen: {
    brief: "Create the file without opening it in an editor",
    kind: "boolean",
    optional: true,
    default: false,
}
```

#### Changes Required:
1. **Update `weekly/impl.ts`:**
   - Check `flags.noOpen` before calling editor handler
   - If true, skip `handler(filePath)` and just print path/success message
   
2. **Output Format:**
   - When `--no-open`: Print JSON or simple text with file path
   - Suggested output:
     ```json
     {
       "created": true,
       "path": "/home/user/Documents/Personal/Weekly/2026/02/2026-02-16-Weekly-log.md",
       "date": "2026-02-16"
     }
     ```

3. **Use Cases:**
   - Cron jobs
   - Automation scripts
   - CI/CD pipelines
   - Programmatic note creation

---

### Phase 2: Daily Notes (Priority 2)
**Goal:** Support daily note creation with similar features to weekly

#### Command Structure:
```bash
take-note daily --when today|yesterday|tomorrow \
  --notesFolder ~/Notes \
  [--template daily-template.md] \
  [--no-open] \
  [--editor obsidian|vscode|generic]
```

#### Implementation:
1. **Create `commands/dailyCommand/command.ts`:**
   ```typescript
   export const dailyCommand = buildCommand({
       loader: () => import("./impl.ts"),
       parameters: {
           flags: {
               when: {
                   brief: "Which day's note to open",
                   kind: "enum",
                   values: ["yesterday", "today", "tomorrow"] as const,
               },
               notesFolder: {
                   brief: "The root folder containing your notes",
                   kind: "parsed",
                   parse: String,
               },
               editor: {
                   brief: "Which editor configuration to use",
                   kind: "enum",
                   values: ["obsidian", "vscode", "generic"] as const,
                   optional: true,
                   default: "generic",
               },
               template: {
                   brief: "The template file to use when creating new daily notes",
                   kind: "parsed",
                   parse: String,
                   optional: true,
               },
               noOpen: {
                   brief: "Create the file without opening it in an editor",
                   kind: "boolean",
                   optional: true,
                   default: false,
               },
           },
       },
       docs: {
           brief: "Open a file for the given day's note, creating it first if it doesn't exist",
       },
   });
   ```

2. **Create `commands/dailyCommand/impl.ts`:**
   - Similar structure to weekly implementation
   - Different date calculation (single day vs Monday of week)
   - File naming: `YYYY-MM-DD.md` (simpler than weekly)
   - Folder structure: `YYYY/MM/` (same as weekly)
   - Template variable: `HEADER_DATE` → formatted as "Monday 16 February 2026"

3. **Update `options/whenOptions.ts`:**
   - Add daily when options: `yesterday`, `today`, `tomorrow`
   - Separate enum or union type for daily vs weekly

4. **Update `helpers/date-helper.ts`:**
   - Add `dateFromDailyWhen(baseDate: Date, when: DailyWhen): Date`
   - Add `dailyNameFromDate(date: Date): [string, string]`
     - Returns `["2026/02", "2026-02-16.md"]`

---

### Phase 3: Batch Creation (Priority 3)
**Goal:** Create multiple weekly/daily notes ahead of time

#### Current Flag (already exists):
```typescript
batch: {
    brief: "The number of files to create, e.g. 3 will create the file for the selected when option and the following 2 weeks",
    kind: "parsed",
    parse: Number,
    optional: true,
}
```

#### Implementation:
1. **Weekly batch:**
   - `--when thisWeek --batch 3` creates this week + next 2 weeks
   - Loop through date range and create files
   - Template variable replacement for each file
   - Skip files that already exist

2. **Daily batch:**
   - `--when today --batch 7` creates today + next 6 days
   - Useful for weekly planning

3. **Output with batch:**
   ```json
   {
     "created": [
       { "path": "...", "date": "2026-02-16", "existed": false },
       { "path": "...", "date": "2026-02-23", "existed": false },
       { "path": "...", "date": "2026-03-02", "existed": true }
     ]
   }
   ```

4. **Batch + --no-open:**
   - When batch > 1, `--no-open` is implicitly true
   - Opening 5+ editors would be chaos
   - Print summary of created files

---

### Phase 4: Config File Support (Priority 4)
**Goal:** Reduce repetitive flags with a config file

#### Config Location:
```
~/.config/TakeNote/config.yaml
```

#### Config Schema:
```yaml
# Default notes folder
notesFolder: Documents/Personal/Weekly

# Default editor (obsidian|vscode|generic)
editor: obsidian

# Weekly note settings
weekly:
  template: Templates/Home-weekly-log-template.md
  suffix: Weekly-log  # Results in YYYY-MM-DD-Weekly-log.md
  
# Daily note settings  
daily:
  template: Templates/Home-daily-log-template.md
  # No suffix - just YYYY-MM-DD.md

# Batch default
batch: 1

# Headless mode default
noOpen: false

# VSCode specific (future)
workspace: ~/Projects/notes.code-workspace
```

#### Implementation:
1. **Create `commands/configCommand/`:**
   - `config get <key>` - print current value
   - `config set <key> <value>` - update value
   - `config list` - print entire config
   - `config path` - print config file location

2. **Config Loading:**
   - Check `~/.config/TakeNote/config.yaml`
   - Merge with command-line flags (CLI flags override config)
   - Use defaults if neither exists

3. **Config Validation:**
   - Validate paths exist
   - Validate editor values
   - Validate template paths (relative to notesFolder)

4. **Helper Module:**
   ```typescript
   // helpers/config-helper.ts
   interface Config {
     notesFolder: string;
     editor: Editor;
     weekly: {
       template?: string;
       suffix: string;
     };
     daily: {
       template?: string;
     };
     batch: number;
     noOpen: boolean;
     workspace?: string;
   }
   
   export async function loadConfig(): Promise<Config>
   export async function mergeWithFlags(config: Config, flags: any): Promise<Config>
   ```

---

### Phase 5: Append Mode (Priority 5)
**Goal:** Append text to the current day's section without opening the editor

#### New Flag: `--append`
```typescript
append: {
    brief: "Append text to the current day's section instead of opening the editor",
    kind: "parsed",
    parse: String,
    optional: true,
}
```

#### Behavior:
1. **Weekly Notes:**
   - Calculate which day of week it is (Monday-Sunday)
   - Find the `## Monday`, `## Tuesday`, etc. section
   - Append text to that section
   - If section doesn't exist, create it
   
2. **Daily Notes:**
   - Simply append to end of file
   - No section parsing needed

3. **Implied `--no-open`:**
   - When `--append` is used, `--no-open` is automatically true
   - Print confirmation of what was appended where

#### Implementation:

**1. Update command flags:**
```typescript
// commands/weeklyCommand/command.ts
append: {
    brief: "Append text to the current day's section instead of opening the editor",
    kind: "parsed",
    parse: String,
    optional: true,
}
```

**2. Create append helper:**
```typescript
// helpers/append-helper.ts
export interface AppendResult {
  success: boolean;
  filePath: string;
  section: string; // e.g., "Monday" or "daily"
  text: string;
}

export async function appendToWeeklyNote(
  filePath: string,
  dayOfWeek: string, // "Monday", "Tuesday", etc.
  text: string
): Promise<AppendResult> {
  // 1. Read file
  const content = await Deno.readTextFile(filePath);
  
  // 2. Find the section for today
  const sectionHeader = `## ${dayOfWeek}`;
  const lines = content.split('\n');
  
  // 3. Find where to insert
  let insertIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(sectionHeader)) {
      // Found the section - now find the next ## or end of file
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].startsWith('## ')) {
          // Next section found - insert before it
          insertIndex = j;
          break;
        }
      }
      if (insertIndex === -1) {
        // No next section - append to end
        insertIndex = lines.length;
      }
      break;
    }
  }
  
  // 4. If section not found, append it before next section
  if (insertIndex === -1) {
    // Section doesn't exist - create it
    // Find where to insert the new section (maintain day order)
    insertIndex = findSectionInsertPoint(lines, dayOfWeek);
    lines.splice(insertIndex, 0, `## ${dayOfWeek}`, '', text, '');
  } else {
    // Insert text into existing section
    // Add a blank line before if there's content
    const previousLine = lines[insertIndex - 1];
    if (previousLine.trim() !== '') {
      lines.splice(insertIndex, 0, '', text);
    } else {
      lines.splice(insertIndex, 0, text);
    }
  }
  
  // 5. Write back
  const newContent = lines.join('\n');
  await Deno.writeTextFile(filePath, newContent);
  
  return {
    success: true,
    filePath,
    section: dayOfWeek,
    text
  };
}

export async function appendToDailyNote(
  filePath: string,
  text: string
): Promise<AppendResult> {
  // Daily notes are simpler - just append
  const content = await Deno.readTextFile(filePath);
  const newContent = content.trim() + '\n\n' + text + '\n';
  await Deno.writeTextFile(filePath, newContent);
  
  return {
    success: true,
    filePath,
    section: "daily",
    text
  };
}

function findSectionInsertPoint(lines: string[], dayOfWeek: string): number {
  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const targetIndex = dayOrder.indexOf(dayOfWeek);
  
  // Find the last day before this one that exists, or insert at end
  for (let i = targetIndex - 1; i >= 0; i--) {
    const previousDay = dayOrder[i];
    const sectionIndex = lines.findIndex(line => line === `## ${previousDay}`);
    if (sectionIndex !== -1) {
      // Find the end of that section
      for (let j = sectionIndex + 1; j < lines.length; j++) {
        if (lines[j].startsWith('## ')) {
          return j;
        }
      }
      return lines.length;
    }
  }
  
  // No previous day found - insert after header
  return lines.findIndex(line => line.startsWith('# ')) + 2;
}
```

**3. Update weekly impl.ts:**
```typescript
// commands/weeklyCommand/impl.ts
export default async function (this: LocalContext, flags: WeeklyCommandFlags): Promise<void> {
    const when: When = whenFromString(flags.when)
    const editor: Editor = editorFromString(flags.editor)
    const date = dateFromWhen(new Date, when)
    const SUFFIX = 'Weekly-log'
    const FILE_EXT = 'md'
    const [pathPart, fileName] = namefromDate(date, SUFFIX, FILE_EXT)
    const fullPath = path.join(flags.notesFolder, pathPart)

    await Deno.mkdir(fullPath, { recursive: true })
    const filePath = path.join(fullPath, fileName)
    const validFile = await exists(filePath)
    
    if (!validFile) {
        let content = await getTemplateContent(flags.notesFolder, flags.template)
        content = updateTemplateVariables(content, dateForHeader(date))
        await Deno.writeTextFileSync(filePath, content)
    }

    // NEW: Handle append mode
    if (flags.append) {
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const result = await appendToWeeklyNote(filePath, dayOfWeek, flags.append);
        
        console.log(JSON.stringify({
            appended: true,
            path: result.filePath,
            section: result.section,
            text: result.text
        }, null, 2));
        return; // Exit without opening editor
    }

    // Existing: Handle no-open mode
    if (flags.noOpen) {
        console.log(JSON.stringify({
            created: !validFile,
            path: filePath,
            date: date.toISOString().split('T')[0]
        }, null, 2));
        return;
    }

    // Existing: Open in editor
    console.log(`Opening ${filePath}`)
    const handler = getEditorHandler(editor)
    handler(filePath)
}
```

**4. Similar changes for daily command:**
```typescript
// commands/dailyCommand/impl.ts
if (flags.append) {
    const result = await appendToDailyNote(filePath, flags.append);
    console.log(JSON.stringify(result, null, 2));
    return;
}
```

#### Example Usage:

**Weekly note append:**
```bash
# Append to today's section in this week's log
take-note weekly --when thisWeek --append "Fixed podcast rate limiting issue"

# Output:
{
  "appended": true,
  "path": "/home/user/Weekly/2026/02/2026-02-16-Weekly-log.md",
  "section": "Sunday",
  "text": "Fixed podcast rate limiting issue"
}
```

**Daily note append:**
```bash
# Append to today's daily note
take-note daily --when today --append "Meeting with Marie at 3pm"

# Output:
{
  "appended": true,
  "path": "/home/user/Daily/2026/02/2026-02-22.md",
  "section": "daily",
  "text": "Meeting with Marie at 3pm"
}
```

**Integration with automation:**
```bash
# From Clawd when updating logs
take-note weekly --when thisWeek --append "Podcast processing: 3 stubs + 3 fills (27/63 total)"
```

#### Edge Cases:

1. **File doesn't exist:**
   - Create from template first
   - Then append to appropriate section
   
2. **Section doesn't exist (weekly):**
   - Create section in correct day order
   - Monday before Tuesday, etc.
   
3. **Multiple appends:**
   - Each append adds to same section
   - Separated by blank line
   
4. **Template variables:**
   - If creating new file, `HEADER_DATE` still replaced
   - Then append happens after template expansion

#### Testing:

```typescript
// append-helper_test.ts
Deno.test("appendToWeeklyNote - existing section", async () => {
  const content = `# Weekly Log - W/C 2026-02-16

## Monday
Existing content

## Tuesday
`;
  // Write temp file, append to Monday, verify insertion
});

Deno.test("appendToWeeklyNote - new section", async () => {
  const content = `# Weekly Log - W/C 2026-02-16

## Monday

## Wednesday
`;
  // Append to Tuesday (doesn't exist yet)
  // Verify Tuesday created between Monday and Wednesday
});
```

#### Benefits:

1. **Eliminates manual section finding:** No need to read file, find section, edit
2. **Date accuracy:** System knows which day section to update
3. **Automation friendly:** Perfect for cron jobs / background updates
4. **No editor overhead:** Fast, scriptable, headless
5. **Preserves structure:** Maintains day ordering, doesn't mess up formatting

---

### Phase 6: VSCode Workspace Option (Priority 6)
**Goal:** Open files within a specific VSCode workspace

#### New Flag:
```typescript
workspace: {
    brief: "VSCode workspace file to open along with the note",
    kind: "parsed",
    parse: String,
    optional: true,
}
```

#### Implementation:
1. **Update `buildVSCodeHandler.ts`:**
   ```typescript
   export function buildVSCodeHandler(workspace?: string) {
     return (filePath: string) => {
       if (workspace) {
         // code --add <workspace> <filePath>
         new Deno.Command("code", {
           args: ["--add", workspace, filePath],
         }).spawn();
       } else {
         // code <filePath>
         new Deno.Command("code", {
           args: [filePath],
         }).spawn();
       }
     };
   }
   ```

2. **Update handler signature:**
   - Handlers currently take `(filePath: string) => void`
   - May need to pass workspace context through

---

## Additional Enhancements

### Template Variables
Expand beyond `HEADER_DATE`:

```typescript
// Current
HEADER_DATE → "Monday 16 February 2026"

// Proposed additions
CURRENT_DATE → "2026-02-16"
CURRENT_DAY → "Monday"
CURRENT_MONTH → "February"
CURRENT_YEAR → "2026"
WEEK_NUMBER → "07"
ISO_DATE → "2026-02-16T00:00:00.000Z"
```

### Output Modes
Add `--format` flag:

```typescript
format: {
    brief: "Output format for --no-open mode",
    kind: "enum",
    values: ["json", "text", "silent"] as const,
    optional: true,
    default: "text",
}
```

**Examples:**
```bash
# JSON (for scripts)
$ take-note weekly --when thisWeek --no-open --format json
{"created":true,"path":"...","date":"2026-02-16"}

# Text (human readable)
$ take-note weekly --when thisWeek --no-open --format text
Created: /home/user/Weekly/2026/02/2026-02-16-Weekly-log.md

# Silent (exit code only, for cron)
$ take-note weekly --when thisWeek --no-open --format silent
$ echo $?
0
```

### Error Handling
Improve error messages:

- Template not found → suggest available templates
- Notes folder doesn't exist → offer to create it
- Permission errors → clear actionable message
- Invalid dates → explain expected format

---

## Testing Strategy

### Unit Tests
- Date calculations (weekly/daily when logic)
- Template variable replacement
- Config merging (flags override config)
- Path construction (YYYY/MM/filename)

### Integration Tests
- File creation (weekly/daily)
- Template usage
- Batch creation
- Config file loading
- Editor handler invocation (mocked)

### E2E Tests
- Full workflow: config → create → verify file exists
- Batch creation with existing files
- Template variable replacement in actual files

---

## Migration Path from Python Version

### Compatibility Considerations
1. **File naming:** Keep same convention (`YYYY-MM-DD-Weekly-log.md`)
2. **Folder structure:** Keep same (`YYYY/MM/`)
3. **Template format:** Keep same variable syntax
4. **Config location:** Use same path as Python version

### Breaking Changes
None planned - full backward compatibility.

### Deprecation Timeline
1. TypeScript version reaches feature parity
2. Add deprecation notice to Python README
3. Maintain Python version for 6 months
4. Archive Python version, point to TypeScript

---

## Priority Implementation Order

1. **Phase 1: Headless Mode** (1-2 days)
   - Critical for automation/cron use cases
   - Minimal changes to existing code
   
2. **Phase 2: Daily Notes** (2-3 days)
   - High user value
   - Reuses existing patterns
   
3. **Phase 3: Batch Creation** (1-2 days)
   - Flag already exists
   - Straightforward loop logic
   
4. **Phase 4: Config File** (2-3 days)
   - Quality of life improvement
   - Python version already has this
   
5. **Phase 5: Append Mode** (2-3 days)
   - Eliminates repetitive editing work
   - Essential for automation workflows
   - More complex than other phases (section parsing)
   
6. **Phase 6: VSCode Workspace** (1 day)
   - Nice-to-have
   - Low priority

**Total estimated time:** 9-14 days

---

## Example Usage After Full Implementation

### Daily workflow
```bash
# Morning: Create today's note (with config defaults)
take-note daily --when today

# Automated: Create without opening
take-note daily --when today --no-open

# Quick append: Add to today's note without opening
take-note daily --when today --append "Dentist appointment at 2pm"

# Batch: Plan ahead for the week
take-note daily --when today --batch 7
```

### Weekly workflow
```bash
# Start of week: Create weekly note
take-note weekly --when thisWeek

# Append to current day: Add entry without opening file
take-note weekly --when thisWeek --append "Podcast processing: 27/63 complete"

# Automated: Cron creates next week's note on Fridays
take-note weekly --when nextWeek --no-open --format silent
```

### Automation workflow (from Clawd)
```bash
# When podcast cron completes:
take-note weekly --when thisWeek --append "Podcast cron: 3 stubs + 3 fills (27/63 total)"

# When fixing bugs:
take-note weekly --when thisWeek --append "Fixed Brave Search API rate limiting (1.5s delays)"

# When downloading files:
take-note weekly --when thisWeek --append "Downloaded ASMR meditation audio (478MB)"
```

### Config-driven workflow
```bash
# First time setup
take-note config set notesFolder ~/Documents/Personal/Weekly
take-note config set editor obsidian
take-note config set weekly.template Templates/Home-weekly-log-template.md

# Then just:
take-note weekly --when thisWeek  # Uses all config defaults
take-note weekly --when thisWeek --append "Quick note"  # Also uses config
```

---

## Open Questions

1. **Daily note folder structure:**
   - Same as weekly (`YYYY/MM/`)? ✓ (consistent)
   - Or separate (`Daily/YYYY/MM/`)? (organized)
   - Or flat (`Daily/`)? (simple)
   
2. **Batch behavior with templates:**
   - Same template for all batch files? ✓ (simple)
   - Or parameterized templates per file? (complex)
   
3. **Config file format:**
   - YAML (Python version uses this) ✓
   - JSON (native to JS/TS)
   - TOML (trendy)
   
4. **Editor detection:**
   - Auto-detect installed editors? (magic)
   - Or require explicit flag/config? ✓ (explicit better)

---

## Success Criteria

- [ ] Feature parity with Python version
- [ ] Daily notes fully functional
- [ ] Headless mode (`--no-open`) works
- [ ] Config file support matches Python version
- [ ] All tests passing (>90% coverage)
- [ ] Documentation updated
- [ ] Migration guide for Python users
- [ ] Zero breaking changes from Python version

