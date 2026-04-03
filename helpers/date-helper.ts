import { When } from "../options/whenOptions.ts";
import { addDays, format, lightFormat, startOfWeek } from "date-fns"

export function dateFromWhen(date: Date, when: When): Date {
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

export function namefromDate(date: Date, suffix: string, ext: string): [string, string] {
  const pathPart = `${lightFormat(date, "yyyy/MM")}`
  const fileName = `${lightFormat(date, "yyyy-MM-dd")}-${suffix}.${ext}`
  return [pathPart, fileName]
}

export function dateForHeader(date: Date): string {
  return `${format(date, 'EEEE d MMMM yyyy')}`
}
