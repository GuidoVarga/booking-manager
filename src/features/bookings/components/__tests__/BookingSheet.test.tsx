import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { BookingSheet } from "../BookingSheet"
import { JOHN_BOOKING } from "./mockData/mockData"

describe("BookingSheet", () => {
  it("renders 'New booking' title in create mode", () => {
    render(
      <BookingSheet open={true} onOpenChange={vi.fn()} onSubmit={vi.fn()} />,
    )
    expect(screen.getByText("New booking")).toBeInTheDocument()
    expect(screen.getByText("Fill in the booking details.")).toBeInTheDocument()
  })

  it("renders 'Edit booking' title in edit mode", () => {
    render(
      <BookingSheet
        open={true}
        booking={JOHN_BOOKING}
        onOpenChange={vi.fn()}
        onSubmit={vi.fn()}
      />,
    )
    expect(screen.getByText("Edit booking")).toBeInTheDocument()
  })

  it("does not render content when closed", () => {
    render(
      <BookingSheet open={false} onOpenChange={vi.fn()} onSubmit={vi.fn()} />,
    )
    expect(screen.queryByText("New booking")).not.toBeInTheDocument()
  })

  it("renders the booking form inside the sheet", () => {
    render(
      <BookingSheet open={true} onOpenChange={vi.fn()} onSubmit={vi.fn()} />,
    )
    expect(screen.getByLabelText(/guest name/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /create booking/i })).toBeInTheDocument()
  })

  it("renders Save changes button in edit mode", () => {
    render(
      <BookingSheet
        open={true}
        booking={JOHN_BOOKING}
        onOpenChange={vi.fn()}
        onSubmit={vi.fn()}
      />,
    )
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument()
  })
})
