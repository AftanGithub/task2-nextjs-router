'use client'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import { redirect} from 'next/navigation'
import { useState } from 'react'

export const Form = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading,setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    if( !email || !password){
      setError("All Fields are required!");
  }
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password
      })
      console.log('Res', res)
      if (!res?.error) {
        redirect('/dashboard');
      } else {
        setError('Invalid email or password')
      }
    } catch (err: any) {
      setError(err?.message);
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
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
      {error && <Alert  variant="destructive">  {error}</Alert>}
      <div className="w-full">
        <Button className="w-full" size="lg">
          {isLoading ? "Please wait..." :"Login"}
        </Button>
      </div>
    </form>
  )
}