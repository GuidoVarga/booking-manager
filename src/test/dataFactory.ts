import type { Booking } from "@/shared/types/types"

export function makeBooking(overrides: Partial<Booking> = {}): Booking {
  return {
    id: "b-1",
    guestName: "John",
    propertyId: "prop-1",
    startDate: "2026-03-01",
    endDate: "2026-03-05",
    ...overrides,
  }
}
