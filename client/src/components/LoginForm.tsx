import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Lock } from "lucide-react"

interface LoginFormProps {
  onLogin: (phoneNumber: string, otp: string, role: string, language: string) => void
  isLoading?: boolean
  selectedRole: string
}

export default function LoginForm({ onLogin, isLoading = false, selectedRole }: LoginFormProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")

  const handleSendOTP = () => {
    if (phoneNumber) {
      console.log("Sending OTP to:", phoneNumber)
      setStep("otp")
    }
  }

  const handleVerifyOTP = () => {
    if (otp && otp.length === 6) {
      console.log("Verifying OTP:", otp)
      // For testing: accept any 6-digit code
      onLogin(phoneNumber, otp, selectedRole, "english")
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
              
              <Button 
                onClick={handleSendOTP}
                disabled={!phoneNumber || isLoading}
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

              {/* Show selected role */}
              <div className="bg-muted/30 rounded-lg p-3 space-y-1">
                <p className="text-sm"><strong>Role:</strong> {selectedRole.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6 || isLoading}
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
                  Change Phone Number
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