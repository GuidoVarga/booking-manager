import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BookingForm } from "../BookingForm"
import { JOHN_BOOKING } from "./mockData/mockData"

describe("BookingForm", () => {
  it("renders empty fields in create mode", () => {
    render(<BookingForm onSubmit={vi.fn()} onCancel={vi.fn()} />)

    expect(screen.getByLabelText(/guest name/i)).toHaveValue("")
    expect(screen.getByLabelText(/start date/i)).toHaveValue("")
    expect(screen.getByLabelText(/end date/i)).toHaveValue("")
    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /create booking/i })).toBeInTheDocument()
  })

  it("renders prefilled fields in edit mode including property", () => {
    render(<BookingForm booking={JOHN_BOOKING} onSubmit={vi.fn()} onCancel={vi.fn()} />)

    expect(screen.getByLabelText(/guest name/i)).toHaveValue(JOHN_BOOKING.guestName)
    expect(screen.getByLabelText(/start date/i)).toHaveValue(JOHN_BOOKING.startDate)
    expect(screen.getByLabelText(/end date/i)).toHaveValue(JOHN_BOOKING.endDate)
    expect(screen.getByRole("combobox")).toHaveTextContent("Beach House")
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument()
  })

  it("calls onSubmit with correct data in edit mode (happy path)", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<BookingForm booking={JOHN_BOOKING} onSubmit={onSubmit} onCancel={vi.fn()} />)

    await user.click(screen.getByRole("button", { name: /save changes/i }))

    expect(onSubmit).toHaveBeenCalledOnce()
    expect(onSubmit).toHaveBeenCalledWith(
      {
        guestName: JOHN_BOOKING.guestName,
        propertyId: JOHN_BOOKING.propertyId,
        startDate: JOHN_BOOKING.startDate,
        endDate: JOHN_BOOKING.endDate,
      },
      expect.anything(), // react-hook-form event
    )
  })

  it("shows required errors for all empty fields on submit", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<BookingForm onSubmit={onSubmit} onCancel={vi.fn()} />)

    await user.click(screen.getByRole("button", { name: /create booking/i }))

    expect(await screen.findByText(/guest name is required/i)).toBeInTheDocument()
    expect(await screen.findByText(/property is required/i)).toBeInTheDocument()
    expect(await screen.findByText(/start date is required/i)).toBeInTheDocument()
    expect(await screen.findByText(/end date is required/i)).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("shows error when end date is before start date", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<BookingForm onSubmit={onSubmit} onCancel={vi.fn()} />)

    await user.type(screen.getByLabelText(/guest name/i), "Test Guest")
    await user.type(screen.getByLabelText(/start date/i), "2026-06-10")
    await user.type(screen.getByLabelText(/end date/i), "2026-06-05")
    await user.click(screen.getByRole("button", { name: /create booking/i }))

    expect(await screen.findByText(/end date must be after start date/i)).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("shows error when guest name exceeds 100 characters", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<BookingForm onSubmit={onSubmit} onCancel={vi.fn()} />)

    await user.type(screen.getByLabelText(/guest name/i), "a".repeat(101))
    await user.click(screen.getByRole("button", { name: /create booking/i }))

    expect(await screen.findByText(/guest name is too long/i)).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("calls onCancel when Cancel button is clicked", async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()
    render(<BookingForm onSubmit={vi.fn()} onCancel={onCancel} />)

    await user.click(screen.getByRole("button", { name: /cancel/i }))
    expect(onCancel).toHaveBeenCalledOnce()
  })
})
