import { getPropertyById } from "../getPropertyById"

describe("getPropertyById", () => {
  it("returns the full property for a known id", () => {
    const property = getPropertyById("prop-1")
    expect(property).toBeDefined()
    expect(property?.name).toBe("Beach House")
    expect(property?.address).toBeDefined()
  })

  it("returns undefined when property is not found", () => {
    expect(getPropertyById("unknown-id")).toBeUndefined()
  })
})
