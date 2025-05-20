import { option } from "../options/option.ts";
import { buildHelp } from "../options/optionsBuilder.ts";

export function printUsage(options: option[]) {
  console.log("\nUsage: take-note --notesFolder <string>");
  console.log("\nOptions:\n");

  const helpText = buildHelp(options).join("\n");
  console.log(helpText);
  console.log();
}
