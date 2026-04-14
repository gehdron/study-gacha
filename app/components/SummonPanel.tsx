"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/client";

type Reward = {
  id: number;
  name: string;
  rarity: string;
  image_url: string | null;
};

const PULL_COST = 10;

export default function SummonPanel() {
  const [gems, setGems] = useState<number | null>(null);
  const [result, setResult] = useState<Reward | null>(null);
  const [message, setMessage] = useState("");
  const [isPulling, setIsPulling] = useState(false);

  const loadGems = async () => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("You must be logged in to pull.");
      setGems(null);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("gems")
      .eq("id", user.id)
      .single();

    if (error) {
      setMessage(`Error loading gems: ${error.message}`);
      setGems(null);
      return;
    }

    setGems(data.gems ?? 0);
  };

  useEffect(() => {
    loadGems();
  }, []);

  const handlePull = async () => {
    setIsPulling(true);
    setMessage("");
    setResult(null);

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("You must be logged in to pull.");
      setIsPulling(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("gems")
      .eq("id", user.id)
      .single();

    if (profileError) {
      setMessage(`Error loading profile: ${profileError.message}`);
      setIsPulling(false);
      return;
    }

    const currentGems = profile.gems ?? 0;

    if (currentGems < PULL_COST) {
      setMessage("Not enough gems for a pull.");
      setGems(currentGems);
      setIsPulling(false);
      return;
    }

    const { data: rewards, error: rewardsError } = await supabase
      .from("rewards")
      .select("*");

    if (rewardsError || !rewards || rewards.length === 0) {
      setMessage("No rewards available.");
      setIsPulling(false);
      return;
    }

    const rolledReward =
      rewards[Math.floor(Math.random() * rewards.length)] as Reward;

    const newGems = currentGems - PULL_COST;

    const { error: updateGemsError } = await supabase
      .from("profiles")
      .update({ gems: newGems })
      .eq("id", user.id);

    if (updateGemsError) {
      setMessage(`Error updating gems: ${updateGemsError.message}`);
      setIsPulling(false);
      return;
    }

    const { data: existingReward, error: existingRewardError } = await supabase
      .from("user_rewards")
      .select("*")
      .eq("user_id", user.id)
      .eq("reward_id", rolledReward.id)
      .maybeSingle();

    if (existingRewardError) {
      setMessage(`Error checking inventory: ${existingRewardError.message}`);
      setIsPulling(false);
      return;
    }

    if (existingReward) {
      const { error: updateRewardError } = await supabase
        .from("user_rewards")
        .update({ quantity: existingReward.quantity + 1 })
        .eq("id", existingReward.id);

      if (updateRewardError) {
        setMessage(`Error updating reward: ${updateRewardError.message}`);
        setIsPulling(false);
        return;
      }
    } else {
      const { error: insertRewardError } = await supabase
        .from("user_rewards")
        .insert([
          {
            user_id: user.id,
            reward_id: rolledReward.id,
            quantity: 1,
          },
        ]);

      if (insertRewardError) {
        setMessage(`Error saving reward: ${insertRewardError.message}`);
        setIsPulling(false);
        return;
      }
    }

    setGems(newGems);
    setResult(rolledReward);
    setMessage(`You pulled ${rolledReward.name}!`);
    setIsPulling(false);
  };

  const rarityStyles: Record<string, string> = {
    Common: "bg-slate-100 text-slate-700",
    Rare: "bg-blue-100 text-blue-700",
    Epic: "bg-purple-100 text-purple-700",
    Legendary: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
        <p className="text-lg font-semibold text-slate-900">Gems</p>
        <p className="text-2xl font-bold text-blue-600">
          💎 {gems ?? "..."}
        </p>
      </div>

      <button
        onClick={handlePull}
        disabled={isPulling || gems === null}
        className="w-full rounded-xl bg-blue-600 px-4 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isPulling ? "Pulling..." : `Pull x1 (${PULL_COST} gems)`}
      </button>

      {message && (
        <p className="text-center text-sm font-medium text-slate-700">
          {message}
        </p>
      )}

      {result && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="mb-2 text-sm uppercase tracking-wide text-slate-500">
            Pull Result
          </p>
          <h2 className="text-3xl font-bold text-slate-900">{result.name}</h2>
          <p
            className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
              rarityStyles[result.rarity] ?? "bg-slate-100 text-slate-700"
            }`}
          >
            {result.rarity}
          </p>
        </div>
      )}
    </div>
  );
}