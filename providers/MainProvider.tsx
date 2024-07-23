'use client'
import { type ReactNode } from 'react'

import { ToastController } from '@/controller/toastController'

export default function MainProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastController id="notifications" />
    </>
  )
}
