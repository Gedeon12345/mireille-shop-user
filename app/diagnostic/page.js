export const dynamic = 'force-dynamic'

const raw = (process.env.API_URL || '').trim().replace(/\/+$/, '')
const BASE = raw && !/\/api$/.test(raw) ? `${raw}/api` : raw

async function probe(path) {
  try {
    const r = await fetch(`${BASE}${path}`, { cache: 'no-store', signal: AbortSignal.timeout(55000) })
    return { status: r.status, body: await r.text() }
  } catch (e) {
    return { status: 'ERREUR', body: e.message }
  }
}

export default async function Diagnostic() {
  const id = '6ac6676e80a17b455a63039f'
  const list = await probe('/public/products')
  const detail = await probe(`/public/products/${id}`)
  const lines = [
    `API_URL utilisée : ${BASE || '(vide !)'}`,
    `1) Liste : ${list.status}`, list.body.slice(0, 150),
    `2) Détail ${id} : ${detail.status}`, detail.body.slice(0, 300),
  ]
  return <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', padding: 16 }}>{lines.join('\n')}</pre>
}