import { Calendar, Pencil, Trash2, Users } from "lucide-react"
import type { Booking } from "@/shared/types/types"
import { Button } from "@/shared/ui/Button"
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/Card"
import { getPropertyName } from "../utils/getPropertyName"
import { formatDate } from "@/shared/utils/formatDate"

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
    <div className="space-y-3">
      {bookings.map((booking) => {
        const propertyName = getPropertyName(booking.propertyId)

        return (
          <Card
            key={booking.id}
            role="article"
            aria-label={`Booking for ${booking.guestName} at ${propertyName}`}
            data-testid={`booking-row-${booking.id}`}
            className="gap-2"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-2xl font-semibold leading-tight truncate">
                    {propertyName}
                  </h3>
                  <p className="text-lg mt-4">
                    {booking.guestName}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-1.5 pb-3">
              <div className="flex items-center gap-1.5 text-base text-muted-foreground">
                <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {booking.nights} {booking.nights === 1 ? "night" : "nights"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-base text-muted-foreground">
                <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {booking.numberOfGuests}{" "}
                  {booking.numberOfGuests === 1 ? "guest" : "guests"}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="primaryOutline"
                size="sm"
                aria-label={`Edit booking for ${booking.guestName}`}
                onClick={() => onEdit(booking.id)}
              >
                <Pencil className="mr-1 h-3 w-3" />
                Edit
              </Button>
              <Button
                variant="destructiveOutline"
                size="sm"
                aria-label={`Delete booking for ${booking.guestName}`}
                onClick={() => onDelete(booking.id)}
              >
                <Trash2 className="mr-1 h-3 w-3" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
