import ActionButton from '../ActionButton'
import { Plus, Droplets, Bell, BookOpen, BarChart3, Settings } from "lucide-react"

export default function ActionButtonExample() {
  return (
    <div className="space-y-6 p-4">
      <h3 className="text-lg font-semibold">Action Buttons</h3>
      
      <div className="space-y-4">
        <h4 className="font-medium">Main Actions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionButton
            title="Report Case"
            icon={Plus}
            onClick={() => console.log('Report Case clicked')}
          />
          
          <ActionButton
            title="Water Data"
            icon={Droplets}
            onClick={() => console.log('Water Data clicked')}
          />
          
          <ActionButton
            title="Alerts"
            icon={Bell}
            onClick={() => console.log('Alerts clicked')}
          />
          
          <ActionButton
            title="Education"
            icon={BookOpen}
            onClick={() => console.log('Education clicked')}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Secondary Actions</h4>
        <div className="grid grid-cols-2 gap-4">
          <ActionButton
            title="Reports"
            icon={BarChart3}
            variant="secondary"
            onClick={() => console.log('Reports clicked')}
          />
          
          <ActionButton
            title="Settings"
            icon={Settings}
            variant="outline"
            onClick={() => console.log('Settings clicked')}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Sizes</h4>
        <div className="flex gap-4 items-end">
          <ActionButton
            title="Small"
            icon={Plus}
            size="sm"
            onClick={() => console.log('Small clicked')}
          />
          
          <ActionButton
            title="Default"
            icon={Plus}
            size="default"
            onClick={() => console.log('Default clicked')}
          />
          
          <ActionButton
            title="Large"
            icon={Plus}
            size="lg"
            onClick={() => console.log('Large clicked')}
          />
        </div>
      </div>
    </div>
  )
}