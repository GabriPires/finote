import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { StickyNote } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Tables } from '@/@types/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface NoteCardProps {
  note: Tables<'notes'>
}

export function NoteCard({ note }: NoteCardProps) {
  const createdAt = dayjs(note.created_at)
    .locale(ptBr)
    .format('DD [de] MMMM [de] YYYY')

  return (
    <Link to={`/note/${note.id}`}>
      <Card>
        <CardHeader className="grid grid-cols-[1fr_auto] items-center gap-4">
          <CardTitle className="truncate text-sm">{note.title}</CardTitle>
          <StickyNote />
        </CardHeader>
        <CardContent>
          <span className="text-xs text-muted-foreground">
            Criada em {createdAt}
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
