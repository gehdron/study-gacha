import { createClient } from "./client";

export async function fetchOwnedCharacters(): Promise<string[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('owned_characters')
        .select('character_id');

    if(error != null){
        console.log(error);
    }
    const characterList = data?.map((row) => row.character_id) ?? [];
    return characterList;
}

export async function fetchOwnedFurniture(): Promise<string[]>{
    const supabase = createClient();
    const { data, error } = await supabase
        .from('owned_furniture')
        .select('furniture_id');

    if(error != null){
        console.log(error);
    }
    const furnitureList = data?.map((row) => row.furniture_id) ?? [];
    return furnitureList;
}

export async function fetchRoomSlots(): Promise<Record<string, string | null>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('room_slots')
    .select('slot_id, occupant_id');

  if (error != null) {
    console.log(error);
  }

  const slotMap: Record<string, string | null> = {};
  data?.forEach((row) => {
    slotMap[row.slot_id] = row.occupant_id;
  });

  return slotMap;
}