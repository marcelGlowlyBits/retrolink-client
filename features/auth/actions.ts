'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/libs/supabase/server'
import { getMe } from '@/libs/api/me'

import { SigninSchema } from './schema'
import { UsernameSchema } from './schema'

export type FormState = {
  message: string
  fields?: Record<string, string>
  issues?: string[]
}

export async function EditUsername(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = UsernameSchema.safeParse(formData)
  const user = await getMe()

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

  const supabase = createClient()

  const { data: supabaseResponse, error: supabaseError } = await supabase
    .from('users')
    .update({
      username: formData.username as string,
    })
    .eq('id', user.id)

  if (supabaseError) {
    if (supabaseError.code === '23505') {
      return {
        message:
          'Gebruikersnaam is al in gebruik, kies een andere gebruikersnaam.',
      }
    }

    return {
      message: supabaseError.message,
    }
  }

  revalidatePath('/')
  redirect('/')
}

export async function signup(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = SigninSchema.safeParse(formData)

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

  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email: formData.email as string,
    password: formData.password as string,
  })

  if (error) {
    console.log('error', error)
    return {
      message: error.message,
    }
  }

  revalidatePath('/')
  redirect('/')
}

export async function signin(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = SigninSchema.safeParse(formData)

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

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email as string,
    password: formData.password as string,
  })

  if (error) {
    return {
      message: error.message,
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
