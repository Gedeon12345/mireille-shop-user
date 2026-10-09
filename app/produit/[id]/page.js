import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Footprints } from 'lucide-react'
import { getJson, getShop } from '../../../lib/api'
import { cld, formatFCFA } from '../../../lib/format'
import OrderPanel from '../../../components/OrderPanel'

export const maxDuration = 60

export async function generateMetadata({ params }) {
  const p = await getJson(`/public/products/${params.id}`).catch(() => null)
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

export default async function ProductPage({ params }) {
  const [p, shop] = await Promise.all([getJson(`/public/products/${params.id}`), getShop()])
  if (!p) notFound()
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
