import { defineArrayMember, defineField, defineType } from 'sanity'

/* ---------- Shared objects ---------- */

export const siteImage = defineType({
  name: 'siteImage',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({ name: 'alt', title: 'Alt text', type: 'string', description: 'Describe the image for screen readers.' }),
    defineField({ name: 'caption', title: 'Caption', type: 'string', description: 'Shown in Century capitals under the image, e.g. "Reception. Artist’s impression".' }),
    defineField({
      name: 'video',
      title: 'Video (optional)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Plays silently on a loop in place of the photo, which becomes its still frame. MP4, 5 to 15 seconds, ideally under 10 MB. Not shown to visitors who turn on reduce motion.',
    }),
    defineField({
      name: 'videoMobile',
      title: 'Phone video (optional)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'A smaller version of the video for phones, ideally under 4 MB. If empty, phones get the main video.',
    }),
    defineField({
      name: 'src',
      title: 'Placeholder file',
      type: 'string',
      readOnly: true,
      description: 'The design image used until a photo is uploaded above. Upload a photo to replace it.',
    }),
  ],
})

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'href', title: 'Link to', type: 'string', description: 'A page like /pilates, a section like #timetable, or a full web address.', validation: (r) => r.required() }),
  ],
})

const paragraphs = defineField({ name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [defineArrayMember({ type: 'text', rows: 3 })] })

const AHPRA_NOTE = 'AHPRA: describe what we do (process), never what clients will achieve (outcomes).'

/* ---------- Page sections ---------- */

const statement = defineArrayMember({
  name: 'statement',
  title: 'Statement',
  type: 'object',
  fields: [
    defineField({ name: 'text', type: 'text', rows: 3, description: AHPRA_NOTE }),
    defineField({ name: 'label', title: 'Small label below (optional)', type: 'string' }),
    defineField({ name: 'spacing', type: 'string', options: { list: ['normal', 'large'], layout: 'radio' }, initialValue: 'normal' }),
  ],
  preview: { select: { title: 'text' }, prepare: ({ title }) => ({ title, subtitle: 'Statement' }) },
})

const sectionIntro = defineArrayMember({
  name: 'sectionIntro',
  title: 'Section heading',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'subheading', type: 'string' }),
    defineField({ name: 'body', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title, subtitle: 'Section heading' }) },
})

const tile = defineArrayMember({
  name: 'tile',
  title: 'Image tile',
  type: 'object',
  fields: [
    defineField({ name: 'image', type: 'siteImage' }),
    defineField({ name: 'caption', type: 'string' }),
    defineField({ name: 'description', title: 'Hover description', type: 'text', rows: 2, description: AHPRA_NOTE }),
    defineField({ name: 'link', type: 'string', description: 'e.g. /pilates' }),
    defineField({
      name: 'width',
      type: 'string',
      options: { list: [{ title: 'Extra large (74%)', value: 'xl' }, { title: 'Large (62%)', value: 'l' }, { title: 'Medium (56%)', value: 'm' }, { title: 'Small (48%)', value: 's' }, { title: 'Full', value: 'full' }] },
      initialValue: 'l',
    }),
    defineField({ name: 'aspect', title: 'Aspect ratio', type: 'string', description: 'e.g. 4 / 5 or 16 / 9', initialValue: '3 / 2' }),
  ],
  preview: { select: { title: 'caption', media: 'image' }, prepare: ({ title, media }) => ({ title: title || 'Image', subtitle: 'Image tile', media }) },
})

const fullImage = defineArrayMember({
  name: 'fullImage',
  title: 'Full-width image',
  type: 'object',
  fields: [
    defineField({ name: 'image', type: 'siteImage' }),
    defineField({ name: 'caption', type: 'string' }),
    defineField({ name: 'aspect', type: 'string', initialValue: '16 / 8' }),
  ],
  preview: { select: { title: 'caption', media: 'image' }, prepare: ({ title, media }) => ({ title: title || 'Image', subtitle: 'Full-width image', media }) },
})

const pageTitle = defineArrayMember({
  name: 'pageTitle',
  title: 'Page title',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', description: 'e.g. Services / Pilates' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'quote', type: 'string' }),
    defineField({ name: 'intro', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title, subtitle: 'Page title' }) },
})

const splitTitle = defineArrayMember({
  name: 'splitTitle',
  title: 'Page title with image',
  type: 'object',
  fields: [defineField({ name: 'eyebrow', type: 'string' }), defineField({ name: 'title', type: 'string' }), defineField({ name: 'image', type: 'siteImage' })],
  preview: { select: { title: 'title', media: 'image' }, prepare: ({ title, media }) => ({ title, subtitle: 'Page title with image', media }) },
})

