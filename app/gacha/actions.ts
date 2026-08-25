// app/gacha/actions.ts
"use server"

import { createClient } from "@/app/lib/supabase/server";
import { pull } from "@/components/gachaPage";

const PULL_COST = 100;
const DUPE_REWARD = 10;

export async function performPull(prevState: any, formData: FormData) {
  const chosen = pull("base"); // "base" = your default set name — adjust as needed

  if (!chosen) {
    return { error: "Nothing available to pull right now." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("execute_pull", {
    p_chosen_id: chosen.id,
    p_chosen_kind: chosen.kind,
    p_cost: PULL_COST,
    p_dupe_currency_reward: DUPE_REWARD,
  });

  if (error) {
    return { error: error.message };
  }

  return { result: data, error: null };
}