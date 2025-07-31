export enum When {
    lastWeek,
    thisWeek,
    nextWeek
}

export function isValidWhenOption(option: unknown) {
    const when = When[option as keyof typeof When]
    return when !== undefined
}

export function whenFromString(input: unknown): When {
    if (isValidWhenOption(input)) {
        const when = When[input as keyof typeof When]
        return when
    } else {
        throw new Error("invalid When option, must be one of |thisWeek|nextWeek|lastWeek|")
    }
}