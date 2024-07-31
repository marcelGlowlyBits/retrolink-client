import type { Metadata } from 'next'
import Head from 'next/head'

import Loglib from '@loglib/tracker/react'

import { NavigationBar } from '@/common/layout/navigationBar'

import MainProvider from '../providers/MainProvider'
import styles from './page.module.css'

import { GeistSans } from 'geist/font/sans'
import '@radix-ui/themes/styles.css'

export const metadata: Metadata = {
  title: 'Retrolink',
  description: 'Retro gaming online marketplace.',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Retrolink - Retro gaming online Marketplace</title>
      </Head>
      <body className={styles.body}>
        <Loglib
          config={{
            id: 'www_retrolink',
            consent: 'granted',
          }}
        />
        <MainProvider>
          <NavigationBar />
          <main className={GeistSans.className}>{children}</main>
        </MainProvider>
      </body>
    </html>
  )
}
