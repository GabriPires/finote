import { StickyNote } from 'lucide-react'

interface NoteProps {
  title: string
}

export function Note({ title }: NoteProps) {
  return (
    <a className="carousel-item link flex max-w-xs items-center gap-2 rounded-lg border p-3 no-underline  decoration-0">
      <StickyNote className={'h-5 w-5'} />
      <p className="truncate font-medium">{title}</p>
    </a>
  )
}
