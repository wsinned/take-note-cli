import { buildCommand } from "@stricli/core";

export const dailyCommand = buildCommand({
    loader: () => import("./impl.ts"),
    parameters: {
        flags: {
            when: {
                brief: "Which day's note to open",
                kind: "enum",
                values: ["yesterday", "today", "tomorrow"] as const,
            },
            config: {
                brief: "Named config section to use from ~/.config/take-note/config.toml",
                kind: "parsed",
                parse: String,
                optional: true,
            },
            notesFolder: {
                brief: "The root folder containing your notes",
                kind: "parsed",
                parse: String,
                optional: true,
            },
            editor: {
                brief: "Which editor configuration to use. Obsidian and VSCode have their own handlers",
                kind: "enum",
                values: ["obsidian", "vscode", "generic"] as const,
                optional: true,
            },
            template: {
                brief: "The template file to use when creating new daily notes",
                kind: "parsed",
                parse: String,
                optional: true,
            },
            noOpen: {
                brief: "Create the file without opening it in an editor",
                kind: "boolean",
                optional: true,
            },
            format: {
                brief: "Output format for --no-open mode",
                kind: "enum",
                values: ["json", "text", "silent"] as const,
                optional: true,
            },
        },
    },
    docs: {
        brief: "Open a file for the given day's note, creating it first if it doesn't exist",
    },
});
