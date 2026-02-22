import { makeBooking } from "@/test/dataFactory"

export const JOHN_BOOKING = makeBooking()
export const EMILY_BOOKING = makeBooking({
  id: "b-2",
  guestName: "Emily",
  propertyId: "prop-2",
  startDate: "2026-04-10",
  endDate: "2026-04-15",
})
