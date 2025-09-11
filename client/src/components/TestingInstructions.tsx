import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Smartphone, User, Globe, Droplets, Users, Bell, BookOpen, Settings } from "lucide-react"

interface TestingInstructionsProps {
  onStartTesting?: () => void
}

export default function TestingInstructions({ onStartTesting }: TestingInstructionsProps) {
  const testingSteps = [
    {
      step: "1. Login",
      icon: Smartphone,
      description: "Enter any phone number and use '123456' as the OTP code",
      testData: "Phone: +91 98765 43210, OTP: 123456"
    },
    {
      step: "2. Role Selection", 
      icon: User,
      description: "Choose from ASHA Worker, Volunteer, or Local Leader",
      testData: "Try: ASHA Worker for full feature access"
    },
    {
      step: "3. Village Selection",
      icon: Globe,
      description: "Select from pre-loaded village options",
      testData: "Available: Baridhara, Teliamura, Krishnapur, Rampur"
    },
    {
      step: "4. Language Selection",
      icon: Globe,
      description: "Choose interface language (English, Assamese, Bengali, Hindi)",
      testData: "Default: English (fully functional)"
    },
    {
      step: "5. Dashboard Features",
      icon: CheckCircle,
      description: "Test all main features without backend dependencies",
      testData: "All forms save offline and show console logs"
    }
  ]

  const features = [
    { name: "Report Case", icon: Users, description: "Health case reporting with symptoms checklist" },
    { name: "Water Data", icon: Droplets, description: "Water quality testing form with validation" },
    { name: "Alerts", icon: Bell, description: "Village health alerts and notifications" },
    { name: "Education", icon: BookOpen, description: "Health education materials and resources" },
    { name: "Settings", icon: Settings, description: "User profile and app preferences" }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">Smart Health Monitor - Testing Guide</CardTitle>
          <p className="text-muted-foreground">
            This is a fully functional demo without database dependencies
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900 dark:text-green-100">Ready for Testing</h3>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              All features work offline-first. Data is logged to console and stored locally. 
              No backend or database connections required.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Testing Steps</h3>
            <div className="grid gap-4">
              {testingSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{step.step}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                          <div className="bg-muted/30 px-3 py-2 rounded text-xs font-mono">
                            {step.testData}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Available Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium">{feature.name}</h4>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {onStartTesting && (
            <Button 
              onClick={onStartTesting}
              className="w-full"
              size="lg"
              data-testid="button-start-testing"
            >
              Start Testing the App
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}