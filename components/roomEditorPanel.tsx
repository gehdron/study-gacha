"use client"

import { CharacterSlot, FurnitureSlot } from "@/types";
import { characterRegistry } from "@/app/data/characterRegistry";
import { furnitureRegistry } from "@/app/data/furnitureRegistry";

interface RoomEditorPanelProps {
  characterSlots: CharacterSlot[];
  furnitureSlots: FurnitureSlot[];
  ownedCharacterIds: string[];
  ownedFurnitureIds: string[];
  onCharacterSlotChange: (slotId: string, occupantId: string | null) => void;
  onFurnitureSlotChange: (slotId: string, occupantId: string | null) => void;
}

export default function RoomEditorPanel({
  characterSlots,
  furnitureSlots,
  ownedCharacterIds,
  ownedFurnitureIds,
  onCharacterSlotChange,
  onFurnitureSlotChange,
}: RoomEditorPanelProps) {
  return (
    <div className="fixed top-0 right-0 h-screen w-80 overflow-y-auto bg-neutral-900 text-white p-4 space-y-6">
      <h2 className="text-lg font-semibold">Room Editor</h2>

      <div>
        <h3 className="text-sm uppercase text-neutral-400 mb-2">Character</h3>
        {characterSlots.map((slot) => (
          <div key={slot.id} className="mb-3">
            <label className="block text-sm mb-1">{slot.id}</label>
            <select
              className="w-full bg-neutral-800 rounded p-2"
              value={slot.occupantId ?? ""}
              onChange={(e) =>
                onCharacterSlotChange(slot.id, e.target.value === "" ? null : e.target.value)
              }
            >
              <option value="">Empty</option>
              {ownedCharacterIds.map((id) => (
                <option key={id} value={id}>
                  {characterRegistry[id]?.name ?? id}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm uppercase text-neutral-400 mb-2">Furniture</h3>
        {furnitureSlots.map((slot) => {
          const eligibleIds = ownedFurnitureIds.filter(
            (id) => furnitureRegistry[id]?.slotType === slot.slotType
          );
          return (
            <div key={slot.id} className="mb-3">
              <label className="block text-sm mb-1">{slot.id}</label>
              <select
                className="w-full bg-neutral-800 rounded p-2"
                value={slot.occupantId ?? ""}
                onChange={(e) =>
                  onFurnitureSlotChange(slot.id, e.target.value === "" ? null : e.target.value)
                }
              >
                <option value="">Empty</option>
                {eligibleIds.map((id) => (
                  <option key={id} value={id}>
                    {furnitureRegistry[id]?.name ?? id}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}