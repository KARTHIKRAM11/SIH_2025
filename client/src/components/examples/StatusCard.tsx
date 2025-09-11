import StatusCard from '../StatusCard'
import { Droplets, Users, TrendingUp } from "lucide-react"

export default function StatusCardExample() {
  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold">Health Status Cards</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatusCard
          title="Water Quality"
          value="Safe"
          icon={Droplets}
          status="safe"
          subtitle="pH: 7.2, Clear"
          onClick={() => console.log('Water Quality clicked')}
        />
        
        <StatusCard
          title="Cases Today"
          value={3}
          icon={Users}
          status="caution"
          subtitle="2 mild, 1 moderate"
          onClick={() => console.log('Cases clicked')}
        />
        
        <StatusCard
          title="Outbreak Risk"
          value="High"
          icon={TrendingUp}
          status="risk"
          subtitle="Immediate action needed"
          onClick={() => console.log('Outbreak Risk clicked')}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <StatusCard
          title="pH Level"
          value="6.8"
          icon={Droplets}
          status="caution"
          subtitle="Slightly acidic"
        />
        
        <StatusCard
          title="Temperature"
          value="24°C"
          icon={TrendingUp}
          status="safe"
          subtitle="Normal range"
        />
      </div>
    </div>
  )
}