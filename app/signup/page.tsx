"use client"

import { useActionState } from "react";
import Link from "next/link";
import { signUp } from "../login/actions";

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState<
    { error: string | null },
    FormData
  >(signUp, { error: null });

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-1">Create an account</h1>
        <p className="text-neutral-400 text-center mb-8">Start earning pulls today</p>

        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-sm text-neutral-400">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full mt-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-neutral-400">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full mt-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
            />
          </div>

          {state?.error && (
            <p className="text-red-400 text-sm">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-60 rounded-lg py-2 font-medium mt-2"
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-neutral-400 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:text-purple-300">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}