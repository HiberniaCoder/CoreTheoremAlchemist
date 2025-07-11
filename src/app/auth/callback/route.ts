import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // When logging in with email/password, there's no code.
  // The session is already set in the cookies. We just need to redirect.
  // The middleware will handle checking if the user is authenticated.
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    return NextResponse.redirect(`${origin}${next}`)
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`)
}
