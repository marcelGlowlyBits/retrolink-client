import { Text, Button } from '@radix-ui/themes'
import NextLink from 'next/link'

import styles from './styles.module.css'

export const Link = ({
  label,
  href,
  onClick,
  as = 'text',
  buttonVariant = 'solid',
}: {
  label: string
  href: string
  onClick?: () => void
  as?: 'text' | 'button'
  buttonVariant?:
    | 'outline'
    | 'classic'
    | 'solid'
    | 'soft'
    | 'surface'
    | 'ghost'
    | undefined
}) => {
  if (as === 'button') {
    return (
      <NextLink href={href} passHref onClick={onClick}>
        <Button variant={buttonVariant}>{label}</Button>
      </NextLink>
    )
  }

  if (as === 'text') {
    return (
      <NextLink href={href} passHref onClick={onClick} className={styles.Link}>
        <Text style={{ cursor: 'pointer' }} as="p">
          {label}
        </Text>
      </NextLink>
    )
  }
}
