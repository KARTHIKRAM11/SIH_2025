import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Droplets, Heart, Users } from "lucide-react"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleContinue = () => {
    setIsVisible(false)
    setTimeout(onComplete, 300) // Allow fade out animation
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 flex flex-col items-center justify-center p-8 transition-opacity duration-300 ${!isVisible ? 'opacity-0' : 'opacity-100'}`}>
      {/* Government Emblem & Health Symbol */}
      <div className="flex items-center justify-center mb-8 relative">
        {/* Government Emblem Background */}
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
            <Shield className="w-12 h-12 text-white" />
          </div>
          
          {/* Health/Water Symbol Overlay */}
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-md border-4 border-white dark:border-gray-900">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          
          {/* Heart Symbol for Health */}
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-gray-900">
            <Heart className="w-4 h-4 text-white fill-current" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4" data-testid="title-app-name">
        Smart Health Monitoring
      </h1>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-center text-blue-700 dark:text-blue-300 font-medium mb-8" data-testid="subtitle-tagline">
        "Safe Water, Healthy Villages"
      </p>

      {/* Community Icon - Clickable for Role Selection */}
      <div className="mb-8">
        <div 
          onClick={handleContinue}
          className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200"
        >
          <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      {/* Continue Button */}
      <Button 
        onClick={handleContinue}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
        data-testid="button-continue-splash"
      >
        Continue
      </Button>

      {/* Instructions */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        Tap the icon above or continue button to select your role
      </p>
    </div>
  )
}