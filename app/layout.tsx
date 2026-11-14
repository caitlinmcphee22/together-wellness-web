import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://togetherwellness.com.au'),
  title: { default: 'Together Wellness', template: '%s | Together Wellness' },
  description: 'Modern physiotherapy, Pilates and wellness on Mos Lane, Mosman Park, Western Australia.',
  // Kept out of search engines until launch. Remove when the domain switches over.
  robots: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true' ? undefined : { index: false, follow: false },
}

// No theme colour: it tinted Safari's top bar Bone, which looked like a gap above the hero image.
// viewportFit cover lets the hero run under the iPhone status bar, edge to edge.
export const viewport: Viewport = { viewportFit: 'cover' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  )
}
