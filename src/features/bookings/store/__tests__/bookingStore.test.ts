import { beforeEach } from "vitest"
import { useBookingStore } from "../bookingStore"
import { makeBooking } from "@/test/dataFactory"

const sampleBooking = makeBooking({ id: "b-1", guestName: "John" })

describe("useBookingStore", () => {
  beforeEach(() => {
    useBookingStore.setState({ bookings: [], editingBookingId: null })
  })

  it("starts with an empty bookings array", () => {
    expect(useBookingStore.getState().bookings).toEqual([])
  })

  it("creates a booking", () => {
    useBookingStore.getState().createBooking(sampleBooking)
    expect(useBookingStore.getState().bookings).toHaveLength(1)
    expect(useBookingStore.getState().bookings[0]).toEqual(sampleBooking)
  })

  it("updates a booking", () => {
    useBookingStore.getState().createBooking(sampleBooking)
    useBookingStore.getState().updateBooking("b-1", { guestName: "Emily" })
    expect(useBookingStore.getState().bookings[0].guestName).toBe("Emily")
  })

  it("does not modify other bookings on update", () => {
    const second = makeBooking({ id: "b-2", guestName: "Carol" })
    useBookingStore.getState().createBooking(sampleBooking)
    useBookingStore.getState().createBooking(second)
    useBookingStore.getState().updateBooking("b-1", { guestName: "Updated" })
    expect(useBookingStore.getState().bookings[1].guestName).toBe("Carol")
  })

  it("deletes a booking", () => {
    useBookingStore.getState().createBooking(sampleBooking)
    useBookingStore.getState().deleteBooking("b-1")
    expect(useBookingStore.getState().bookings).toHaveLength(0)
  })

  it("clears editingBookingId when the edited booking is deleted", () => {
    useBookingStore.getState().createBooking(sampleBooking)
    useBookingStore.getState().setEditingBookingId("b-1")
    useBookingStore.getState().deleteBooking("b-1")
    expect(useBookingStore.getState().editingBookingId).toBeNull()
  })

  it("preserves editingBookingId when a different booking is deleted", () => {
    const second = makeBooking({ id: "b-2" })
    useBookingStore.getState().createBooking(sampleBooking)
    useBookingStore.getState().createBooking(second)
    useBookingStore.getState().setEditingBookingId("b-1")
    useBookingStore.getState().deleteBooking("b-2")
    expect(useBookingStore.getState().editingBookingId).toBe("b-1")
  })

  it("sets and clears editingBookingId", () => {
    useBookingStore.getState().setEditingBookingId("b-99")
    expect(useBookingStore.getState().editingBookingId).toBe("b-99")
    useBookingStore.getState().setEditingBookingId(null)
    expect(useBookingStore.getState().editingBookingId).toBeNull()
  })
})
