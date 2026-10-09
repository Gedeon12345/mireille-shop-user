export default function robots() {
  const site = process.env.SITE_URL || 'http://localhost:3000'
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${site}/sitemap.xml` }
}
