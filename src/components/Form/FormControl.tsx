import { ReactNode } from 'react'

interface FormControlProps {
  children: ReactNode
}

export function FormControl({ children }: FormControlProps) {
  return <div className="form-control w-full">{children}</div>
}
