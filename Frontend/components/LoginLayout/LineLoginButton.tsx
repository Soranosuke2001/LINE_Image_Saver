"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

import { generateSha256Token } from '@/lib/hashGenerator'

import { FaLine } from 'react-icons/fa'

const LineLoginButton = () => {
  const router = useRouter()

  const lineLogin = async () => {
    const params = {
        response_type: process.env.NEXT_PUBLIC_LINE_RESPONSE_TYPE!,
        client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID!,
        redirect_uri: process.env.NEXT_PUBLIC_LINE_REDIRECT_URI!,
        state: generateSha256Token(),
        scope: process.env.NEXT_PUBLIC_LINE_SCOPE!,
    };

    const authUrl = `${process.env.NEXT_PUBLIC_LINE_AUTH_URL!}?${new URLSearchParams(params).toString()}`;

    router.push(authUrl);
  }

  return (
    <div>
      <button 
        className="flex items-center px-8 py-2 rounded-lg bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#21e065] transition-colors duration-200"
        onClick={lineLogin}
      >
        <FaLine className='pr-5' size={60} />
        Login With LINE
      </button>
    </div>
  )
}

export default LineLoginButton
