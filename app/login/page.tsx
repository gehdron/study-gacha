"use client"
import { useActionState } from "react";
import { signIn } from "./actions";

export default function LoginPage() {
  const [state, formAction] = useActionState(signIn, { error: null });

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      {state?.error && <p>{state.error}</p>}
      <button type="submit">Sign In</button>
    </form>
  );
}