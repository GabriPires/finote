import { supabase } from '@/lib/supabase'

export async function getUser() {
  const user = (await supabase.auth.getUser()).data.user

  return user
}
