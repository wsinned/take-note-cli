import { assertArrayIncludes, assertEquals } from "@std/assert";
import { buildHelp, buildOptions, option } from "./optionsBuilder.ts";
import type { ParseOptions } from "@std/cli/parse-args";

const helpOption: option = {
  name: "Help",
  shortKey: "-h",
  longKey: "--help",
  helpText: "Provides help on the options",
  optionType: "boolean"
}

Deno.test("It builds empty help text from empty options", () => {
  const expected: string[] = []
  const help = buildHelp([])
  assertArrayIncludes(help, expected)
});

Deno.test("It builds help text from a single boolean `option", () => {
  const expected = ["Help: --help, -h Provides help on the options"]
  const help = buildHelp([helpOption])
  assertArrayIncludes(help, expected)
});

Deno.test("It builds an empty option", () => {
  const expected:string[] = [ ]
  const ops = buildOptions([])
  assertEquals(ops.boolean, expected)
});

Deno.test("It builds a single boolean `option", () => {
  const expected = [ "--help"]
  const ops = buildOptions([helpOption])
  assertEquals(ops.boolean, expected)
});

Deno.test("It builds a single aliased boolean `option", () => {
  const expected = {"--help": "-h"}
  const ops = buildOptions([helpOption])
  // console.log(`option: ${Deno.inspect(ops.alias)}`)
  assertEquals(ops.alias, expected)
});

