import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer, Droplets, Zap, Heart } from "lucide-react"
import { useState } from "react"

interface Symptom {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const symptoms: Symptom[] = [
  { id: "fever", label: "Fever", icon: Thermometer },
  { id: "diarrhea", label: "Diarrhea", icon: Droplets },
  { id: "vomiting", label: "Vomiting", icon: Zap },
  { id: "dehydration", label: "Dehydration", icon: Heart },
]

interface SymptomCheckListProps {
  selectedSymptoms: string[]
  onSymptomsChange: (symptoms: string[]) => void
  disabled?: boolean
}

export default function SymptomCheckList({ 
  selectedSymptoms = [], 
  onSymptomsChange,
  disabled = false 
}: SymptomCheckListProps) {
  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    if (checked) {
      onSymptomsChange([...selectedSymptoms, symptomId])
    } else {
      onSymptomsChange(selectedSymptoms.filter(id => id !== symptomId))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Symptoms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {symptoms.map((symptom) => {
          const Icon = symptom.icon
          const isChecked = selectedSymptoms.includes(symptom.id)
          
          return (
            <div 
              key={symptom.id} 
              className="flex items-center space-x-3 p-3 rounded-lg border hover-elevate transition-colors"
              data-testid={`symptom-${symptom.id}`}
            >
              <Checkbox
                id={symptom.id}
                checked={isChecked}
                onCheckedChange={(checked) => 
                  handleSymptomChange(symptom.id, checked as boolean)
                }
                disabled={disabled}
                data-testid={`checkbox-${symptom.id}`}
              />
              <div className="flex items-center space-x-3 flex-1">
                <div className={`p-2 rounded-lg ${isChecked ? 'bg-primary/10 text-primary' : 'bg-muted/50'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <Label 
                  htmlFor={symptom.id}
                  className="text-base font-medium cursor-pointer flex-1"
                >
                  {symptom.label}
                </Label>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}