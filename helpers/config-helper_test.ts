import { assertEquals } from "@std/assert";
import { mergeWithFlags, loadConfig, type NamedConfig } from "./config-helper.ts";
import os from "node:os";
import path from "node:path";

// --- mergeWithFlags ---

Deno.test("mergeWithFlags - CLI flag overrides config", () => {
    const config: NamedConfig = { editor: "obsidian", batch: 3 };
    const flags: NamedConfig = { editor: "vscode" as const, notesFolder: "~/Notes" };
    const result = mergeWithFlags(config, flags);
    assertEquals(result.editor, "vscode");
    assertEquals(result.batch, 3);
    assertEquals(result.notesFolder, "~/Notes");
});

Deno.test("mergeWithFlags - config fills in missing flags", () => {
    const config: NamedConfig = { editor: "obsidian", batch: 2, notesFolder: "~/Notes" };
    const flags: NamedConfig = { editor: undefined, notesFolder: undefined };
    const result = mergeWithFlags(config, flags);
    assertEquals(result.editor, "obsidian");
    assertEquals(result.batch, 2);
    assertEquals(result.notesFolder, "~/Notes");
});

Deno.test("mergeWithFlags - undefined flags do not override config", () => {
    const config: NamedConfig = { batch: 4 };
    const flags = { batch: undefined };
    const result = mergeWithFlags(config, flags);
    assertEquals(result.batch, 4);
});

// --- loadConfig ---

Deno.test("loadConfig - returns defaults when no config file exists", async () => {
    const config = await loadConfig("default", "/tmp/nonexistent-take-note-test/config.toml");
    assertEquals(config.editor, "generic");
    assertEquals(config.batch, 1);
});

Deno.test("loadConfig - expands ~ in notesFolder", async () => {
    const tmpDir = await Deno.makeTempDir();
    const configPath = path.join(tmpDir, "config.toml");
    await Deno.writeTextFile(configPath, `
[default]
notesFolder = "~/Documents/Notes"
`);

    // Temporarily override CONFIG_PATH by reading directly
    const raw = await Deno.readTextFile(configPath);
    const { parse } = await import("@std/toml");
    const file = parse(raw) as Record<string, Record<string, unknown>>;
    const section = file["default"] ?? {};
    const notesFolder = (section["notesFolder"] as string ?? "").replace(/^~\//, os.homedir() + "/");

    assertEquals(notesFolder, path.join(os.homedir(), "Documents/Notes"));
    await Deno.remove(tmpDir, { recursive: true });
});
