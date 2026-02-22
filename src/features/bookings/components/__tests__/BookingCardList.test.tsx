import { vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BookingCardList } from "../BookingCardList"
import { EMILY_BOOKING, JOHN_BOOKING } from "./mockData/mockData"
import { getPropertyById } from "../../utils/getPropertyById"
import { formatDate } from "@/shared/utils/formatDate"

const bookings = [JOHN_BOOKING, EMILY_BOOKING]

const johnProperty = getPropertyById(JOHN_BOOKING.propertyId)!
const emilyProperty = getPropertyById(EMILY_BOOKING.propertyId)!

describe("BookingCardList", () => {
  it("renders property as title, address, and guest as subtitle per card", () => {
    render(<BookingCardList bookings={bookings} onEdit={vi.fn()} onDelete={vi.fn()} />)

    const johnCard = screen.getByLabelText(
      `Booking for ${JOHN_BOOKING.guestName} at ${johnProperty.name}`,
    )
    expect(within(johnCard).getByText(johnProperty.name)).toBeInTheDocument()
    expect(within(johnCard).getByText(johnProperty.address)).toBeInTheDocument()
    expect(within(johnCard).getByText(JOHN_BOOKING.guestName)).toBeInTheDocument()

    const emilyCard = screen.getByLabelText(
      `Booking for ${EMILY_BOOKING.guestName} at ${emilyProperty.name}`,
    )
    expect(within(emilyCard).getByText(emilyProperty.name)).toBeInTheDocument()
    expect(within(emilyCard).getByText(emilyProperty.address)).toBeInTheDocument()
    expect(within(emilyCard).getByText(EMILY_BOOKING.guestName)).toBeInTheDocument()
  })

  it("shows formatted dates, nights count, and number of guests", () => {
    render(<BookingCardList bookings={[JOHN_BOOKING]} onEdit={vi.fn()} onDelete={vi.fn()} />)

    const card = screen.getByRole("article")
    expect(within(card).getByText(new RegExp(formatDate(JOHN_BOOKING.startDate)))).toBeInTheDocument()
    expect(within(card).getByText(new RegExp(formatDate(JOHN_BOOKING.endDate)))).toBeInTheDocument()
    expect(within(card).getByText(new RegExp(`${JOHN_BOOKING.nights} nights`))).toBeInTheDocument()
    expect(within(card).getByText(new RegExp(`${JOHN_BOOKING.numberOfGuests} guests`))).toBeInTheDocument()
  })

  it("calls onEdit with the correct id", async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    render(<BookingCardList bookings={bookings} onEdit={onEdit} onDelete={vi.fn()} />)

    await user.click(screen.getByLabelText(`Edit booking for ${JOHN_BOOKING.guestName}`))
    expect(onEdit).toHaveBeenCalledOnce()
    expect(onEdit).toHaveBeenCalledWith(JOHN_BOOKING.id)
  })

  it("calls onDelete with the correct id", async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    render(<BookingCardList bookings={bookings} onEdit={vi.fn()} onDelete={onDelete} />)

    await user.click(screen.getByLabelText(`Delete booking for ${EMILY_BOOKING.guestName}`))
    expect(onDelete).toHaveBeenCalledOnce()
    expect(onDelete).toHaveBeenCalledWith(EMILY_BOOKING.id)
  })

  it("has accessible article roles with property context", () => {
    render(<BookingCardList bookings={[JOHN_BOOKING]} onEdit={vi.fn()} onDelete={vi.fn()} />)
    const card = screen.getByRole("article")
    expect(card).toHaveAttribute(
      "aria-label",
      `Booking for ${JOHN_BOOKING.guestName} at ${johnProperty.name}`,
    )
  })

  it("displays singular 'night' and 'guest' for count of 1", () => {
    const singleBooking = { ...JOHN_BOOKING, nights: 1, numberOfGuests: 1 }
    render(<BookingCardList bookings={[singleBooking]} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText(/1 night$/)).toBeInTheDocument()
    expect(screen.getByText(/1 guest$/)).toBeInTheDocument()
  })
})
