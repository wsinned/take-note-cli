import type { LocalContext } from "../../context.ts";

interface SubdirCommandFlags {
    // ...
}

export default async function(this: LocalContext, flags: SubdirCommandFlags): Promise<void> {
    // ...
}
