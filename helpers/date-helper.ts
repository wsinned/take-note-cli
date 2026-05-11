import { When, DailyWhen } from "../options/whenOptions.ts";
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

export function dateFromDailyWhen(date: Date, when: DailyWhen): Date {
  switch (when) {
    case DailyWhen.yesterday:
      return addDays(date, -1)
    case DailyWhen.tomorrow:
      return addDays(date, 1)
    default:
      return date
  }
}

export function namefromDate(date: Date, suffix: string, ext: string): [string, string] {
  const pathPart = `${lightFormat(date, "yyyy/MM")}`
  const fileName = `${lightFormat(date, "yyyy-MM-dd")}-${suffix}.${ext}`
  return [pathPart, fileName]
}

export function dateForHeader(date: Date): string {
  return `${format(date, 'EEEE d MMMM yyyy')}`
}

export function getBatchDates(startDate: Date, batchSize: number): Date[] {
  const dates: Date[] = [];
  for (let i = 0; i < batchSize; i++) {
    dates.push(addDays(startDate, i * 7));
  }
  return dates;
}
