import { api } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'
import { CircleDollarSign, Loader, Trash } from 'lucide-react'
import { useState } from 'react'

interface Entry {
  id: string
  title: string
  value: number
  note_id: string
}

interface NoteItemProps {
  entry: Entry
}

export function NoteItem({ entry }: NoteItemProps) {
  const { id, note_id, title, value } = entry

  const [isDeleting, setIsDeleting] = useState(false)

  const isPositive = value > 0

  async function handleRemoveNote() {
    setIsDeleting(true)
    await api
      .delete(`/notes/remove/${id}`)
      .then(async () => {
        await queryClient.invalidateQueries(['note', note_id])
      })
      .finally(() => setIsDeleting(false))
  }

  return (
    <div
      className="group grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 rounded bg-base-300 p-3"
      data-positive={isPositive}
    >
      <CircleDollarSign className="h-7 w-7 text-error group-data-[positive=true]:text-success" />
      <p className="truncate">{title}</p>
      <p className="ml-auto text-error group-data-[positive=true]:text-success">
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value / 100)}
      </p>

      <div className="flex">
        <button
          title="Excluir anotação"
          data-loading={isDeleting}
          className="btn btn-link text-error p-0 min-h-0 h-7 w-7 data-[loading=true]:text-base-100"
          onClick={handleRemoveNote}
        >
          {isDeleting ? (
            <Loader className="h-5 w-5" />
          ) : (
            <Trash className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  )
}
