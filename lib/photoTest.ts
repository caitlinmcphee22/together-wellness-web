// TEST BRANCH ONLY: previews the new shoot photography in chosen slots.
// Swaps image src/alt by block key after the page loads from Sanity.
// Nothing here touches Sanity or the live site.
import type { Page } from '@/content/types'

type Swap = { key: string; field: 'image' | 'right' | 'slide'; slideKey?: string; src: string; alt: string; videoSrc?: string; videoSrcMobile?: string }

const swaps: Record<string, Swap[]> = {
  home: [
    { key: 'f97c194afe1a', field: 'image', src: '/images/shoot/group-reach.jpg', alt: 'Three women moving together in the studio' },
    {
      key: '726b5993c17e',
      field: 'image',
      src: '/images/shoot/physio-close-ups.jpg',
      alt: 'Black and white close-ups of hands on a shoulder, a calf, a wrist and a knee',
      videoSrc: '/video/physio-close-ups.mp4',
      videoSrcMobile: '/video/physio-close-ups-mobile.mp4',
    },
  ],
  pilates: [{ key: 'f9951f2a782b', field: 'right', src: '/images/shoot/group-stretch.jpg', alt: 'Three women stretching together' }],
  physiotherapy: [
    { key: '01b1d3cbe1f8', field: 'image', src: '/images/shoot/hands-shoulder.jpg', alt: 'Hands on a shoulder, black and white' },
    { key: '5aec9572eeec', field: 'right', src: '/images/shoot/hands-calf.jpg', alt: 'Hands holding a calf, black and white' },
    { key: 'a61f4b3e3b15', field: 'image', src: '/images/shoot/hands-wrist.jpg', alt: 'Hands at a wrist, black and white' },
  ],
  wellness: [{ key: '051b5cce4c24', field: 'image', src: '/images/shoot/sculpture.jpg', alt: 'Sculptural forms in bone and clay' }],
  about: [
    { key: '53f2c96d9f0b', field: 'slide', slideKey: '87506a512e14', src: '/images/shoot/leg-raised.jpg', alt: 'A raised leg, black and white' },
    { key: '94d355d22bd1', field: 'slide', slideKey: '2f29fe341d05', src: '/images/shoot/group-wide.jpg', alt: 'Three women moving together' },
  ],
}

// New blocks to preview, inserted after the block with the given key.
const inserts: Record<string, { after: string; block: Record<string, unknown> }[]> = {
  home: [
    {
      after: '1009ae9aa1aa',
      block: {
        _type: 'tile',
        _key: 'test-moving-better-together',
        aspect: '3 / 2',
        width: 'l',
        caption: 'Moving Better Together',
        image: {
          src: '/images/shoot/moving-better-together-caps.jpg',
          alt: 'Moving Better Together',
          videoSrc: '/video/moving-better-together-caps.mp4',
          videoSrcMobile: '/video/moving-better-together-caps-mobile.mp4',
        },
      },
    },
  ],
}

export function applyPhotoTest(page: Page | undefined): Page | undefined {
  if (!page) return page
  const list = swaps[page.slug as string] || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blocks = (page.blocks as any[]).map((b) => {
    const s = list.find((x) => x.key === b._key)
    if (!s) return b
    if (s.field === 'slide') {
      return { ...b, slides: b.slides.map((sl: any) => (sl._key === s.slideKey ? { ...sl, src: s.src, alt: s.alt } : sl)) }
    }
    const extra = s.videoSrc ? { videoSrc: s.videoSrc, videoSrcMobile: s.videoSrcMobile } : {}
    return { ...b, [s.field]: { ...b[s.field], src: s.src, alt: s.alt, ...extra } }
  })
  for (const ins of inserts[page.slug as string] || []) {
    const i = blocks.findIndex((b) => b._key === ins.after)
    if (i >= 0) blocks.splice(i + 1, 0, ins.block)
  }
  return { ...page, blocks } as Page
}
