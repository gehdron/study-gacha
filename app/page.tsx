import Link from "next/link";
import { createClient } from "@/lib/server";
import LogoutButton from "@/app/components/LogoutButton";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6">
        <div className="w-full rounded-3xl bg-white p-10 shadow-lg">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-slate-900">Study Gacha</h1>
            <p className="mt-4 text-lg text-slate-600">
              Pull for things!
            </p>

            {user ? (
              <div className="mt-4 space-y-2">
                <p className="text-slate-700">Signed in as {user.email}</p>
                <LogoutButton />
              </div>
            ) : (
              <div className="mt-4 flex justify-center gap-4">
                <Link
                  href="/login"
                  className="rounded-lg bg-green-600 px-4 py-2 text-white"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Link
              href="/study"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:scale-[1.02] hover:shadow-md"
            >
              <h2 className="text-2xl font-semibold text-slate-900">Study</h2>
              <p className="mt-2 text-slate-600">
                Start a focus session and log your study time.
              </p>
            </Link>

            <Link
              href="/summon"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:scale-[1.02] hover:shadow-md"
            >
              <h2 className="text-2xl font-semibold text-slate-900">Summon</h2>
              <p className="mt-2 text-slate-600">
                Spend your earned currency to roll for rewards.
              </p>
            </Link>

            <Link
              href="/collection"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:scale-[1.02] hover:shadow-md"
            >
              <h2 className="text-2xl font-semibold text-slate-900">
                Collection
              </h2>
              <p className="mt-2 text-slate-600">
                View your unlocked rewards.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}