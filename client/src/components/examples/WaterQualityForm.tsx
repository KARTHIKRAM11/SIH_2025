import { useState } from 'react'
import WaterQualityForm from '../WaterQualityForm'

export default function WaterQualityFormExample() {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (waterData: any) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    console.log('Water quality data submitted:', waterData)
    alert('Water quality data submitted successfully!')
  }
  
  const handleSaveOffline = (waterData: any) => {
    console.log('Water data saved offline:', waterData)
    alert('Water data saved offline - will sync when connected')
  }
  
  return (
    <div className="p-4 min-h-screen bg-background">
      <WaterQualityForm
        villageName="Teliamura Village"
        onSubmit={handleSubmit}
        onSaveOffline={handleSaveOffline}
        isLoading={isLoading}
      />
    </div>
  )
}