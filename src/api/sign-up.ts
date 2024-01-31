import { supabase } from '@/lib/supabase'

interface SignUpParams {
  email: string
  password: string
}

export async function signUp({ email, password }: SignUpParams) {
  return await supabase.auth.signUp({
    email,
    password,
  })
}
