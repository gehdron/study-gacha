import { CharacterSlot, FurnitureSlot } from "@/types";

export const room1Characters:CharacterSlot[] = [
    {
        id:"a",
        position:[0,0,0],
        rotation:[0,0,0],
        occupantId:"miku"
    },
]

export const room1Furniture:FurnitureSlot[] = [
    {
        id:"aDesk",
        slotType:"desk",
        position:[2,0,0],
        rotation:[90,0,0],
        occupantId:"desk"
    },
]