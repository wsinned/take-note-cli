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
            notesFolder: {
                brief: "The root folder containing your notes",
                kind: "parsed",
                parse: String,
            },
            editor: {
                brief: "Which editor configuration to use. Obsidian and VSCode have their own handlers",
                kind: "enum",
                values: ["obsidian", "vscode", "generic"] as const,
                optional: true,
                default: "generic",
            },
            template: {
                brief: "The template file to use when creating new weekly notes",
                kind: "parsed",
                parse: String,
                optional: true,
            },
            batch: {
                brief: "The number of files to create, e.g. 3 will create the file for the seected when option and the following 2 weeks",
                kind: "parsed",
                parse: Number,
                optional: true,
            },
        },
    },
    docs: {
        brief: "Open a file for the given week's note, creating it first if it doesn't exist",
    },
});