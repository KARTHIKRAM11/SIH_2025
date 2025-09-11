import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Lock, UserCheck, Users, Crown, User } from "lucide-react"

interface LoginFormProps {
  onLogin: (phoneNumber: string, otp: string, role: string, language: string) => void
  isLoading?: boolean
}

export default function LoginForm({ onLogin, isLoading = false }: LoginFormProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("english")

  const handleSendOTP = () => {
    if (phoneNumber) {
      console.log("Sending OTP to:", phoneNumber)
      setStep("otp")
    }
  }

  const handleVerifyOTP = () => {
    if (otp && otp.length === 6 && selectedRole) {
      console.log("Verifying OTP:", otp)
      // For testing: accept any 6-digit code
      onLogin(phoneNumber, otp, selectedRole, selectedLanguage)
    }
  }

  const handleBack = () => {
    setStep("phone")
    setOtp("")
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <Smartphone className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">
            Welcome to Smart Health Monitoring
          </CardTitle>
          <p className="text-muted-foreground">
            {step === "phone" 
              ? "Enter your phone number to get started"
              : `We sent a code to ${phoneNumber}`
            }
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === "phone" ? (
            <>
              {/* Mobile Number Field */}
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                    data-testid="input-phone"
                  />
                </div>
              </div>

              {/* Role Selector */}
              <div className="space-y-3">
                <Label>Select Your Role</Label>
                <RadioGroup
                  value={selectedRole}
                  onValueChange={setSelectedRole}
                  className="grid grid-cols-2 gap-3"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover-elevate">
                    <RadioGroupItem value="asha_worker" id="asha" />
                    <div className="flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-primary" />
                      <Label htmlFor="asha" className="text-sm font-medium cursor-pointer">
                        ASHA Worker
                      </Label>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover-elevate">
                    <RadioGroupItem value="volunteer" id="volunteer" />
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-primary" />
                      <Label htmlFor="volunteer" className="text-sm font-medium cursor-pointer">
                        Volunteer
                      </Label>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover-elevate">
                    <RadioGroupItem value="local_leader" id="leader" />
                    <div className="flex items-center space-x-2">
                      <Crown className="w-4 h-4 text-primary" />
                      <Label htmlFor="leader" className="text-sm font-medium cursor-pointer">
                        Local Leader
                      </Label>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover-elevate">
                    <RadioGroupItem value="village_people" id="villager" />
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-primary" />
                      <Label htmlFor="villager" className="text-sm font-medium cursor-pointer">
                        Village People
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Language Toggle */}
              <div className="space-y-3">
                <Label>Select Language</Label>
                <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="assamese" className="text-xs">Assamese</TabsTrigger>
                    <TabsTrigger value="bengali" className="text-xs">Bengali</TabsTrigger>
                    <TabsTrigger value="tribal" className="text-xs">Tribal</TabsTrigger>
                    <TabsTrigger value="english" className="text-xs">English</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <Button 
                onClick={handleSendOTP}
                disabled={!phoneNumber || !selectedRole || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
                data-testid="button-send-otp"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="pl-10 text-center text-lg tracking-widest"
                    maxLength={6}
                    data-testid="input-otp"
                  />
                </div>
              </div>

              {/* Show selected role and language */}
              <div className="bg-muted/30 rounded-lg p-3 space-y-1">
                <p className="text-sm"><strong>Role:</strong> {selectedRole.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                <p className="text-sm"><strong>Language:</strong> {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}</p>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6 || !selectedRole || isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                  data-testid="button-login"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={handleBack}
                  className="w-full"
                  data-testid="button-back"
                >
                  Change Details
                </Button>
              </div>
              
              <p className="text-center text-sm text-muted-foreground">
                Didn't receive code?{" "}
                <button 
                  onClick={handleSendOTP}
                  className="text-primary hover:underline"
                  data-testid="button-resend"
                >
                  Resend
                </button>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}