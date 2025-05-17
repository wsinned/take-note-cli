import { assertEquals } from "@std/assert/equals";
import { isValidWhenOption, When } from "./whenOptions.ts";


Deno.test("It parses a when option", () => {
    const when = When['thisWeek' as keyof typeof When]
    assertEquals(when, When.thisWeek)
});

Deno.test("It parses an invalid when option as undefined", () => {
    const when = When['invalid' as keyof typeof When]
    assertEquals(when, undefined)
});

Deno.test("It can spot a valid when option", () => {
    assertEquals(true, isValidWhenOption('thisWeek'))
});

Deno.test("It can spot an invalid when option", () => {
    assertEquals(false, isValidWhenOption('someWeek'))
});