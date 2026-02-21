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

interface BookingTableProps {
  bookings: Booking[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function BookingTable({ bookings, onEdit, onDelete }: BookingTableProps) {
  return (
    <Table>
      <TableCaption>List of current bookings</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Guest</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Start</TableHead>
          <TableHead>End</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">{booking.guestName}</TableCell>
            <TableCell>{getPropertyName(booking.propertyId)}</TableCell>
            <TableCell>{booking.startDate}</TableCell>
            <TableCell>{booking.endDate}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
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
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
