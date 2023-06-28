import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
}

export function Section({ children }: SectionProps) {
  return <div className="mt-1 flex rounded bg-base-200 p-3">{children}</div>
}
