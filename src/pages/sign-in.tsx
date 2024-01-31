import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { FormControl } from '@/components/form-control'
import { FormErrorMessage } from '@/components/form-error-message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const signInFormSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido.' }),
  password: z
    .string()
    .min(6, { message: 'Digite uma senha com no mínimo 6 caracteres.' }),
})

type SignInForm = z.infer<typeof signInFormSchema>

export function SignInPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
      password: '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      if (data.error) {
        if (data.error.message === 'Email not confirmed') {
          toast.error(
            'Email não confirmado, por favor confirme antes de acessar a aplicação.',
          )
        } else {
          toast.error('Credenciais inválidas.')
        }
      } else {
        toast.success('Bem-vindo!')
        navigate('/dashboard', { replace: true })
      }
    },
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate(data)
    } catch (error) {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button
          asChild
          variant="ghost"
          className="absolute right-8 top-8 hidden lg:flex"
        >
          <Link to="/sign-up">Novo usuário</Link>
        </Button>

        <div className="flex  flex-col justify-center gap-6 lg:w-[350px]">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar a aplicação
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe seus gastos e organize suas finanças
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <FormControl id="email" label="Seu e-mail">
              <Input id="email" type="email" {...register('email')} />
              <FormErrorMessage message={errors.email?.message} />
            </FormControl>

            <FormControl id="password" label="Sua senha">
              <Input id="password" type="password" {...register('password')} />
              <FormErrorMessage message={errors.password?.message} />
            </FormControl>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              Acessar painel
            </Button>

            <Button
              type="button"
              variant="link"
              className="w-full lg:hidden"
              asChild
            >
              <Link to="/sign-up">Novo usuário</Link>
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
