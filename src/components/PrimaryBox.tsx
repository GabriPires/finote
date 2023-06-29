import { ReactNode } from 'react'

interface PrimaryBoxProps {
  children: ReactNode
}

export function PrimaryBox({ children }: PrimaryBoxProps) {
  return (
    <div className="mt-4 flex flex-col rounded bg-base-200 p-4 shadow-lg">
      {children}
    </div>
  )
}
