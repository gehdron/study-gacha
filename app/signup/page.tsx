"use server"

import { createClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const supabase = await createClient() // note: your server.ts createClient is async — recall why
  
  const email = formData.get("email")
  const password = formData.get("password")

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    // what should happen here? think about how to surface this to the user
  }

  redirect('/')
}