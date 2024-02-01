import { supabase } from '@/lib/supabase'

interface GetProfileParams {
  userId: string
}

export async function getProfile({ userId }: GetProfileParams) {
  const response = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return response.data
}
