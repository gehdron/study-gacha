"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CharacterModel from "./characterModel";
import { Suspense } from "react";

export default function RoomScene(){
    return(
        <div id="canvas-container" className = "w-screen h-screen">
            <Canvas>
                <OrbitControls/>
                <ambientLight intensity={0.5} />
                <Suspense>
                   <CharacterModel url="hatsune_miku_v6-transformed.glb"/>
                </Suspense>
            </Canvas>
        </div>
    )
}