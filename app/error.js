'use client'

export default function Error({ reset }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-line bg-surface p-8 text-center shadow-card">
      <h1 className="text-xl font-bold">Chargement impossible</h1>
      <p className="mt-2 text-sm text-ink-soft">Le catalogue met du temps à répondre. Patientez un instant puis réessayez.</p>
      <button onClick={reset} className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">Réessayer</button>
    </div>
  )
}
