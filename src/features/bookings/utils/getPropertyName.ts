import { PROPERTIES } from "@/shared/data/properties"

export function getPropertyName(propertyId: string): string {
  return PROPERTIES.find((p) => p.id === propertyId)?.name ?? propertyId
}
