// Appels à l'API publique de la boutique (côté serveur uniquement : aucun CORS à gérer).
const raw = (process.env.API_URL || '').trim().replace(/\/+$/, '')
const BASE = raw && !/\/api$/.test(raw) ? `${raw}/api` : raw

export async function getJson(path) {
  if (!BASE) throw new Error('API_URL manquant')
  const res = await fetch(`${BASE}${path}`, {
    next: { revalidate: 60 },              // le catalogue est mis en cache 60 s
    signal: AbortSignal.timeout(55000),    // le serveur gratuit peut mettre ~1 min à se réveiller
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

export const getShop = () => getJson('/public/shop').catch(() => null)
