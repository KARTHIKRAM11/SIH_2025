import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCheck, Users, Crown, User } from "lucide-react"

interface RoleSelectionScreenProps {
  onRoleSelect: (role: string) => void
}

export default function RoleSelectionScreen({ onRoleSelect }: RoleSelectionScreenProps) {
  const [selectedRole, setSelectedRole] = useState("")

  const roles = [
    {
      id: "asha_worker",
      title: "ASHA Worker",
      icon: UserCheck,
      color: "bg-blue-500"
    },
    {
      id: "volunteer", 
      title: "Volunteer",
      icon: Users,
      color: "bg-green-500"
    },
    {
      id: "local_leader",
      title: "Local Leader",
      icon: Crown,
      color: "bg-purple-500"
    },
    {
      id: "village_people",
      title: "Village People",
      icon: User,
      color: "bg-orange-500"
    }
  ]

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Select Your Role
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Choose your role to access the appropriate features
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => {
              const IconComponent = role.icon
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${role.color} rounded-full flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                        {role.title}
                      </h3>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <Button 
            onClick={handleContinue}
            disabled={!selectedRole}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
            data-testid="button-continue-role"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
