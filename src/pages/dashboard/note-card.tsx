import { StickyNote } from 'lucide-react'

import { Tables } from '@/@types/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface NoteCardProps {
  note: Tables<'notes'>
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_auto] items-center gap-4">
        <CardTitle className="truncate text-sm">{note.title}</CardTitle>
        <StickyNote />
      </CardHeader>
      <CardContent>
        <span className="text-xs text-muted-foreground">
          Criada em{' '}
          {new Date(note.created_at).toLocaleDateString(
            {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            },
            { timeZone: 'UTC' },
          )}
        </span>
      </CardContent>
    </Card>
  )
}
