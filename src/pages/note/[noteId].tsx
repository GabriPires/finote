import { Header } from '@/components/Header'
import { Loading } from '@/components/Loading'
import { NewEntryModal } from '@/components/NewEntryModal'
import { NoteItem } from '@/components/NoteItem'
import { PrimaryBox } from '@/components/PrimaryBox'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { StickyNote } from 'lucide-react'
import { useRouter } from 'next/router'

interface Entry {
  title: string
  value: number
}

interface Note {
  title: string
  description?: string
  created_at: string
  entries: Entry[]
}

export default function NotePage() {
  const router = useRouter()
  const { noteId } = router.query

  const { data: note, isLoading } = useQuery<Note>(
    ['note', noteId],
    async () => {
      const response = await api.get(`/notes/${noteId}`)
      return response.data
    },
  )

  if (!note || isLoading) {
    return <Loading />
  }

  const createdAt = dayjs(new Date(note.created_at)).format('D [de] MMMM YYYY')

  const total = note.entries.reduce((acc, entry) => {
    return acc + entry.value
  }, 0)

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(total / 100)

  const isNegative = total < 0

  return (
    <div className="flex h-screen flex-col px-3 py-3 lg:mx-auto lg:max-w-4xl">
      <Header />

      <PrimaryBox>
        <div className="flex items-center">
          <StickyNote className="mr-2" />
          <h1 className="text-2xl font-bold">{note.title}</h1>
        </div>
        <span className="text-sm text-base-content/60">{createdAt}</span>

        {note.description && <p className="mt-2">{note.description}</p>}

        <div className="mt-4 flex flex-col gap-2">
          <NewEntryModal />

          {note.entries.map((entry, index) => (
            <NoteItem key={index} title={entry.title} price={entry.value} />
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-medium text-base-content/60">
            Total
          </span>
          <span
            data-negative={isNegative}
            className="text-xl font-bold text-success data-[negative=true]:text-error"
          >
            {formattedTotal}
          </span>
        </div>
      </PrimaryBox>
    </div>
  )
}
