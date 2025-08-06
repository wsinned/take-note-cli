import path from "node:path";
import type { LocalContext } from "../../context.ts";
import { dateForHeader, dateFromWhen, namefromDate } from "../../helpers/date-helper.ts";
import { exists } from "@std/fs/exists";
import { When, whenFromString } from "../../options/whenOptions.ts";
import { Editor, editorFromString } from "../../options/editorOptions.ts";
import { getEditorHandler } from "../../handlers/getEditorHandler.ts";
import { getTemplateContent } from "../../helpers/getTemplateContent.ts";
import { updateTemplateVariables } from "../../helpers/updateTemplateVariables.ts";

interface WeeklyCommandFlags {
    when: string,
    notesFolder: string,
    editor: string,
    template: string
}

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
        Deno.writeTextFileSync(filePath, content)
    }

    console.log(`Opening ${filePath}`)
    const handler = getEditorHandler(editor)
    handler(filePath)
}

