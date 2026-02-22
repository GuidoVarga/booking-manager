import type { Booking } from "@/shared/types/types"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/Sheet"
import { BookingForm } from "./BookingForm"
import type { BookingFormData } from "../utils/validation"

interface BookingSheetProps {
  open: boolean
  booking?: Booking | null
  onOpenChange: (open: boolean) => void
  onSubmit: (data: BookingFormData) => void
}

export function BookingSheet({
  open,
  booking,
  onOpenChange,
  onSubmit,
}: BookingSheetProps) {
  const isEditing = !!booking
  const title = isEditing ? "Edit booking" : "New booking"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>Fill in the booking details.</SheetDescription>
        </SheetHeader>

        <BookingForm
          booking={booking}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  )
}
