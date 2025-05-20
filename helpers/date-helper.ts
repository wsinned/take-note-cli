import { When } from "../options/whenOptions.ts";
import { addDays, lightFormat, startOfWeek } from "npm:date-fns"

export function dateFromWhen(date: Date, when: When) {
  let monday = startOfWeek(date, { weekStartsOn: 1 })

  switch (when) {
    case When.lastWeek:
      monday = addDays(monday, -7)
      break
    case When.nextWeek:
      monday = addDays(monday, 7)
      break
    default:
      break
  }

  return monday
}

export function namefromDate(date: Date, suffix: string, ext: string) {
  return `${lightFormat(date, "yyyy-MM-dd")}-${suffix}.${ext}`
}
