import { getMe } from '@/libs/api/me'

import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const me = await getMe()

  if (!me) {
    redirect('/login')
  }

  if (me) {
    redirect(`/profile/${me.id}`)
  }

  return <></>
}
