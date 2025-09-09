"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MatrixRain } from "@/components/matrix-rain"
import { Terminal, Lock, User, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [securityMessage, setSecurityMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (loginAttempts > 0) {
      const messages = [
        "SCANNING BIOMETRICS...",
        "VERIFYING IDENTITY...",
        "CHECKING SECURITY CLEARANCE...",
        "ANALYZING CREDENTIALS...",
        "DECRYPTING ACCESS CODES...",
      ]

      let index = 0
      const interval = setInterval(() => {
        setSecurityMessage(messages[index])
        index = (index + 1) % messages.length
      }, 1500)

      return () => clearInterval(interval)
    }
  }, [loginAttempts])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginAttempts((prev) => prev + 1)

    // Simulate security check
    setSecurityMessage("INITIATING SECURITY SCAN...")

    setTimeout(() => {
      // Simple authentication - in a real app, this would be handled securely
      if (username === "admin" && password === "password") {
        setSecurityMessage("ACCESS GRANTED")
        // Store authentication state
        sessionStorage.setItem("isAuthenticated", "true")
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 1000)
      } else {
        setSecurityMessage("ACCESS DENIED")
        setError("AUTHENTICATION FAILED: Invalid credentials")
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 font-mono relative overflow-hidden">
      {/* Matrix Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <MatrixRain />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="absolute -top-12 left-0 text-green-500 hover:text-green-300 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Return to System
        </Link>

        <Card className="border-2 border-green-500 bg-black text-green-500">
          <div className="p-6 space-y-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center border-2 border-green-500">
                <Terminal className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl text-green-400">ADMIN TERMINAL</h2>
              <p className="text-xs text-green-600">SECURE ACCESS REQUIRED</p>
            </div>

            {securityMessage && (
              <div className="text-center text-yellow-400 text-sm animate-pulse">{securityMessage}</div>
            )}

            {error && (
              <div className="bg-red-900/20 border border-red-500 text-red-400 p-3 rounded-md text-xs">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-green-400 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  USERNAME
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-black border-green-500 text-green-400 focus:border-green-300 focus:ring-green-300"
                  />
                  <div className="absolute right-2 top-2 text-green-700 text-xs">
                    {username.length > 0 ? "[ACTIVE]" : "[WAITING]"}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-green-400 flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  PASSWORD
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-black border-green-500 text-green-400 focus:border-green-300 focus:ring-green-300"
                  />
                  <div className="absolute right-2 top-2 text-green-700 text-xs">
                    {password.length > 0 ? "[ENCRYPTED]" : "[WAITING]"}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-900 hover:bg-green-800 text-green-300 border border-green-500"
              >
                AUTHENTICATE
              </Button>
            </form>

            <div className="text-center text-xs text-green-700 mt-4">
              WARNING: Unauthorized access attempts will be logged and reported
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
