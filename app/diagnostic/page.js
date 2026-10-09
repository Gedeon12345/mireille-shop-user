// Page TEMPORAIRE de diagnostic : montre ce que le serveur Vercel reçoit de l'API. À supprimer ensuite.
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

export default async function Diagnostic({ searchParams }) {
  const list = await probe('/public/products')
  let id = Array.isArray(searchParams.id) ? searchParams.id[0] : searchParams.id
  if (!id) { try { id = JSON.parse(list.body)[0]._id } catch { id = '' } }
  const detail = id ? await probe(`/public/products/${id}`) : null
  const shop = await probe('/public/shop')

  const lines = [
    `API_URL utilisée par le site : ${BASE || '(vide !)'}`,
    '',
    `1) Liste des produits : ${list.status}`,
    list.body.slice(0, 200),
    '',
    `2) Boutique : ${shop.status}`,
    shop.body.slice(0, 200),
    '',
    `3) Détail du produit ${id || '(aucun)'} : ${detail ? detail.status : '-'}`,
    detail ? detail.body.slice(0, 300) : '',
  ]
  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Diagnostic</h1>
      <pre className="whitespace-pre-wrap break-all rounded-xl border border-line bg-surface p-4 text-xs">{lines.join('\n')}</pre>
    </div>
  )
}
