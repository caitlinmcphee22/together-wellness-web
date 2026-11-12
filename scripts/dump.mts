import { writeFileSync } from 'node:fs'
import { pages } from '../content/pages.ts'
import { settings, team } from '../content/site.ts'
writeFileSync('scripts/seed/_pages.json', JSON.stringify(pages))
writeFileSync('scripts/seed/_site.json', JSON.stringify({ settings, team }))
