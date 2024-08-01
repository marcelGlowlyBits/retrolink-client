import { cache } from 'react'
import { createClient } from '@/libs/supabase/server'

export const getMe = cache(async (): Promise<any> => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      throw error
    }

    return data.user
  } catch (error) {
    console.error(error)
  }
})
