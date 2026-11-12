import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website')
    .items([
      S.listItem().title('Site settings').id('websiteSettings').child(S.document().schemaType('websiteSettings').documentId('websiteSettings')),
      S.divider(),
      S.documentTypeListItem('websitePage').title('Pages'),
      S.documentTypeListItem('teamMember').title('Team members'),
      S.documentTypeListItem('policyPage').title('Policy pages'),
    ])
