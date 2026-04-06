import { assertEquals, assertStringIncludes } from "@std/assert";
import { ensureDir, exists } from "@std/fs";

const TEST_DIR = `${Deno.cwd()}/.test_tmp`;
const NOTES_FOLDER = `${TEST_DIR}/Weekly`;
const TEMPLATE_RELATIVE = "Templates/weekly.md";  // relative to NOTES_FOLDER
const TEMPLATE_ABS = `${NOTES_FOLDER}/${TEMPLATE_RELATIVE}`;

interface WeeklyOutput {
    created: boolean;
    path: string;
    date: string;
}

const takeNotePath = import.meta.resolve("./take-note.ts");

async function setupTestDir() {
    await Deno.remove(TEST_DIR, { recursive: true }).catch(() => {});
    await ensureDir(`${NOTES_FOLDER}/Templates`);
    await Deno.writeTextFile(TEMPLATE_ABS, "# Weekly Note {{DATE}}");
}

// Base args used by all batch tests - pass flags directly to avoid config resolution issues
function batchArgs(extra: string[]): string[] {
    return [
        "run", "--allow-all", takeNotePath, "weekly",
        "--notesFolder", NOTES_FOLDER,
        "--template", TEMPLATE_RELATIVE,
        ...extra,
    ];
}

// Warm the Deno cache so subprocesses don't download during tests
Deno.test("setup: warm deno module cache", async () => {
    const cmd = new Deno.Command("deno", {
        args: ["run", "--allow-all", takeNotePath, "--help"],
        cwd: Deno.cwd(),
    });
    await cmd.output();
});

Deno.test("batch=3 creates 3 files going forward from when (json)", async () => {
    await setupTestDir();

    const cmd = new Deno.Command("deno", {
        args: batchArgs(["--when", "thisWeek", "--batch", "3", "--noOpen", "--format", "json"]),
        cwd: Deno.cwd(),
    });
    const { stdout, stderr } = await cmd.output();
    const stdoutStr = new TextDecoder().decode(stdout);

    if (!stdoutStr.trim()) {
        throw new Error(`No output. stderr: ${new TextDecoder().decode(stderr)}`);
    }

    const output: WeeklyOutput[] = JSON.parse(stdoutStr);
    assertEquals(output.length, 3);

    for (const item of output) {
        assertEquals(item.created, true);
        assertStringIncludes(item.path, "-Weekly-log.md");
        assertEquals(await exists(item.path), true);
    }

    // Dates should be 7 days apart
    const dates = output.map(o => new Date(o.date));
    const diff1 = (dates[1].getTime() - dates[0].getTime()) / (7 * 24 * 60 * 60 * 1000);
    const diff2 = (dates[2].getTime() - dates[1].getTime()) / (7 * 24 * 60 * 60 * 1000);
    assertEquals(diff1, 1);
    assertEquals(diff2, 1);
});

Deno.test("batch=2 creates 2 files (text output)", async () => {
    await setupTestDir();

    const cmd = new Deno.Command("deno", {
        args: batchArgs(["--when", "nextWeek", "--batch", "2", "--noOpen", "--format", "text"]),
        cwd: Deno.cwd(),
    });
    const { stdout, stderr } = await cmd.output();
    const stdoutStr = new TextDecoder().decode(stdout);

    if (!stdoutStr.trim()) {
        throw new Error(`No output. stderr: ${new TextDecoder().decode(stderr)}`);
    }

    const lines = stdoutStr.trim().split("\n");
    assertEquals(lines.length, 2);
    for (const line of lines) {
        assertStringIncludes(line, "Created: ");
        assertEquals(await exists(line.replace("Created: ", "")), true);
    }
});

Deno.test("batch=1 (default) produces a single result", async () => {
    await setupTestDir();

    const cmd = new Deno.Command("deno", {
        args: batchArgs(["--when", "thisWeek", "--noOpen", "--format", "json"]),
        cwd: Deno.cwd(),
    });
    const { stdout, stderr } = await cmd.output();
    const stdoutStr = new TextDecoder().decode(stdout);

    if (!stdoutStr.trim()) {
        throw new Error(`No output. stderr: ${new TextDecoder().decode(stderr)}`);
    }

    const output: WeeklyOutput[] = JSON.parse(stdoutStr);
    assertEquals(output.length, 1);
    assertEquals(output[0].created, true);
});

Deno.test("running batch twice marks files as found (not created)", async () => {
    await setupTestDir();

    const args = batchArgs(["--when", "thisWeek", "--batch", "2", "--noOpen", "--format", "json"]);
    const run = () => new Deno.Command("deno", { args, cwd: Deno.cwd() }).output();

    // First run: creates files
    const first = await run();
    const firstOutput: WeeklyOutput[] = JSON.parse(new TextDecoder().decode(first.stdout));
    assertEquals(firstOutput.every(r => r.created), true);

    // Second run: finds existing files
    const second = await run();
    const secondOutput: WeeklyOutput[] = JSON.parse(new TextDecoder().decode(second.stdout));
    assertEquals(secondOutput.every(r => !r.created), true);
});

Deno.test("batch=9 exceeds max and reports error", async () => {
    await setupTestDir();

    const cmd = new Deno.Command("deno", {
        args: batchArgs(["--when", "thisWeek", "--batch", "9", "--noOpen", "--format", "json"]),
        cwd: Deno.cwd(),
    });
    const { stderr, code } = await cmd.output();
    assertEquals(code, 1);
    assertStringIncludes(new TextDecoder().decode(stderr), "batch size must be between 1 and 8");
});

Deno.test("batch=0 is below min and reports error", async () => {
    await setupTestDir();

    const cmd = new Deno.Command("deno", {
        args: batchArgs(["--when", "thisWeek", "--batch", "0", "--noOpen", "--format", "json"]),
        cwd: Deno.cwd(),
    });
    const { stderr, code } = await cmd.output();
    assertEquals(code, 1);
    assertStringIncludes(new TextDecoder().decode(stderr), "batch size must be between 1 and 8");
});
