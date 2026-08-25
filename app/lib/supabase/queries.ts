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

export async function saveRoomSlot(slot_id: string, occupant_id: string | null) {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError != null || userData.user == null) {
    console.log(userError);
    return;
  }

  const { data, error } = await supabase
    .from('room_slots')
    .upsert({
      user_id: userData.user.id,
      slot_id: slot_id,
      occupant_id: occupant_id,
    }, { onConflict: 'user_id,slot_id' });

  if (error != null) {
    console.log(error);
  }
}

export async function fetchTasks(): Promise<
  { id: string; title: string; taskType: "daily" | "weekly" | "monthly"; estimatedMinutes: number; completed: boolean }[]
> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("id, title, task_type, estimated_minutes, completed")
    .eq("completed", false);

  if (error != null) {
    console.log(error);
  }

  return (
    data?.map((row) => ({
      id: row.id,
      title: row.title,
      taskType: row.task_type,
      estimatedMinutes: row.estimated_minutes,
      completed: row.completed,
    })) ?? []
  );
}