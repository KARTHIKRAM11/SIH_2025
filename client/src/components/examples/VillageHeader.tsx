import VillageHeader from '../VillageHeader'

export default function VillageHeaderExample() {
  return (
    <div className="space-y-4">
      <VillageHeader 
        villageName="Baridhara Village" 
        status="safe" 
        isOnline={true}
        lastSync="2 min ago"
      />
      
      <VillageHeader 
        villageName="Teliamura Village" 
        status="caution" 
        isOnline={true}
        lastSync="5 min ago"
      />
      
      <VillageHeader 
        villageName="Krishnapur Village" 
        status="risk" 
        isOnline={false}
        lastSync="2 hours ago"
      />
    </div>
  )
}