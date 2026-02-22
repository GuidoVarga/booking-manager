import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BookingTable } from "../BookingTable"
import { JOHN_BOOKING, EMILY_BOOKING } from "./mockData/mockData"
import { getPropertyName } from "../../utils/getPropertyName"

const bookings = [JOHN_BOOKING, EMILY_BOOKING]

describe("BookingTable", () => {
  it("renders all bookings", () => {
    render(<BookingTable bookings={bookings} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText(JOHN_BOOKING.guestName)).toBeInTheDocument()
    expect(screen.getByText(EMILY_BOOKING.guestName)).toBeInTheDocument()
  })

  it("renders property names instead of ids", () => {
    render(<BookingTable bookings={bookings} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText(getPropertyName(JOHN_BOOKING.propertyId))).toBeInTheDocument()
    expect(screen.getByText(getPropertyName(EMILY_BOOKING.propertyId))).toBeInTheDocument()
  })

  it("calls onEdit with the correct id", async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    render(<BookingTable bookings={bookings} onEdit={onEdit} onDelete={vi.fn()} />)

    await user.click(screen.getByLabelText(`Edit booking for ${JOHN_BOOKING.guestName}`))
    expect(onEdit).toHaveBeenCalledOnce()
    expect(onEdit).toHaveBeenCalledWith(JOHN_BOOKING.id)
  })

  it("calls onDelete with the correct id", async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    render(<BookingTable bookings={bookings} onEdit={vi.fn()} onDelete={onDelete} />)

    await user.click(screen.getByLabelText(`Delete booking for ${EMILY_BOOKING.guestName}`))
    expect(onDelete).toHaveBeenCalledOnce()
    expect(onDelete).toHaveBeenCalledWith(EMILY_BOOKING.id)
  })

  it("renders accessible table caption", () => {
    render(<BookingTable bookings={bookings} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText("List of current bookings")).toBeInTheDocument()
  })
})
