import { ParseOptions } from "@std/cli/parse-args";
import { option } from "./option.ts";

export function buildOptions(source: option[]): ParseOptions {
    const booleanOptions: string[] = []
    const stringOptions: string[] = []
    const aliasOptions: { [key:string]: string } = {}

    source.forEach(el => {
        if (el.optionType === "string") {
            if (el.shortKey) aliasOptions[el.longKey] =  el.shortKey
            stringOptions.push(el.longKey)
        } else {
            if (el.shortKey) aliasOptions[el.longKey] =  el.shortKey
            booleanOptions.push(el.longKey)
        }
    });
    const newOptions: ParseOptions = {
        boolean: booleanOptions,
        string: stringOptions,
        alias: aliasOptions
    }
    return newOptions
}

export function buildHelp(source: option[]): string[] {
    return source.map((el) => `${el.name}: ${el.longKey}, ${el.shortKey?? ""} ${el.helpText}`)
}
