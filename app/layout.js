import './globals.css'
import Link from 'next/link'
import { Sora, Plus_Jakarta_Sans } from 'next/font/google'
import { Footprints, MessageCircle, MapPin } from 'lucide-react'
import { getShop } from '../lib/api'
import { waLink } from '../lib/format'

const display = Sora({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#7C3AED' }

export async function generateMetadata() {
  const shop = await getShop()
  const name = shop?.shopName || 'Boutique'
  return {
    metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
    title: { default: `${name} – Chaussures`, template: `%s | ${name}` },
    description: `Découvrez les chaussures de ${name}. Choisissez votre pointure et commandez facilement sur WhatsApp.`,
    openGraph: { siteName: name, type: 'website', locale: 'fr_FR' },
  }
}

export default async function RootLayout({ children }) {
  const shop = await getShop()
  const name = shop?.shopName || 'Boutique'
  const wa = shop?.whatsappNumber

  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 border-b border-line bg-surface/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white"><Footprints size={18} /></span>
              <span className="font-display text-lg font-bold">{name}</span>
            </Link>
            {wa && (
              <a href={waLink(wa, `Bonjour ${name}, j’ai une question.`)} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[#25D366] px-3.5 py-2 text-sm font-semibold text-white">
                <MessageCircle size={18} /><span className="hidden sm:inline">WhatsApp</span>
              </a>
            )}
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>

        <footer className="border-t border-line bg-surface">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 text-sm sm:grid-cols-3">
            <div>
              <p className="font-display font-bold">{name}</p>
              <p className="mt-1 text-ink-soft">Chaussures pour toute la famille.</p>
            </div>
            <div>
              <p className="font-semibold">Retrait en boutique</p>
              <p className="mt-1 flex gap-1.5 text-ink-soft"><MapPin size={16} className="mt-0.5 shrink-0" />{shop?.shopAddress || 'Adresse communiquée sur WhatsApp.'}</p>
            </div>
            <div>
              <p className="font-semibold">Livraison</p>
              <p className="mt-1 whitespace-pre-line text-ink-soft">{shop?.deliveryInfo || 'Modalités communiquées sur WhatsApp.'}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
