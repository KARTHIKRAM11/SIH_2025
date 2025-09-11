import { MapPin, Wifi, WifiOff } from "lucide-react"
import HealthStatusBadge from "./HealthStatusBadge"
import { cn } from "@/lib/utils"

type HealthStatus = "safe" | "caution" | "risk"

interface VillageHeaderProps {
  villageName: string
  status: HealthStatus
  isOnline?: boolean
  lastSync?: string
  className?: string
}

export default function VillageHeader({ 
  villageName, 
  status, 
  isOnline = true,
  lastSync,
  className 
}: VillageHeaderProps) {
  return (
    <div className={cn(
      "bg-card border-b border-card-border p-4 shadow-sm",
      className
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-semibold text-foreground" data-testid="text-village-name">
            {villageName}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <Wifi className="w-5 h-5 text-health-safe" />
          ) : (
            <WifiOff className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <HealthStatusBadge status={status} size="lg" />
        {lastSync && (
          <div className="text-sm text-muted-foreground">
            Last sync: {lastSync}
          </div>
        )}
      </div>
      
      {!isOnline && (
        <div className="mt-2 text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
          Working offline - Data will sync when connected
        </div>
      )}
    </div>
  )
}