"use client"
import { useActionState } from "react";
import Link from "next/link";
import { signUp } from "../login/actions";

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState<{ error: string | null }, FormData>(
    signUp,
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
        {isPending ? "Pending" : "Sign Up"}
      </button>

      <p>
        Have an account? <Link href="/login">Sign in</Link>
      </p>
    </form>
  );
}