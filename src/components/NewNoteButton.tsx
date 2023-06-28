import * as Dialog from '@radix-ui/react-dialog'
import { StickyNote, X } from 'lucide-react'

export function NewNoteButton() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="carousel-item btn-primary btn-outline btn">
        <StickyNote className={'h-5 w-5'} />
        Nova anotação
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-black/80" />
        <Dialog.Content className="modal-box absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center">
            <StickyNote className="mr-2 h-5 w-5" />
            <Dialog.Title className="text-lg font-bold">
              Nova anotação
            </Dialog.Title>
            <Dialog.Close className="btn ml-auto h-auto min-h-0 p-2">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          epa pea
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
