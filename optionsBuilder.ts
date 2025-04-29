import { ParseOptions } from "@std/cli/parse-args";

export interface option {
    name: string,
    longKey: string,
    shortKey: string,
    helpText: string,
    optionType: string
}

export function buildOptions(source: option[]): ParseOptions {
    const booleanOptions: string[] = []
    const stringOptions: string[] = []
    const aliasOptions: { [key:string]: string } = {}

    source.forEach(el => {
        if (el.optionType === "string") {
            if (el.shortKey) aliasOptions[el.longKey] =  el.shortKey
            if (el.longKey) stringOptions.push(el.longKey)
        } else {
            if (el.shortKey) aliasOptions[el.longKey] =  el.shortKey
            if (el.longKey) booleanOptions.push(el.longKey)
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
    return source.map((el) => `${el.name}: ${el.longKey}, ${el.shortKey} ${el.helpText}`)
}
