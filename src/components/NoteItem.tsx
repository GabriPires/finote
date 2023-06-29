import { CircleDollarSign } from 'lucide-react'

interface NoteItemProps {
  title: string
  price: number
}

export function NoteItem({ title, price }: NoteItemProps) {
  const isPositive = price > 0

  return (
    <div
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded bg-base-300 p-3"
      data-positive={isPositive}
    >
      <CircleDollarSign className="h-7 w-7 text-error group-data-[positive=true]:text-success" />
      <p className="truncate">{title}</p>
      <p className="ml-auto text-error group-data-[positive=true]:text-success">
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price / 100)}
      </p>
    </div>
  )
}
