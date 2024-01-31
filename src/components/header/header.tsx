import { CircleDollarSign, Home } from 'lucide-react'

import { ThemeToggle } from '../theme/theme-toggle'
import { Separator } from '../ui/separator'
import { AccountMenu } from './account-menu'
import { NavDropdown } from './nav-dropdown'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <CircleDollarSign className="hidden h-6 w-6 lg:block" />
        <Separator orientation="vertical" className="hidden h-6 lg:block" />

        <nav className="hidden items-center space-x-4 lg:flex lg:space-x-6">
          <NavLink to="/dashboard">
            <Home className="h-4 w-4" />
            Dashboard
          </NavLink>
        </nav>

        <nav className="flex flex-row items-center gap-4 lg:hidden">
          <CircleDollarSign className="h-6 w-6 lg:hidden " />
          <Separator orientation="vertical" className="h-6 lg:hidden " />
          <NavDropdown />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
