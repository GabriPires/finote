import { supabase } from '@/lib/supabase'

interface SignInParams {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInParams) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}
