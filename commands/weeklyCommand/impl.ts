import path from "node:path";
import type { LocalContext } from "../../context.ts";
import { dateFromWhen, namefromDate } from "../../helpers/date-helper.ts";
import { exists } from "@std/fs/exists";
import { When, whenFromString } from "../../options/whenOptions.ts";
import { Editor, editorFromString } from "../../options/editorOptions.ts";

interface WeeklyCommandFlags {
    when: string,
    notesFolder: string,
    editor: string
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
        console.log(`Creating ${filePath}`)
        Deno.writeTextFileSync(filePath, "")
    }

    console.log(`Opening ${filePath}`)
    const handler = getEditorHandler(editor)
    handler(filePath)
}

function getEditorHandler(editor: Editor) {
    switch (editor) {
        case Editor.generic:
            return buildGenericHandler()
        case Editor.vscode:
            return buildVSCodeHandler()
        case Editor.obsidian:
            return buildObsidianHandler()
    }
}

function buildGenericHandler() {
    const selectedEditor = Deno.env.get("EDITOR") ?? "vi"
    return (filePath: string) => {
        const subprocess = new Deno.Command(selectedEditor, { args: [filePath] })
        subprocess.spawn()
    }
}

function buildObsidianHandler() {
    const selectedEditor = getOpenCommand()
    return (filePath: string) => {
        const command = `obsidian://open?path=${filePath}`
        const url = new URL(command)
        const subprocess = new Deno.Command(selectedEditor, { args: [url.toString()] })
        subprocess.spawn()
    }
}

function buildVSCodeHandler() {
    const selectedEditor = "code"
    return (filePath: string) => {
        const subprocess = new Deno.Command(selectedEditor, { args: [filePath] })
        subprocess.spawn()
    }
}

function getOpenCommand() {
    const { os } = Deno.build
    let app

    switch (os) {
        case "windows":
            app = "start"
            break
        case "darwin":
            app = "open"
            break
        default:
            // assuming xdg-open is available on all *nix
            app = "xdg-open"
    }
    return app
}