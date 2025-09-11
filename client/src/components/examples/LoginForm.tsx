import { useState } from 'react'
import LoginForm from '../LoginForm'

export default function LoginFormExample() {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleLogin = async (phoneNumber: string, otp: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    console.log('Login successful:', { phoneNumber, otp })
    alert('Login successful!')
  }
  
  return (
    <div className="p-4 min-h-screen bg-background flex items-center">
      <LoginForm onLogin={handleLogin} isLoading={isLoading} />
    </div>
  )
}