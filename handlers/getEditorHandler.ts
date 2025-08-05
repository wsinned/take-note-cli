import { buildGenericHandler } from "./buildGenericHandler.ts";
import { buildObsidianHandler } from "./buildObsidianHandler.ts";
import { buildVSCodeHandler } from "./buildVSCodeHandler.ts";
import { Editor } from "../options/editorOptions.ts";

export function getEditorHandler(editor: Editor) {
  switch (editor) {
    case Editor.generic:
      return buildGenericHandler();
    case Editor.vscode:
      return buildVSCodeHandler();
    case Editor.obsidian:
      return buildObsidianHandler();
  }
}
