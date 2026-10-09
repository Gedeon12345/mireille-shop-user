// Page TEMPORAIRE de diagnostic. À supprimer une fois le problème réglé.
export const dynamic = 'force-dynamic'

const raw = (process.env.API_URL || '').trim().replace(/\/+$/, '')
const BASE = raw && !/\/api$/.test(raw) ? `${raw}/api` : raw

async function probe(path, opts) {
  try {
    const r = await fetch(`${BASE}${path}`, opts)
    return `${r.status} ${(await r.text()).slice(0, 90)}`
  } catch (e) {
    return `ERREUR ${e.message}`
  }
}

export default async function Diagnostic() {
  const id = '6ac6676e80a17b455a63039f'
  const path = `/public/products/${id}`
  const sig = () => AbortSignal.timeout(55000)
  const lines = [
    `API_URL utilisée : ${BASE || '(vide !)'}`,
    '',
    `A) sans cache + délai   : ${await probe(path, { cache: 'no-store', signal: sig() })}`,
    '',
    `B) cache 60 s + délai   : ${await probe(path, { next: { revalidate: 60 }, signal: sig() })}`,
    '',
    `C) cache 60 s, sans délai : ${await probe(path, { next: { revalidate: 60 } })}`,
  ]
  return <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', padding: 16 }}>{lines.join('\n')}</pre>
}
