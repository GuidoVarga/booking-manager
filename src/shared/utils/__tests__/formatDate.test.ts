import { formatDate } from "../formatDate"

describe("formatDate", () => {
  it("formats YYYY-MM-DD into 'D MMM' format", () => {
    expect(formatDate("2026-02-21")).toBe("21 Feb")
    expect(formatDate("2026-12-05")).toBe("5 Dec")
    expect(formatDate("2026-01-01")).toBe("1 Jan")
  })

  it("handles single-digit and double-digit days", () => {
    expect(formatDate("2026-03-01")).toBe("1 Mar")
    expect(formatDate("2026-03-15")).toBe("15 Mar")
  })
})
