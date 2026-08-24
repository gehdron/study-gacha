"use client"
import { useActionState } from "react";
import Link from "next/link";
import { signIn } from "./actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<{ error: string | null }, FormData>(
    signIn,
    { error: null }
  );

  return (
    <form action={formAction}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required />

      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" required />

      {state?.error && <p>{state.error}</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? "Pending" : "Sign In"}
      </button>

      <p>
        Don't have an account? <Link href="/signup">Sign up</Link>
      </p>
    </form>
  );
}