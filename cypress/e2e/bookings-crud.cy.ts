import type { Booking } from "../../src/shared/types/types"

const SEED_BOOKING: Booking = {
  id: "seed-1",
  guestName: "Seeded Guest",
  propertyId: "prop-2",
  nights: 4,
  startDate: "2026-06-01",
  endDate: "2026-06-05",
}

describe("Bookings CRUD — smoke test", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.removeItem("booking-storage")
      },
    })
  })

  it("shows empty state when there are no bookings", () => {
    cy.contains("No bookings yet").should("be.visible")
    cy.contains("button", "Create booking").should("be.visible")
  })

  it("creates a new booking via the Sheet form", () => {
    cy.contains("button", "New booking").click()

    cy.fillBookingForm("Cypress Guest", "Mountain Cabin", "2026-06-01", "2026-06-05")
    cy.submitSheetForm()
    cy.waitForSheetClose()

    // Verify the new row is visible
    cy.contains("Cypress Guest").should("be.visible")
    cy.contains("Mountain Cabin").should("be.visible")
  })

  it("edits an existing booking", () => {
    cy.seedBookings([SEED_BOOKING])
    cy.reload()

    // Scope to the specific row — click the visible "Edit booking" button
    cy.get(`[data-testid="booking-row-${SEED_BOOKING.id}"]`).within(() => {
      cy.contains("Seeded Guest").should("be.visible")
      cy.contains("button", "Edit booking").click()
    })

    // Update guest name inside the Sheet
    cy.get('input[name="guestName"]')
      .should("be.visible")
      .clear({ force: true })
      .type("Updated Guest", { force: true })

    cy.submitSheetForm("Save changes")
    cy.waitForSheetClose()

    cy.contains("Updated Guest").should("be.visible")
    cy.contains("Seeded Guest").should("not.exist")
  })

  it("deletes a booking with confirmation", () => {
    cy.seedBookings([SEED_BOOKING])
    cy.reload()

    // Open overflow menu for the seeded booking, then click Delete
    cy.get(`[data-testid="booking-row-${SEED_BOOKING.id}"]`).within(() => {
      cy.get('button[aria-label="Actions for Seeded Guest"]').click()
    })
    // DropdownMenu renders in a portal outside the card, so we scope by role
    cy.get('[role="menu"]').within(() => {
      cy.contains('[role="menuitem"]', "Delete").click()
    })

    // Confirm in AlertDialoga
    cy.get('[role="alertdialog"]').within(() => {
      cy.contains("Are you sure you want to delete this booking?").should("be.visible")
      cy.contains("button", "Delete").click()
    })

    cy.contains("Seeded Guest").should("not.exist")
    cy.contains("No bookings yet").should("be.visible")
  })

  it("prevents overlapping bookings on the same property", () => {
    cy.seedBookings([SEED_BOOKING])
    cy.reload()
    cy.contains("Seeded Guest").should("be.visible")

    // Try to create a booking that overlaps on the same property
    cy.contains("button", "New booking").click()
    cy.fillBookingForm("Overlap Guest", "Mountain Cabin", "2026-06-03", "2026-06-07")
    cy.submitSheetForm()

    // Sheet should stay open (form not accepted)
    cy.get('[data-slot="sheet-content"]').should("be.visible")
    // Error toast should appear
    cy.contains("Could not save booking").should("exist")
  })
})
