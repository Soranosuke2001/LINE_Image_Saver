"use client"

import React from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'
import { lineLoginLink } from '@/lib/constants'

const CreateLineAccButton = () => {
  const router = useRouter()

  return (
    <Button 
      onClick={() => router.push(lineLoginLink)}
      className='bg-green-600'
    >
      Create LINE Account
    </Button>
  )
}

export default CreateLineAccButton
