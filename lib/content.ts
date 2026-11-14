import { client } from './sanity'
import { pages as seedPages } from '@/content/pages'
import seedPolicies from '@/content/policies.json'
import { settings as seedSettings, team as seedTeam } from '@/content/site'
import type { Page, Policy, Settings, TeamMember } from '@/content/types'

// Content comes from Sanity. If Sanity is unreachable or a document hasn't been
// published yet, the approved copy bundled in /content is used instead, so the
// site always renders.

const opts = { next: { revalidate: 60, tags: ['sanity'] } }

async function safe<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params, opts)
  } catch {
    return null
  }
}

export async function getPage(slug: string): Promise<Page | undefined> {
  const doc = await safe<Page>(`*[_type == "websitePage" && slug.current == $slug][0]{..., "slug": slug.current}`, { slug })
  if (doc?.blocks?.length) return doc
  return seedPages.find((p) => p.slug === slug)
}

export async function getPolicy(slug: string): Promise<Policy | undefined> {
  const doc = await safe<Policy>(`*[_type == "policyPage" && slug.current == $slug][0]{..., "slug": slug.current}`, { slug })
  if (doc?.items?.length) return doc
  return (seedPolicies as Policy[]).find((p) => p.slug === slug)
}

export async function getSettings(): Promise<Settings> {
  const doc = await safe<Partial<Settings>>(`*[_type == "websiteSettings"][0]`)
  const merged = { ...seedSettings, ...(doc || {}) } as Settings
  // Popup fields left empty in Sanity fall back to the default copy
  const pop = Object.fromEntries(Object.entries(doc?.popup || {}).filter(([, v]) => v !== null && v !== ''))
  merged.popup = { ...seedSettings.popup, ...pop }
  return merged
}

export async function getTeam(): Promise<TeamMember[]> {
  const docs = await safe<TeamMember[]>(`*[_type == "teamMember" && showOnSite != false] | order(order asc)`)
  return docs?.length ? docs : seedTeam
}

export const policySlugs = (seedPolicies as Policy[]).map((p) => p.slug)
export const pageSlugs = seedPages.map((p) => p.slug).filter((s) => s !== 'home')
