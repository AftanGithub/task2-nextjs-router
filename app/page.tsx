"use client";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const {data:session} = useSession();
  
  return (
   <div className="text-center flex items-center h-screen justify-center flex-col">
      <div>
      <h1 className="my-auto text-7xl text-center font-bold">Welcome to Flight App</h1>
   {session ? <Link href="/dashboard" className={buttonVariants({ variant: "default" })}>Go To Dashboard</Link> : <div className="mt-5 d-flex">
  
    <Link href="/auth/signin" className={buttonVariants({ variant: "default" })}>Sign in</Link>
    <Link href="/auth/signup" className={buttonVariants({ variant: "outline" })+" mx-2"}>Sign up</Link>
    </div>}
      </div>  
   </div>
  );
}
