import { vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BookingTable } from "../BookingTable"
import { JOHN_BOOKING, EMILY_BOOKING } from "./mockData/mockData"
import { getPropertyById } from "../../utils/getPropertyById"
import { formatDate } from "@/shared/utils/formatDate"

const bookings = [JOHN_BOOKING, EMILY_BOOKING]

const johnProperty = getPropertyById(JOHN_BOOKING.propertyId)!

describe("BookingTable", () => {
  it("renders property name and address as first column", () => {
    render(<BookingTable bookings={bookings} onEdit={vi.fn()} onDelete={vi.fn()} />)

    const johnRow = screen.getByTestId(`booking-row-${JOHN_BOOKING.id}`)
    const cells = within(johnRow).getAllByRole("cell")

    expect(cells[0]).toHaveTextContent(johnProperty.name)
    expect(cells[0]).toHaveTextContent(johnProperty.address)
    expect(cells[1]).toHaveTextContent(JOHN_BOOKING.guestName)
  })

  it("renders formatted dates instead of ISO strings", () => {
    render(<BookingTable bookings={bookings} onEdit={vi.fn()} onDelete={vi.fn()} />)

    expect(screen.getByText(formatDate(JOHN_BOOKING.startDate))).toBeInTheDocument()
    expect(screen.getByText(formatDate(JOHN_BOOKING.endDate))).toBeInTheDocument()
  })

  it("renders column headers with Check-in / Check-out labels", () => {
    render(<BookingTable bookings={bookings} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText("Check-in")).toBeInTheDocument()
    expect(screen.getByText("Check-out")).toBeInTheDocument()
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

  it("renders accessible table caption (sr-only)", () => {
    render(<BookingTable bookings={bookings} onEdit={vi.fn()} onDelete={vi.fn()} />)
    const caption = screen.getByText("List of current bookings")
    expect(caption).toBeInTheDocument()
    expect(caption).toHaveClass("sr-only")
  })
})
