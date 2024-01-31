import { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

import { Label } from './ui/label'

interface FormControlProps {
  id: string
  label?: string
  className?: string
}

export function FormControl({
  id,
  label,
  className,
  children,
}: PropsWithChildren<FormControlProps>) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
    </div>
  )
}
