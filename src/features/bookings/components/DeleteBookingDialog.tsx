import type { Booking } from "@/shared/types/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/AlertDialog"
import { getPropertyById } from "../utils/getPropertyById"
import { formatDate } from "@/shared/utils/formatDate"

interface DeleteBookingDialogProps {
  open: boolean
  booking: Booking | null;
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteBookingDialog({
  open,
  booking,
  onOpenChange,
  onConfirm,
}: DeleteBookingDialogProps) {

  if (!booking) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this booking?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-0.5 text-sm">
              <p className="text-base font-semibold text-foreground">
                {getPropertyById(booking.propertyId)?.name}
              </p>
              <p className="text-muted-foreground">{booking.guestName}</p>
              <p className="text-muted-foreground">{booking.nights} nights</p>
              <p className="text-muted-foreground">
                {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
