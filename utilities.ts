import { ParseOptions } from "@std/cli/parse-args";
import { option } from "./option.ts";
import { buildHelp } from "./optionsBuilder.ts";
import { arguments } from "./arguments.ts";

export function printUsage(options: option[]) {
  console.log("\nUsage: take-note --notesFolder <string>");
  console.log("\nOptions:\n");

  const helpText = buildHelp(options).join("\n");
  console.log(helpText);
  console.log();
}

export function useVerbose(args: arguments, parseOptions: ParseOptions) {
    if (args.verbose || args.v) {
        console.log(`\nargs: ${Deno.inspect(args)}`)
        console.log(`\noptions: ${Deno.inspect(parseOptions)}`)
    }
}
