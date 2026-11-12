import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { Img } from '@/content/types'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ti60wn36'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2026-11-01'

export const client = createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: 'published' })

const builder = createImageUrlBuilder({ projectId, dataset })

/** Returns a URL for an image: the uploaded Sanity asset if there is one, otherwise the local placeholder file. */
export function imgUrl(img: Img | undefined, width = 1800): string {
  if (!img) return ''
  if (img.asset?._ref) return builder.image(img).width(width).auto('format').quality(80).url()
  return img.src || ''
}

/** Sanity file reference ("file-<id>-<ext>") to its CDN URL. */
function fileRefUrl(ref?: string): string | undefined {
  const m = ref?.match(/^file-([a-zA-Z0-9]+)-([a-z0-9]+)$/)
  return m ? `https://cdn.sanity.io/files/${projectId}/${dataset}/${m[1]}.${m[2]}` : undefined
}

/** Video URLs for an image slot, if a video has been uploaded in place of the photo. */
export function videoUrls(img: Img | undefined): { desktop: string; mobile?: string } | undefined {
  const desktop = fileRefUrl(img?.video?.asset?._ref)
  if (!desktop) return undefined
  return { desktop, mobile: fileRefUrl(img?.videoMobile?.asset?._ref) }
}
