import { LastNotes } from './last-notes'

export function DashboardPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold">Suas últimas notas</h1>

      <LastNotes />
    </div>
  )
}
