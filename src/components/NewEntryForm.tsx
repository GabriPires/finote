import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, MinusCircle, PlusCircle } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormControl } from './Form/FormControl'
import { FormErrorMessage } from './Form/FormErrorMessage'
import { FormLabel } from './Form/FormLabel'
import * as RadioGroup from '@radix-ui/react-radio-group'

import { useRouter } from 'next/router'
import { api } from '@/lib/axios'
import { useQueryClient } from '@tanstack/react-query'

const newEntryFormSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Digite um título para sua anotação')
      .max(80, 'O título deve ter no máximo 80 caracteres'),
    value: z.coerce.number().min(0, 'O valor deve ser maior que 0'),
    type: z.string(),
  })
  .transform((data) => {
    return {
      ...data,
      value: data.type === 'income' ? data.value : -data.value,
    }
  })

type NewEntryFormData = z.infer<typeof newEntryFormSchema>

interface NewEntryFormProps {
  closeModal: () => void
}

export function NewEntryForm({ closeModal }:NewEntryFormProps) {
  const router = useRouter()
  const { noteId } = router.query

  const queryClient = useQueryClient()

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewEntryFormData>({
    resolver: zodResolver(newEntryFormSchema),
    defaultValues: {
      title: '',
      value: 0,
      type: 'income',
    },
  })

  async function onSubmit(data: NewEntryFormData) {
    await api
      .post('/entries/new', {
        title: data.title,
        value: data.value,
        type: data.type,
        noteId,
      })
      .then(async () => {
        await queryClient
          .invalidateQueries(['note', noteId])
          .then(() => closeModal())
      })
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor={'title'}>Qual o título da entrada?</FormLabel>
        <input
          type="text"
          placeholder="Título da entrada"
          className="input-bordered input w-full focus:input-primary"
          {...register('title')}
        />
        {errors.title && (
          <FormErrorMessage>{errors.title.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl>
        <FormLabel htmlFor={'value'}>Qual o valor da entrada?</FormLabel>
        <input
          type="number"
          step="0.50"
          min="0"
          placeholder="Valor da entrada"
          className="input-bordered input w-full focus:input-primary"
          {...register('value')}
        />
        {errors.value && (
          <FormErrorMessage>{errors.value.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl>
        <FormLabel htmlFor={'type'}>Qual o tipo da entrada?</FormLabel>
        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <RadioGroup.Root
              className="flex items-center gap-2"
              onValueChange={onChange}
              value={value}
            >
              <RadioGroup.Item
                value="income"
                className="flex-1 btn btn-success data-[state=unchecked]:btn-outline"
              >
                <PlusCircle />
              </RadioGroup.Item>
              <RadioGroup.Item
                value="outcome"
                className="flex-1 btn btn-error data-[state=unchecked]:btn-outline"
              >
                <MinusCircle />
              </RadioGroup.Item>
            </RadioGroup.Root>
          )}
        />
      </FormControl>

      <button
        type="submit"
        className="btn-primary btn ml-auto w-40"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader className="h-5 w-5 animate-spin" />
        ) : (
          'Criar entrada'
        )}
      </button>
    </form>
  )
}
