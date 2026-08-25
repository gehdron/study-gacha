"use client"

import { useState } from "react";
import RoomEditorPanel from "./roomEditorPanel";
import GachaPanel from "./gachaPanel";
import StudyPanel from "./studyPanel";
import { CharacterSlot, FurnitureSlot } from "@/types";

type Tab = "decorate" | "gacha" | "study";

interface RoomHUDProps {
  characterSlots: CharacterSlot[];
  furnitureSlots: FurnitureSlot[];
  ownedCharacterIds: string[];
  ownedFurnitureIds: string[];
  onCharacterSlotChange: (slotId: string, occupantId: string | null) => void;
  onFurnitureSlotChange: (slotId: string, occupantId: string | null) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "decorate", label: "Decorate" },
  { id: "gacha", label: "Gacha" },
  { id: "study", label: "Study" },
];

export default function RoomHUD(props: RoomHUDProps) {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

  function handleTabClick(tab: Tab) {
  console.log("clicked:", tab);
  setActiveTab((prev) => {
    const next = prev === tab ? null : tab;
    console.log("activeTab changing from", prev, "to", next);
    return next;
  });
}

  return (
    <>
      {activeTab && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md max-h-[60vh] overflow-y-auto bg-neutral-950/95 backdrop-blur border border-neutral-800 rounded-2xl shadow-2xl text-white z-50">
          {activeTab === "decorate" && (
            <RoomEditorPanel
              characterSlots={props.characterSlots}
              furnitureSlots={props.furnitureSlots}
              ownedCharacterIds={props.ownedCharacterIds}
              ownedFurnitureIds={props.ownedFurnitureIds}
              onCharacterSlotChange={props.onCharacterSlotChange}
              onFurnitureSlotChange={props.onFurnitureSlotChange}
            />
          )}
          {activeTab === "gacha" && <GachaPanel />}
          {activeTab === "study" && <StudyPanel />}
        </div>
      )}

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-neutral-950/95 backdrop-blur border border-neutral-800 rounded-full px-2 py-2 shadow-xl z-50">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-purple-600 text-white"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </>
  );
}