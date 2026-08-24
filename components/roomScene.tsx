"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CharacterSlotDisplay from "./characterSlotDisplay";
import FurnitureSlotDisplay from "./furnitureSlotDisplay";
import { extractSlotsFromNode } from "@/app/lib/extractSlotsFromNodes";
import { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { fetchOwnedCharacters, fetchOwnedFurniture, fetchRoomSlots } from "@/app/lib/supabase/queries";
import { applySavedOccupancy } from "@/app/lib/applySavedOccupancy";

export default function RoomScene(){
    const { nodes, scene } = useGLTF('/Room.glb');
    const layout = extractSlotsFromNode(nodes);
    console.log(layout);
    const [characterLayout, setCharacterLayout] = useState(layout.characterSlots);
    const [furnitureLayout, setFurnitureLayout] = useState(layout.furnitureSlots);

    useEffect(() => {
        async function loadSavedData() {
            const characters = await fetchOwnedCharacters();
            const furniture = await fetchOwnedFurniture();
            const roomSlots = await fetchRoomSlots();

            const mergedCharacters = applySavedOccupancy(characterLayout, roomSlots);
            const mergedFurniture = applySavedOccupancy(furnitureLayout, roomSlots);

            setCharacterLayout(mergedCharacters);
            setFurnitureLayout(mergedFurniture);
        }
        loadSavedData();
    }, []);

    return(
        <div id="canvas-container" className = "w-screen h-screen">
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