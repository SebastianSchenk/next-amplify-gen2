'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ConfigureAmplifyClientSide from '@/components/ConfigureAmplify'

import './globals.css'
import '@aws-amplify/ui-react/styles.css'
import { Header } from '@/components/Header'
import { Authenticator } from '@aws-amplify/ui-react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigureAmplifyClientSide />
        <Authenticator.Provider>
          <Header />
          {children}
        </Authenticator.Provider>
      </body>
    </html>
  )
}
