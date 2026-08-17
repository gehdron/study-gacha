import CharacterModel from "./characterModel";
import { Suspense } from "react";
import { characterRegistry } from "@/app/data/characterRegistry";
import { CharacterSlot } from "@/types";

interface CharacterSlotProps {
    slot: CharacterSlot;
}

export default function CharacterSlotDisplay({slot}:CharacterSlotProps){
    if (slot.occupantId == null) {
        return null;
    }
    const model = characterRegistry[slot.occupantId];
    if(model == null){
        return null;
    } 
    console.log(model.url);
    return(
        <Suspense fallback={null}>
            <CharacterModel url={model.url} position={slot.position} rotation={slot.rotation} scale={model.scale}/>
        </Suspense>
    )
}



