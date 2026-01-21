import { assertEquals, assertStringIncludes } from "@std/assert";
import { app } from "./take-note.ts";
import meta from "./deno.json" with { type: "json" };

Deno.test("app has correct name", () => {
    assertEquals(app.config.name, "take-note");
});

Deno.test("app has version from deno.json", () => {
    const versionInfo = app.config.versionInfo as { currentVersion: string };
    assertEquals(versionInfo.currentVersion, meta.version);
});

Deno.test("--help shows description", async () => {
    const cmd = new Deno.Command("deno", {
        args: ["run", "--allow-all", "take-note.ts", "--help"],
    });
    const { stdout } = await cmd.output();
    const output = new TextDecoder().decode(stdout);
    assertStringIncludes(output, "Take Note");
});

Deno.test("--help shows weekly command", async () => {
    const cmd = new Deno.Command("deno", {
        args: ["run", "--allow-all", "take-note.ts", "--help"],
    });
    const { stdout } = await cmd.output();
    const output = new TextDecoder().decode(stdout);
    assertStringIncludes(output, "weekly");
});

Deno.test("--version shows version from deno.json", async () => {
    const cmd = new Deno.Command("deno", {
        args: ["run", "--allow-all", "take-note.ts", "--version"],
    });
    const { stdout } = await cmd.output();
    const output = new TextDecoder().decode(stdout);
    assertStringIncludes(output, meta.version);
});

Deno.test("unknown command shows error", async () => {
    const cmd = new Deno.Command("deno", {
        args: ["run", "--allow-all", "take-note.ts", "unknown"],
    });
    const { stderr } = await cmd.output();
    const output = new TextDecoder().decode(stderr);
    assertStringIncludes(output, "unknown");
});
