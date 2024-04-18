"use client";
import Link from 'next/link'
import { Form as LoginForm } from './form'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const { data: session } = useSession()

  if(session) redirect('/dashboard');
  
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Login</h1>
        <LoginForm />
        <p className="text-center">
          Need to create an account?{' '}
          <Link className="text-indigo-500 hover:underline" href="/auth/signup">
            Create Account
          </Link>{' '}
        </p>
      </div>
    </div>
  )
}