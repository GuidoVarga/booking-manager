import { getPropertyName } from "../getPropertyName"

describe("getPropertyName", () => {
  it("returns the property name for a known id", () => {
    expect(getPropertyName("prop-1")).toBe("Beach House")
    expect(getPropertyName("prop-2")).toBe("Mountain Cabin")
  })

  it("returns the raw id when property is not found", () => {
    expect(getPropertyName("unknown-id")).toBe("unknown-id")
  })
})
