import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatusCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  status: "safe" | "caution" | "risk"
  subtitle?: string
  onClick?: () => void
  className?: string
}

const statusColors = {
  safe: "text-health-safe border-health-safe/20 bg-health-safe/5",
  caution: "text-health-caution border-health-caution/20 bg-health-caution/5", 
  risk: "text-health-risk border-health-risk/20 bg-health-risk/5",
}

export default function StatusCard({ 
  title, 
  value, 
  icon: Icon, 
  status, 
  subtitle, 
  onClick,
  className 
}: StatusCardProps) {
  const isClickable = !!onClick
  
  return (
    <Card 
      className={cn(
        "min-h-24 border-2 transition-all duration-200",
        statusColors[status],
        isClickable && "cursor-pointer hover-elevate active-elevate-2",
        className
      )}
      onClick={onClick}
      data-testid={`card-status-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground" data-testid={`text-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          <div className={cn("p-2 rounded-lg", statusColors[status])}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}