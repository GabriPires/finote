import { LastNotes } from './last-notes'
import { NewNoteDialog } from './new-note-dialog'

export function DashboardPage() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-semibold">Suas últimas notas</h1>
        <NewNoteDialog />
      </div>

      <LastNotes />
    </div>
  )
}
