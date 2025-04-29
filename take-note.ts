
import { parseArgs } from "@std/cli/parse-args";
import optionsData from "./options.json" with { type: "json" };
import { buildHelp, buildOptions } from "./optionsBuilder.ts";

function printUsage() {
    console.log("");
    console.log("Usage: take-note --notesFolder <string>");
    console.log("Options:");

    const helpText = buildHelp(optionsData).join("\n")
    console.log(helpText)
}

const options = buildOptions(optionsData)
const args = parseArgs(Deno.args, options)

if (args.help || args.h) {
    printUsage()
    Deno.exit()
}

console.log("Nothing to do here....")
