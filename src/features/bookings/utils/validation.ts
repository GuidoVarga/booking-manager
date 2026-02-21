import { z } from "zod"

export const bookingSchema = z
  .object({
    guestName: z
      .string()
      .min(1, "Guest name is required")
      .max(100, "Guest name is too long"),
    propertyId: z.string().min(1, "Property is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  })

export type BookingFormData = z.infer<typeof bookingSchema>
