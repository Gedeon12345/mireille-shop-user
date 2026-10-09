import Link from 'next/link'
import { Footprints } from 'lucide-react'
import { cld, formatFCFA } from '../lib/format'

export default function ProductCard({ p }) {
  const colors = [...new Set(p.variants.map((v) => v.color))]
  return (
    <Link href={`/produit/${p._id}`} className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-colors hover:border-primary">
      <div className="aspect-square overflow-hidden bg-primary-soft">
        {p.image
          ? <img src={cld(p.image, 500)} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          : <div className="grid h-full w-full place-items-center text-primary"><Footprints size={44} /></div>}
      </div>
      <div className="p-3">
        <p className="truncate font-display font-semibold">{p.name}</p>
        <p className="truncate text-xs text-ink-soft">{p.category?.name} · {p.gender}</p>
        <p className="mt-1.5 font-semibold text-primary">{formatFCFA(p.price)}</p>
        <p className="mt-0.5 text-xs text-ink-soft">{colors.length} couleur{colors.length > 1 ? 's' : ''} disponible{colors.length > 1 ? 's' : ''}</p>
      </div>
    </Link>
  )
}
