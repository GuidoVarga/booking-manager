import { makeBooking } from "@/test/dataFactory"
import { hasOverlap } from "../overlap"

describe("hasOverlap", () => {
  it("returns false when there are no existing bookings", () => {
    const result = hasOverlap(
      { propertyId: "prop-1", startDate: "2026-03-01", endDate: "2026-03-05" },
      [],
    )
    expect(result).toBe(false)
  })

  it("returns true when dates overlap on the same property", () => {
    const existing = [makeBooking()]
    const result = hasOverlap(
      { propertyId: "prop-1", startDate: "2026-03-03", endDate: "2026-03-07" },
      existing,
    )
    expect(result).toBe(true)
  })

  it("returns false when dates overlap on a different property", () => {
    const existing = [makeBooking()]
    const result = hasOverlap(
      { propertyId: "prop-2", startDate: "2026-03-03", endDate: "2026-03-07" },
      existing,
    )
    expect(result).toBe(false)
  })

  it("returns false when dates are adjacent (no overlap)", () => {
    const existing = [makeBooking()]
    const result = hasOverlap(
      { propertyId: "prop-1", startDate: "2026-03-05", endDate: "2026-03-10" },
      existing,
    )
    expect(result).toBe(false)
  })

  it("returns true when new booking completely contains existing", () => {
    const existing = [makeBooking()]
    const result = hasOverlap(
      { propertyId: "prop-1", startDate: "2026-02-28", endDate: "2026-03-10" },
      existing,
    )
    expect(result).toBe(true)
  })

  it("returns true when new booking is completely inside existing", () => {
    const existing = [makeBooking()]
    const result = hasOverlap(
      { propertyId: "prop-1", startDate: "2026-03-02", endDate: "2026-03-04" },
      existing,
    )
    expect(result).toBe(true)
  })

  it("excludes a booking by id (for edit mode)", () => {
    const existing = [makeBooking({ id: "b-1" })]
    const result = hasOverlap(
      { propertyId: "prop-1", startDate: "2026-03-01", endDate: "2026-03-05" },
      existing,
      "b-1",
    )
    expect(result).toBe(false)
  })

  it("still detects overlap with other bookings when excluding one", () => {
    const existing = [
      makeBooking({ id: "b-1" }),
      makeBooking({ id: "b-2", startDate: "2026-03-03", endDate: "2026-03-08" }),
    ]
    const result = hasOverlap(
      { propertyId: "prop-1", startDate: "2026-03-04", endDate: "2026-03-06" },
      existing,
      "b-1",
    )
    expect(result).toBe(true)
  })
})
