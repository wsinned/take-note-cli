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
    batch: number; // No longer optional, now has a default
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

    const MAX_BATCH_SIZE = 8;
    if (merged.batch < 1 || merged.batch > MAX_BATCH_SIZE) {
        console.error(`Error: batch size must be between 1 and ${MAX_BATCH_SIZE}.`);
        Deno.exit(1);
    }

    const when: When = whenFromString(merged.when ?? flags.when);
    const initialDate = dateFromWhen(new Date(), when);
    const datesToProcess = getBatchDates(initialDate, merged.batch);

    const SUFFIX = 'Weekly-log';
    const FILE_EXT = 'md';
    
    const results: FileResult[] = [];
    let firstFilePath: string | undefined;

    for (const date of datesToProcess) {
        const [pathPart, fileName] = namefromDate(date, SUFFIX, FILE_EXT);
        const fullPath = path.join(merged.notesFolder, pathPart);

        await Deno.mkdir(fullPath, { recursive: true });
        const filePath = path.join(fullPath, fileName);
        const fileExists = await exists(filePath);

        if (!fileExists) {
            let content = await getTemplateContent(merged.notesFolder!, merged.template);
            content = updateTemplateVariables(content, dateForHeader(date));
            Deno.writeTextFileSync(filePath, content);
        }

        results.push({
            created: !fileExists,
            path: filePath,
            date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        });

        if (!firstFilePath) { // Capture the first file path for opening later
            firstFilePath = filePath;
        }
    }

    if (merged.noOpen) {
        const format = (merged.format || "text") as OutputFormat;
        const output = formatOutput(results, format); 
        if (output) {
            console.log(output);
        }
        return;
    }

    // Default: open in editor (only the first file of the batch)
    if (firstFilePath) {
        const editorStr = merged.editor ?? "generic";
        const editor: Editor = editorFromString(editorStr);
        console.log(`Opening ${firstFilePath} with ${editorStr}`);
        const handler = getEditorHandler(editor);
        handler(firstFilePath);
    }
}
