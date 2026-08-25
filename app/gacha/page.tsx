"use client"

import { useActionState } from "react";
import { performPull } from "./actions";
import { characterRegistry } from "@/app/data/characterRegistry";
import { furnitureRegistry } from "@/app/data/furnitureRegistry";

export default function GachaPage() {
  const [state, formAction, isPending] = useActionState<
    { result?: any; error: string | null },
    FormData
  >(performPull, { error: null });

  const result = state?.result;
  const resultName = result
    ? result.chosen_kind === "character"
      ? characterRegistry[result.chosen_id]?.name ?? result.chosen_id
      : furnitureRegistry[result.chosen_id]?.name ?? result.chosen_id
    : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-white">
      <h1 className="text-2xl font-semibold">Gacha</h1>

      <form action={formAction}>
        <button
          type="submit"
          disabled={isPending}
          className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-lg"
        >
          {isPending ? "Pulling..." : "Pull (100)"}
        </button>
      </form>

      {state?.error && <p className="text-red-400">{state.error}</p>}

      {result && (
        <div className="text-center">
          <p className="text-lg">
            You got: <span className="font-bold">{resultName}</span>
          </p>
          {result.was_duplicate && (
            <p className="text-neutral-400">
              (Duplicate — converted to furniture currency)
            </p>
          )}
        </div>
      )}
    </div>
  );
}