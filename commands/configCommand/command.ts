import { buildCommand } from "@stricli/core";

export const weeklyCommand = buildCommand({
    loader: () => import("./impl.ts"),
    parameters: {
        positional: {
            kind: "tuple",
            parameters: [],
        },
    },
    docs: {
        brief: "Command in subdirectory",
    },
});