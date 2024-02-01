import { v4 as uuid } from 'uuid'

import { supabase } from '@/lib/supabase'

interface CreateNewNoteParams {
  userId: string
  title: string
  description: string
}

export async function createNewNote({
  userId,
  title,
  description,
}: CreateNewNoteParams) {
  const { data } = await supabase
    .from('notes')
    .insert([
      {
        id: uuid(),
        title,
        description,
        user_id: userId,
      },
    ])
    .select()

  return data
}
