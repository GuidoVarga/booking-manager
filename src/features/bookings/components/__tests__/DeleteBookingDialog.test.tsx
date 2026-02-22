import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DeleteBookingDialog } from "../DeleteBookingDialog"
import { JOHN_BOOKING } from "./mockData/mockData"
import { getPropertyById } from "../../utils/getPropertyById"
import { formatDate } from "@/shared/utils/formatDate"

const johnProperty = getPropertyById(JOHN_BOOKING.propertyId)!

describe("DeleteBookingDialog", () => {
  it("renders the dialog with contextual booking info", () => {
    render(
      <DeleteBookingDialog
        open={true}
        booking={JOHN_BOOKING}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
      />,
    )
    expect(screen.getByText("Are you sure you want to delete this booking?")).toBeInTheDocument()
    expect(screen.getByText(johnProperty.name)).toBeInTheDocument()
    expect(screen.getByText(JOHN_BOOKING.guestName)).toBeInTheDocument()
    expect(screen.getByText(`${JOHN_BOOKING.nights} nights`)).toBeInTheDocument()
    expect(screen.getByText(`${formatDate(JOHN_BOOKING.startDate)} → ${formatDate(JOHN_BOOKING.endDate)}`)).toBeInTheDocument()
  })

  it("renders nothing when booking is null", () => {
    const { container } = render(
      <DeleteBookingDialog
        open={true}
        booking={null}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
      />,
    )
    expect(container.innerHTML).toBe("")
  })

  it("does not render dialog content when closed", () => {
    render(
      <DeleteBookingDialog
        open={false}
        booking={JOHN_BOOKING}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
      />,
    )
    expect(screen.queryByText("Are you sure you want to delete this booking?")).not.toBeInTheDocument()
  })

  it("calls onConfirm when Delete button is clicked", async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    render(
      <DeleteBookingDialog
        open={true}
        booking={JOHN_BOOKING}
        onOpenChange={vi.fn()}
        onConfirm={onConfirm}
      />,
    )

    await user.click(screen.getByRole("button", { name: /delete/i }))
    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it("calls onOpenChange when Cancel button is clicked", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <DeleteBookingDialog
        open={true}
        booking={JOHN_BOOKING}
        onOpenChange={onOpenChange}
        onConfirm={vi.fn()}
      />,
    )

    await user.click(screen.getByRole("button", { name: /cancel/i }))
    expect(onOpenChange).toHaveBeenCalledOnce()
  })
})
