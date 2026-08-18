"use server"

import { createClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signIn(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Missing email or password" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect('/');
}