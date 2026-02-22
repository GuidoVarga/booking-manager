import { Plus } from "lucide-react"
import { Button } from "@/shared/ui/Button"
import { Badge } from "@/shared/ui/Badge"

interface BookingHeaderProps {
  count: number
  onNewBooking: () => void
}

export function BookingHeader({ count, onNewBooking }: BookingHeaderProps) {
  return (
    <header className="flex items-center justify-between py-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Bookings</h2>
          {count === 0 ? (
            <p className="text-sm text-muted-foreground">No bookings yet</p>
          ) : (
            <Badge variant="secondary" className="text-muted-foreground font-normal">{count} total</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage upcoming stays across your properties
        </p>
      </div>
      <Button variant="brandAction" onClick={onNewBooking}>
        <Plus className="mr-2 h-4 w-4" />
        New booking
      </Button>
    </header>
  )
}
