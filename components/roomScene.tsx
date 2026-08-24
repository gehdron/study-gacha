"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CharacterSlotDisplay from "./characterSlotDisplay";
import FurnitureSlotDisplay from "./furnitureSlotDisplay";
import { extractSlotsFromNode } from "@/app/lib/extractSlotsFromNodes";
import { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { fetchOwnedCharacters, fetchOwnedFurniture, fetchRoomSlots, saveRoomSlot } from "@/app/lib/supabase/queries";
import { applySavedOccupancy } from "@/app/lib/applySavedOccupancy";
import RoomEditorPanel from "./roomEditorPanel";

export default function RoomScene(){
    const { nodes, scene } = useGLTF('/Room.glb');
    const layout = extractSlotsFromNode(nodes);
    console.log(layout);
    const [characterLayout, setCharacterLayout] = useState(layout.characterSlots);
    const [furnitureLayout, setFurnitureLayout] = useState(layout.furnitureSlots);
    const [ownedCharacterIds, setOwnedCharacterIds] = useState<string[]>([]);
    const [ownedFurnitureIds, setOwnedFurnitureIds] = useState<string[]>([]);

    useEffect(() => {
        async function loadSavedData() {
            const characters = await fetchOwnedCharacters();
            const furniture = await fetchOwnedFurniture();
            const roomSlots = await fetchRoomSlots();

            const mergedCharacters = applySavedOccupancy(characterLayout, roomSlots);
            const mergedFurniture = applySavedOccupancy(furnitureLayout, roomSlots);

            setCharacterLayout(mergedCharacters);
            setFurnitureLayout(mergedFurniture);
            setOwnedCharacterIds(characters);
            setOwnedFurnitureIds(furniture);
        }
        loadSavedData();
    }, []);

    function handleCharacterSlotChange(slotId: string, occupantId: string | null) {
        setCharacterLayout((prev) =>
            prev.map((slot) =>
            slot.id === slotId ? { ...slot, occupantId } : slot
            )
        );
        saveRoomSlot(slotId, occupantId);
    }
    function handleFurnitureSlotChange(slotId: string, occupantId: string | null) {
        setFurnitureLayout((prev) =>
            prev.map((slot) =>
            slot.id === slotId ? { ...slot, occupantId } : slot
            )
        );
        saveRoomSlot(slotId, occupantId);
    }

    return(
        <div id="canvas-container" className = "w-screen h-screen">
            <RoomEditorPanel
                characterSlots={characterLayout}
                furnitureSlots={furnitureLayout}
                ownedCharacterIds={ownedCharacterIds}
                ownedFurnitureIds={ownedFurnitureIds}
                onCharacterSlotChange={handleCharacterSlotChange}
                onFurnitureSlotChange={handleFurnitureSlotChange}
            />
            <Canvas>
                <OrbitControls/>
                <ambientLight intensity={1} />
                {characterLayout.map((item) => (
                    <CharacterSlotDisplay slot={item} key={item.id}/>
                ))}
                {furnitureLayout.map((item) => (
                    <FurnitureSlotDisplay slot={item} key={item.id}/>
                ))}
            </Canvas>
        </div>
    )
}