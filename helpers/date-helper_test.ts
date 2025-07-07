import { assertEquals } from "@std/assert/equals";
import { dateFromWhen, namefromDate } from "./date-helper.ts";
import { When } from "../options/whenOptions.ts";


Deno.test("It finds Monday from this week", () => {
    const when = When['thisWeek' as keyof typeof When]
    const date = new Date('2025-05-21')
    assertEquals(new Date('2025-05-19'), dateFromWhen(date, when))
});

Deno.test("It finds Monday from next week", () => {
    const when = When['nextWeek' as keyof typeof When]
    const date = new Date('2025-05-21')
    assertEquals(new Date('2025-05-26'), dateFromWhen(date, when))
});

Deno.test("It finds Monday from last week", () => {
    const when = When['lastWeek' as keyof typeof When]
    const date = new Date('2025-05-21')
    assertEquals(new Date('2025-05-12'), dateFromWhen(date, when))
});

Deno.test("It formats a date based filename", () => {
    const date = new Date('2025-05-21')
    const [path, file] = namefromDate(date, 'Weekly-log', 'md')
    assertEquals('2025/05', path)
    assertEquals('2025-05-21-Weekly-log.md', file)
});

