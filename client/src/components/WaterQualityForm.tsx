import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Droplets, Thermometer, Activity } from "lucide-react"

interface WaterData {
  ph: string
  turbidity: string
  temperature: string
  location: string
  notes: string
}

interface WaterQualityFormProps {
  villageName: string
  onSubmit: (waterData: WaterData) => void
  onSaveOffline?: (waterData: WaterData) => void
  isLoading?: boolean
  isReadOnly?: boolean
}

export default function WaterQualityForm({ 
  villageName, 
  onSubmit, 
  onSaveOffline,
  isLoading = false,
  isReadOnly = false
}: WaterQualityFormProps) {
  const [waterData, setWaterData] = useState<WaterData>({
    ph: "",
    turbidity: "",
    temperature: "",
    location: "",
    notes: "",
  })

  const handleSubmit = () => {
    if (waterData.ph && waterData.turbidity && waterData.temperature) {
      console.log("Submitting water quality data:", waterData)
      onSubmit(waterData)
    }
  }

  const handleSaveOffline = () => {
    if (onSaveOffline) {
      console.log("Saving water data offline:", waterData)
      onSaveOffline(waterData)
    }
  }

  const isValid = waterData.ph && waterData.turbidity && waterData.temperature

  const getStatusColor = (value: string, type: 'ph' | 'turbidity' | 'temp') => {
    if (!value) return "text-muted-foreground"
    
    const numValue = parseFloat(value)
    
    switch (type) {
      case 'ph':
        if (numValue >= 6.5 && numValue <= 8.5) return "text-health-safe"
        if (numValue >= 6.0 && numValue <= 9.0) return "text-health-caution"
        return "text-health-risk"
      case 'turbidity':
        if (numValue <= 1) return "text-health-safe"
        if (numValue <= 4) return "text-health-caution"
        return "text-health-risk"
      case 'temp':
        if (numValue >= 15 && numValue <= 25) return "text-health-safe"
        if (numValue >= 10 && numValue <= 30) return "text-health-caution"
        return "text-health-risk"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>Water Quality Data</CardTitle>
              <p className="text-sm text-muted-foreground">Village: {villageName}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {isReadOnly && (
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                <strong>View-only mode:</strong> Village people can view water data but cannot submit new tests.
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ph" className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>pH Level</span>
              </Label>
              <Input
                id="ph"
                type="number"
                step="0.1"
                placeholder="7.0"
                value={waterData.ph}
                onChange={(e) => setWaterData({...waterData, ph: e.target.value})}
                className={getStatusColor(waterData.ph, 'ph')}
                data-testid="input-ph"
                disabled={isReadOnly}
              />
              <p className="text-xs text-muted-foreground">Normal: 6.5-8.5</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="turbidity" className="flex items-center space-x-2">
                <Droplets className="w-4 h-4" />
                <span>Turbidity (NTU)</span>
              </Label>
              <Input
                id="turbidity"
                type="number"
                step="0.1"
                placeholder="1.0"
                value={waterData.turbidity}
                onChange={(e) => setWaterData({...waterData, turbidity: e.target.value})}
                className={getStatusColor(waterData.turbidity, 'turbidity')}
                data-testid="input-turbidity"
                disabled={isReadOnly}
              />
              <p className="text-xs text-muted-foreground">Safe: &lt;1 NTU</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="temperature" className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4" />
                <span>Temperature (°C)</span>
              </Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                placeholder="20.0"
                value={waterData.temperature}
                onChange={(e) => setWaterData({...waterData, temperature: e.target.value})}
                className={getStatusColor(waterData.temperature, 'temp')}
                data-testid="input-temperature"
                disabled={isReadOnly}
              />
              <p className="text-xs text-muted-foreground">Normal: 15-25°C</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Sample Location</Label>
            <Input
              id="location"
              placeholder="e.g., Main Well, Tube Well #3, River Point A"
              value={waterData.location}
              onChange={(e) => setWaterData({...waterData, location: e.target.value})}
              data-testid="input-location"
              disabled={isReadOnly}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Visual appearance, odor, or other observations..."
              value={waterData.notes}
              onChange={(e) => setWaterData({...waterData, notes: e.target.value})}
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
                data-testid="button-submit-water"
              >
                {isLoading ? "Submitting..." : "Submit Data"}
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