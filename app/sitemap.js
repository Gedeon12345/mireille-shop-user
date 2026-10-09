import { getJson, SITE_URL } from '../lib/api'

export default async function sitemap() {
  const site = SITE_URL || 'http://localhost:3000'
  const products = (await getJson('/public/products').catch(() => null)) || []
  return [
    { url: site, changeFrequency: 'daily', priority: 1 },
    ...products.map((p) => ({ url: `${site}/produit/${p._id}`, changeFrequency: 'weekly', priority: 0.7 })),
  ]
}
