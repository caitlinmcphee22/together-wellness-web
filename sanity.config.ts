'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ti60wn36'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'together-wellness-website',
  title: 'Together Wellness Website',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
})
