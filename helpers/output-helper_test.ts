import { assertEquals } from "@std/assert";
import { formatOutput, type FileResult } from "./output-helper.ts";

Deno.test("formatOutput - json format - single result is wrapped in array", () => {
  const result: FileResult = {
    created: true,
    path: "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md",
    date: "2026-02-16"
  };
  
  const output = formatOutput(result, "json");
  const parsed = JSON.parse(output);
  
  // Single result is now wrapped in array
  assertEquals(Array.isArray(parsed), true);
  assertEquals(parsed.length, 1);
  assertEquals(parsed[0].created, true);
  assertEquals(parsed[0].path, "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md");
  assertEquals(parsed[0].date, "2026-02-16");
});

Deno.test("formatOutput - json format - array of results", () => {
  const results: FileResult[] = [
    {
      created: true,
      path: "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md",
      date: "2026-02-16"
    },
    {
      created: false,
      path: "/home/user/Notes/2026/02/2026-02-23-Weekly-log.md",
      date: "2026-02-23"
    }
  ];
  
  const output = formatOutput(results, "json");
  const parsed = JSON.parse(output);
  
  assertEquals(Array.isArray(parsed), true);
  assertEquals(parsed.length, 2);
  assertEquals(parsed[0].created, true);
  assertEquals(parsed[1].created, false);
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

Deno.test("formatOutput - text format - multiple results joined by newline", () => {
  const results: FileResult[] = [
    {
      created: true,
      path: "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md",
      date: "2026-02-16"
    },
    {
      created: false,
      path: "/home/user/Notes/2026/02/2026-02-23-Weekly-log.md",
      date: "2026-02-23"
    }
  ];
  
  const output = formatOutput(results, "text");
  assertEquals(output, "Created: /home/user/Notes/2026/02/2026-02-16-Weekly-log.md\nFound: /home/user/Notes/2026/02/2026-02-23-Weekly-log.md");
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
