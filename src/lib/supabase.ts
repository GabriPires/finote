import { createClient } from '@supabase/supabase-js'

import { Database } from '@/@types/supabase'
import { env } from '@/env'

export const supabase = createClient<Database>(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  },
)
