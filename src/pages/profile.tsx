import { Header } from '@/components/Header'
import { PrimaryBox } from '@/components/PrimaryBox'
import { useSession } from 'next-auth/react'

export default function Profile() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <div className="flex h-screen flex-col px-3 py-3 lg:mx-auto lg:max-w-4xl">
      <Header />

      <PrimaryBox>
        <p>Em construção</p>
      </PrimaryBox>
    </div>
  )
}
