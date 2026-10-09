// Appels à l'API publique de la boutique (côté serveur uniquement : aucun CORS à gérer).
const raw = (process.env.API_URL || '').trim().replace(/\/+$/, '')
const BASE = raw && !/\/api$/.test(raw) ? `${raw}/api` : raw

// fresh = true : toujours la version à jour (fiche produit) ; sinon catalogue mis en cache 60 s
export const API_BASE = BASE

const site = (process.env.SITE_URL || '').trim().replace(/\/+$/, '')
export const SITE_URL = site && !/^https?:\/\//.test(site) ? `https://${site}` : site

export async function getJson(path, { fresh = false } = {}) {
  if (!BASE) throw new Error('API_URL manquant')
  const res = await fetch(`${BASE}${path}`, {
    ...(fresh ? { cache: 'no-store' } : { next: { revalidate: 60 } }),
    signal: AbortSignal.timeout(55000),    // le serveur gratuit peut mettre ~1 min à se réveiller
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

export const getShop = () => getJson('/public/shop').catch(() => null)
