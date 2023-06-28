import { StickyNote } from 'lucide-react'

export function Note() {
  return (
    <div className="carousel-item flex max-w-xs items-center gap-2 rounded border  p-3">
      <StickyNote className={'h-5 w-5 '} />
      <p className="truncate font-medium ">
        Nota com nome grandinho até pra testar logo de início
      </p>
    </div>
  )
}
