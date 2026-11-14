import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { TapToReveal } from '@/components/TapToReveal'
import { Popup } from '@/components/Popup'
import { getSettings } from '@/lib/content'
import { imgUrl } from '@/lib/sanity'
import { settings as seedSettings } from '@/content/site'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  const pop = settings.popup || {}
  // Until a photo is uploaded in Sanity, use the default studio image
  const image = pop.image?.asset?._ref ? pop.image : seedSettings.popup?.image
  const popup = { ...pop, image: undefined, imageUrl: imgUrl(image, 900), imageAlt: image?.alt }
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bone)' }}>
      <div className="tw-top-tint" aria-hidden="true" />
      <Header tagline={settings.tagline} instagram={settings.instagram} />
      <main id="top">{children}</main>
      <Footer settings={settings} />
      <TapToReveal />
      <Popup data={popup} />
    </div>
  )
}
