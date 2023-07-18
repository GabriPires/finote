import * as Dialog from '@radix-ui/react-dialog'
import { CircleDollarSign, PlusIcon, X } from 'lucide-react'
import { NewEntryForm } from './NewEntryForm'
import { useState } from 'react'

export function NewEntryModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog.Root open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <Dialog.Trigger className="btn btn-outline btn-primary mb-2 lg:w-fit">
        <PlusIcon />
        Nova entrada
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-black/80" />
        <Dialog.Content className="modal-box absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center">
            <CircleDollarSign className="mr-2 h-5 w-5" />
            <Dialog.Title className="text-lg font-bold">
              Nova entrada
            </Dialog.Title>
            <Dialog.Close className="btn ml-auto h-auto min-h-0 p-2">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <NewEntryForm closeModal={() => setIsOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
