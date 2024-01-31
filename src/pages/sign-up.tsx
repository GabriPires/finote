import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signUp } from '@/api/sign-up'
import { FormControl } from '@/components/form-control'
import { FormErrorMessage } from '@/components/form-error-message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const signUpFormSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido.' }),
  password: z
    .string()
    .min(6, { message: 'Digite uma senha com no mínimo 6 caracteres.' }),
})

type SignUpForm = z.infer<typeof signUpFormSchema>

export function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutateAsync: signUpFn } = useMutation({
    mutationFn: signUp,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await signUpFn(data)

      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar e-mail',
          onClick: () => handleSignUp(data),
        },
      })
    } catch (error) {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button
          asChild
          variant="ghost"
          className="absolute right-8 top-8 hidden lg:flex"
        >
          <Link to="/sign-in">Já sou usuário</Link>
        </Button>

        <div className="flex  flex-col justify-center gap-6 lg:w-[350px]">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe seus gastos e organize suas finanças
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <FormControl id="email" label="Seu e-mail">
              <Input id="email" type="email" {...register('email')} />
              <FormErrorMessage message={errors.email?.message} />
            </FormControl>

            <FormControl id="password" label="Sua senha">
              <Input id="password" type="password" {...register('password')} />
              <FormErrorMessage message={errors.password?.message} />
            </FormControl>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              Criar conta
            </Button>

            <Button
              type="button"
              variant="link"
              className="w-full lg:hidden"
              asChild
            >
              <Link to="/sign-in">Já sou usuário</Link>
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
