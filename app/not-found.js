import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-line bg-surface p-8 text-center shadow-card">
      <h1 className="text-xl font-bold">Produit introuvable</h1>
      <p className="mt-2 text-sm text-ink-soft">Ce modèle n’est plus disponible ou le lien est incorrect.</p>
      <Link href="/" className="mt-5 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">Voir le catalogue</Link>
    </div>
  )
}
