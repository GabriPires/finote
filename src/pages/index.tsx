import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { NewNoteButton } from '@/components/NewNoteButton'
import { Note } from '@/components/Note'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { LogIn } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'

interface NoteProps {
  id: string
  title: string
}

export default function Home() {
  const { data: session } = useSession()

  const { data: notes, isFetching } = useQuery<NoteProps[]>(
    ['home', 'notes'],
    async () => {
      const response = await api.get('/notes')

      return response.data
    },
  )

  if (!session) {
    return (
      <div className="flex h-screen flex-col px-3 py-3 lg:mx-auto lg:max-w-4xl">
        <Header />

        <SectionTitle title="Bem vindo ao Finote" />
        <p>
          O Finote é um aplicativo de anotações de finanças pessoais. Aqui você
          pode criar cadernos para organizar suas anotações de finanças da
          maneira como quiser.
        </p>
        <p className="mt-2">
          Para começar, faça login com sua conta do Google clicando no botão
          abaixo.
        </p>
        <button className="mt-3 btn w-fit" onClick={() => signIn('google')}>
          <LogIn />
          Entrar
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col px-3 py-3 lg:mx-auto lg:max-w-4xl">
      <Header withWelcomeMessage />

      {/* <SectionTitle
        title="Seus cadernos"
        tip="Cadernos são conjuntos de anotações de finanças feitos para organizar sua vida"
      />

      <Section>
        <NewNotebookButton />
        <Notebook title={'Finanças 28/06'} />
        <Notebook title={'Finanças 28/06'} />
        <Notebook title={'Finanças 28/06'} />
        <Notebook title={'Finanças 28/06'} />
      </Section> */}

      <SectionTitle
        title="Suas anotações de finanças"
        data-loading={isFetching}
      />

      <Section>
        <NewNoteButton />
        {notes?.map((note) => (
          <Note key={note.id} id={note.id} title={note.title} />
        ))}
      </Section>

      <Footer />
    </div>
  )
}
