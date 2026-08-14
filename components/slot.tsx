import CharacterModel from "./characterModel";
import { Suspense } from "react";
import { characterRegistry } from "@/app/data/registry";
import { CharacterSlot } from "@/types";

interface SlotProps {
    slot: CharacterSlot;
}

export default function Slot({slot}:SlotProps){
    if (slot.occupantId == null) {
        return null;
    }
    const model = characterRegistry[slot.occupantId];
    if(model == null){
        return null;
    }
    return(
        <Suspense fallback={null}>
            <CharacterModel url={model.url} position={slot.position} rotation={slot.rotation} scale={model.scale}/>
        </Suspense>
    )
}

