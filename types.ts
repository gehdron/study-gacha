export type Vec3 = [number, number, number];

export interface CharacterModelProps{
    url:string;
    position?: Vec3;
    rotation?: Vec3;
    scale?: Vec3;
}

export interface BaseSlot {
  id: string;
  position: Vec3;
  rotation: Vec3;
  occupantId: string | null;
}

export interface FurnitureSlot extends BaseSlot{
    slotType: 'desk' | 'chair' | 'shelf';
}

export interface CharacterSlot extends BaseSlot{
}