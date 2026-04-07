import path from "node:path";
import type { LocalContext } from "../../context.ts";
import { dateForHeader, dateFromWhen, namefromDate, getBatchDates } from "../../helpers/date-helper.ts";
import { exists } from "@std/fs/exists";
import { When, whenFromString } from "../../options/whenOptions.ts";
import { Editor, editorFromString } from "../../options/editorOptions.ts";
import { getEditorHandler } from "../../handlers/getEditorHandler.ts";
import { getTemplateContent } from "../../helpers/getTemplateContent.ts";
import { updateTemplateVariables } from "../../helpers/updateTemplateVariables.ts";
import { formatOutput, type OutputFormat, type FileResult } from "../../helpers/output-helper.ts";
import { loadConfig, mergeWithFlags } from "../../helpers/config-helper.ts";

interface WeeklyCommandFlags {
    config?: string;
    when: "lastWeek" | "thisWeek" | "nextWeek";
    notesFolder?: string;
    editor?: "obsidian" | "vscode" | "generic";
    template?: string;
    batch: number;
    noOpen?: boolean;
    format?: "json" | "text" | "silent";
}

export default async function (this: LocalContext, flags: WeeklyCommandFlags): Promise<void> {
    const cfg = await loadConfig(flags.config ?? "default");
    const merged = mergeWithFlags(cfg, flags);

    if (!merged.notesFolder) {
        console.error("Error: notesFolder is required. Set it in ~/.config/take-note/config.toml or pass --notesFolder.");
        Deno.exit(1);
    }

    // Validate batch size
    const batchSize = merged.batch ?? flags.batch ?? 1;
    if (batchSize < 1 || batchSize > 8) {
        console.error("Error: batch size must be between 1 and 8");
        Deno.exit(1);
    }

    const when: When = whenFromString(merged.when ?? flags.when)
    const startDate = dateFromWhen(new Date, when)
    const dates = getBatchDates(startDate, batchSize);
    const SUFFIX = 'Weekly-log'
    const FILE_EXT = 'md'

    const results: FileResult[] = [];

    for (const date of dates) {
        const [pathPart, fileName] = namefromDate(date, SUFFIX, FILE_EXT)
        const fullPath = path.join(merged.notesFolder!, pathPart)

        await Deno.mkdir(fullPath, { recursive: true })
        const filePath = path.join(fullPath, fileName)
        const fileExists = await exists(filePath)
        
        if (!fileExists) {
            let content = await getTemplateContent(merged.notesFolder!, merged.template)
            content = updateTemplateVariables(content, dateForHeader(date))
            await Deno.writeTextFile(filePath, content)
        }

        results.push({
            created: !fileExists,
            path: filePath,
            date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        });
    }

    // Handle no-open mode
    if (merged.noOpen) {
        const format = (merged.format || "text") as OutputFormat;
        const output = format.length === 1 
            ? formatOutput(results[0], format)
            : formatOutput(results, format);
        if (output) {
            console.log(output);
        }
        return;
    }

    // Default: open only the first file in editor
    const editorStr = merged.editor ?? "generic";
    const editor: Editor = editorFromString(editorStr);
    const firstFile = results[0].path;
    console.log(`Opening ${firstFile} with ${editorStr}`)
    const handler = getEditorHandler(editor)
    handler(firstFile)
}
