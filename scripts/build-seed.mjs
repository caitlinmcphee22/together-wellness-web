// Builds Sanity documents from the bundled seed content in /content.
// Output: scripts/seed/*.json, one file per document.
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const key = (s) => createHash('md5').update(s).digest('hex').slice(0, 12)
const pages = JSON.parse(readFileSync(new URL('./seed/_pages.json', import.meta.url)))
const site = JSON.parse(readFileSync(new URL('./seed/_site.json', import.meta.url)))
const policies = JSON.parse(readFileSync(new URL('../content/policies.json', import.meta.url)))

const img = (i, type = 'siteImage') => (i ? { _type: type, ...i } : undefined)
const withKeys = (arr, type, path) => (arr || []).map((x, n) => ({ _key: key(path + n), ...(type ? { _type: type } : {}), ...x }))

function block(b, path) {
  const o = { ...b, _key: key(path) }
  switch (b._type) {
    case 'tile': case 'fullImage': o.image = img(b.image); break
    case 'splitTitle': o.image = img(b.image); break
    case 'split': o.slides = withKeys((b.slides || []).map((s) => img(s)), null, path + 's'); if (b.link) o.link = { _type: 'link', ...b.link }; break
    case 'cardGrid': o.items = withKeys(b.items, 'gridItem', path + 'i'); if (b.cta) o.cta = { _type: 'link', ...b.cta }; break
    case 'numbered': o.items = withKeys(b.items, 'numberedItem', path + 'i'); break
    case 'imagePair': o.left = img(b.left, 'image'); o.right = img(b.right); break
    case 'tileWithText': o.tile = img(b.tile, 'image'); o.image = img(b.image); break
    case 'appointments': o.items = withKeys(b.items, 'appointment', path + 'i'); if (b.cta) o.cta = { _type: 'link', ...b.cta }; break
    case 'bookingOptions': o.items = withKeys(b.items.map((it) => ({ ...it, image: img(it.image), cta: { _type: 'link', ...it.cta } })), 'bookingOption', path + 'i'); break
  }
  return o
}

const out = {}
for (const p of pages) {
  out[`websitePage-${p.slug}`] = {
    _type: 'websitePage', _id: `websitePage-${p.slug}`, title: p.title,
    slug: { _type: 'slug', current: p.slug }, hero: img(p.hero),
    seoTitle: p.seoTitle, seoDescription: p.seoDescription,
    blocks: p.blocks.map((b, n) => block(b, p.slug + n)),
  }
}
for (const p of policies) {
  out[`policyPage-${p.slug}`] = {
    _type: 'policyPage', _id: `policyPage-${p.slug}`, title: p.title,
    slug: { _type: 'slug', current: p.slug }, hero: img(p.hero),
    items: withKeys(p.items, 'policyItem', p.slug),
  }
}
site.team.forEach((m, n) => {
  const id = `teamMember-${n + 1}`
  out[id] = { _type: 'teamMember', _id: id, showOnSite: true, ...m }
})
out.websiteSettings = { _type: 'websiteSettings', _id: 'websiteSettings', ...site.settings }

mkdirSync(new URL('./seed/', import.meta.url), { recursive: true })
for (const [id, doc] of Object.entries(out)) {
  const s = JSON.stringify(JSON.parse(JSON.stringify(doc)))
  writeFileSync(new URL(`./seed/${id}.json`, import.meta.url), s)
  console.log(id, s.length)
}
