import { SignUp } from "@clerk/nextjs";
 


import React from 'react'

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
             <SignUp/>
    </div>
  )
}

export default SignUpPage