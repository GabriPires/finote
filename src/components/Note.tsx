import { StickyNote } from 'lucide-react'

interface NoteProps {
  title: string
}

export function Note({ title }: NoteProps) {
  return (
    <a className="carousel-item btn-neutral btn flex max-w-xs items-center gap-2 rounded-lg border px-3 no-underline">
      <StickyNote className={'h-5 w-5'} />
      <p className="truncate font-medium">{title}</p>
    </a>
  )
}
