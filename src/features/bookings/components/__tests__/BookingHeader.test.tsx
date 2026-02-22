import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BookingHeader } from "../BookingHeader"

describe("BookingHeader", () => {
  it("shows 'No bookings yet' when count is 0", () => {
    render(<BookingHeader count={0} onNewBooking={vi.fn()} />)
    expect(screen.getByText("No bookings yet")).toBeInTheDocument()
  })

  it("shows the total count when there are bookings", () => {
    render(<BookingHeader count={3} onNewBooking={vi.fn()} />)
    expect(screen.getByText("3 total")).toBeInTheDocument()
  })

  it("calls onNewBooking when button is clicked", async () => {
    const user = userEvent.setup()
    const onNewBooking = vi.fn()
    render(<BookingHeader count={0} onNewBooking={onNewBooking} />)

    await user.click(screen.getByRole("button", { name: /new booking/i }))
    expect(onNewBooking).toHaveBeenCalledOnce()
  })
})
