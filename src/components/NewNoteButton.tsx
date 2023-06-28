import { StickyNote } from 'lucide-react'

export function NewNoteButton() {
  return (
    <button className="carousel-item btn-primary btn-outline btn">
      <StickyNote className={'h-5 w-5'} />
      Nova anotação
    </button>
  )
}
