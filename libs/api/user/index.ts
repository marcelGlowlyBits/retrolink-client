import { cache } from 'react'
import { createClient } from '@/libs/supabase/server'

export const fetchUserById = cache(async (id: string) => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error(error)
  }
})
