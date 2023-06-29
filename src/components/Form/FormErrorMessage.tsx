import { ReactNode } from 'react'

interface FormErrorMessageProps {
  children: ReactNode
}

export function FormErrorMessage({ children }: FormErrorMessageProps) {
  return (
    <label className="label">
      <span className="label-text-alt text-red-400">{children}</span>
    </label>
  )
}
