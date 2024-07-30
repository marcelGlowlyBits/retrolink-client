'use client'

import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

import { createClient } from '@/libs/supabase/client'

export const LogoutButton = ({ closeNav }: { closeNav?: () => void }) => {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()

    if (closeNav) {
      closeNav()
      router.push('/')
      router.refresh()
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <Button variant="surface" onClick={handleLogout}>
      Uitloggen
    </Button>
  )
}
