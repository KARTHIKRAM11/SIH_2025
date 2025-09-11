import { Card, CardContent } from "@/components/ui/card"
import { UserCheck, Users, Crown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Role {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const roles: Role[] = [
  {
    id: "asha_worker",
    title: "ASHA Worker",
    description: "Accredited Social Health Activist",
    icon: UserCheck,
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description: "Community Health Volunteer",
    icon: Users,
  },
  {
    id: "local_leader",
    title: "Local Leader",
    description: "Village Leader or Administrator",
    icon: Crown,
  },
]

interface RoleSelectorProps {
  selectedRole?: string
  onRoleSelect: (role: string) => void
  disabled?: boolean
  className?: string
}

export default function RoleSelector({ 
  selectedRole,
  onRoleSelect,
  disabled = false,
  className 
}: RoleSelectorProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-center">Select Your Role</h3>
      <div className="grid gap-3">
        {roles.map((role) => {
          const Icon = role.icon
          const isSelected = selectedRole === role.id
          
          return (
            <Card
              key={role.id}
              className={cn(
                "cursor-pointer transition-all duration-200 border-2",
                isSelected 
                  ? "border-primary bg-primary/5 shadow-md" 
                  : "border-border hover-elevate",
                disabled && "cursor-not-allowed opacity-50"
              )}
              onClick={() => {
                if (!disabled) {
                  onRoleSelect(role.id)
                  console.log('Role selected:', role.id)
                }
              }}
              data-testid={`card-role-${role.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "p-3 rounded-lg",
                    isSelected 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground" data-testid={`text-role-${role.id}`}>
                      {role.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}