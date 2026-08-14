"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Slot from "./slot";
import { room1 } from "@/app/data/roomLayout";

export default function RoomScene(){

    return(
        <div id="canvas-container" className = "w-screen h-screen">
            <Canvas>
                <OrbitControls/>
                <ambientLight intensity={0.5} />
                {room1.map((item) => (
                    <Slot slot={item} key={item.id}/>
                ))}
            </Canvas>
        </div>
    )
}