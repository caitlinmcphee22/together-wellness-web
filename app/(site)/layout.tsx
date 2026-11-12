import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSettings } from '@/lib/content'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bone)' }}>
      <Header tagline={settings.tagline} instagram={settings.instagram} />
      <main id="top">{children}</main>
      <Footer settings={settings} />
    </div>
  )
}
