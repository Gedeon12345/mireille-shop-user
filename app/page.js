import Link from 'next/link'
import { Search, PackageSearch } from 'lucide-react'
import { getJson } from '../lib/api'
import { one } from '../lib/format'
import ProductCard from '../components/ProductCard'

export const maxDuration = 60

const GENRES = ['Homme', 'Femme', 'Enfant', 'Mixte']
const field = 'w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'

export default async function Home({ searchParams }) {
  const categorie = one(searchParams.categorie)
  const genre = one(searchParams.genre)
  const q = one(searchParams.q)

  const query = new URLSearchParams()
  if (categorie) query.set('category', categorie)
  if (genre) query.set('gender', genre)
  if (q) query.set('q', q)

  const [products, categories] = await Promise.all([
    getJson(`/public/products?${query}`),
    getJson('/public/categories'),
  ])
  const list = products || []
  const cats = categories || []

  const href = (c) => {
    const p = new URLSearchParams()
    if (c) p.set('categorie', c)
    if (genre) p.set('genre', genre)
    if (q) p.set('q', q)
    const s = p.toString()
    return s ? `/?${s}` : '/'
  }
  const chip = (on) => `whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium ${on ? 'border-primary bg-primary text-white' : 'border-line bg-surface text-ink-soft hover:text-ink'}`

  return (
    <>
      <section className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Nos chaussures</h1>
        <p className="mt-1 text-sm text-ink-soft">Choisissez votre modèle, votre pointure, et commandez sur WhatsApp.</p>
      </section>

      <form action="/" className="mb-4 grid gap-2 sm:grid-cols-[1fr_170px_auto]">
        {categorie && <input type="hidden" name="categorie" value={categorie} />}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input name="q" defaultValue={q} placeholder="Rechercher un modèle…" aria-label="Rechercher" className={`${field} pl-10`} />
        </div>
        <select name="genre" defaultValue={genre} aria-label="Genre" className={field}>
          <option value="">Tous les genres</option>
          {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        <button className="rounded-xl bg-primary px-5 py-2.5 font-semibold text-white hover:bg-primary-dark">Rechercher</button>
      </form>

      <nav className="mb-6 flex gap-2 overflow-x-auto pb-1" aria-label="Catégories">
        <Link href={href('')} className={chip(!categorie)}>Toutes</Link>
        {cats.map((c) => <Link key={c._id} href={href(c._id)} className={chip(categorie === c._id)}>{c.name}</Link>)}
      </nav>

      {list.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line py-16 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-primary"><PackageSearch size={22} /></span>
          <h2 className="font-semibold">Aucun modèle trouvé</h2>
          <p className="max-w-xs text-sm text-ink-soft">Modifiez votre recherche ou revenez plus tard : le catalogue est mis à jour en continu.</p>
          <Link href="/" className="text-sm font-semibold text-primary underline">Voir tout le catalogue</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p._id} p={p} />)}
        </div>
      )}
    </>
  )
}
