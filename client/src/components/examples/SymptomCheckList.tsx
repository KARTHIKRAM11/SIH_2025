import { useState } from 'react'
import SymptomCheckList from '../SymptomCheckList'

export default function SymptomCheckListExample() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['fever'])
  
  return (
    <div className="space-y-4 p-4 max-w-md">
      <h3 className="text-lg font-semibold">Symptom Selection</h3>
      
      <SymptomCheckList
        selectedSymptoms={selectedSymptoms}
        onSymptomsChange={setSelectedSymptoms}
      />
      
      <div className="mt-4 p-3 bg-muted/30 rounded">
        <p className="text-sm font-medium">Selected: </p>
        <p className="text-sm text-muted-foreground">
          {selectedSymptoms.length === 0 
            ? 'None selected' 
            : selectedSymptoms.join(', ')
          }
        </p>
      </div>
    </div>
  )
}