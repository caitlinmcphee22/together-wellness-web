import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Blocks, Hero, PolicyBody } from '@/components/Blocks'
import { getPage, getPolicy, getSettings, getTeam, pageSlugs, policySlugs } from '@/lib/content'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return [...pageSlugs, ...policySlugs].map((slug) => ({ slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  if (policySlugs.includes(slug)) {
    const p = await getPolicy(slug)
    return { title: p?.title }
  }
  const page = await getPage(slug)
  return { title: page?.seoTitle ? { absolute: page.seoTitle } : page?.title, description: page?.seoDescription }
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  if (policySlugs.includes(slug)) {
    const policy = await getPolicy(slug)
    if (!policy) notFound()
    return (
      <>
        <Hero image={policy.hero} />
        <PolicyBody title={policy.title} items={policy.items} />
      </>
    )
  }
  const [page, settings, team] = await Promise.all([getPage(slug), getSettings(), getTeam()])
  if (!page) notFound()
  return (
    <>
      <Hero image={page.hero} />
      <Blocks blocks={page.blocks} settings={settings} team={team} />
    </>
  )
}
