import type { Settings } from '@/content/types'

/* Local business details for search engines */
export function LocalBusinessJsonLd({ settings }: { settings: Settings }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'HealthClub'],
    name: 'Together Wellness',
    description: settings.tagline,
    email: settings.email,
    ...(settings.phone ? { telephone: settings.phone } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: '46 Manning St',
      addressLocality: 'Mosman Park',
      addressRegion: 'WA',
      postalCode: '6012',
      addressCountry: 'AU',
    },
    sameAs: [settings.instagram],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
