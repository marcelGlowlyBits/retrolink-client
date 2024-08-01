'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/libs/supabase/server'

import { editProfileSchema } from '@/features/profile/profileOverview/profileAccountData/schema'

import { getMe } from '@/libs/api/me'

export type FormState = {
  message: string
  fields?: Record<string, string>
  success?: boolean
  issues?: string[]
  error?: boolean
}

export async function editUsername(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = editProfileSchema.safeParse(formData)

  if (!parsed.success) {
    const fields: Record<string, string> = {}

    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString()
    }

    return {
      message: 'Invalid formdata',
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    }
  }

  try {
    const supabase = createClient()
    const user = await getMe()

    const { error } = await supabase
      .from('users')
      .update({
        username: formData.username as string,
      })
      .eq('id', user.id)

    if (error) {
      console.log('error', error)
      throw error
    }

    revalidatePath(`/`)

    return {
      message: 'Username updated',
      success: true,
    }
  } catch (error) {
    console.error(error)

    return {
      message: 'Failed to edit username',
    }
  }
}
