import { Pencil, Trash2 } from "lucide-react"
import type { Booking } from "@/shared/types/types"
import { Button } from "@/shared/ui/Button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/Table"
import { getPropertyName } from "../utils/getPropertyName"
import { formatDate } from "@/shared/utils/formatDate"

interface BookingTableProps {
  bookings: Booking[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function BookingTable({ bookings, onEdit, onDelete }: BookingTableProps) {
  return (
    <Table>
      <TableCaption className="sr-only">List of current bookings</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground">Property</TableHead>
          <TableHead className="text-muted-foreground">Guest</TableHead>
          <TableHead className="text-right text-muted-foreground">Guests</TableHead>
          <TableHead className="text-right text-muted-foreground">Nights</TableHead>
          <TableHead className="text-muted-foreground text-right">Check-in</TableHead>
          <TableHead className="text-muted-foreground text-right">Check-out</TableHead>
          <TableHead className="text-right text-muted-foreground">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id} data-testid={`booking-row-${booking.id}`}>
            <TableCell className="font-medium">{getPropertyName(booking.propertyId)}</TableCell>
            <TableCell>{booking.guestName}</TableCell>
            <TableCell className="text-right">{booking.numberOfGuests}</TableCell>
            <TableCell className="text-right">{booking.nights}</TableCell>
            <TableCell className="text-right">{formatDate(booking.startDate)}</TableCell>
            <TableCell className="text-right">{formatDate(booking.endDate)}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
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
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
