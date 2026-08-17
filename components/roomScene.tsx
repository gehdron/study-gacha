"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CharacterSlotDisplay from "./characterSlotDisplay";
import FurnitureSlotDisplay from "./furnitureSlotDisplay";
import { extractSlotsFromNode } from "@/app/lib/extractSlotsFromNodes";
import { useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function RoomScene(){
    const { nodes, scene } = useGLTF('/Room.glb');
    const layout = extractSlotsFromNode(nodes);
    console.log(layout);
    const [characterLayout, setCharacterLayout] = useState(layout.characterSlots);
    const [furnitureLayout, setFurnitureLayout] = useState(layout.furnitureSlots);

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