import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const newNoteFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Digite um título para sua anotação')
    .max(80, 'O título deve ter no máximo 80 caracteres'),
})

type NewNoteFormProps = z.infer<typeof newNoteFormSchema>

export function NewNoteForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(newNoteFormSchema),
    defaultValues: {
      title: '',
    },
  })

  function onSubmit(data: NewNoteFormProps) {
    console.log(data)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Qual o título da sua anotação?</span>
        </label>
        <input
          type="text"
          placeholder="Título da anotação"
          className="input-bordered input w-full focus:input-primary"
          {...register('title')}
        />
        {errors.title && (
          <label className="label">
            <span className="label-text-alt text-red-400">
              {errors.title.message}
            </span>
          </label>
        )}
      </div>

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
