import AlertCard from '../AlertCard'

export default function AlertCardExample() {
  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold">Alert Cards</h3>
      
      <div className="space-y-4 max-w-lg">
        <AlertCard
          type="danger"
          title="High Risk Detected"
          message="High risk detected in Village A – Boil water before drinking. Immediate action required for all residents."
          timestamp="2 min ago"
          onDismiss={() => console.log('Alert dismissed')}
          onShare={() => console.log('Alert shared')}
        />
        
        <AlertCard
          type="warning"
          title="Water Quality Alert"
          message="Caution: Turbidity rising in Village B. Monitor water sources and consider alternative supplies."
          timestamp="15 min ago"
          onDismiss={() => console.log('Alert dismissed')}
          onShare={() => console.log('Alert shared')}
        />
        
        <AlertCard
          type="info"
          title="Health Education Reminder"
          message="New handwashing guidelines available. Check the Education section for updated materials."
          timestamp="1 hour ago"
          onDismiss={() => console.log('Alert dismissed')}
        />
        
        <AlertCard
          type="danger"
          title="Outbreak Risk"
          message="Multiple cases reported in nearby villages. Increase monitoring and preventive measures."
          timestamp="3 hours ago"
          onShare={() => console.log('Alert shared')}
        />
      </div>
    </div>
  )
}