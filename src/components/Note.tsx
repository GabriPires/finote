import { StickyNote } from 'lucide-react'
import Link from 'next/link'

interface NoteProps {
  id: string
  title: string
}

export function Note({ title, id }: NoteProps) {
  return (
    <Link
      className="carousel-item btn-neutral btn flex max-w-xs items-center gap-2 rounded-lg border px-3 no-underline"
      href={`/note/${id}`}
    >
      <StickyNote className={'h-5 w-5'} />
      <p className="truncate font-medium">{title}</p>
    </Link>
  )
}
