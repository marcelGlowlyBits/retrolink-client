'use client'

import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

import { createClient } from '@/libs/supabase/client'

export const LogoutButton = () => {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()

    router.push('/')
    router.refresh()
  }

  return (
    <Button variant="surface" onClick={handleLogout}>
      Uitloggen
    </Button>
  )
}
