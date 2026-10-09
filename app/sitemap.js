import { getJson } from '../lib/api'

export default async function sitemap() {
  const site = (process.env.SITE_URL || 'http://localhost:3000').replace(/\/+$/, '')
  const products = (await getJson('/public/products').catch(() => null)) || []
  return [
    { url: site, changeFrequency: 'daily', priority: 1 },
    ...products.map((p) => ({ url: `${site}/produit/${p._id}`, changeFrequency: 'weekly', priority: 0.7 })),
  ]
}
