import { parseArgs } from "@std/cli/parse-args";
import { exists } from "@std/fs/exists";

import { buildOptions } from "./options/optionsBuilder.ts";
import { option } from "./options/option.ts";
import { arguments } from "./options/arguments.ts";

import optionsData from "./options/options.json" with { type: "json" };
import meta from "./deno.json" with { type: "json" };
import { printUsage } from "./helpers/usage-helper.ts";
import { isValidWhenOption, When } from "./options/whenOptions.ts";
import { dateFromWhen } from "./helpers/date-helper.ts";

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
        const when = When[args.when as keyof typeof When]
        console.log(`Will create or open file for ${When[when]} in ${args.notesFolder}`)
    }
}

export function openFile(filePath: string, when: When ) {
    const date = dateFromWhen(new Date, when)
    const fileName = namefromDate(date)
}

if (validFolder && validWhen) {
    console.log("Do something")
}

console.log("Nothing to do here....")



