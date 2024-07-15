"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'

const LoginButton = () => {
  const router = useRouter()

  return (
    <Button 
      onClick={() => router.push('/login')}
      className='bg-green-600'
    >
      Login
    </Button>
  )
}

export default LoginButton
