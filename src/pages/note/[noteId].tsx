import { Header } from '@/components/Header'
import { NewEntryModal } from '@/components/NewEntryModal'
import { NoteItem } from '@/components/NoteItem'
import { PrimaryBox } from '@/components/PrimaryBox'
import dayjs from 'dayjs'
import { StickyNote } from 'lucide-react'
import { GetServerSideProps } from 'next'

interface Entry {
  title: string
  price: number
}

interface Note {
  title: string
  description?: string
  createdAt: string
  entries: Entry[]
}

interface NotePageProps {
  note: Note
}

export default function NotePage({ note }: NotePageProps) {
  const total = note.entries.reduce((acc, annotation) => {
    return acc + annotation.price
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
        <span className="text-sm text-base-content/60">{note.createdAt}</span>
        <p className="mt-2">{note.description}</p>

        <div className="mt-4 flex flex-col gap-2">
          <NewEntryModal />

          {note.entries.map((annotation, index) => (
            <NoteItem
              key={index}
              title={annotation.title}
              price={annotation.price}
            />
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

export const getServerSideProps: GetServerSideProps<
  NotePageProps
> = async () => {
  const formattedCreatedAt = dayjs(new Date()).format('D [de] MMMM YYYY')

  return {
    props: {
      note: {
        title: 'Título da anotação',
        createdAt: formattedCreatedAt,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab nostrum officiis corrupti tempore tempora error sapiente expedita quae maiores aut quia commodi animi, dolores dignissimos asperiores explicabo facere quidem recusandae?',
        entries: [
          {
            title: 'Gasto aleatório',
            price: -12000,
          },
          {
            title: 'Receita aleatória',
            price: 67000,
          },
          {
            title: 'Gasto aleatório',
            price: -82000,
          },
          {
            title: 'Salário',
            price: 167000,
          },
        ],
      },
    },
  }
}
