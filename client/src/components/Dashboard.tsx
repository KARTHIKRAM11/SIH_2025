import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
import TestingInstructions from "./TestingInstructions"
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
  ArrowLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import healthStatusImage from '@assets/generated_images/Health_status_indicator_icons_8493858c.png'
import waterSafetyImage from '@assets/generated_images/Water_safety_education_infographic_9307d9c9.png'
import villageImage from '@assets/generated_images/Rural_village_community_illustration_b8b82f5a.png'

type Screen = "testing-guide" | "login" | "onboarding" | "dashboard" | "case-report" | "water-data" | "alerts" | "education" | "reports" | "settings"

interface User {
  phoneNumber: string
  role: string
  villageName: string
  language: string
}

//todo: remove mock functionality
const mockAlerts = [
  {
    id: "1",
    type: "danger" as const,
    title: "High Risk Detected", 
    message: "High risk detected in Baridhara Village – Boil water before drinking. Immediate action required.",
    timestamp: "2 min ago"
  },
  {
    id: "2", 
    type: "warning" as const,
    title: "Water Quality Alert",
    message: "Caution: Turbidity rising in nearby areas. Monitor water sources carefully.",
    timestamp: "15 min ago"
  },
  {
    id: "3",
    type: "info" as const,
    title: "Health Education Update",
    message: "New handwashing guidelines available. Check Education section for materials.",
    timestamp: "1 hour ago"
  }
]

//todo: remove mock functionality
const mockEducationMaterials = [
  {
    id: "1",
    title: "Hand Washing Steps",
    description: "Step-by-step guide for proper hand washing technique",
    type: "infographic" as const,
    language: "English",
    imageUrl: waterSafetyImage
  },
  {
    id: "2", 
    title: "Safe Water Preparation",
    description: "Learn how to properly boil and purify water for safe drinking",
    type: "poster" as const,
    language: "অসমীয়া",
    imageUrl: waterSafetyImage
  },
  {
    id: "3",
    title: "ORS Preparation Guide", 
    description: "Audio instructions for preparing Oral Rehydration Solution",
    type: "audio" as const,
    language: "বাংলা"
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
  const [currentScreen, setCurrentScreen] = useState<Screen>("testing-guide")
  const [user, setUser] = useState<User | null>(null)
  const [isOnline, setIsOnline] = useState(true)
  // Always declare these hooks to avoid conditional hook calls
  const [onboardingStep, setOnboardingStep] = useState<"role" | "village" | "language">("role")
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedVillage, setSelectedVillage] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en")

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

  const handleLogin = (phoneNumber: string, otp: string) => {
    console.log("Login successful:", phoneNumber, otp)
    // For testing: allow any 6-digit code to login
    if (otp.length === 6) {
      setCurrentScreen("onboarding")
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
            <img 
              src={villageImage} 
              alt="Village Community"
              className="w-32 h-32 mx-auto rounded-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Smart Health Monitor</h1>
              <p className="text-muted-foreground">Community Health Tracking for Rural Villages</p>
            </div>
          </div>
          <LoginForm onLogin={handleLogin} />
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
          <WaterQualityForm
            villageName={user?.villageName || "Village"}
            onSubmit={(data) => {
              console.log("Water data submitted:", data)
              setCurrentScreen("dashboard")
            }}
            onSaveOffline={(data) => console.log("Water data saved offline:", data)}
            isReadOnly={!hasWritePermissions(user?.role || "")}
          />
        )
        
      case "alerts":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Village Alerts</h2>
            {mockAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                type={alert.type}
                title={alert.title}
                message={alert.message}
                timestamp={alert.timestamp}
                onDismiss={() => console.log("Alert dismissed:", alert.id)}
                onShare={() => console.log("Alert shared:", alert.id)}
              />
            ))}
          </div>
        )
        
      case "education":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Health Education</h2>
            <div className="grid gap-4">
              {mockEducationMaterials.map(material => (
                <EducationCard
                  key={material.id}
                  title={material.title}
                  description={material.description}
                  type={material.type}
                  language={material.language}
                  imageUrl={material.imageUrl}
                  onDownload={() => console.log("Downloaded:", material.title)}
                  onPlay={() => console.log("Playing:", material.title)}
                />
              ))}
            </div>
          </div>
        )
        
      case "reports":
        return (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Reports & Analytics</h2>
            <img 
              src={healthStatusImage} 
              alt="Health Status Overview"
              className="w-full max-w-lg mx-auto rounded-lg"
            />
            <p className="text-muted-foreground">
              Detailed reports and trend analysis will be available here
            </p>
          </div>
        )
        
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Settings</h2>
            <div className="space-y-4">
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">User Profile</h3>
                <p className="text-sm text-muted-foreground">Role: {user?.role}</p>
                <p className="text-sm text-muted-foreground">Village: {user?.villageName}</p>
                <p className="text-sm text-muted-foreground">Phone: {user?.phoneNumber}</p>
              </div>
              
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2">Language</h3>
                <LanguageSelector
                  selectedLanguage={user?.language || "en"}
                  onLanguageChange={(lang) => console.log("Language changed:", lang)}
                />
              </div>
              
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => {
                  setUser(null)
                  setCurrentScreen("login")
                }}
                data-testid="button-logout"
              >
                Logout
              </Button>
            </div>
          </div>
        )
        
      default: // dashboard
        return (
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatusCard
                title="Water Quality"
                value="Safe"
                icon={Droplets}
                status="safe"
                subtitle="pH: 7.2, Clear"
                onClick={() => handleNavigation("water-data")}
              />
              
              <StatusCard
                title="Cases Today"
                value={3}
                icon={Users}
                status="caution"
                subtitle="2 mild, 1 moderate"
                onClick={() => handleNavigation("reports")}
              />
              
              <StatusCard
                title="Outbreak Risk"
                value="Low"
                icon={TrendingUp}
                status="safe"
                subtitle="Monitoring continues"
                onClick={() => handleNavigation("alerts")}
              />
            </div>

            {/* Main Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hasWritePermissions(user?.role || "") && (
                <ActionButton
                  title="Report Case"
                  icon={Plus}
                  onClick={() => handleNavigation("case-report")}
                />
              )}
              
              <ActionButton
                title={hasWritePermissions(user?.role || "") ? "Water Data" : "View Water"}
                icon={Droplets}
                onClick={() => handleNavigation("water-data")}
              />
              
              <ActionButton
                title="Alerts"
                icon={Bell}
                onClick={() => handleNavigation("alerts")}
              />
              
              <ActionButton
                title="Education"
                icon={BookOpen}
                onClick={() => handleNavigation("education")}
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
        <VillageHeader
          villageName={user?.villageName || "Village"}
          status="safe" //todo: remove mock functionality - get from actual data
          isOnline={isOnline}
          lastSync="2 min ago" //todo: remove mock functionality
        />
        
        {currentScreen !== "dashboard" && (
          <div className="bg-card border-b px-4 py-2 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              data-testid="button-back-to-dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <ThemeToggle />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {renderContent()}
      </div>

      {/* Bottom Navigation - only show on dashboard */}
      {currentScreen === "dashboard" && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t px-4 py-3">
          <div className="flex justify-around">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("dashboard")}
              className="flex flex-col space-y-1"
              data-testid="nav-dashboard"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs">Dashboard</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("reports")}
              className="flex flex-col space-y-1"
              data-testid="nav-reports"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs">Reports</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation("settings")}
              className="flex flex-col space-y-1"
              data-testid="nav-settings"
            >
              <Settings className="w-5 h-5" />
              <span className="text-xs">Settings</span>
            </Button>
            
            <ThemeToggle />
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