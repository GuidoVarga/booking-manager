import { vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BookingCardList } from "../BookingCardList"
import { EMILY_BOOKING, JOHN_BOOKING } from "./mockData/mockData"
import { getPropertyName } from "../../utils/getPropertyName"

const bookings = [JOHN_BOOKING, EMILY_BOOKING]

describe("BookingCardList", () => {
  it("renders all booking cards", () => {
    render(<BookingCardList bookings={bookings} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText(JOHN_BOOKING.guestName)).toBeInTheDocument()
    expect(screen.getByText(EMILY_BOOKING.guestName)).toBeInTheDocument()
  })

  it("shows property name and dates scoped per card", () => {
    render(<BookingCardList bookings={bookings} onEdit={vi.fn()} onDelete={vi.fn()} />)

    const johnCard = screen.getByLabelText(`Booking for ${JOHN_BOOKING.guestName}`)
    within(johnCard).getByText(getPropertyName(JOHN_BOOKING.propertyId))
    within(johnCard).getByText(new RegExp(JOHN_BOOKING.startDate))
    within(johnCard).getByText(new RegExp(JOHN_BOOKING.endDate))

    const emilyCard = screen.getByLabelText(`Booking for ${EMILY_BOOKING.guestName}`)
    within(emilyCard).getByText(getPropertyName(EMILY_BOOKING.propertyId))
    within(emilyCard).getByText(new RegExp(EMILY_BOOKING.startDate))
    within(emilyCard).getByText(new RegExp(EMILY_BOOKING.endDate))
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

  it("has accessible article roles on cards", () => {
    render(<BookingCardList bookings={[JOHN_BOOKING]} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByRole("article")).toHaveAttribute(
      "aria-label",
      `Booking for ${JOHN_BOOKING.guestName}`,
    )
  })
})
