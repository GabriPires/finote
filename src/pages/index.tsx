import { Header } from '@/components/Header'
import { Section } from '@/components/Section'
import { SectionTitle } from '@/components/SectionTitle'

export default function Home() {
  return (
    <div className="flex flex-col px-3 py-3">
      <Header />

      <SectionTitle
        title="Seus cadernos"
        tip="Cadernos são conjuntos de folhas de finanças feitos para organizar sua vida"
      />

      <Section>aoba</Section>

      <SectionTitle title="Suas finanças" />

      <Section>aoba</Section>
    </div>
  )
}
