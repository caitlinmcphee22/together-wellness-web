import type { Settings, TeamMember } from './types'

export const settings: Settings = {
  tagline: 'Modern Physiotherapy, Pilates and Wellness',
  brandMessage:
    'Together Wellness is a thoughtfully designed space dedicated to movement, health and wellbeing. Bringing together expert physiotherapy, purposeful Pilates and a shared appreciation for considered design, we seek to create a welcoming environment that fosters connection, encourages movement and enriches everyday life. Our approach is grounded in the belief that feeling well extends beyond physical health, embracing the spaces we inhabit, the people we connect with and the way we choose to live.',
  acknowledgement:
    'Together Wellness acknowledges the Whadjuk Noongar people, the Traditional Custodians of the land on which our studio is located, and their continuing connection to land, waters and community. We pay our respects to their Elders past and present, and extend that respect to all Aboriginal and Torres Strait Islander peoples.',
  address: '46 Manning St, Mosman Park WA 6012',
  phone: '',
  email: 'info@togetherwellness.com.au',
  instagram: 'https://www.instagram.com/togetherwellness_/',
  mailchimpAction: '',
  momenceEmbed: '',
}

export const team: TeamMember[] = [
  {
    name: 'Caitlin McPhee',
    role: 'Founder and Physiotherapist',
    panelColour: 'sage',
    bio: 'Caitlin founded Together Wellness to bring physiotherapy, Pilates and women’s health care together under one roof. She leads clinical care at the studio and the Together Wellness Pilates Training Program. [Qualifications and experience to confirm.]',
  },
  {
    name: 'Tom Monkhouse',
    role: 'Co-founder',
    panelColour: 'cornflower',
    bio: 'Tom leads the business and the build, working with Pattern Studio on the studio at Mos Lane. [Background to confirm.]',
  },
  { name: '[Name]', role: 'Senior Physiotherapist', panelColour: 'nude', bio: '[Bio to come.]' },
  { name: '[Name]', role: 'Physiotherapist', panelColour: 'sage', bio: '[Bio to come.]' },
  { name: '[Name]', role: 'Pilates Instructor', panelColour: 'cornflower', bio: '[Bio to come.]' },
  { name: '[Name]', role: 'Studio Manager', panelColour: 'nude', bio: '[Bio to come.]' },
].map((m, i) => ({ ...m, order: i + 1 })) as TeamMember[]

export const panelColours = { sage: '#C4C4B8', cornflower: '#7D8F9B', nude: '#E6C9BB' } as const

export const policyLinks = [
  { label: 'T’s & C’s', href: '/terms' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Sustainability Policy', href: '/sustainability' },
  { label: 'Membership Policy', href: '/membership' },
  { label: 'Privacy Policy', href: '/privacy' },
]

export const services = [
  { label: 'Pilates', href: '/pilates', image: '/images/reformer-studio.jpg' },
  { label: 'Physiotherapy', href: '/physiotherapy', image: '/images/treatment-rooms.jpg' },
  { label: 'Wellness', href: '/wellness', image: '/images/lounge.jpg' },
]
