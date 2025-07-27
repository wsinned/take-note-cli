import { buildCommand } from "@stricli/core";
import { When } from "../../options/whenOptions.ts";
// import { RequiredEnumFlagParameter } from "@stricli/core/"

type Flags = {
    readonly notesFolder: string;
    readonly when: When;
};

export const weeklyCommand = buildCommand({
    loader: () => import("./impl.ts"),
    parameters: {
        flags: {
            when: {
                brief: "Which week's note to open",
                kind: "enum",
                values: ["lastWeek", "thisWeek", "nextWeek"],
                optional: false
            },
            notesFolder: {
                brief: "The root folder containing your notes",
                kind: "parsed",
                parse: String,
                optional: false
            },
        }
    },
    docs: {
        brief: "Open a file for the given week's note, creating it first if it doesn't exist",
    },
});