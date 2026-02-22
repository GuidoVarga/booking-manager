import type { Booking } from "@/shared/types/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface BookingState {
  bookings: Booking[]
  editingBookingId: string | null
  createBooking: (booking: Booking) => void
  updateBooking: (id: string, updated: Partial<Booking>) => void
  deleteBooking: (id: string) => void
  setEditingBookingId: (id: string | null) => void
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      bookings: [],
      editingBookingId: null,

      createBooking: (booking) =>
        set((state) => ({ bookings: [...state.bookings, booking] })),

      updateBooking: (id, updated) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, ...updated } : b,
          ),
        })),

      deleteBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
          editingBookingId:
            state.editingBookingId === id ? null : state.editingBookingId,
        })),

      setEditingBookingId: (id) => set({ editingBookingId: id }),
    }),
    {
      name: "booking-storage",
      partialize: (state) => ({ bookings: state.bookings }),
    },
  ),
)
