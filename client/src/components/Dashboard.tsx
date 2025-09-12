import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import VillageHeader from "./VillageHeader"
import StatusCard from "./StatusCard"
import ActionButton from "./ActionButton"
import AlertCard from "./AlertCard"
import EducationCard from "./EducationCard"
import LanguageSelector from "./LanguageSelector"
import RoleSelector from "./RoleSelector"
import LoginForm from "./LoginForm"
import CaseReportForm from "./CaseReportForm"
import WaterQualityForm from "./WaterQualityForm"
import WaterDataScreen from "./WaterDataScreen"
import TestingInstructions from "./TestingInstructions"
import SplashScreen from "./SplashScreen"
import RoleSelectionScreen from "./RoleSelectionScreen"
import { ThemeProvider, useTheme } from "./ThemeProvider"
import { 
  Plus, 
  Droplets, 
  Bell, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Users, 
  TrendingUp,
  Moon,
  Sun,
  ArrowLeft,
  Play,
  FileImage,
  Download,
  Phone,
  MessageCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import healthStatusImage from '@assets/generated_images/Health_status_indicator_icons_8493858c.png'
import waterSafetyImage from '@assets/generated_images/Water_safety_education_infographic_9307d9c9.png'
import villageImage from '@assets/generated_images/Rural_village_community_illustration_b8b82f5a.png'

type Screen = "splash" | "role-selection" | "testing-guide" | "login" | "onboarding" | "dashboard" | "case-report" | "water-data" | "alerts" | "education" | "reports" | "settings" | "ai-prediction"

interface User {
  phoneNumber: string
  role: string
  villageName: string
  language: string
  name?: string
}

//todo: remove mock functionality
const mockAlerts = [
  {
    id: "1",
    type: "danger" as const,
    title: "Water Contamination Alert - Majuli",
    message: "High contamination levels detected at Majuli Main Well (Kamalabari). pH: 9.2, Turbidity: 5.4 NTU. Boil water for 10+ minutes before drinking. Switch to alternate sources immediately.",
    timestamp: "2 min ago",
    location: "Kamalabari, Majuli",
    severity: "Critical"
  },
  {
    id: "2", 
    type: "warning" as const,
    title: "Health Case Cluster - Majuli",
    message: "3 diarrhea cases reported in Tengapani village, Majuli in the last 24 hours. Possible water-borne outbreak. Enhanced monitoring required for surrounding areas.",
    timestamp: "15 min ago",
    location: "Tengapani, Majuli",
    severity: "Moderate"
  },
  {
    id: "3",
    type: "info" as const,
    title: "Community Health Update - Majuli",
    message: "Successfully trained 15 ASHA workers from 5 villages in Majuli on new ORS preparation methods. Training materials now available in Assamese and Mising languages.",
    timestamp: "1 hour ago",
    location: "Majuli District",
    severity: "Low"
  },
  {
    id: "4",
    type: "warning" as const,
    title: "Monsoon Water Alert - Majuli",
    message: "Heavy rainfall predicted for next 3 days in Majuli. Risk of well contamination and flooding. Prepare emergency water storage and purification tablets.",
    timestamp: "2 hours ago",
    location: "All Majuli Villages",
    severity: "Moderate"
  }
]

//todo: remove mock functionality
const mockEducationMaterials = [
  {
    id: "1",
    title: "Proper Handwashing Technique",
    description: "Essential 20-second handwashing method to prevent waterborne diseases and infections. Follow these 5 critical steps for effective protection.",
    type: "infographic" as const,
    language: "English/Assamese",
    imageUrl: waterSafetyImage,
    steps: "1. Wet hands with clean water → 2. Apply soap and lather well → 3. Scrub for 20 seconds → 4. Rinse thoroughly → 5. Dry with clean towel",
    keyTimes: "Before eating, after toilet use, after handling animals, when hands are visibly dirty"
  },
  {
    id: "2", 
    title: "Safe Water Storage Methods",
    description: "Community-proven techniques for storing water safely to prevent contamination. Essential household practices for family health protection.",
    type: "poster" as const,
    language: "অসমীয়া/Mising",
    imageUrl: waterSafetyImage,
    steps: "1. Use clean, covered containers only → 2. Store in cool, dry places → 3. Clean containers weekly → 4. Use ladle to remove water → 5. Never dip hands directly",
    keyTimes: "Check storage weekly, clean containers before refilling"
  },
  {
    id: "3",
    title: "ORS Preparation at Home",
    description: "Life-saving oral rehydration solution using common household items. Critical skill for treating diarrhea and preventing dehydration deaths.",
    type: "infographic" as const,
    language: "English/Assamese",
    imageUrl: waterSafetyImage,
    steps: "1. Boil 1L water, cool completely → 2. Add 1/2 tsp salt (3g) → 3. Add 2 tbsp sugar (18g) → 4. Stir until dissolved → 5. Give small sips frequently",
    keyTimes: "Use within 24 hours, discard if taste changes, seek medical help if vomiting persists"
  },
  {
    id: "4",
    title: "Village Hygiene Best Practices",
    description: "Essential hygiene practices to keep your family and community healthy during all seasons, emergencies, and disease outbreaks.",
    type: "poster" as const,
    language: "English/Assamese/Mising",
    imageUrl: waterSafetyImage,
    steps: "1. Keep areas clean and ventilated → 2. Dispose waste in designated areas → 3. Cook food thoroughly → 4. Use clean utensils → 5. Maintain safe distance from animals",
    keyTimes: "Daily practices, especially during monsoon season and outbreak periods"
  },
  {
    id: "5",
    title: "Water Purification Methods",
    description: "Simple, effective ways to make water safe for drinking when quality is uncertain or during contamination alerts. Could prevent serious illness.",
    type: "infographic" as const,
    language: "English/Assamese",
    imageUrl: waterSafetyImage,
    steps: "1. Boil water 10+ minutes when contaminated → 2. Use purification tablets as directed → 3. Strain through clean cloth → 4. Store in clean containers → 5. Avoid wells during alerts",
    keyTimes: "During contamination alerts, after heavy rainfall, when water looks/smells unusual"
  },
  {
    id: "6",
    title: "Recognizing Waterborne Illness",
    description: "Early warning signs of water-related diseases and when to seek immediate medical help. Early detection can save lives in your community.",
    type: "audio" as const,
    language: "বাংলা/Assamese/Mising",
    steps: "Warning Signs: Diarrhea 2+ days → Persistent vomiting → High fever with stomach pain → Severe dehydration → Multiple family members with similar symptoms",
    keyTimes: "Seek immediate medical attention, report to ASHA worker, increase ORS intake while seeking help"
  }
]

//todo: remove mock functionality
const mockCaseReports = [
  {
    type: "Diarrhea Case",
    severity: "Medium",
    location: "Tengapani Village",
    reporter: "ASHA Worker Priyanka",
    date: "11 Sep 2025",
    synced: true,
    hasVoiceNote: true,
    hasPhotos: false,
    photoCount: 0
  },
  {
    type: "Fever Outbreak",
    severity: "High", 
    location: "Kamalabari Area",
    reporter: "Dr. Raj Kumar",
    date: "10 Sep 2025",
    synced: false,
    hasVoiceNote: false,
    hasPhotos: true,
    photoCount: 2
  },
  {
    type: "Stomach Pain",
    severity: "Low",
    location: "Majuli Main Road",
    reporter: "Village Volunteer",
    date: "09 Sep 2025", 
    synced: true,
    hasVoiceNote: true,
    hasPhotos: true,
    photoCount: 1
  }
]

//todo: remove mock functionality
const mockWaterReports = [
  {
    source: "Majuli Main Well",
    status: "Unsafe",
    pH: "9.2",
    turbidity: "5.4",
    temperature: "28",
    location: "Kamalabari",
    tester: "ASHA Priyanka",
    date: "11 Sep 2025",
    synced: true
  },
  {
    source: "Community Tube Well",
    status: "Caution", 
    pH: "7.8",
    turbidity: "3.1",
    temperature: "25",
    location: "Tengapani",
    tester: "Health Worker Raj",
    date: "10 Sep 2025",
    synced: false
  },
  {
    source: "Handpump Station",
    status: "Safe",
    pH: "7.2", 
    turbidity: "1.2",
    temperature: "24",
    location: "Village Center",
    tester: "Dr. Kumar",
    date: "09 Sep 2025",
    synced: true
  }
]

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
      className="h-8 w-8 sm:h-10 sm:w-10"
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </Button>
  )
}

function DashboardContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash")
  const [user, setUser] = useState<User | null>(null)
  const [tempUserName, setTempUserName] = useState("") // For profile editing
  const [isOnline, setIsOnline] = useState(true)
  // Always declare these hooks to avoid conditional hook calls
  const [onboardingStep, setOnboardingStep] = useState<"role" | "village" | "language">("role")
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedVillage, setSelectedVillage] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [reportTab, setReportTab] = useState<'cases' | 'water'>('cases')

  // Load user from localStorage on app initialization
  useEffect(() => {
    const savedUser = localStorage.getItem('healthMonitorUser')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setCurrentScreen("dashboard")
        console.log("User loaded from localStorage:", parsedUser)
      } catch (error) {
        console.log("Failed to load saved user data, clearing localStorage")
        localStorage.removeItem('healthMonitorUser')
        setCurrentScreen("splash")
      }
    } else {
      setCurrentScreen("splash")
    }
  }, [])

  //todo: remove mock functionality
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleLogin = (phoneNumber: string, otp: string, role: string, language: string) => {
    console.log("Login successful:", phoneNumber, otp, "Role:", role, "Language:", language)
    // For testing: allow any 6-digit code to login
    if (otp.length === 6) {
      // Set user data directly since role and language are now selected during login
      const userData = {
        phoneNumber,
        role,
        villageName: "Majuli", // Default village as per spec
        language
      }
      setUser(userData)
      // Save to localStorage for persistence
      localStorage.setItem('healthMonitorUser', JSON.stringify(userData))
      console.log("User data set and saved:", userData)
      setCurrentScreen("dashboard")
    }
  }

  const handleOnboardingComplete = (role: string, villageName: string, language: string) => {
    setUser({
      phoneNumber: "+91 98765 43210", //todo: remove mock functionality
      role,
      villageName,
      language
    })
    console.log("User onboarding complete:", { role, villageName, language })
    setCurrentScreen("dashboard")
  }

  // Helper function to check if user has write permissions
  const hasWritePermissions = (userRole: string) => {
    return userRole !== "village_people"
  }

  // Sharing functionality
  const handleShareAlert = (alert: any) => {
    const now = new Date()
    const formattedDate = now.toLocaleString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    }) + ' IST'

    const alertMessage = `HEALTH ALERT - ${alert.title}

Location: ${alert.location || 'Majuli'}
Severity: ${alert.severity || 'Unknown'}
Issued: ${formattedDate}

Details:
${alert.message}

IMMEDIATE ACTION REQUIRED - Please follow all safety protocols.

Source: Majuli Health Monitoring System
Contact local health authorities for assistance.`
    
    // Platform-aware SMS sharing
    const shareViaSMS = () => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      const separator = isIOS ? '&' : '?'
      const smsUrl = `sms:${separator}body=${encodeURIComponent(alertMessage)}`
      window.location.href = smsUrl
    }
    
    // WhatsApp sharing
    const shareViaWhatsApp = () => {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(alertMessage)}`
      window.open(whatsappUrl, '_blank')
    }
    
    // Try native sharing first, fallback to WhatsApp
    if (navigator.share && navigator.canShare && navigator.canShare({ text: alertMessage })) {
      navigator.share({
        title: alert.title,
        text: alertMessage
      }).catch((err) => {
        console.log('Native sharing failed, using WhatsApp:', err)
        shareViaWhatsApp()
      })
    } else {
      // Show sharing options (for now, prioritize WhatsApp but log SMS option)
      const userChoice = confirm(`Share this alert via WhatsApp?\n\nClick OK for WhatsApp, Cancel for SMS`)
      if (userChoice) {
        shareViaWhatsApp()
        console.log('Alert shared via WhatsApp:', alert.id)
      } else {
        shareViaSMS()
        console.log('Alert shared via SMS:', alert.id)
      }
    }
  }
  
  const handleDismissAlert = (alertId: string) => {
    // In real app, would update state/storage to hide dismissed alerts
    console.log('Alert dismissed:', alertId)
    // Could add toast notification here
  }

  const handleNavigation = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  const handleBack = () => {
    if (currentScreen === "onboarding") {
      setCurrentScreen("login")
    } else {
      setCurrentScreen("dashboard")
    }
  }

  if (currentScreen === "splash") {
    console.log("Rendering splash screen")
    return <SplashScreen onComplete={() => setCurrentScreen("role-selection")} />
  }

  if (currentScreen === "role-selection") {
    return <RoleSelectionScreen onRoleSelect={(role) => {
      setSelectedRole(role)
      setCurrentScreen("login")
    }} />
  }

  if (currentScreen === "testing-guide") {
    return (
      <div className="min-h-screen bg-background">
        <TestingInstructions onStartTesting={() => setCurrentScreen("login")} />
      </div>
    )
  }

  if (currentScreen === "login") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Smart Health Monitor</h1>
              <p className="text-muted-foreground">Community Health Tracking for Rural Villages</p>
            </div>
          </div>
          <LoginForm onLogin={handleLogin} selectedRole={selectedRole} />
        </div>
      </div>
    )
  }

  if (currentScreen === "onboarding") {
    //todo: remove mock functionality
    const villages = ["Baridhara Village", "Teliamura Village", "Krishnapur Village", "Rampur Village"]

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={handleBack} data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <ThemeToggle />
          </div>

          {onboardingStep === "role" && (
            <div className="space-y-6">
              <RoleSelector 
                selectedRole={selectedRole}
                onRoleSelect={setSelectedRole}
              />
              <Button 
                onClick={() => setOnboardingStep("village")}
                disabled={!selectedRole}
                className="w-full"
                size="lg"
                data-testid="button-continue-role"
              >
                Continue
              </Button>
            </div>
          )}

          {onboardingStep === "village" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold">Select Your Village</h2>
                <p className="text-muted-foreground">Choose the village you'll be monitoring</p>
              </div>
              
              <div className="space-y-2">
                {villages.map(village => (
                  <Button
                    key={village}
                    variant={selectedVillage === village ? "default" : "outline"}
                    onClick={() => setSelectedVillage(village)}
                    className="w-full justify-start"
                    data-testid={`button-village-${village.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {village}
                  </Button>
                ))}
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setOnboardingStep("role")} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={() => setOnboardingStep("language")}
                  disabled={!selectedVillage}
                  className="flex-1"
                  data-testid="button-continue-village"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {onboardingStep === "language" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold">Choose Language</h2>
                <p className="text-muted-foreground">Select your preferred language</p>
              </div>
              
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
              
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setOnboardingStep("village")} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={() => handleOnboardingComplete(selectedRole, selectedVillage, selectedLanguage)}
                  className="flex-1"
                  data-testid="button-complete-onboarding"
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Main App Screens
  const renderContent = () => {
    switch (currentScreen) {
      case "case-report":
        return (
          <CaseReportForm
            villageName={user?.villageName || "Village"}
            onSubmit={(data) => {
              console.log("Case submitted:", data)
              setCurrentScreen("dashboard")
            }}
            onSaveOffline={(data) => console.log("Case saved offline:", data)}
            isReadOnly={!hasWritePermissions(user?.role || "")}
          />
        )
      
      case "water-data":
        return (
          <WaterDataScreen
            villageName={user?.villageName || "Majuli"}
            onSubmit={(data) => {
              console.log("Water data submitted:", data)
              setCurrentScreen("dashboard")
            }}
            onSaveOffline={(data) => console.log("Water data saved offline:", data)}
            isLoading={false}
            hasWritePermissions={hasWritePermissions(user?.role || "")}
          />
        )
        
      case "alerts":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Village Health Alerts</h2>
              <p className="text-muted-foreground">Real-time health and safety notifications for {user?.villageName || 'Majuli'}</p>
            </div>
            
            {/* Critical Alerts First */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm font-medium text-red-600 dark:text-red-400">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>Critical Alerts ({mockAlerts.filter(a => a.type === 'danger').length})</span>
              </div>
              
              {mockAlerts.filter(alert => alert.type === 'danger').map(alert => (
                <AlertCard
                  key={alert.id}
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                  timestamp={alert.timestamp}
                  onDismiss={() => handleDismissAlert(alert.id)}
                  onShare={() => handleShareAlert(alert)}
                />
              ))}
            </div>
            
            {/* Warning Alerts */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm font-medium text-orange-600 dark:text-orange-400">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Warnings ({mockAlerts.filter(a => a.type === 'warning').length})</span>
              </div>
              
              {mockAlerts.filter(alert => alert.type === 'warning').map(alert => (
                <AlertCard
                  key={alert.id}
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                  timestamp={alert.timestamp}
                  onDismiss={() => handleDismissAlert(alert.id)}
                  onShare={() => handleShareAlert(alert)}
                />
              ))}
            </div>
            
            {/* Info Alerts */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Information ({mockAlerts.filter(a => a.type === 'info').length})</span>
              </div>
              
              {mockAlerts.filter(alert => alert.type === 'info').map(alert => (
                <AlertCard
                  key={alert.id}
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                  timestamp={alert.timestamp}
                  onDismiss={() => handleDismissAlert(alert.id)}
                  onShare={() => handleShareAlert(alert)}
                />
              ))}
            </div>
            
            {mockAlerts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8" />
                </div>
                <p>No active alerts for {user?.villageName || 'your village'}</p>
                <p className="text-sm">All systems are running normally</p>
              </div>
            )}
          </div>
        )
        
      case "education":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Health Education Center</h2>
              <p className="text-muted-foreground">Essential health knowledge for {user?.villageName || 'Majuli'} community</p>
            </div>
            
            {/* Critical Education Materials */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm font-medium text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Essential Health Practices ({mockEducationMaterials.length} materials)</span>
              </div>
              
              <div className="grid gap-4">
                {mockEducationMaterials.map(material => (
                  <div key={material.id} className="bg-card rounded-lg border p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">{material.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            material.type === 'infographic' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                            material.type === 'poster' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' :
                            'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                          }`}>
                            {material.type}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{material.description}</p>
                        <div className="text-sm text-primary font-medium">Language: {material.language}</div>
                        
                        {(material as any).steps && (
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm text-green-600 dark:text-green-400">Step-by-Step Instructions:</h4>
                            <p className="text-sm bg-green-50 dark:bg-green-950 p-3 rounded-md text-green-700 dark:text-green-300">{(material as any).steps}</p>
                          </div>
                        )}
                        
                        {(material as any).keyTimes && (
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm text-orange-600 dark:text-orange-400">Important Timing:</h4>
                            <p className="text-sm bg-orange-50 dark:bg-orange-950 p-3 rounded-md text-orange-700 dark:text-orange-300">{(material as any).keyTimes}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-4">
                        {material.imageUrl ? (
                          <img src={material.imageUrl} alt={material.title} className="w-16 h-16 rounded-md object-cover" />
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                            {material.type === 'audio' ? <Play className="w-8 h-8 text-muted-foreground" /> : <FileImage className="w-8 h-8 text-muted-foreground" />}
                          </div>
                        )}
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => console.log("Downloaded:", material.title)}
                            data-testid={`button-download-${material.id}`}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          {material.type === 'audio' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => console.log("Playing:", material.title)}
                              data-testid={`button-play-${material.id}`}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Emergency Contact Info */}
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-red-700 dark:text-red-300 flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Emergency Health Contacts</span>
              </h3>
              <div className="text-sm text-red-600 dark:text-red-400 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <p>• <strong>Health Emergency:</strong> 108</p>
                  <p>• <strong>Ambulance Service:</strong> 104</p>
                  <p>• <strong>Water Poisoning:</strong> 1075</p>
                  <p>• <strong>Child Helpline:</strong> 1098</p>
                </div>
                <div className="border-t border-red-200 dark:border-red-800 pt-2 mt-3">
                  <p className="font-medium">Local Support:</p>
                  <p>• ASHA Worker: Contact through village Panchayat</p>
                  <p>• Primary Health Center (PHC): Majuli District Hospital</p>
                  <p>• Water Quality Issues: Report to Block Development Office</p>
                </div>
                <div className="bg-red-100 dark:bg-red-900 p-2 rounded text-red-800 dark:text-red-200 text-xs">
                  <strong>Remember:</strong> In severe emergencies, call 108 immediately. For water contamination, alert entire village through ASHA workers.
                </div>
              </div>
            </div>
          </div>
        )
        
      case "reports":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">Reports & Sync</h2>
                <p className="text-muted-foreground">Track data submissions and sync status for {user?.villageName || 'Majuli'}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>

            {/* Sync Status Bar */}
            <div className="bg-card border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Sync Status</h3>
                <Button 
                  size="sm" 
                  variant={isOnline ? "default" : "outline"}
                  onClick={() => console.log("Manual sync triggered")}
                  disabled={!isOnline}
                  data-testid="button-sync-now"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 rotate-45" />
                  Sync Now
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-green-600">{mockCaseReports.filter(r => r.synced).length}</div>
                  <div className="text-xs text-muted-foreground">Synced Cases</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-orange-600">{mockCaseReports.filter(r => !r.synced).length}</div>
                  <div className="text-xs text-muted-foreground">Pending Cases</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-green-600">{mockWaterReports.filter(r => r.synced).length}</div>
                  <div className="text-xs text-muted-foreground">Synced Water Data</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-orange-600">{mockWaterReports.filter(r => !r.synced).length}</div>
                  <div className="text-xs text-muted-foreground">Pending Water</div>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Last sync: {isOnline ? 'Just now' : '2 hours ago'} • Next auto-sync: {isOnline ? '5 minutes' : 'When online'}
              </div>
            </div>

            {/* Reports Tabs */}
            <div className="space-y-4">
              <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                <Button 
                  variant={reportTab === 'cases' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setReportTab('cases')}
                  className="flex-1"
                  data-testid="button-tab-cases"
                >
                  Health Cases ({mockCaseReports.length})
                </Button>
                <Button 
                  variant={reportTab === 'water' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setReportTab('water')}
                  className="flex-1"
                  data-testid="button-tab-water"
                >
                  Water Data ({mockWaterReports.length})
                </Button>
              </div>

              {/* Cases Tab Content */}
              {reportTab === 'cases' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Recent Health Case Reports</h3>
                    <div className="text-sm text-muted-foreground">Total: {mockCaseReports.length} cases</div>
                  </div>
                  
                  <div className="space-y-2">
                    {mockCaseReports.map((caseReport, index) => (
                      <div key={index} className="bg-card border rounded-lg p-3 space-y-2" data-testid={`card-case-${index}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${caseReport.synced ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                            <span className="font-medium">{caseReport.type}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              caseReport.severity === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                              caseReport.severity === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' :
                              'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            }`}>
                              {caseReport.severity}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">{caseReport.date}</div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          Location: {caseReport.location} • Reported by: {caseReport.reporter}
                        </div>
                        
                        <div className="flex items-center space-x-2 text-xs">
                          <span className={`px-2 py-1 rounded ${caseReport.synced ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300' : 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300'}`}>
                            {caseReport.synced ? 'Synced' : 'Pending Sync'}
                          </span>
                          {caseReport.hasVoiceNote && (
                            <span className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-2 py-1 rounded">
                              Voice Note
                            </span>
                          )}
                          {caseReport.hasPhotos && (
                            <span className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 px-2 py-1 rounded">
                              Photos ({caseReport.photoCount})
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Water Data Tab Content */}
              {reportTab === 'water' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Recent Water Quality Reports</h3>
                    <div className="text-sm text-muted-foreground">Total: {mockWaterReports.length} reports</div>
                  </div>
                  
                  <div className="space-y-2">
                    {mockWaterReports.map((waterReport, index) => (
                      <div key={index} className="bg-card border rounded-lg p-3 space-y-2" data-testid={`card-water-${index}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${waterReport.synced ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                            <span className="font-medium">{waterReport.source}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              waterReport.status === 'Safe' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                              waterReport.status === 'Caution' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' :
                              'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {waterReport.status}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">{waterReport.date}</div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>pH: {waterReport.pH}</div>
                          <div>Turbidity: {waterReport.turbidity} NTU</div>
                          <div>Temp: {waterReport.temperature}°C</div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          Tested by: {waterReport.tester} • Location: {waterReport.location}
                        </div>
                        
                        <div className="flex items-center space-x-2 text-xs">
                          <span className={`px-2 py-1 rounded ${waterReport.synced ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300' : 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300'}`}>
                            {waterReport.synced ? 'Synced' : 'Pending Sync'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
        
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Profile & Settings</h2>
            
            {/* User Profile Section */}
            <div className="p-4 bg-card rounded-lg border space-y-4">
              <h3 className="font-semibold">User Profile</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input 
                    type="text"
                    className="w-full mt-1 p-2 border rounded-md bg-background"
                    value={tempUserName || user?.name || (user?.phoneNumber === "9876543210" ? "Rita Devi" : user?.phoneNumber === "9123456780" ? "Amit Kumar" : "User Name")}
                    placeholder="Enter your name"
                    data-testid="input-name"
                    onChange={(e) => setTempUserName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <div className="w-full mt-1 p-2 border rounded-md bg-muted text-muted-foreground" data-testid="text-role">
                    {user?.role}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Village</label>
                  <div className="w-full mt-1 p-2 border rounded-md bg-muted text-muted-foreground" data-testid="text-village">
                    {user?.villageName}
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => {
                    if (user && tempUserName.trim()) {
                      const updatedUser = { ...user, name: tempUserName.trim() }
                      setUser(updatedUser)
                      // Persist to localStorage
                      localStorage.setItem('healthMonitorUser', JSON.stringify(updatedUser))
                      setTempUserName("") // Clear temp state
                      console.log("Profile updated and saved successfully")
                    }
                  }}
                  data-testid="button-save-profile"
                  disabled={!tempUserName.trim()}
                >
                  Save Profile
                </Button>
              </div>
            </div>
            
            {/* Language Settings */}
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-3">Language Switch</h3>
              <LanguageSelector
                selectedLanguage={user?.language || "en"}
                onLanguageChange={(lang) => {
                  if (user) {
                    const updatedUser = { ...user, language: lang }
                    setUser(updatedUser)
                    // Persist to localStorage
                    localStorage.setItem('healthMonitorUser', JSON.stringify(updatedUser))
                    console.log("Language updated and saved:", lang)
                  }
                }}
              />
            </div>
            
            {/* Help & Support */}
            <div className="p-4 bg-card rounded-lg border space-y-3">
              <h3 className="font-semibold">Help & Support</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => console.log("User guide opened")}
                  data-testid="button-help-guide"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  User Guide
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => console.log("Technical support contacted")}
                  data-testid="button-help-call"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Technical Support
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => console.log("Feedback form opened")}
                  data-testid="button-help-feedback"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Feedback
                </Button>
              </div>
            </div>
            
            {/* Logout */}
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => {
                setUser(null)
                localStorage.removeItem('healthMonitorUser')
                setCurrentScreen("splash")
              }}
              data-testid="button-logout"
            >
              Logout
            </Button>
          </div>
        )
        
      case "ai-prediction":
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="mx-auto max-w-3xl">
              <Card className="border-2">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl sm:text-2xl font-semibold">AI Outbreak Prediction</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Official health risk assessment generated from recent water quality and case trends. Updated with latest data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950 p-4 sm:p-5">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 h-3 w-3 rounded-full bg-orange-500"></div>
                      <div className="flex-1 space-y-3">
                        <h3 className="text-base sm:text-lg font-semibold text-orange-900 dark:text-orange-100">
                          ⚠ MEDIUM Risk Alert — Immediate Attention Required
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground">
                          Water quality analysis indicates potential health risks. Diarrhea shows highest concern (65% probability).
                        </p>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="rounded-md bg-white p-4 dark:bg-gray-800 border border-card-border">
                            <h4 className="mb-2 text-sm font-semibold text-red-800 dark:text-red-200">🚨 Critical Alerts</h4>
                            <ul className="list-disc space-y-1 pl-5 text-sm sm:text-base text-red-700 dark:text-red-300">
                              <li>E.coli levels elevated (45 CFU/100ml)</li>
                              <li>Turbidity increased (8.5 NTU)</li>
                              <li>Temperature favorable for bacteria (32°C)</li>
                            </ul>
                          </div>

                          <div className="rounded-md bg-white p-4 dark:bg-gray-800 border border-card-border">
                            <h4 className="mb-2 text-sm font-semibold text-orange-800 dark:text-orange-200">🦠 Disease Analysis</h4>
                            <ul className="list-disc space-y-1 pl-5 text-sm sm:text-base text-orange-800 dark:text-orange-200">
                              <li>Cholera: MEDIUM (45% risk) 8–12 cases in 2–5 days</li>
                              <li>Diarrhea: HIGH (65% risk) 15–25 cases in 1–3 days</li>
                              <li>Typhoid: LOW (20% risk) 2–4 cases in 1–2 weeks</li>
                            </ul>
                          </div>
                        </div>

                        <div className="rounded-md bg-white p-4 dark:bg-gray-800 border border-card-border">
                          <h4 className="mb-2 text-sm font-semibold text-blue-800 dark:text-blue-200">⚡ Immediate Actions Required</h4>
                          <ul className="list-disc space-y-1 pl-5 text-sm sm:text-base text-blue-800 dark:text-blue-200">
                            <li>Increase monitoring to every 2 hours</li>
                            <li>Issue preventive health advisory</li>
                            <li>Prepare medical facilities</li>
                            <li>Distribute water purification tablets</li>
                          </ul>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-xs sm:text-sm text-muted-foreground">📅 Critical Period: Next 24–48 hours</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">Source: Automated model • v1.0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
        
      default: // dashboard
        console.log("Rendering dashboard screen, user:", user)
        return (
          <div className="space-y-6">
            {/* Risk Status Bar */}
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-200">Village Status: SAFE</h3>
                    <p className="text-sm text-green-600 dark:text-green-300">All systems monitoring normally</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-600 dark:text-green-300">Last Updated</p>
                  <p className="text-xs text-green-700 dark:text-green-200 font-medium">2 min ago</p>
                </div>
              </div>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <StatusCard
                title="Water Sources"
                value="12/15"
                icon={Droplets}
                status="safe"
                subtitle="Safe • pH: 7.2"
                onClick={() => handleNavigation("water-data")}
              />
              
              <StatusCard
                title="Health Cases"
                value="5"
                icon={Users}
                status="caution"
                subtitle="This week • 2 resolved"
                onClick={() => handleNavigation("reports")}
              />
              
              <StatusCard
                title="AI Risk Level"
                value="LOW"
                icon={TrendingUp}
                status="safe"
                subtitle="Trend: Decreasing"
                onClick={() => handleNavigation("ai-prediction")}
              />
            </div>

            {/* Main Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {hasWritePermissions(user?.role || "") && (
                <ActionButton
                  title="Report Case"
                  icon={Plus}
                  onClick={() => handleNavigation("case-report")}
                />
              )}
              
              <ActionButton
                title="AI Prediction"
                icon={TrendingUp}
                onClick={() => handleNavigation("ai-prediction")}
              />
            </div>

            {/* Recent Alerts */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Recent Alerts</h3>
              {mockAlerts.slice(0, 2).map(alert => (
                <AlertCard
                  key={alert.id}
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                  timestamp={alert.timestamp}
                  onShare={() => console.log("Alert shared:", alert.id)}
                />
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40">
        <div className="bg-card border-b px-3 py-2 sm:px-4 flex items-center justify-between">
          {currentScreen !== "dashboard" ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              data-testid="button-back-to-dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg font-semibold">Smart Health Monitor</h1>
            </div>
          )}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleNavigation("settings")}
              data-testid="button-settings-top"
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
        
        <VillageHeader
          villageName={user?.villageName || "Village"}
          status="safe" //todo: remove mock functionality - get from actual data
          isOnline={isOnline}
          lastSync="2 min ago" //todo: remove mock functionality
        />
      </div>

      {/* Content */}
      <div className="p-3 pb-20 sm:p-4">
        {renderContent()}
      </div>

      {/* Bottom Navigation - only show on dashboard */}
      {currentScreen === "dashboard" && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t px-2 py-2">
          <div className="flex justify-around">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("dashboard")}
              className="flex flex-col space-y-1 px-2"
              data-testid="nav-dashboard"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs">Dashboard</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("water-data")}
              className="flex flex-col space-y-1 px-2"
              data-testid="nav-water"
            >
              <Droplets className="w-4 h-4" />
              <span className="text-xs">Water</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("reports")}
              className="flex flex-col space-y-1 px-2"
              data-testid="nav-reports"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs">Reports</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("alerts")}
              className="flex flex-col space-y-1 px-2"
              data-testid="nav-alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="text-xs">Alerts</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("education")}
              className="flex flex-col space-y-1 px-2"
              data-testid="nav-education"
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-xs">Education</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  return (
    <ThemeProvider defaultTheme="light">
      <DashboardContent />
    </ThemeProvider>
  )
}