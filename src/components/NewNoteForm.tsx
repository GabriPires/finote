import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormControl } from './Form/FormControl'
import { FormErrorMessage } from './Form/FormErrorMessage'
import { FormLabel } from './Form/FormLabel'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'

const newNoteFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Digite um título para sua anotação')
    .max(80, 'O título deve ter no máximo 80 caracteres'),
  description: z
    .string()
    .max(255, 'Digite no máximo 255 caracteres na descrição')
    .optional(),
})

type NewNoteFormProps = z.infer<typeof newNoteFormSchema>

export function NewNoteForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(newNoteFormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  async function onSubmit(data: NewNoteFormProps) {
    try {
      const response = await api.post('/notes/new', {
        title: data.title,
        description: data.description,
      })

      await router.push(`/note/${response.data.id}`)
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        alert(error.response.data.message)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor={'title'}>Qual o título da sua anotação?</FormLabel>
        <input
          type="text"
          placeholder="Título da anotação"
          className="input-bordered input w-full focus:input-primary"
          {...register('title')}
        />
        {errors.title && (
          <FormErrorMessage>{errors.title.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl>
        <FormLabel htmlFor={'description'}>Descreva sua anotação</FormLabel>
        <textarea
          className="textarea-bordered textarea focus:textarea-primary"
          placeholder="Descreva sua anotação."
          style={{ resize: 'none' }}
          {...register('description')}
        />
        {errors.description && (
          <FormErrorMessage>{errors.description.message}</FormErrorMessage>
        )}
      </FormControl>

      <button
        type="submit"
        className="btn-primary btn ml-auto w-40"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader className="h-5 w-5 animate-spin" />
        ) : (
          'Criar anotação'
        )}
      </button>
    </form>
  )
}