const split = defineArrayMember({
  name: 'split',
  title: 'Text and images',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    paragraphs,
    defineField({ name: 'link', type: 'link' }),
    defineField({
      name: 'layout',
      type: 'string',
      options: { list: [{ title: 'Image slider', value: 'slider' }, { title: 'Stacked images', value: 'stack' }, { title: 'Image cards (2 columns)', value: 'cards' }], layout: 'radio' },
      initialValue: 'slider',
    }),
    defineField({ name: 'pinned', title: 'Pin text while scrolling', type: 'boolean', initialValue: false }),
    defineField({ name: 'slides', title: 'Images', type: 'array', of: [defineArrayMember({ type: 'siteImage' })] }),
  ],
  preview: { select: { title: 'heading', media: 'slides.0' }, prepare: ({ title, media }) => ({ title, subtitle: 'Text and images', media }) },
})

const team = defineArrayMember({
  name: 'team',
  title: 'Team grid',
  type: 'object',
  description: 'Shows every team member marked "Show on site".',
  fields: [defineField({ name: 'heading', type: 'string' }), paragraphs, defineField({ name: 'note', type: 'string' })],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title, subtitle: 'Team grid' }) },
})

const gridItem = defineArrayMember({
  name: 'gridItem',
  type: 'object',
  fields: [defineField({ name: 'title', type: 'string' }), defineField({ name: 'body', type: 'text', rows: 3, description: AHPRA_NOTE }), defineField({ name: 'meta', title: 'Detail line', type: 'string' })],
})

const cardGrid = defineArrayMember({
  name: 'cardGrid',
  title: 'Card grid',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Small label', type: 'string' }),
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'intro', type: 'text', rows: 2 }),
    defineField({ name: 'style', type: 'string', options: { list: [{ title: 'Cards', value: 'cards' }, { title: 'Ruled list', value: 'ruled' }], layout: 'radio' }, initialValue: 'cards' }),
    defineField({ name: 'columns', type: 'number', options: { list: [3, 4] }, initialValue: 4 }),
    defineField({ name: 'items', type: 'array', of: [gridItem] }),
    defineField({ name: 'cta', title: 'Call to action', type: 'link' }),
  ],
  preview: { select: { a: 'label', b: 'heading' }, prepare: ({ a, b }) => ({ title: b || a, subtitle: 'Card grid' }) },
})

const numbered = defineArrayMember({
  name: 'numbered',
  title: 'Numbered list',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'items', type: 'array', of: [defineArrayMember({ type: 'object', name: 'numberedItem', fields: [defineField({ name: 'title', type: 'string' }), defineField({ name: 'body', type: 'text', rows: 3, description: AHPRA_NOTE })] })] }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title, subtitle: 'Numbered list' }) },
})

const imageWithDescription = defineField({
  name: 'left',
  title: 'Left image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
    defineField({ name: 'caption', type: 'string' }),
    defineField({ name: 'description', title: 'Hover description', type: 'text', rows: 2 }),
    defineField({
      name: 'video',
      title: 'Video (optional)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Plays silently on a loop in place of the photo, which becomes its still frame. MP4, 5 to 15 seconds, ideally under 10 MB. Not shown to visitors who turn on reduce motion.',
    }),
    defineField({
      name: 'videoMobile',
      title: 'Phone video (optional)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'A smaller version of the video for phones, ideally under 4 MB. If empty, phones get the main video.',
    }),
    defineField({ name: 'src', title: 'Placeholder file', type: 'string', readOnly: true }),
  ],
})

const imagePair = defineArrayMember({
  name: 'imagePair',
  title: 'Two images',
  type: 'object',
  fields: [imageWithDescription, defineField({ name: 'right', title: 'Right image (offset lower)', type: 'siteImage' }), defineField({ name: 'aspect', type: 'string', initialValue: '4 / 5' })],
  preview: { select: { media: 'left' }, prepare: ({ media }) => ({ title: 'Two images', media }) },
})

const tileWithText = defineArrayMember({
  name: 'tileWithText',
  title: 'Image tile with text',
  type: 'object',
  fields: [
    defineField({ ...imageWithDescription, name: 'tile', title: 'Tile image' }),
    defineField({ name: 'heading', type: 'string' }),
    paragraphs,
    defineField({ name: 'image', title: 'Second image', type: 'siteImage' }),
  ],
  preview: { select: { title: 'heading', media: 'tile' }, prepare: ({ title, media }) => ({ title, subtitle: 'Image tile with text', media }) },
})

