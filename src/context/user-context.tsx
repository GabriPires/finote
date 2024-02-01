import { User } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { ComponentProps, createContext, useContext } from 'react'

import { getUser } from '@/api/user/get-user'

interface UserContextProps {
  user: User
  isLoading: boolean
}

const UserContext = createContext({} as UserContextProps)

export function UserContextProvider({ children }: ComponentProps<'div'>) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getUser,
    staleTime: Infinity,
  })

  return !user ? (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="size-8 animate-spin" />
    </div>
  ) : (
    <UserContext.Provider
      value={{
        user,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
