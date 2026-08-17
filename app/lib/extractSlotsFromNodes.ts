import { Vec3, CharacterSlot, FurnitureSlot } from "@/types";
import * as THREE from 'three';

interface ExactMarkerConfig {
  matchType: "exact";
  markerName: string;
  kind: "character" | "furniture";
  slotType?: 'desk' | 'chair' | 'shelf' | 'clock' | 'computer' | 'window';
  defaultOccupantId: string | null;
}

interface PrefixMarkerConfig {
  matchType: "prefix";
  prefix: string;
  kind: "furniture";
  slotType: 'shelf';
  defaultOccupantId: string | null;
}

type SlotMarkerConfig = ExactMarkerConfig | PrefixMarkerConfig;

const slotMarkerConfig: SlotMarkerConfig[] = [
  { matchType: "exact", markerName:"MikuSlot", kind: "character", defaultOccupantId: "miku" },
  { matchType: "exact", markerName: "DeskSlot", kind: "furniture", slotType: 'desk', defaultOccupantId: "desk" },
  { matchType: "exact", markerName: "ChairSlot", kind: "furniture", slotType: 'chair', defaultOccupantId: "chair" },
  { matchType: "exact", markerName: "ClockSlot", kind: "furniture", slotType: 'clock', defaultOccupantId: "clock" },
  { matchType: "exact", markerName: "ComputerSlot", kind: "furniture", slotType: 'computer', defaultOccupantId: "computer" },
  { matchType: "exact", markerName: "WindowSlot", kind: "furniture", slotType: 'window', defaultOccupantId: "window" },
  { matchType: "prefix", prefix:"Shelf", kind: "furniture", slotType: "shelf", defaultOccupantId: "shelf" }
]

function findMarkerConfig(nodeName: string): SlotMarkerConfig | undefined {
  return slotMarkerConfig.find((config) => {
    if (config.matchType === "exact") {
      return nodeName === config.markerName;
    } else {
       return nodeName.startsWith(config.prefix) && nodeName.endsWith("Slot");
    }
  })
};

function toVec3(v: { x: number; y: number; z: number }): Vec3 {
  return [v.x, v.y, v.z];
}

export function extractSlotsFromNode(nodes: Record<string, THREE.Object3D>): {
  characterSlots: CharacterSlot[];
  furnitureSlots: FurnitureSlot[];
} {
  const characterSlots: CharacterSlot[] = [];
  const furnitureSlots: FurnitureSlot[] = [];

  Object.keys(nodes).forEach((nodeName) => {
    let config = findMarkerConfig(nodeName);
    if (config == undefined){
      return;
    } else{
      let tempNode = nodes[nodeName];
      if(config.kind == "character"){
        let tempCharSlot:CharacterSlot = {
          id:nodeName,
          position:toVec3(tempNode.position),
          rotation:toVec3(tempNode.rotation),
          occupantId:config.defaultOccupantId
        };
        characterSlots.push(tempCharSlot)
      } else{
        let tempFurnSlot:FurnitureSlot = {
          id:nodeName,
          slotType:config.slotType,
          position:toVec3(tempNode.position),
          rotation:toVec3(tempNode.rotation),
          occupantId:config.defaultOccupantId
        };
        furnitureSlots.push(tempFurnSlot)
      }
    }
  });
  return { characterSlots, furnitureSlots };
}
