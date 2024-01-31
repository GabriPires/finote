import { supabase } from '@/lib/supabase'

export async function getProfile() {
  return (await supabase.auth.getUser()).data.user
}
