import { useState } from 'react'
import CaseReportForm from '../CaseReportForm'

export default function CaseReportFormExample() {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (caseData: any) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    console.log('Case submitted:', caseData)
    alert('Case report submitted successfully!')
  }
  
  const handleSaveOffline = (caseData: any) => {
    console.log('Case saved offline:', caseData)
    alert('Case saved offline - will sync when connected')
  }
  
  return (
    <div className="p-4 min-h-screen bg-background">
      <CaseReportForm
        villageName="Baridhara Village"
        onSubmit={handleSubmit}
        onSaveOffline={handleSaveOffline}
        isLoading={isLoading}
      />
    </div>
  )
}