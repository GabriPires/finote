import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
}

export function Section({ children }: SectionProps) {
  return (
    <div className="carousel-center carousel mt-1 space-x-4 rounded bg-base-200 p-3">
      {children}
    </div>
  )
}
