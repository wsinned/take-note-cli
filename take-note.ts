import { parseArgs, ParseOptions } from "@std/cli/parse-args";
import { buildHelp, buildOptions } from "./optionsBuilder.ts";
import { option } from "./option.ts";
import optionsData from "./options.json" with { type: "json" };
import meta from "./deno.json" with { type: "json" };
import { arguments } from "./arguments.ts";

const parsedData = optionsData as option[]

function printUsage(options: option[]) {
    console.log("\nUsage: take-note --notesFolder <string>");
    console.log("\nOptions:\n");

    const helpText = buildHelp(options).join("\n")
    console.log(helpText)
    console.log(typeof(args))
}

const parseOptions = buildOptions(parsedData)
const args: arguments = parseArgs(Deno.args, parseOptions)

if (args.help || args.h) {
    printUsage(parsedData)
    useVerbose(args, parseOptions)
    Deno.exit()
}

if (args.version) {
    console.log(`take-note version: ${meta.version ? meta.version : "0.0.0"}`);
    if (args.verbose) useVerbose(args, parseOptions)
    Deno.exit()
}

function useVerbose(args: arguments, parseOptions: ParseOptions) {
    if (args.verbose || args.v) {
        console.log(`\nargs: ${Deno.inspect(args)}`)
        console.log(`\noptions: ${Deno.inspect(parseOptions)}`)
    }
}

console.log("Nothing to do here....")
