export interface Booking {
  id: string
  guestName: string
  propertyId: string
  startDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
}

export interface Property {
  id: string
  name: string
}
