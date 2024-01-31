import { useLayoutEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/hader'
import { supabase } from '@/lib/supabase'

export function AppLayout() {
  const navigate = useNavigate()

  useLayoutEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate('/sign-in', { replace: true })
      }
    })
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
