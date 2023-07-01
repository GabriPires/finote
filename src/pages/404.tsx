import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col px-3 py-3 lg:mx-auto lg:max-w-4xl items-center justify-center">
      <h1 className="font-bold text-2xl">Ops, parece que você se perdeu!</h1>
      <p className="max-w-[220px] text-center">
        Volte para a{' '}
        <Link href="/" className="link hover:link-primary">
          página inicial
        </Link>{' '}
        para continuar usando o app
      </p>
    </div>
  )
}
