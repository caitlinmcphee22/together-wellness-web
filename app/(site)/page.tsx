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
  // The Move Well, Feel Well loop sits just before Explore our services
  const at = page.blocks.findIndex((b) => b._type === 'exploreServices')
  const blocks = page.blocks.some((b) => b._type === 'moveWell') || at < 0
    ? page.blocks
    : [...page.blocks.slice(0, at), { _type: 'moveWell' as const }, ...page.blocks.slice(at)]
  return (
    <>
      <LocalBusinessJsonLd settings={settings} />
      <Hero image={page.hero} isHome />
      <Blocks blocks={blocks} settings={settings} team={team} />
    </>
  )
}
