import { BookMarked } from 'lucide-react'

export function NewNotebookButton() {
  return (
    <button className="carousel-item btn-secondary btn-outline btn">
      <BookMarked className={'h-5 w-5'} />
      Novo caderno
    </button>
  )
}
