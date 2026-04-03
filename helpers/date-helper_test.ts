import { assertEquals } from "@std/assert/equals";
import { dateForHeader, dateFromWhen, namefromDate } from "./date-helper.ts";
import { When } from "../options/whenOptions.ts";


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
