import { useMutation, useQuery } from '@tanstack/react-query'
import { Contact2, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { signOut } from '@/api/sign-out'
import { getProfile } from '@/api/user/get-profile'
import { useUserContext } from '@/context/user-context'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Skeleton } from '../ui/skeleton'

export function AccountMenu() {
  const navigate = useNavigate()

  const { user } = useUserContext()

  const { data: profile, isLoading: isLoadingUserProfile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => getProfile({ userId: user.id }),
    staleTime: Infinity,
  })

  const { mutateAsync: signOutFn, isPending: isSignInOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="flex select-none items-center gap-2"
        >
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          {isLoadingUserProfile ? (
            <Skeleton className="h-5 w-full" />
          ) : (
            <span>{profile?.name}</span>
          )}
          <span className="text-sm font-normal text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Contact2 className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="text-rose-500 dark:text-red-400"
          disabled={isSignInOut}
        >
          <button className="w-full" onClick={() => signOutFn()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
