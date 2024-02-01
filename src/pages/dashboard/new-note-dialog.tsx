import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createNewNote } from '@/api/notes/create-new-note'
import { FormControl } from '@/components/form/form-control'
import { FormErrorMessage } from '@/components/form/form-error-message'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUserContext } from '@/context/user-context'

const newNoteFormSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório.' }),
  description: z.string(),
})

type NewNoteFormValues = z.infer<typeof newNoteFormSchema>

export function NewNoteDialog() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewNoteFormValues>({
    resolver: zodResolver(newNoteFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const { user } = useUserContext()

  const { mutateAsync: createNewNoteFn, isPending: isLoadingCreateNewNote } =
    useMutation({
      mutationFn: createNewNote,
      onSuccess: (data) => {
        toast.success('Nota criada com sucesso.', {
          action: {
            label: 'Ver nota',
            onClick: () => {
              navigate(`/note/${data?.[0].id}`)
            },
          },
        })
      },
    })

  async function handleCreateNote({ name, description }: NewNoteFormValues) {
    await createNewNoteFn({
      title: name,
      description,
      userId: user.id,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <Plus className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova nota</DialogTitle>
          <DialogDescription>
            Notas são uma forma de anotas entradas e saídas e se organizar
            financeiramente.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleCreateNote)}
        >
          <FormControl id="name" label="Nome">
            <Input id="name" {...register('name')} />
            <FormErrorMessage message={errors.name?.message} />
          </FormControl>

          <FormControl id="description" label="Descrição">
            <Textarea
              id="description"
              className="resize-none"
              {...register('description')}
            />
            <FormErrorMessage message={errors.description?.message} />
          </FormControl>

          <Button type="submit" disabled={isLoadingCreateNewNote}>
            Criar nota
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
