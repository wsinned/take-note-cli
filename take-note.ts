import { parseArgs, ParseOptions } from "@std/cli/parse-args";
import meta from "./deno.json" with { type: "json" };
import { exists } from "jsr:@std/fs/exists";

function printUsage() {
    console.log("");
    console.log("Usage: take-note --notesFolder <string>");
    console.log("Options:");
    console.log("  -h, --help        Show this help message");
    console.log("  -v, --version     Show the version number");
    console.log("  -V, --verbose     Print verbose output for debugging");
}

const options: ParseOptions = {
    boolean: ["help", "version", "verbose"],
    string: ["--notesFolder"],
    alias: { "help": "h", "version": "v", "verbose": "V", "--notesFolder": "f" },
};

console.log(`Deno args: ${Deno.args}`)
const args = parseArgs(Deno.args, options);

console.log(`args length: ${args._.length}`)

if (args.help) {
    printUsage();
    Deno.exit(0);
} else if (args.version) {
    console.log(meta.version ? meta.version : "0.0.0");
    Deno.exit(0);
}
    for (const arg in args) { console.log(`${arg}: ${args[arg]}`)}
    // if (args.verbose) args._.forEach(([k, v]) => console.log(`${k}: ${v}`) )

console.log(`notesFolder before: ${args.__[0]}`)
const notesFolder: string = args["--notesFolder"]
const validFolder =  await exists(args.notesFolder, {isDirectory: true})

console.log(`notesFolder: ${notesFolder}`)

if (notesFolder === "") {
    console.log("ERROR: notesFolder is not a directory");
    printUsage();
    Deno.exit(1);
}

console.log(`notesFolder: ${notesFolder}`)