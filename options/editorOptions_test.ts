import { assertEquals } from "@std/assert/equals";
import { assertThrows } from "@std/assert/throws";
import { Editor, editorFromString, isValidEditorOption } from "./editorOptions.ts";

Deno.test("It can spot a valid editor option", () => {
    assertEquals(true, isValidEditorOption('vscode'))
});

Deno.test("It can spot an invalid editor option", () => {
    assertEquals(false, isValidEditorOption('visualstudio'))
});

Deno.test("It parses a valid editor option", () => {
    assertEquals(Editor.obsidian, editorFromString("obsidian"))
});

Deno.test("It throws when it parses an invalid editor option", () => {
    assertThrows(() => editorFromString("atom"), Error,  "invalid Editor option")
});
