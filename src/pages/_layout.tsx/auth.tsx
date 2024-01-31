import { CircleDollarSign } from 'lucide-react'
import { useLayoutEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { supabase } from '@/lib/supabase'

export function AuthLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && !['sign-in', 'sign-out'].includes(pathname)) {
        navigate('/dashboard', { replace: true })
      }
    })
  }, [navigate, pathname])

  return (
    <div className="flex min-h-screen flex-col antialiased lg:grid lg:grid-cols-2">
      <div className="h-full flex-col justify-between border-r border-foreground/5 p-10 text-muted-foreground lg:flex lg:bg-muted">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <CircleDollarSign className="h-5 w-5" />
          <span className="font-semibold">Finote</span>
        </div>
        <footer className="hidden text-sm lg:block">
          Finote &copy; {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
