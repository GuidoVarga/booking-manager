import { bookingSchema } from "../validation"
import { expectZodError } from "@/test/zodHelpers"

const validData = {
  guestName: "Jane Smith",
  propertyId: "prop-1",
  numberOfGuests: 2,
  startDate: "2026-04-01",
  endDate: "2026-04-05",
}

describe("bookingSchema", () => {
  it("accepts valid data", () => {
    const result = bookingSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it("rejects empty guest name", () => {
    expectZodError(
      bookingSchema,
      { ...validData, guestName: "" },
      "guestName",
      "Guest name is required",
    )
  })

  it("rejects guest name longer than 100 characters", () => {
    expectZodError(
      bookingSchema,
      { ...validData, guestName: "a".repeat(101) },
      "guestName",
      "Guest name is too long",
    )
  })

  it("rejects empty property id", () => {
    const result = bookingSchema.safeParse({ ...validData, propertyId: "" })
    expect(result.success).toBe(false)
  })

  it("rejects zero guests", () => {
    expectZodError(
      bookingSchema,
      { ...validData, numberOfGuests: 0 },
      "numberOfGuests",
      "At least 1 guest is required",
    )
  })

  it("rejects when end date is before start date", () => {
    expectZodError(
      bookingSchema,
      { ...validData, startDate: "2026-04-05", endDate: "2026-04-01" },
      "endDate",
      "End date must be after start date",
    )
  })

  it("rejects when start date equals end date", () => {
    const result = bookingSchema.safeParse({
      ...validData,
      startDate: "2026-04-05",
      endDate: "2026-04-05",
    })
    expect(result.success).toBe(false)
  })
})
