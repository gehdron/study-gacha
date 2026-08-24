import { CharacterSlot, FurnitureSlot } from "@/types";

export function applySavedOccupancy(
  slots: CharacterSlot[] | FurnitureSlot[],
  savedOccupancy: Record<string, string | null>
): CharacterSlot[] | FurnitureSlot[] {
  return slots.map((slot) => {
    if(savedOccupancy[slot.id] != null){
        return { ...slot, occupantId: savedOccupancy[slot.id] };
    }
    else{
        return slot;
    }
  })
}