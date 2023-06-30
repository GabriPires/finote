import { Info, Loader } from 'lucide-react'
import { HTMLAttributes } from 'react'

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  tip?: string
}

export function SectionTitle({ title, tip, ...props }: SectionTitleProps) {
  return (
    <div className="mt-8 flex items-center justify-between group" {...props}>
      <h2 className="text-xl font-medium">{title}</h2>
      {tip && (
        <div className="tooltip tooltip-left md:tooltip-bottom" data-tip={tip}>
          <Info className="h-5 w-5" />
        </div>
      )}

      <Loader className="w-4 h-4 animate-spin group-data-[loading=false]:hidden" />
    </div>
  )
}
