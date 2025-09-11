import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, Info, Share2, X } from "lucide-react"
import { cn } from "@/lib/utils"

type AlertType = "info" | "warning" | "danger"

interface AlertCardProps {
  type: AlertType
  title: string
  message: string
  timestamp?: string
  onDismiss?: () => void
  onShare?: () => void
  className?: string
}

const alertConfig = {
  info: {
    icon: Info,
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleColor: "text-blue-900 dark:text-blue-100",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-health-caution/10",
    borderColor: "border-health-caution/20",
    iconColor: "text-health-caution",
    titleColor: "text-foreground",
  },
  danger: {
    icon: AlertCircle,
    bgColor: "bg-health-risk/10", 
    borderColor: "border-health-risk/20",
    iconColor: "text-health-risk",
    titleColor: "text-foreground",
  },
}

export default function AlertCard({ 
  type, 
  title, 
  message, 
  timestamp,
  onDismiss,
  onShare,
  className 
}: AlertCardProps) {
  const config = alertConfig[type]
  const Icon = config.icon
  
  return (
    <Card 
      className={cn(
        "border-2",
        config.bgColor,
        config.borderColor,
        className
      )}
      data-testid={`alert-${type}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={cn("p-2 rounded-full", config.bgColor)}>
            <Icon className={cn("w-5 h-5", config.iconColor)} />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className={cn("font-semibold", config.titleColor)} data-testid="text-alert-title">
                {title}
              </h3>
              <div className="flex items-center space-x-1">
                {onShare && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onShare}
                    className="h-8 w-8"
                    data-testid="button-share-alert"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                )}
                {onDismiss && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onDismiss}
                    className="h-8 w-8"
                    data-testid="button-dismiss-alert"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground" data-testid="text-alert-message">
              {message}
            </p>
            
            {timestamp && (
              <p className="text-xs text-muted-foreground">
                {timestamp}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}