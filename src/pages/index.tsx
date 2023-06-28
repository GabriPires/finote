import { Header } from '@/components/Header'
import { NewNoteButton } from '@/components/NewNoteButton'
import { NewNotebookButton } from '@/components/NewNotebookButton'
import { Note } from '@/components/Note'
import { Notebook } from '@/components/Notebook'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'

export default function Home() {
  return (
    <div className="flex flex-col px-3 py-3">
      <Header />

      <SectionTitle
        title="Seus cadernos"
        tip="Cadernos são conjuntos de notas de finanças feitos para organizar sua vida"
      />

      <Section>
        <NewNotebookButton />
        <Notebook title={'Finanças 28/06'} />
        <Notebook title={'Finanças 28/06'} />
        <Notebook title={'Finanças 28/06'} />
        <Notebook title={'Finanças 28/06'} />
      </Section>

      <SectionTitle title="Suas finanças" />

      <Section>
        <NewNoteButton />
        <Note title={'Finanças 28/06'} />
        <Note title={'Finanças 28/06'} />
        <Note title={'Finanças 28/06'} />
        <Note title={'Finanças 28/06'} />
      </Section>
    </div>
  )
}
