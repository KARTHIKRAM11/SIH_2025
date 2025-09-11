import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import SymptomCheckList from "./SymptomCheckList"
import { User, Calendar } from "lucide-react"

interface CaseData {
  patientAge: string
  patientGender: "male" | "female" | "other" | ""
  symptoms: string[]
  severity: "mild" | "moderate" | "severe" | ""
  notes: string
}

interface CaseReportFormProps {
  villageName: string
  onSubmit: (caseData: CaseData) => void
  onSaveOffline?: (caseData: CaseData) => void
  isLoading?: boolean
  isReadOnly?: boolean
}

export default function CaseReportForm({ 
  villageName, 
  onSubmit, 
  onSaveOffline,
  isLoading = false,
  isReadOnly = false
}: CaseReportFormProps) {
  const [caseData, setCaseData] = useState<CaseData>({
    patientAge: "",
    patientGender: "",
    symptoms: [],
    severity: "",
    notes: "",
  })

  const handleSubmit = () => {
    if (caseData.patientAge && caseData.patientGender && caseData.severity) {
      console.log("Submitting case report:", caseData)
      onSubmit(caseData)
    }
  }

  const handleSaveOffline = () => {
    if (onSaveOffline) {
      console.log("Saving case offline:", caseData)
      onSaveOffline(caseData)
    }
  }

  const isValid = caseData.patientAge && caseData.patientGender && caseData.severity

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>Report New Case</CardTitle>
              <p className="text-sm text-muted-foreground">Village: {villageName}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {isReadOnly && (
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                <strong>View-only mode:</strong> Village people can view reports but cannot create new ones.
              </p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Patient Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                value={caseData.patientAge}
                onChange={(e) => setCaseData({...caseData, patientAge: e.target.value})}
                data-testid="input-patient-age"
                disabled={isReadOnly}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select 
                value={caseData.patientGender} 
                onValueChange={(value: "male" | "female" | "other") => 
                  setCaseData({...caseData, patientGender: value})
                }
                disabled={isReadOnly}
              >
                <SelectTrigger data-testid="select-gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <SymptomCheckList
            selectedSymptoms={caseData.symptoms}
            onSymptomsChange={(symptoms) => setCaseData({...caseData, symptoms})}
            disabled={isReadOnly}
          />
          
          <div className="space-y-3">
            <Label>Severity Level</Label>
            <RadioGroup
              value={caseData.severity}
              onValueChange={(value: "mild" | "moderate" | "severe") => 
                setCaseData({...caseData, severity: value})
              }
              className="flex space-x-6"
              disabled={isReadOnly}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mild" id="mild" data-testid="radio-mild" />
                <Label htmlFor="mild" className="text-sm">Mild</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderate" id="moderate" data-testid="radio-moderate" />
                <Label htmlFor="moderate" className="text-sm">Moderate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="severe" id="severe" data-testid="radio-severe" />
                <Label htmlFor="severe" className="text-sm">Severe</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional observations or notes..."
              value={caseData.notes}
              onChange={(e) => setCaseData({...caseData, notes: e.target.value})}
              rows={3}
              data-testid="textarea-notes"
              disabled={isReadOnly}
            />
          </div>
          
          {!isReadOnly && (
            <div className="flex space-x-3 pt-4">
              <Button 
                onClick={handleSubmit}
                disabled={!isValid || isLoading}
                className="flex-1"
                size="lg"
                data-testid="button-submit-case"
              >
                {isLoading ? "Submitting..." : "Submit Report"}
              </Button>
              
              {onSaveOffline && (
                <Button 
                  variant="outline"
                  onClick={handleSaveOffline}
                  disabled={!isValid}
                  size="lg"
                  data-testid="button-save-offline"
                >
                  Save Offline
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}