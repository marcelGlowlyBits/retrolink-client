'use client'

import { Text } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

import styles from './styles.module.css'

export const BackButton = () => {
  const router = useRouter()

  const handleNavigation = () => {
    router.back()
  }

  return (
    <Text
      className={styles.BackButton}
      weight="medium"
      color="red"
      onClick={handleNavigation}
    >
      Terug naar advertenties
    </Text>
  )
}
