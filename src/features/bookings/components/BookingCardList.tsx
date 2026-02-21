import { Pencil, Trash2 } from "lucide-react"
import type { Booking } from "@/shared/types/types"
import { Badge } from "@/shared/ui/Badge"
import { Button } from "@/shared/ui/Button"
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/Card"
import { getPropertyName } from "../utils/getPropertyName"

interface BookingCardListProps {
  bookings: Booking[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function BookingCardList({
  bookings,
  onEdit,
  onDelete,
}: BookingCardListProps) {
  return (
    <section className="space-y-4" aria-label="Bookings list">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">{booking.guestName}</p>
              <Badge variant="secondary">
                {getPropertyName(booking.propertyId)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">
              {booking.startDate} → {booking.endDate}
            </p>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(booking.id)}
            >
              <Pencil className="mr-1 h-3 w-3" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(booking.id)}
            >
              <Trash2 className="mr-1 h-3 w-3" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}
