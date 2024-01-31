import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { supabase } from '@/lib/supabase'

export function AppLayout() {
  const navigate = useNavigate()

  useLayoutEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      console.log('session', session)

      if (!session) {
        navigate('/sign-in', { replace: true })
      }
    })
  }, [navigate])

  return <></>
}
