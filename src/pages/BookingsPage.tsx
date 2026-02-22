import { useCallback, useState } from "react"
import { toast } from "sonner"
import { useBookingStore } from "@/features/bookings/store/bookingStore"
import { hasOverlap } from "@/features/bookings/utils/overlap"
import type { BookingFormData } from "@/features/bookings/utils/validation"
import { useDevice } from "@/shared/hooks/useDevice"
import { BookingHeader } from "@/features/bookings/components/BookingHeader"
import { BookingEmptyState } from "@/features/bookings/components/BookingEmptyState"
import { BookingTable } from "@/features/bookings/components/BookingTable"
import { BookingCardList } from "@/features/bookings/components/BookingCardList"
import { BookingSheet } from "@/features/bookings/components/BookingSheet"
import { DeleteBookingDialog } from "@/features/bookings/components/DeleteBookingDialog"

export default function BookingsPage() {
  const {
    bookings,
    editingBookingId,
    createBooking,
    updateBooking,
    deleteBooking,
    setEditingBookingId,
  } = useBookingStore()

  const { isDesktop } = useDevice()

  const [sheetOpen, setSheetOpen] = useState(false)
  const [deletingBookingId, setDeletingBookingId] = useState<string | null>(null)

  const editingBooking = editingBookingId
    ? bookings.find((b) => b.id === editingBookingId) ?? null
    : null

  const handleNewBooking = () => {
    setEditingBookingId(null)
    setSheetOpen(true)
  };

  const handleEdit = (id: string) => {
    setEditingBookingId(id)
    setSheetOpen(true)
  };

  const handleSheetClose = useCallback(
    (open: boolean) => {
      if (!open) {
        setEditingBookingId(null)
      }
      setSheetOpen(open)
    },
    [setEditingBookingId],
  )

  const handleSubmit = useCallback(
    (data: BookingFormData) => {
      if (hasOverlap(data, bookings, editingBookingId ?? undefined)) {
        toast.error("Could not save booking", {
          description:
            "This property already has a booking overlapping those dates.",
        })
        return;
      }

      if (editingBookingId) {
        updateBooking(editingBookingId, data)
        toast.success("Booking updated")
      } else {
        createBooking({
          id: crypto.randomUUID(),
          ...data,
        })
        toast.success("Booking created")
      }

      handleSheetClose(false)
    },
    [bookings, editingBookingId, createBooking, updateBooking, handleSheetClose],
  )

  const handleDeleteRequest = useCallback((id: string) => {
    setDeletingBookingId(id)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    if (deletingBookingId) {
      deleteBooking(deletingBookingId)
      toast.success("Booking deleted")
      setDeletingBookingId(null)
    }
  }, [deletingBookingId, deleteBooking])

  return (
    <>
      <BookingHeader count={bookings.length} onNewBooking={handleNewBooking} />

      <section aria-label="Bookings list" className="py-2">
        {bookings.length === 0 ? (
          <BookingEmptyState onCreateBooking={handleNewBooking} />
        ) : isDesktop ? (
          <BookingTable
            bookings={bookings}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
          />
        ) : (
          <BookingCardList
            bookings={bookings}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
          />
        )}
      </section>

      <BookingSheet
        open={sheetOpen}
        booking={editingBooking}
        onOpenChange={handleSheetClose}
        onSubmit={handleSubmit}
      />

      <DeleteBookingDialog
        open={!!deletingBookingId}
        onOpenChange={(open) => {
          if (!open) setDeletingBookingId(null)
        }}
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}
