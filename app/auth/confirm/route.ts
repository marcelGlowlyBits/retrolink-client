import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/libs/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  if (token_hash && type) {
    const supabase = createClient()

    const { data: verifyOtpResponse, error: verifyOtpError } =
      await supabase.auth.verifyOtp({
        type,
        token_hash,
      })

    const userObj = {
      id: verifyOtpResponse?.user?.id,
      email: verifyOtpResponse?.user?.email,
    }

    const { data: userCreateResonse, error: userCreateError } = await supabase
      .from('users')
      .insert(userObj)

    if (!userCreateError && !verifyOtpError) {
      // redirect user to specified redirect URL or root of app
      redirect('/onboarding')
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error')
}
