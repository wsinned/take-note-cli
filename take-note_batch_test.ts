import { assertEquals, assertStringIncludes } from "@std/assert";
import * as path from "@std/path";

const TEST_DIR = `${Deno.env.get("TMPDIR") ?? "/tmp"}/take-note-batch-test`;
const NOTES_FOLDER = `${TEST_DIR}/Weekly`;
const TEMPLATE_RELATIVE = "Templates/weekly.md";
const TEMPLATE_ABS = `${NOTES_FOLDER}/${TEMPLATE_RELATIVE}`;
const takeNotePath = import.meta.resolve("./take-note.ts");

async function setupTestDir() {
  try {
    await Deno.remove(TEST_DIR, { recursive: true });
  } catch { /* ignore */ }
  await Deno.mkdir(`${NOTES_FOLDER}/${TEMPLATE_RELATIVE.split('/')[0]}`, { recursive: true });
  await Deno.writeTextFile(TEMPLATE_ABS, "# Weekly Note {{DATE}}");
}

async function cleanupTestDir() {
  try {
    await Deno.remove(TEST_DIR, { recursive: true });
  } catch { /* ignore */ }
}

// Warm up Deno cache to avoid stderr pollution during tests
Deno.test("setup: warm deno module cache", async () => {
  const cmd = new Deno.Command("deno", {
    args: ["run", "--allow-read", "--allow-write", "--allow-env", takeNotePath, "--help"],
    stdout: "null",
    stderr: "null",
  });
  await cmd.output();
});

Deno.test("batch=3 creates 3 files going forward from when (json)", async () => {
  await setupTestDir();

  const cmd = new Deno.Command("deno", {
    args: [
      "run", "--allow-read", "--allow-write", "--allow-env", "--allow-sys", "--allow-run",
      takeNotePath,
      "weekly",
      "--notesFolder", NOTES_FOLDER,
      "--template", TEMPLATE_RELATIVE,
      "--when", "thisWeek",
      "--batch", "3",
      "--noOpen",
      "--format", "json",
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const { stdout } = await cmd.output();
  const output = new TextDecoder().decode(stdout);

  // Should be valid JSON array with 3 items
  const results = JSON.parse(output);
  assertEquals(Array.isArray(results), true);
  assertEquals(results.length, 3);
  assertEquals(results[0].created, true);
  assertEquals(results[1].created, true);
  assertEquals(results[2].created, true);

  // Verify all files were actually created
  for (const result of results) {
    const info = await Deno.stat(result.path);
    assertEquals(info.isFile, true);
  }

  await cleanupTestDir();
});

Deno.test("batch=2 creates 2 files (text output)", async () => {
  await setupTestDir();

  const cmd = new Deno.Command("deno", {
    args: [
      "run", "--allow-read", "--allow-write", "--allow-env", "--allow-sys", "--allow-run",
      takeNotePath,
      "weekly",
      "--notesFolder", NOTES_FOLDER,
      "--template", TEMPLATE_RELATIVE,
      "--when", "thisWeek",
      "--batch", "2",
      "--noOpen",
      "--format", "text",
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const { stdout } = await cmd.output();
  const output = new TextDecoder().decode(stdout);

  // Should have 2 lines
  const lines = output.trim().split("\n");
  assertEquals(lines.length, 2);
  assertStringIncludes(lines[0], "Created:");
  assertStringIncludes(lines[1], "Created:");

  await cleanupTestDir();
});

Deno.test("batch=1 (default) produces a single result", async () => {
  await setupTestDir();

  const cmd = new Deno.Command("deno", {
    args: [
      "run", "--allow-read", "--allow-write", "--allow-env", "--allow-sys", "--allow-run",
      takeNotePath,
      "weekly",
      "--notesFolder", NOTES_FOLDER,
      "--template", TEMPLATE_RELATIVE,
      "--when", "thisWeek",
      "--noOpen",
      "--format", "json",
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const { stdout } = await cmd.output();
  const output = new TextDecoder().decode(stdout);

  const results = JSON.parse(output);
  assertEquals(Array.isArray(results), true);
  assertEquals(results.length, 1);
  assertEquals(results[0].created, true);

  await cleanupTestDir();
});

Deno.test("running batch twice marks files as found (not created)", async () => {
  await setupTestDir();

  // First run - create files
  const cmd1 = new Deno.Command("deno", {
    args: [
      "run", "--allow-read", "--allow-write", "--allow-env", "--allow-sys", "--allow-run",
      takeNotePath,
      "weekly",
      "--notesFolder", NOTES_FOLDER,
      "--template", TEMPLATE_RELATIVE,
      "--when", "thisWeek",
      "--batch", "2",
      "--noOpen",
      "--format", "json",
    ],
    stdout: "piped",
    stderr: "piped",
  });
  await cmd1.output();

  // Second run - files should be "found"
  const cmd2 = new Deno.Command("deno", {
    args: [
      "run", "--allow-read", "--allow-write", "--allow-env", "--allow-sys", "--allow-run",
      takeNotePath,
      "weekly",
      "--notesFolder", NOTES_FOLDER,
      "--template", TEMPLATE_RELATIVE,
      "--when", "thisWeek",
      "--batch", "2",
      "--noOpen",
      "--format", "json",
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const { stdout } = await cmd2.output();
  const output = new TextDecoder().decode(stdout);

  const results = JSON.parse(output);
  assertEquals(results.length, 2);
  assertEquals(results[0].created, false);
  assertEquals(results[1].created, false);

  await cleanupTestDir();
});

Deno.test("batch=9 exceeds max and reports error", async () => {
  await setupTestDir();

  const cmd = new Deno.Command("deno", {
    args: [
      "run", "--allow-read", "--allow-write", "--allow-env", "--allow-sys", "--allow-run",
      takeNotePath,
      "weekly",
      "--notesFolder", NOTES_FOLDER,
      "--template", TEMPLATE_RELATIVE,
      "--when", "thisWeek",
      "--batch", "9",
      "--noOpen",
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const { code, stderr } = await cmd.output();
  const errOutput = new TextDecoder().decode(stderr);

  assertEquals(code, 1);
  assertStringIncludes(errOutput, "batch size must be between 1 and 8");

  await cleanupTestDir();
});

Deno.test("batch=0 is below min and reports error", async () => {
  await setupTestDir();

  const cmd = new Deno.Command("deno", {
    args: [
      "run", "--allow-read", "--allow-write", "--allow-env", "--allow-sys", "--allow-run",
      takeNotePath,
      "weekly",
      "--notesFolder", NOTES_FOLDER,
      "--template", TEMPLATE_RELATIVE,
      "--when", "thisWeek",
      "--batch", "0",
      "--noOpen",
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const { code, stderr } = await cmd.output();
  const errOutput = new TextDecoder().decode(stderr);

  assertEquals(code, 1);
  assertStringIncludes(errOutput, "batch size must be between 1 and 8");

  await cleanupTestDir();
});
