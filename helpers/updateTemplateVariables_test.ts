import { assertEquals } from "@std/assert/equals";
import { updateTemplateVariables } from "./updateTemplateVariables.ts";

Deno.test("It replaces a template variable with a header date", () => {
    const date = 'Wednesday 21 May 2025'
    const content = 'Some template HEADER_DATE some more'
    assertEquals('Some template Wednesday 21 May 2025 some more', updateTemplateVariables(content, date))
})