const appointments = defineArrayMember({
  name: 'appointments',
  title: 'Appointment types',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string' }),
    defineField({ name: 'items', type: 'array', of: [defineArrayMember({ type: 'object', name: 'appointment', fields: [defineField({ name: 'title', type: 'string' }), defineField({ name: 'meta', title: 'Length', type: 'string' })] })] }),
    defineField({ name: 'cta', type: 'link' }),
    defineField({ name: 'note', type: 'string' }),
  ],
  preview: { select: { title: 'label' }, prepare: ({ title }) => ({ title, subtitle: 'Appointment types' }) },
})

const bookingOptions = defineArrayMember({
  name: 'bookingOptions',
  title: 'Booking options',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'bookingOption',
          fields: [
            defineField({ name: 'image', type: 'siteImage' }),
            defineField({ name: 'caption', type: 'string' }),
            defineField({ name: 'description', type: 'string' }),
            defineField({ name: 'body', type: 'text', rows: 3 }),
            defineField({ name: 'cta', type: 'link' }),
          ],
          preview: { select: { title: 'caption', media: 'image' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Booking options' }) },
})

const timetable = defineArrayMember({
  name: 'timetable',
  title: 'Timetable (Momence)',
  type: 'object',
  description: 'The Momence embed code is set in Site settings.',
  fields: [defineField({ name: 'heading', type: 'string', initialValue: 'Timetable' })],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title, subtitle: 'Momence timetable' }) },
})

const contactPrompt = defineArrayMember({
  name: 'contactPrompt',
  title: 'Contact prompt',
  type: 'object',
  description: 'Phone and email come from Site settings.',
  fields: [defineField({ name: 'heading', type: 'string' }), defineField({ name: 'body', type: 'text', rows: 2 })],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title, subtitle: 'Contact prompt' }) },
})

const exploreServices = defineArrayMember({
  name: 'exploreServices',
  title: 'Explore our services row',
  type: 'object',
  fields: [defineField({ name: 'heading', type: 'string', initialValue: 'Explore our services' })],
  preview: { prepare: () => ({ title: 'Explore our services row' }) },
})

/* ---------- Documents ---------- */

export const page = defineType({
  name: 'websitePage',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required(), description: 'home, about, our-space, pilates, physiotherapy, wellness or book-now' }),
    defineField({ name: 'hero', title: 'Hero image', type: 'siteImage', description: 'Full-screen image behind the logo at the top of the page.' }),
    defineField({
      name: 'blocks',
      title: 'Sections',
      type: 'array',
      of: [statement, sectionIntro, tile, fullImage, pageTitle, splitTitle, split, team, cardGrid, numbered, imagePair, tileWithText, appointments, bookingOptions, timetable, contactPrompt, exploreServices],
    }),
    defineField({ name: 'seoTitle', title: 'Search title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'Search description', type: 'text', rows: 2, group: 'seo' }),
  ],
  groups: [{ name: 'seo', title: 'Search' }],
})

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'bio', type: 'text', rows: 5 }),
    defineField({
      name: 'portrait',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({ name: 'panelColour', title: 'Panel colour', type: 'string', options: { list: [{ title: 'Sage', value: 'sage' }, { title: 'Cornflower', value: 'cornflower' }, { title: 'Nude', value: 'nude' }], layout: 'radio' }, initialValue: 'sage' }),
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'showOnSite', title: 'Show on site', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role', media: 'portrait' } },
})

export const policyPage = defineType({
  name: 'policyPage',
  title: 'Policy page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required(), description: 'terms, faq, sustainability, membership or privacy' }),
    defineField({ name: 'hero', title: 'Hero image', type: 'siteImage' }),
    defineField({
      name: 'items',
      title: 'Accordion items',
      type: 'array',
      of: [defineArrayMember({ type: 'object', name: 'policyItem', fields: [defineField({ name: 'heading', type: 'string' }), defineField({ name: 'body', type: 'text', rows: 6 })], preview: { select: { title: 'heading' } } })],
    }),
  ],
})

export const siteSettings = defineType({
  name: 'websiteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'brandMessage', title: 'Brand message', type: 'text', rows: 5 }),
    defineField({ name: 'acknowledgement', title: 'Acknowledgement of Country', type: 'text', rows: 3 }),
    defineField({ name: 'address', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'instagram', type: 'url' }),
    defineField({ name: 'mailchimpAction', title: 'Mailchimp form action URL', type: 'url', description: 'From Mailchimp: Audience › Signup forms › Embedded forms. Paste the form "action" URL.' }),
    defineField({ name: 'momenceEmbed', title: 'Momence timetable embed code', type: 'text', rows: 6 }),
  ],
})

export const schemaTypes = [siteImage, link, page, teamMember, policyPage, siteSettings]
