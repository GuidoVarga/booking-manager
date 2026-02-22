import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DeleteBookingDialog } from "../DeleteBookingDialog"

describe("DeleteBookingDialog", () => {
  it("renders the dialog when open", () => {
    render(
      <DeleteBookingDialog open={true} onOpenChange={vi.fn()} onConfirm={vi.fn()} />,
    )
    expect(screen.getByText("Are you sure you want to delete this booking?")).toBeInTheDocument()
    expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument()
  })

  it("does not render dialog content when closed", () => {
    render(
      <DeleteBookingDialog open={false} onOpenChange={vi.fn()} onConfirm={vi.fn()} />,
    )
    expect(screen.queryByText("Are you sure you want to delete this booking?")).not.toBeInTheDocument()
  })

  it("calls onConfirm when Delete button is clicked", async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    render(
      <DeleteBookingDialog open={true} onOpenChange={vi.fn()} onConfirm={onConfirm} />,
    )

    await user.click(screen.getByRole("button", { name: /delete/i }))
    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it("calls onOpenChange when Cancel button is clicked", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <DeleteBookingDialog open={true} onOpenChange={onOpenChange} onConfirm={vi.fn()} />,
    )

    await user.click(screen.getByRole("button", { name: /cancel/i }))
    expect(onOpenChange).toHaveBeenCalledOnce()
  })
})
