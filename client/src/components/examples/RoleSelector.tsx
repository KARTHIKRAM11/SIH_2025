import { useState } from 'react'
import RoleSelector from '../RoleSelector'

export default function RoleSelectorExample() {
  const [selectedRole, setSelectedRole] = useState<string>("")
  
  return (
    <div className="space-y-4 p-4 max-w-md mx-auto">
      <h3 className="text-lg font-semibold">Role Selection</h3>
      
      <RoleSelector
        selectedRole={selectedRole}
        onRoleSelect={setSelectedRole}
      />
      
      {selectedRole && (
        <div className="mt-6 p-3 bg-muted/30 rounded">
          <p className="text-sm font-medium">Selected Role:</p>
          <p className="text-sm text-muted-foreground capitalize">
            {selectedRole.replace('_', ' ')}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-sm font-medium">Quick Selection:</p>
        <div className="flex gap-2">
          {["asha_worker", "volunteer", "local_leader"].map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className="text-xs p-2 border rounded hover-elevate"
            >
              {role.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}