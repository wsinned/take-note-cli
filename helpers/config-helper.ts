import { parse } from "@std/toml";
import { exists } from "@std/fs/exists";
import os from "node:os";
import path from "node:path";

export const CONFIG_PATH = path.join(
    os.homedir(),
    ".config",
    "take-note",
    "config.toml"
);

export type Editor = "obsidian" | "vscode" | "generic";
export type Format = "json" | "text" | "silent";

export interface NamedConfig {
    notesFolder?: string;
    editor?: Editor;
    template?: string;
    batch?: number;
}

export interface TakeNoteConfig {
    [name: string]: NamedConfig;
}

const DEFAULTS: NamedConfig = {
    editor: "generic",
    batch: 1,
};

/**
 * Expands a leading ~ to the user's home directory.
 */
function expandHome(value: string): string {
    if (value.startsWith("~/")) {
        return path.join(os.homedir(), value.slice(2));
    }
    return value;
}

/**
 * Reads and parses the config file.
 * Returns an empty object if the file doesn't exist.
 */
async function readConfigFile(): Promise<TakeNoteConfig> {
    if (!await exists(CONFIG_PATH)) {
        return {};
    }

    const raw = await Deno.readTextFile(CONFIG_PATH);
    return parse(raw) as TakeNoteConfig;
}

/**
 * Loads the named config section, merged with defaults.
 * Falls back to [default] if the named section doesn't exist.
 */
export async function loadConfig(name: string = "default"): Promise<NamedConfig> {
    const file = await readConfigFile();
    const section = (file[name] ?? file["default"] ?? {}) as NamedConfig;

    const merged: NamedConfig = {
        ...DEFAULTS,
        ...section,
    };

    // Expand ~ in paths
    if (merged.notesFolder) {
        merged.notesFolder = expandHome(merged.notesFolder);
    }
    if (merged.template) {
        merged.template = expandHome(merged.template);
    }

    return merged;
}

/**
 * Merges config values with CLI flags, with CLI flags taking precedence.
 * Only applies config value when the flag is not explicitly set.
 */
export function mergeWithFlags<T extends NamedConfig>(
    config: NamedConfig,
    flags: T
): T {
    const result = { ...flags };

    for (const key of Object.keys(config) as (keyof NamedConfig)[]) {
        if (result[key] === undefined || result[key] === null) {
            (result as Record<string, unknown>)[key] = config[key];
        }
    }

    return result;
}
