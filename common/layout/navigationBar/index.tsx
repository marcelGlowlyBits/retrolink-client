import * as React from 'react'

import { getMe } from '@/libs/api/me'

import { NavItems } from './components/NavItems'
import { fetchUserById } from '@/libs/api/user'

export const NavigationBar = async () => {
  const me = await getMe()
  const userMe = me?.id ? await fetchUserById(me.id) : null

  return <NavItems user={userMe} me={me} isAuth={Boolean(me)} />
}
