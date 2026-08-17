import FurnitureModel from "./furnitureModel";
import { Suspense } from "react";
import { furnitureRegistry } from "@/app/data/furnitureRegistry";
import { FurnitureSlot } from "@/types";

interface FurnitureSlotProps{
    slot: FurnitureSlot;
}

export default function FurnitureSlotDisplay({slot}:FurnitureSlotProps){
    if (slot.occupantId == null) {
            return null;
        }
        const model = furnitureRegistry[slot.occupantId];
        if(model == null){
            return null;
        }
        console.log(model.url);
        return(
            <Suspense fallback={null}>
                <FurnitureModel url={model.url} position={slot.position} rotation={slot.rotation} scale={model.scale}/>
            </Suspense>
        )
}