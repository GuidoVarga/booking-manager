import { PROPERTIES } from "@/shared/data/properties"
import type { Property } from "@/shared/types/types"

export function getPropertyById(propertyId: string): Property | undefined {
  return PROPERTIES.find((p) => p.id === propertyId);
}
