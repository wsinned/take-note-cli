import { parseArgs } from "@std/cli/parse-args";
import { exists } from "@std/fs/exists";
import path from "node:path"

import { buildOptions } from "./options/optionsBuilder.ts";
import { option } from "./options/option.ts";
import { arguments } from "./options/arguments.ts";

import optionsData from "./options/options.json" with { type: "json" };
import meta from "./deno.json" with { type: "json" };
import { printUsage } from "./helpers/usage-helper.ts";
import { isValidWhenOption, When } from "./options/whenOptions.ts";
import { dateFromWhen, namefromDate } from "./helpers/date-helper.ts";

const parsedData = optionsData as option[]

const parseOptions = buildOptions(parsedData)
const args: arguments = parseArgs(Deno.args, parseOptions)

if (args.version) {
    console.log(`take-note version: ${meta.version ? meta.version : "0.0.0"}`);
    Deno.exit()
}

if (args.help || args.h) {
    printUsage(parsedData)
    Deno.exit()
}

let validFolder = false
let validWhen = false
let when: When

if (args.notesFolder) {
    validFolder = await exists(args.notesFolder, { isDirectory: true })

    if (!validFolder) {
        console.warn(`Folder ${args.notesFolder} doesn't exist`)
        Deno.exit()
    }
}

if (args.when) {
    validWhen = isValidWhenOption(args.when)
    if (validWhen) {
        when = When[args.when as keyof typeof When]
        console.log(`Will create or open file for ${When[when]} in ${args.notesFolder}`)

        if (validFolder) {
            await openFile(args.notesFolder, when)
        }
    } else {
        console.warn(`Folder ${args.notesFolder} doesn't exist`)
        printUsage(parsedData)
    }
}

async function openFile(notesFolder: string, when: When) {
    const date = dateFromWhen(new Date, when)
    const SUFFIX = 'Weekly-log'
    const FILE_EXT = 'md'
    const [pathPart, fileName] = namefromDate(date, SUFFIX, FILE_EXT)
    const fullPath = path.join(notesFolder, pathPart)

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

console.log("Nothing to do here....")



