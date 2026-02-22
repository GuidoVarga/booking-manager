import type { Booking } from "@/shared/types/types"

export function hasOverlap(
  newBooking: Pick<Booking, "propertyId" | "startDate" | "endDate">,
  existingBookings: Booking[],
  excludeId?: string,
): boolean {
  return existingBookings.some((existing) => {
    if (existing.id === excludeId) return false
    if (existing.propertyId !== newBooking.propertyId) return false

    return (
      newBooking.startDate < existing.endDate &&
      newBooking.endDate > existing.startDate
    )
  })
}
