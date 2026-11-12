import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://togetherwellness.com.au'),
  title: { default: 'Together Wellness', template: '%s | Together Wellness' },
  description: 'Modern physiotherapy, Pilates and wellness on Mos Lane, Mosman Park, Western Australia.',
  // Kept out of search engines until launch. Remove when the domain switches over.
  robots: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true' ? undefined : { index: false, follow: false },
}

export const viewport: Viewport = { themeColor: '#F9F7EE' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  )
}
