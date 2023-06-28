import { Wallet } from 'lucide-react'

export function Header() {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Wallet className="h-10 w-10" />
        <button className="btn-primary btn rounded-full">Entrar</button>
      </div>

      <p className="text-2xl">
        Olá <span className="font-semibold">Gabriel Pires</span>, como iremos
        descomplicar suas finanças hoje?
      </p>
    </header>
  )
}
