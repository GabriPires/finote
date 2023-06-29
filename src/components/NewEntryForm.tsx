import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, MinusCircle, PlusCircle } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormControl } from './Form/FormControl'
import { FormErrorMessage } from './Form/FormErrorMessage'
import { FormLabel } from './Form/FormLabel'
import * as RadioGroup from '@radix-ui/react-radio-group'

const newEntryFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Digite um título para sua anotação')
    .max(80, 'O título deve ter no máximo 80 caracteres'),
  value: z.coerce.number().min(0, 'O valor deve ser maior que zero'),
  type: z.string(),
})

type NewEntryFormProps = z.infer<typeof newEntryFormSchema>

export function NewEntryForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewEntryFormProps>({
    resolver: zodResolver(newEntryFormSchema),
    defaultValues: {
      title: '',
      value: 0,
      type: 'income',
    },
  })

  function onSubmit(data: NewEntryFormProps) {
    console.log(data)
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
