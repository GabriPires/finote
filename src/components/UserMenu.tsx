import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { UserAvatar } from './UserAvatar'
import { LogOut, User2 } from 'lucide-react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export function UserMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="btn p-0 h-fit min-h-0 rounded-full font-medium">
        <UserAvatar />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal className="dropdown">
        <DropdownMenu.Content className="mt-2 p-2 shadow menu dropdown-content gap-2 z-[1] bg-base-100 rounded-box w-52 data-[side=bottom]:animate-slideUpAndFade">
          <Link href="/profile">
            <DropdownMenu.Item className="flex items-center gap-2 p-1 rounded focus-visible:outline-none focus-visible:bg-base-200">
              <User2 /> Meus dados
            </DropdownMenu.Item>
          </Link>

          <DropdownMenu.Separator className="h-[1px] bg-base-200" />

          <DropdownMenu.Item
            className="flex items-center gap-2 p-1 rounded text-error cursor-pointer focus-visible:outline-none focus-visible:bg-base-200"
            onClick={() => signOut()}
          >
            <LogOut /> Sair
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
