import dayjs from "dayjs"

export function formatDate(dateStr: string, format: string = "D MMM"): string {
  return dayjs(dateStr).format(format)
}
