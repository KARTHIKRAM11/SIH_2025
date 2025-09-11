import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import SymptomCheckList from "./SymptomCheckList"
import { User, Calendar, Mic, MicOff, Camera, X, Play, Square } from "lucide-react"

interface CaseData {
  patientAge: string
  patientGender: "male" | "female" | "other" | ""
  symptoms: string[]
  severity: "mild" | "moderate" | "severe" | ""
  notes: string
  voiceNotes: string[] // Base64 encoded audio data
  photos: string[] // Base64 encoded image data or file URLs
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
    voiceNotes: [],
    photos: [],
  })

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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

  // Voice recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioStreamRef.current = stream
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      const audioChunks: Blob[] = []
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result as string
          setCaseData(prev => ({
            ...prev,
            voiceNotes: [...prev.voiceNotes, base64String]
          }))
        }
        reader.readAsDataURL(audioBlob)
        
        // Clean up
        stream.getTracks().forEach(track => track.stop())
        audioStreamRef.current = null
      }
      
      mediaRecorder.start()
      setIsRecording(true)
      setRecordingDuration(0)
      
      // Start duration timer
      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
      
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Could not access microphone. Please check permissions.')
    }
  }
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current)
      }
    }
  }
  
  const removeVoiceNote = (index: number) => {
    setCaseData(prev => ({
      ...prev,
      voiceNotes: prev.voiceNotes.filter((_, i) => i !== index)
    }))
  }
  
  // Photo handling functions
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onloadend = () => {
            const base64String = reader.result as string
            setCaseData(prev => ({
              ...prev,
              photos: [...prev.photos, base64String]
            }))
          }
          reader.readAsDataURL(file)
        }
      })
    }
    
    // Clear input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  const removePhoto = (index: number) => {
    setCaseData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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

          {/* Voice Notes Section */}
          {!isReadOnly && (
            <div className="space-y-4">
              <Label>Voice Notes</Label>
              
              <div className="flex items-center space-x-3">
                {!isRecording ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={startRecording}
                    className="flex items-center space-x-2"
                    data-testid="button-start-recording"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Record Voice Note</span>
                  </Button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={stopRecording}
                      className="flex items-center space-x-2"
                      data-testid="button-stop-recording"
                    >
                      <Square className="w-4 h-4" />
                      <span>Stop Recording</span>
                    </Button>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span>Recording... {formatDuration(recordingDuration)}</span>
                    </div>
                  </div>
                )}
              </div>

              {caseData.voiceNotes.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Recorded Voice Notes:</p>
                  {caseData.voiceNotes.map((note, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Play className="w-4 h-4 text-primary" />
                        <span className="text-sm">Voice Note {index + 1}</span>
                        <audio controls className="h-8">
                          <source src={note} type="audio/webm" />
                        </audio>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVoiceNote(index)}
                        data-testid={`button-remove-voice-${index}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Photos Section */}
          {!isReadOnly && (
            <div className="space-y-4">
              <Label>Photos</Label>
              
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2"
                  data-testid="button-add-photo"
                >
                  <Camera className="w-4 h-4" />
                  <span>Add Photo</span>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Take a photo or upload from gallery
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
                data-testid="input-photo-upload"
              />

              {caseData.photos.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Uploaded Photos:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {caseData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Case photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          data-testid={`button-remove-photo-${index}`}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
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