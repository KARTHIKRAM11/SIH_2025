import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActionButtonProps {
  title: string
  icon: LucideIcon
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "default" | "lg"
  disabled?: boolean
  className?: string
}

export default function ActionButton({ 
  title, 
  icon: Icon, 
  onClick,
  variant = "primary",
  size = "lg",
  disabled = false,
  className 
}: ActionButtonProps) {
  const buttonVariant = variant === "primary" ? "default" : 
                       variant === "secondary" ? "secondary" : "outline"
  
  return (
    <Button
      variant={buttonVariant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center justify-center space-y-2 h-20 min-w-[120px]",
        size === "sm" && "h-16 min-w-[100px]",
        size === "lg" && "h-24 min-w-[140px]",
        className
      )}
      data-testid={`button-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Icon className={cn(
        "w-6 h-6",
        size === "sm" && "w-5 h-5",
        size === "lg" && "w-7 h-7"
      )} />
      <span className={cn(
        "text-sm font-medium",
        size === "sm" && "text-xs",
        size === "lg" && "text-base"
      )}>
        {title}
      </span>
    </Button>
  )
}