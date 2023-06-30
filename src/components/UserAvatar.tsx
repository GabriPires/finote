import { nameAbbreviation } from '@/utils/name-abbreviation'
import * as Avatar from '@radix-ui/react-avatar'
import { useSession } from 'next-auth/react'

export function UserAvatar() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <Avatar.Root className="avatar">
      <Avatar.Image
        className="rounded-full"
        src={session.user.avatar_url}
        alt={session.user.name}
        style={{
          height: '2.5rem',
          width: '2.5rem',
        }}
      />
      <Avatar.Fallback
        className="flex items-center justify-center rounded-full w-10 h-10 bg-slate-900 dark:bg-slate-100 text-zinc-100 dark:text-zinc-900"
        title={session.user.name}
      >
        {nameAbbreviation(session.user.name)}
      </Avatar.Fallback>
    </Avatar.Root>
  )
}
