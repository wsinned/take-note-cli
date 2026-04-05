import { assertEquals } from "@std/assert";
import { formatOutput, type FileResult } from "./output-helper.ts";

Deno.test("formatOutput - json format for single result", () => {
  const result: FileResult = {
    created: true,
    path: "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md",
    date: "2026-02-16"
  };
  
  const output = formatOutput([result], "json");
  const parsed = JSON.parse(output);
  
  assertEquals(parsed.length, 1);
  assertEquals(parsed[0].created, true);
  assertEquals(parsed[0].path, "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md");
  assertEquals(parsed[0].date, "2026-02-16");
});

Deno.test("formatOutput - json format for multiple results", () => {
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

  assertEquals(parsed.length, 2);
  assertEquals(parsed[0].created, true);
  assertEquals(parsed[0].path, "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md");
  assertEquals(parsed[1].created, false);
  assertEquals(parsed[1].path, "/home/user/Notes/2026/02/2026-02-23-Weekly-log.md");
});

Deno.test("formatOutput - text format - created single", () => {
  const result: FileResult = {
    created: true,
    path: "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md",
    date: "2026-02-16"
  };
  
  const output = formatOutput([result], "text");
  assertEquals(output, "Created: /home/user/Notes/2026/02/2026-02-16-Weekly-log.md");
});

Deno.test("formatOutput - text format - found existing single", () => {
  const result: FileResult = {
    created: false,
    path: "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md",
    date: "2026-02-16"
  };
  
  const output = formatOutput([result], "text");
  assertEquals(output, "Found: /home/user/Notes/2026/02/2026-02-16-Weekly-log.md");
});
Deno.test("formatOutput - text format - multiple results", () => {
  const results: FileResult[] = [
    {
      created: true,
      path: "/path/to/note1.md",
      date: "2026-01-01"
    },
    {
      created: false,
      path: "/path/to/note2.md",
      date: "2026-01-08"
    }
  ];
  const output = formatOutput(results, "text");
  assertEquals(output, "Created: /path/to/note1.md\nFound: /path/to/note2.md");
});

Deno.test("formatOutput - silent format", () => {
  const result: FileResult = {
    created: true,
    path: "/home/user/Notes/2026/02/2026-02-16-Weekly-log.md",
    date: "2026-02-16"
  };
  
  const output = formatOutput([result], "silent");
  assertEquals(output, "");
});
