import { Loader } from 'lucide-react'
import { Header } from './Header'

export function Loading() {
  return (
    <div className="flex h-screen flex-col px-3 py-3 lg:mx-auto lg:max-w-4xl">
      <Header />

      <div className="flex flex-1 items-center justify-center">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    </div>
  )
}
