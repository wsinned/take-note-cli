import { assertEquals } from "@std/assert";
import { formatOutput, type FileResult } from "./output-helper.ts";

Deno.test("formatOutput - json format", () => {
  const result: FileResult = {
    created: true,
    path: "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md",
    date: "2026-02-16"
  };
  
  const output = formatOutput(result, "json");
  const parsed = JSON.parse(output);
  
  assertEquals(parsed.created, true);
  assertEquals(parsed.path, "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md");
  assertEquals(parsed.date, "2026-02-16");
});

Deno.test("formatOutput - text format - created", () => {
  const result: FileResult = {
    created: true,
    path: "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md",
    date: "2026-02-16"
  };
  
  const output = formatOutput(result, "text");
  assertEquals(output, "Created: /home/user/Notes/2026/02/2026-02-16-Weekly-log.md");
});

Deno.test("formatOutput - text format - found existing", () => {
  const result: FileResult = {
    created: false,
    path: "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md",
    date: "2026-02-16"
  };
  
  const output = formatOutput(result, "text");
  assertEquals(output, "Found: /home/user/Notes/2026/02/2026-02-16-Weekly-log.md");
});

Deno.test("formatOutput - silent format", () => {
  const result: FileResult = {
    created: true,
    path: "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md",
    date: "2026-02-16"
  };
  
  const output = formatOutput(result, "silent");
  assertEquals(output, "");
});
