interface FormErrorMessageProps {
  message?: string
}

export function FormErrorMessage({ message }: FormErrorMessageProps) {
  if (!message) return null
  return <span className="text-xs text-rose-500">{message}</span>
}
