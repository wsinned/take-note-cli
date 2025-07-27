import { buildCommand } from "@stricli/core";

export const weeklyCommand = buildCommand({
    loader: async () => import("./impl.ts"),
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