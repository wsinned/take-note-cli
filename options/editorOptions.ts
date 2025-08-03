export enum Editor {
    generic,
    vscode,
    obsidian
}

export function isValidEditorOption(option: unknown) {
    const editor = Editor[option as keyof typeof Editor]
    return editor !== undefined
}

export function editorFromString(input: unknown): Editor {
    if (isValidEditorOption(input)) {
        const editor = Editor[input as keyof typeof Editor]
        return editor
    } else {
        throw new Error("invalid Editor option, must be one of |generic|vscode|obsidian|")
    }
}