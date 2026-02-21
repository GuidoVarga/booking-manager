import { Plus } from "lucide-react"
import { Button } from "@/shared/ui/Button"

interface BookingHeaderProps {
  count: number
  onNewBooking: () => void
}

export function BookingHeader({ count, onNewBooking }: BookingHeaderProps) {
  const subtitle = count === 0 ? "No bookings yet" : `${count} total`

  return (
    <header className="flex items-center justify-between py-6">
      <div>
        <h2 className="text-xl font-semibold">Bookings</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <Button onClick={onNewBooking}>
        <Plus className="mr-2 h-4 w-4" />
        New booking
      </Button>
    </header>
  )
}
