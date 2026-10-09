import { SITE_URL } from '../lib/api'

export default function robots() {
  const site = SITE_URL || 'http://localhost:3000'
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${site}/sitemap.xml` }
}
