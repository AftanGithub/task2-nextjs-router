'use client'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export const RegisterForm = () => {
  const [name,setName] = useState("");  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading,setIsLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault()
    setIsLoading(true);
    if(!name || !email || !password){
        setError("All Fields are required!");
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          name,  
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        redirect("/auth/signin");
      } else {
        setError((await res.json()).error)
      }
    } catch (error: any) {
      setError(error?.message)
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Full Name</Label>
        <Input
          className="w-full"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          className="w-full"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          className="w-full"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
      </div>
      {error && <Alert variant="destructive">{error}</Alert>}
      <div className="w-full">
        <Button  className="w-full" size="lg">
          {isLoading ? "Please wait..." : "Register"}
        </Button>
      </div>
    </form>
  )
}