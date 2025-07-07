export enum When {
    none,
    lastWeek,
    thisWeek,
    nextWeek
}

export function isValidWhenOption(option: unknown) {
    const when = When[option as keyof typeof When]
    return when !== undefined
}