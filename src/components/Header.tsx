import { Wallet } from 'lucide-react'

export function Header() {
  return (
    <header className="flex flex-col gap-4 lg:gap-8">
      <div className="flex items-center justify-between rounded bg-base-200 p-4 shadow-lg">
        <Wallet className="h-10 w-10" />
        <button className="btn-primary btn rounded-full">Entrar</button>
      </div>

      <p className="text-2xl lg:max-w-sm">
        Olá <span className="font-semibold">Gabriel Pires</span>, como iremos
        descomplicar suas finanças hoje?
      </p>
    </header>
  )
}
