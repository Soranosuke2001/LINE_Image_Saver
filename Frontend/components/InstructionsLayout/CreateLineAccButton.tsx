"use client"

import React from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'

const CreateLineAccButton = () => {
  const router = useRouter()

  return (
    <Button 
      onClick={() => router.push('https://help.line.me/official_account_jp/ios/categoryId/20008250/pc?contentId=20013136')}
      className='bg-green-600'
    >
      Create LINE Account
    </Button>
  )
}

export default CreateLineAccButton
