import { cache } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Footprints } from 'lucide-react'
import { getShop, API_BASE } from '../../../lib/api'
import { cld, formatFCFA } from '../../../lib/format'
import OrderPanel from '../../../components/OrderPanel'

export const maxDuration = 60

// Une seule demande à l'API par affichage (métadonnées + page), toujours à jour
const getProduct = cache(async (id) => {
  try {
    const res = await fetch(`${API_BASE}/public/products/${id}`, { cache: 'no-store', signal: AbortSignal.timeout(55000) })
    if (res.ok) return { product: await res.json(), status: 200, note: '' }
    return { product: null, status: res.status, note: (await res.text()).slice(0, 120) }
  } catch (e) {
    return { product: null, status: 'ERREUR', note: e.message }
  }
})

export async function generateMetadata({ params }) {
  const { product: p } = await getProduct(params.id)
  if (!p) return { title: 'Produit introuvable' }
  const description = `${p.name} – ${formatFCFA(p.price)}. Commandez sur WhatsApp : retrait en boutique ou livraison.`
  const image = cld(p.image, 900)
  return {
    title: p.name,
    description,
    openGraph: { title: p.name, description, type: 'website', images: image ? [image] : [] },
    twitter: { card: 'summary_large_image', title: p.name, description, images: image ? [image] : [] },
  }
}

export default async function ProductPage({ params, searchParams }) {
  const [{ product: p, status, note }, shop] = await Promise.all([getProduct(params.id), getShop()])
  if (!p) {
    // ?debug=1 : affiche pourquoi le produit n'a pas pu être chargé (à retirer une fois le site stable)
    if (searchParams?.debug === '1') {
      return (
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', padding: 16 }}>
          {`Produit introuvable (page produit atteinte)\nid : ${params.id}\nAPI : ${API_BASE}\nréponse : ${status} ${note}`}
        </pre>
      )
    }
    notFound()
  }
  const site = (process.env.SITE_URL || '').replace(/\/+$/, '')

  return (
    <>
      <Link href="/" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-primary"><ArrowLeft size={16} />Catalogue</Link>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-line bg-primary-soft">
          {p.image
            ? <img src={cld(p.image, 900)} alt={p.name} className="aspect-square w-full object-cover" />
            : <div className="grid aspect-square w-full place-items-center text-primary"><Footprints size={72} /></div>}
        </div>
        <div>
          <p className="text-sm text-ink-soft">{p.category?.name} · {p.gender}</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{p.name}</h1>
          <p className="mt-2 font-display text-2xl font-bold text-primary">{formatFCFA(p.price)}</p>
          {p.description && <p className="mt-3 whitespace-pre-line text-sm text-ink-soft">{p.description}</p>}
          <div className="mt-6">
            <OrderPanel product={p} shop={shop} url={site ? `${site}/produit/${p._id}` : ''} />
          </div>
        </div>
      </div>
    </>
  )
}
