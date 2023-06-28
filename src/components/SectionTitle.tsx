import { Info } from 'lucide-react'

interface SectionTitleProps {
  title: string
  tip?: string
}

export function SectionTitle({ title, tip }: SectionTitleProps) {
  return (
    <div className="mt-4 flex items-center justify-between ">
      <h2 className="text-xl">{title}</h2>
      {tip && (
        <div className="tooltip tooltip-left md:tooltip-bottom" data-tip={tip}>
          <Info className="h-5 w-5" />
        </div>
      )}
    </div>
  )
}
