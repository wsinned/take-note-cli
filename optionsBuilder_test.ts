import { assertArrayIncludes, assertEquals } from "@std/assert";
import { buildHelp, buildOptions, option } from "./optionsBuilder.ts";

const helpOption: option = {
  name: "Help",
  shortKey: "-h",
  longKey: "--help",
  helpText: "Provides help on the options",
  optionType: "boolean"
}

const verboseOption: option = {
  name: "Verbose",
  shortKey: "-v",
  longKey: "--verbose",
  helpText: "Provides verbose log output",
  optionType: "boolean"
}

Deno.test("It builds empty help text from empty options", () => {
  const expected: string[] = []
  const help = buildHelp([])
  assertArrayIncludes(help, expected)
});

Deno.test("It builds an empty option", () => {
  const expected:string[] = [ ]
  const ops = buildOptions([])
  assertEquals(ops.boolean, expected)
});

Deno.test("It builds help text from a single boolean option", () => {
  const expected = ["Help: --help, -h Provides help on the options"]
  const help = buildHelp([helpOption])
  assertArrayIncludes(help, expected)
});

Deno.test("It builds a single boolean option", () => {
  const expected = [ "--help"]
  const ops = buildOptions([helpOption])
  assertEquals(ops.boolean, expected)
});

Deno.test("It builds a single aliased boolean option", () => {
  const expected = {"--help": "-h"}
  const ops = buildOptions([helpOption])
  assertEquals(ops.alias, expected)
});

Deno.test("It builds help text from multiple boolean options", () => {
  const expected = [
    "Help: --help, -h Provides help on the options",
    "Verbose: --verbose, -v Provides verbose log output"
  ]
  const help = buildHelp([helpOption, verboseOption])
  assertArrayIncludes(help, expected)
});

Deno.test("It builds multiple boolean options", () => {
  const expected = [ "--help", "--verbose"]
  const ops = buildOptions([helpOption, verboseOption])
  assertEquals(ops.boolean, expected)
});

Deno.test("It builds multiple aliased boolean options", () => {
  const expected = {"--help": "-h", "--verbose": "-v"}
  const ops = buildOptions([helpOption, verboseOption])
  assertEquals(ops.alias, expected)
});
