import { LabelHTMLAttributes, ReactNode } from 'react'

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
}

export function FormLabel({ children, ...props }: FormLabelProps) {
  return (
    <label className="label" {...props}>
      <span className="label-text text-base">{children}</span>
    </label>
  )
}
