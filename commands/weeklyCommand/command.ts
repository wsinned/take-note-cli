import { buildCommand } from "@stricli/core";

export const weeklyCommand = buildCommand({
    loader: () => import("./impl.ts"),
    parameters: {
        flags: {
            when: {
                brief: "Which week's note to open",
                kind: "enum",
                values: ["lastWeek", "thisWeek", "nextWeek"] as const,
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
                brief: "The template file to use when creating new weekly notes",
                kind: "parsed",
                parse: String,
                optional: true,
            },
            batch: {
                brief: "The number of files to create, e.g. 3 will create the file for the selected when option and the following 2 weeks",
                kind: "parsed",
                parse: Number,
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
        brief: "Open a file for the given week's note, creating it first if it doesn't exist",
    },
});