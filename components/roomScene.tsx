"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CharacterSlotDisplay from "./characterSlotDisplay";
import FurnitureSlotDisplay from "./furnitureSlotDisplay";
import { room1Characters, room1Furniture } from "@/app/data/roomLayout";
import { useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function RoomScene(){
    const [characterLayout, setCharacterLayout] = useState(room1Characters)
    const [furnitureLayout, setFurnitureLayout] = useState(room1Furniture)

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