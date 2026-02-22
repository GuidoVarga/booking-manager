export interface Booking {
  id: string
  guestName: string
  propertyId: string
  numberOfGuests: number
  nights: number
  startDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
}
export interface Property {
  id: string
  name: string
  description?: string
  address: string
  city: string
  state?: string
  country: string
}
