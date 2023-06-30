import { BookMarked } from 'lucide-react'
import Link from 'next/link'

interface NotebookProps {
  title: string
}

export function Notebook({ title }: NotebookProps) {
  return (
    <Link
      className="carousel-item btn-neutral btn flex max-w-xs items-center gap-2 rounded-lg border px-3 no-underline decoration-0"
      href="#"
    >
      <BookMarked className={'h-5 w-5'} />
      <p className="truncate font-medium">{title}</p>
    </Link>
  )
}
