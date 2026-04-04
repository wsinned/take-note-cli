import { assertEquals } from "@std/assert/equals";
import { dateForHeader, dateFromDailyWhen, dateFromWhen, namefromDate } from "./date-helper.ts";
import { DailyWhen, When } from "../options/whenOptions.ts";


// Use local date constructor (year, month-1, day) to avoid UTC/timezone issues
const d = (year: number, month: number, day: number) => new Date(year, month - 1, day)

Deno.test("It finds Monday from this week", () => {
    const when = When['thisWeek' as keyof typeof When]
    const date = d(2025, 5, 21)
    assertEquals(d(2025, 5, 19), dateFromWhen(date, when))
});

Deno.test("It finds Monday from next week", () => {
    const when = When['nextWeek' as keyof typeof When]
    const date = d(2025, 5, 21)
    assertEquals(d(2025, 5, 26), dateFromWhen(date, when))
});

Deno.test("It finds Monday from last week", () => {
    const when = When['lastWeek' as keyof typeof When]
    const date = d(2025, 5, 21)
    assertEquals(d(2025, 5, 12), dateFromWhen(date, when))
});

Deno.test("It formats a date based filename", () => {
    const date = d(2025, 5, 21)
    const [path, file] = namefromDate(date, 'Weekly-log', 'md')
    assertEquals('2025/05', path)
    assertEquals('2025-05-21-Weekly-log.md', file)
});

Deno.test("It formats a date based header", () => {
    const date = d(2025, 5, 21)
    assertEquals('Wednesday 21 May 2025', dateForHeader(date))
})

Deno.test("dateFromDailyWhen returns the same date for today", () => {
    const date = d(2025, 5, 21)
    assertEquals(d(2025, 5, 21), dateFromDailyWhen(date, DailyWhen.today))
})

Deno.test("dateFromDailyWhen returns the previous day for yesterday", () => {
    const date = d(2025, 5, 21)
    assertEquals(d(2025, 5, 20), dateFromDailyWhen(date, DailyWhen.yesterday))
})

Deno.test("dateFromDailyWhen returns the next day for tomorrow", () => {
    const date = d(2025, 5, 21)
    assertEquals(d(2025, 5, 22), dateFromDailyWhen(date, DailyWhen.tomorrow))
})

Deno.test("dateFromDailyWhen crosses month boundary correctly", () => {
    const date = d(2025, 5, 31)
    assertEquals(d(2025, 6, 1), dateFromDailyWhen(date, DailyWhen.tomorrow))
})
