// Content shapes shared by the seed content and Sanity.
// Sanity documents use the same field names, so the renderer handles either source.

export type Img = {
  src?: string // local fallback path, used until an image is uploaded in Sanity
  asset?: { _ref: string }
  alt?: string
  caption?: string
  /** Optional looping video shown in place of the photo (the photo becomes its still frame). */
  video?: { asset?: { _ref: string } }
  /** Optional smaller version of the video for phones. */
  videoMobile?: { asset?: { _ref: string } }
}

export type LinkT = { label: string; href: string }

export type Block =
  | { _type: 'statement'; _key?: string; text: string; label?: string; spacing?: 'normal' | 'large' }
  | { _type: 'sectionIntro'; _key?: string; heading: string; subheading?: string; body?: string }
  | {
      _type: 'tile'
      _key?: string
      image: Img
      caption?: string
      description?: string
      link?: string
      width?: 'xl' | 'l' | 'm' | 's' | 'full'
      aspect?: string
    }
  | { _type: 'fullImage'; _key?: string; image: Img; caption?: string; aspect?: string }
  | { _type: 'pageTitle'; _key?: string; eyebrow?: string; title: string; quote?: string; intro?: string }
  | { _type: 'splitTitle'; _key?: string; eyebrow?: string; title: string; image: Img }
  | {
      _type: 'split'
      _key?: string
      heading: string
      paragraphs?: string[]
      link?: LinkT
      layout?: 'slider' | 'stack' | 'cards'
      pinned?: boolean
      slides?: Img[]
    }
  | { _type: 'team'; _key?: string; heading: string; paragraphs?: string[]; note?: string }
  | {
      _type: 'cardGrid'
      _key?: string
      label?: string
      heading?: string
      intro?: string
      style?: 'cards' | 'ruled'
      columns?: 3 | 4
      items: { _key?: string; title: string; body?: string; meta?: string }[]
      cta?: LinkT
    }
  | { _type: 'numbered'; _key?: string; heading: string; items: { _key?: string; title: string; body: string }[] }
  | {
      _type: 'imagePair'
      _key?: string
      left: Img & { description?: string }
      right: Img
      aspect?: string
    }
  | {
      _type: 'tileWithText'
      _key?: string
      tile: Img & { description?: string }
      heading: string
      paragraphs?: string[]
      image?: Img
    }
  | {
      _type: 'appointments'
      _key?: string
      label: string
      items: { _key?: string; title: string; meta: string }[]
      cta?: LinkT
      note?: string
    }
  | {
      _type: 'bookingOptions'
      _key?: string
      items: { _key?: string; image: Img; caption: string; description?: string; body: string; cta: LinkT }[]
    }
  | { _type: 'timetable'; _key?: string; heading: string }
  | { _type: 'contactPrompt'; _key?: string; heading: string; body: string }
  | { _type: 'exploreServices'; _key?: string; heading?: string }

export type Page = {
  slug: string
  title: string
  seoTitle?: string
  seoDescription?: string
  hero: Img
  blocks: Block[]
}

export type TeamMember = {
  _id?: string
  name: string
  role: string
  bio?: string
  portrait?: Img
  panelColour: 'sage' | 'cornflower' | 'nude'
  order?: number
}

export type Policy = {
  slug: string
  title: string
  hero: Img
  items: { _key?: string; heading: string; body: string }[]
}

export type Settings = {
  tagline: string
  brandMessage: string
  acknowledgement: string
  address: string
  phone?: string
  email: string
  instagram: string
  mailchimpAction?: string
  momenceEmbed?: string
  popup?: {
    enabled?: boolean
    colour?: string
    heading?: string
    body?: string
    image?: Img
    ctaLabel?: string
    ctaLink?: string
    delaySeconds?: number
  }
}
