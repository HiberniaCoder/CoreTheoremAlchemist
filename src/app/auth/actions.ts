
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  if (!email || !password) {
    return redirect('/login?message=Email and password are required')
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/signup?message=Email and password are required')
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    // Supabase sends a confirmation email by default.
    // You can disable this in your Supabase project settings if you want to log in directly.
    // options: {
    //   emailRedirectTo: `${origin}/auth/callback`,
    // },
  })

  if (error) {
    console.error("Sign up error:", error);
    return redirect('/signup?message=Could not authenticate user. Please try again.')
  }

  // After sign up, Supabase automatically signs in the user with the new credentials if email confirmation is disabled.
  // We just need to revalidate and redirect.
  revalidatePath('/', 'layout')
  redirect('/')
}
