import { Wallet } from 'lucide-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

interface HeaderProps {
  withWelcomeMessage?: boolean
}

export function Header({ withWelcomeMessage = false }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 lg:gap-8">
      <div className="flex items-center justify-between rounded bg-base-200 p-4 shadow-lg">
        <Link href="/" title="Página Inicial">
          <Wallet className="h-10 w-10" />
        </Link>
        <button
          className="btn-primary btn rounded-full"
          onClick={() => signIn('google')}
        >
          Entrar
        </button>
      </div>

      {withWelcomeMessage && (
        <p className="text-2xl lg:max-w-sm">
          Olá <span className="font-semibold">Gabriel Pires</span>, como iremos
          descomplicar suas finanças hoje?
        </p>
      )}
    </header>
  )
}
