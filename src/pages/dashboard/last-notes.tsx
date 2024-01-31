import { useQuery } from '@tanstack/react-query'

import { getLastNotes } from '@/api/notes/get-last-notes'
import { Skeleton } from '@/components/ui/skeleton'
import { supabase } from '@/lib/supabase'

import { NoteCard } from './note-card'

export function LastNotes() {
  const { data: lastNotes, isLoading: isLoadingLastNotes } = useQuery({
    queryKey: ['last-notes'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const data = await getLastNotes({ userId: user?.id! })
      return data
    },
  })

  const lastNotesLength = lastNotes?.length ?? 0

  return (
    <>
      {!isLoadingLastNotes && lastNotesLength === 0 && (
        <span className="text-muted-foreground">
          Você ainda não tem notas. Crie uma nova nota para começar!
        </span>
      )}
      <div className="mt-4 flex flex-col gap-4 lg:grid lg:grid-cols-5">
        {isLoadingLastNotes &&
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-[128px]" />
          ))}
        {!isLoadingLastNotes &&
          lastNotes?.map((note) => <NoteCard key={note.id} note={note} />)}
      </div>
    </>
  )
}
