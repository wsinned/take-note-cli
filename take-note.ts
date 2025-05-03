import { parseArgs } from "@std/cli/parse-args";
import { exists } from "jsr:@std/fs/exists";

import { buildOptions } from "./optionsBuilder.ts";
import { option } from "./option.ts";
import { arguments } from "./arguments.ts";

import optionsData from "./options.json" with { type: "json" };
import meta from "./deno.json" with { type: "json" };
import { printUsage, useVerbose } from "./utilities.ts";

const parsedData = optionsData as option[]

const parseOptions = buildOptions(parsedData)
const args: arguments = parseArgs(Deno.args, parseOptions)

if (args.version) {
    console.log(`take-note version: ${meta.version ? meta.version : "0.0.0"}`);
}

if (args.help || args.h) {
    printUsage(parsedData)
    useVerbose(args, parseOptions)
    Deno.exit()
}

if (args.notesFolder) {
    useVerbose(args, parseOptions)
    const validFolder = await exists(args.notesFolder, { isDirectory: true })

    if (!validFolder) {
        console.warn(`Folder ${args.notesFolder} doesn't exist`)
    }
}

console.log("Nothing to do here....")


