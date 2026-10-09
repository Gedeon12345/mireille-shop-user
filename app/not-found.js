import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-line bg-surface p-8 text-center shadow-card">
      <h1 className="text-xl font-bold">Page introuvable</h1>
      <p className="mt-2 text-sm text-ink-soft">Cette adresse n’existe pas ou n’est plus valide.</p>
      <Link href="/" className="mt-5 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">Voir le catalogue</Link>
    </div>
  )
}
