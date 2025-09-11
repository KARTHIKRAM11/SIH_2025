import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type HealthStatus = "safe" | "caution" | "risk"

interface HealthStatusBadgeProps {
  status: HealthStatus
  size?: "sm" | "default" | "lg"
  showIcon?: boolean
  className?: string
}

const statusConfig = {
  safe: {
    label: "Safe",
    icon: CheckCircle,
    className: "bg-health-safe text-white border-health-safe hover:bg-health-safe/90",
  },
  caution: {
    label: "Caution", 
    icon: AlertTriangle,
    className: "bg-health-caution text-white border-health-caution hover:bg-health-caution/90",
  },
  risk: {
    label: "High Risk",
    icon: AlertCircle, 
    className: "bg-health-risk text-white border-health-risk hover:bg-health-risk/90",
  },
}

export default function HealthStatusBadge({ 
  status, 
  size = "default",
  showIcon = true,
  className 
}: HealthStatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon
  
  return (
    <Badge 
      variant="default"
      className={cn(
        config.className,
        size === "sm" && "text-xs px-2 py-1",
        size === "lg" && "text-lg px-4 py-2 min-h-10",
        className
      )}
      data-testid={`badge-status-${status}`}
    >
      {showIcon && <Icon className="w-4 h-4 mr-1" />}
      {config.label}
    </Badge>
  )
}