import { SignIn } from "@clerk/nextjs";
 


import React from 'react'

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
             <SignIn/>
    </div>
  )
}

export default SignInPage