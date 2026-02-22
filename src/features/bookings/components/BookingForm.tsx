import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Booking } from "@/shared/types/types"
import { PROPERTIES } from "@/shared/data/properties"
import { Button } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select"
import {
  bookingSchema,
  type BookingFormData,
} from "../utils/validation"

interface BookingFormProps {
  booking?: Booking | null
  onSubmit: (data: BookingFormData) => void
  onCancel: () => void
}

export function BookingForm({ booking, onSubmit, onCancel }: BookingFormProps) {
  const isEditing = !!booking

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: booking?.guestName || "",
      propertyId: booking?.propertyId || "",
      startDate: booking?.startDate || "",
      endDate: booking?.endDate || "",
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col"
      >
        <div className="flex-1 space-y-4 px-4">
          <FormField
            control={form.control}
            name="guestName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guest name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="propertyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger data-testid="property-select">
                      <SelectValue placeholder="Select a property" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROPERTIES.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 border-t px-4 pt-4 mt-6 mb-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Save changes" : "Create booking"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
