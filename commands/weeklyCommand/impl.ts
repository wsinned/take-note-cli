
import path from "node:path";
import type { LocalContext } from "../../context.ts";
import { dateFromWhen, namefromDate } from "../../helpers/date-helper.ts";
import { exists } from "@std/fs/exists";
import { When, whenFromString } from "../../options/whenOptions.ts";

interface WeeklyCommandFlags {
    when: string,
    notesFolder: string
}

export default async function(this: LocalContext, flags: WeeklyCommandFlags): Promise<void> {
    const when:When = whenFromString(flags.when)
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
    const subprocess = new Deno.Command(Deno.execPath(), { args: ['vi', filePath] })
    await subprocess.output()
}
