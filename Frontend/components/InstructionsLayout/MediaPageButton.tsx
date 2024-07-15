"use client"

import React from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'

const MediaPageButton = () => {
  const router = useRouter()

  return (
    <Button 
      onClick={() => router.push('/media')}
      className='bg-green-600'
    >
      Media Page
    </Button>
  )
}

export default MediaPageButton
