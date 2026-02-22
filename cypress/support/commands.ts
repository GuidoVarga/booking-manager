import type { Booking } from "../../src/shared/types/types"

const STORAGE_KEY = "booking-storage"

/** Zustand persist format */
interface PersistedState {
  state: { bookings: Booking[] }
  version: number
}

// ---------------------------------------------------------------------------
// Custom Commands
// ---------------------------------------------------------------------------

Cypress.Commands.add("seedBookings", (bookings: Booking[]) => {
  const data: PersistedState = {
    state: { bookings },
    version: 0,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
})

/**
 * Fill the booking form inside the open Sheet.
 *
 * NOTE: `{ force: true }` is used on inputs inside the Sheet because Radix UI
 * scroll-lock sets `pointer-events: none` on `<body>`. The Sheet content itself
 * has `pointer-events: auto`, so elements ARE interactable — Cypress just can't
 * detect it through the body inheritance chain. This is a well-known Radix +
 * Cypress interaction issue, not a real accessibility problem.
 */
Cypress.Commands.add(
  "fillBookingForm",
  (guest: string, property: string, start: string, end: string, numberOfGuests = 2) => {
    cy.get('[data-slot="sheet-content"]').should("be.visible")

    cy.get('input[name="guestName"]').should("be.visible").type(guest, { force: true })

    // Select property via combobox
    cy.get('[data-testid="property-select"]').click({ force: true })
    cy.contains('[role="option"]', property).should("be.visible").click()
    // Assert selection is reflected in trigger text (avoids cy.wait)
    cy.get('[data-testid="property-select"]').should("contain.text", property)

    // Set number of guests (clear default first, then type new value)
    cy.get('input[name="numberOfGuests"]')
      .clear({ force: true })
      .type(String(numberOfGuests), { force: true })

    cy.get('input[name="startDate"]').type(start, { force: true })
    cy.get('input[name="endDate"]').type(end, { force: true })
  },
)

Cypress.Commands.add("submitSheetForm", (label = "Create booking") => {
  cy.get('[data-slot="sheet-content"]')
    .contains("button", label)
    .click({ force: true })
})

Cypress.Commands.add("waitForSheetClose", () => {
  cy.get('[data-slot="sheet-content"]').should("not.exist")
})

// ---------------------------------------------------------------------------
// Type declarations
// ---------------------------------------------------------------------------

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      seedBookings(bookings: Booking[]): Chainable<void>
      fillBookingForm(
        guest: string,
        property: string,
        start: string,
        end: string,
        numberOfGuests?: number,
      ): Chainable<void>
      submitSheetForm(label?: string): Chainable<void>
      waitForSheetClose(): Chainable<void>
    }
  }
}
