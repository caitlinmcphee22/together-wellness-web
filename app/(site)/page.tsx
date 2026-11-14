import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Blocks, Hero } from '@/components/Blocks'
import { getPage, getSettings, getTeam } from '@/lib/content'
import { LocalBusinessJsonLd } from '@/components/JsonLd'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('home')
  return { title: { absolute: page?.seoTitle || 'Together Wellness' }, description: page?.seoDescription }
}

export default async function Home() {
  const [page, settings, team] = await Promise.all([getPage('home'), getSettings(), getTeam()])
  if (!page) notFound()
  return (
    <>
      <LocalBusinessJsonLd settings={settings} />
      <Hero image={page.hero} isHome />
      <Blocks blocks={page.blocks} settings={settings} team={team} />
    </>
  )
}
