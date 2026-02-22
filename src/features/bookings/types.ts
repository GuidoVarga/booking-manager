import type { Booking } from "@/shared/types/types";

export type DraftBooking = Omit<Booking, "id">;
