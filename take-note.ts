
import optionsData from "./options.json" with { type: "json" };
import { buildHelp } from "./optionsBuilder.ts";

function printUsage() {
    console.log("");
    console.log("Usage: take-note --notesFolder <string>");
    console.log("Options:");

    const helpText = buildHelp(optionsData).join("\n")
    console.log(helpText)
}


printUsage()