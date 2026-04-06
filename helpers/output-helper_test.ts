import { assertEquals } from "@std/assert";
import { formatOutput, type FileResult } from "./output-helper.ts";

const singleResult: FileResult = {
  created: true,
  path: "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md",
  date: "2026-02-16"
};

const foundResult: FileResult = {
  created: false,
  path: "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md",
  date: "2026-02-16"
};

Deno.test("formatOutput - json format - single result is wrapped in array", () => {
  const output = formatOutput(singleResult, "json");
  const parsed = JSON.parse(output);
  assertEquals(Array.isArray(parsed), true);
  assertEquals(parsed[0].created, true);
  assertEquals(parsed[0].path, "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md");
  assertEquals(parsed[0].date, "2026-02-16");
});

Deno.test("formatOutput - json format - array of results", () => {
  const results: FileResult[] = [singleResult, foundResult];
  const output = formatOutput(results, "json");
  const parsed = JSON.parse(output);
  assertEquals(Array.isArray(parsed), true);
  assertEquals(parsed.length, 2);
  assertEquals(parsed[0].created, true);
  assertEquals(parsed[1].created, false);
});

Deno.test("formatOutput - text format - created", () => {
  const output = formatOutput(singleResult, "text");
  assertEquals(output, "Created: /home/user/Notes/2026/02/2026-02-16-Weekly-log.md");
});

Deno.test("formatOutput - text format - found existing", () => {
  const output = formatOutput(foundResult, "text");
  assertEquals(output, "Found: /home/user/Notes/2026/02/2026-02-16-Weekly-log.md");
});

Deno.test("formatOutput - text format - multiple results joined by newline", () => {
  const output = formatOutput([singleResult, foundResult], "text");
  assertEquals(output, "Created: /home/user/Notes/2026/02/2026-02-16-Weekly-log.md\nFound: /home/user/Notes/2026/02/2026-02-16-Weekly-log.md");
});

Deno.test("formatOutput - silent format", () => {
  const output = formatOutput(singleResult, "silent");
  assertEquals(output, "");
});
