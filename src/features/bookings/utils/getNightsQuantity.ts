import dayjs from "dayjs";

export function getNightsQuantity(startDate: string, endDate: string): number {
  return dayjs(endDate).diff(dayjs(startDate), 'day');
}