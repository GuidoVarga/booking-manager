import { CalendarPlus } from "lucide-react"
import { Button } from "@/shared/ui/Button"

interface BookingEmptyStateProps {
  onCreateBooking: () => void
}

export function BookingEmptyState({ onCreateBooking }: BookingEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <CalendarPlus className="mb-4 h-10 w-10 text-muted-foreground" />
      <h3 className="text-lg font-semibold">No bookings yet</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Create your first booking to get started.
      </p>
      <Button variant="brandAction" onClick={onCreateBooking} className="mt-6">
        Create booking
      </Button>
    </div>
  )
}
