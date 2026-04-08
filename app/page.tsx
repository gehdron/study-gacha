import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: rewards, error } = await supabase
    .from("rewards")
    .select("*");

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Study Gacha</h1>

      {error && (
        <p className="text-red-500">Error loading rewards: {error.message}</p>
      )}

      <ul className="space-y-2">
        {rewards?.map((reward) => (
          <li key={reward.id} className="rounded border p-3">
            {reward.name} - {reward.rarity}
          </li>
        ))}
      </ul>
    </main>
  );
}