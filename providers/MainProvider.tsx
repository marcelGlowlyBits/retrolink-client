'use client'
import { type ReactNode } from 'react'
import { Theme } from '@radix-ui/themes'

import { ToastController } from '@/controller/toastController'

export default function MainProvider({ children }: { children: ReactNode }) {
  return (
    <Theme
      accentColor="tomato"
      grayColor="gray"
      appearance="light"
      panelBackground="translucent"
      scaling="110%"
      radius="medium"
    >
      {children}
      <ToastController id="notifications" />
    </Theme>
  )
}
