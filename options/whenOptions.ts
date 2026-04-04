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

export enum DailyWhen {
    yesterday,
    today,
    tomorrow
}

export function isValidDailyWhenOption(option: unknown) {
    const when = DailyWhen[option as keyof typeof DailyWhen]
    return when !== undefined
}

export function dailyWhenFromString(input: unknown): DailyWhen {
    if (isValidDailyWhenOption(input)) {
        return DailyWhen[input as keyof typeof DailyWhen]
    } else {
        throw new Error("invalid when option, must be one of |yesterday|today|tomorrow|")
    }
}