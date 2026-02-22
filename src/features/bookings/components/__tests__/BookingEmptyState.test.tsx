import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BookingEmptyState } from "../BookingEmptyState"

describe("BookingEmptyState", () => {
  it("renders the empty state message", () => {
    render(<BookingEmptyState onCreateBooking={vi.fn()} />)
    expect(screen.getByText("No bookings yet")).toBeInTheDocument()
    expect(screen.getByText(/Create your first booking/)).toBeInTheDocument()
  })

  it("calls onCreateBooking when the button is clicked", async () => {
    const user = userEvent.setup()
    const onCreateBooking = vi.fn()
    render(<BookingEmptyState onCreateBooking={onCreateBooking} />)

    await user.click(screen.getByRole("button", { name: /create booking/i }))
    expect(onCreateBooking).toHaveBeenCalledOnce()
  })
})
