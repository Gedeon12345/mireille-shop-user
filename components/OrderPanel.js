'use client'

import { useMemo, useState } from 'react'
import { Minus, Plus, MessageCircle, Store, Truck } from 'lucide-react'
import { formatFCFA, waLink } from '../lib/format'

const chip = (on) =>
  `rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${on ? 'border-primary bg-primary text-white' : 'border-line bg-surface hover:border-primary'}`

export default function OrderPanel({ product, shop, url }) {
  const colors = useMemo(() => [...new Set(product.variants.map((v) => v.color))], [product])
  const [color, setColor] = useState(colors.length === 1 ? colors[0] : '')
  const [size, setSize] = useState('')
  const [qty, setQty] = useState(1)
  const [mode, setMode] = useState('retrait')
  const [address, setAddress] = useState('')

  const sizes = useMemo(
    () => product.variants.filter((v) => v.color === color).map((v) => v.size).sort((a, b) => a - b),
    [product, color]
  )
  const ready = color && size
  const name = shop?.shopName || 'la boutique'

  const message = [
    `Bonjour ${name}, je souhaite commander :`,
    `• ${product.name}`,
    `• Couleur : ${color}`,
    `• Pointure : ${size}`,
    `• Quantité : ${qty}`,
    `• Prix : ${formatFCFA(product.price * qty)}`,
    mode === 'livraison' ? `• Livraison à : ${address.trim() || '(à préciser)'}` : '• Retrait en boutique',
    url ? `\nLien du produit : ${url}` : '',
  ].join('\n')

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-sm font-semibold">Couleur</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => <button key={c} type="button" className={chip(color === c)} onClick={() => { setColor(c); setSize('') }}>{c}</button>)}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold">Pointure</p>
        {color ? (
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => <button key={s} type="button" className={chip(size === s)} onClick={() => setSize(s)}>{s}</button>)}
          </div>
        ) : <p className="text-sm text-ink-soft">Choisissez d’abord une couleur.</p>}
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold">Quantité</p>
        <div className="inline-flex items-center gap-3 rounded-xl border border-line bg-surface p-1">
          <button type="button" aria-label="Diminuer" onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-10 w-10 place-items-center rounded-lg hover:bg-canvas"><Minus size={18} /></button>
          <span className="w-6 text-center font-semibold">{qty}</span>
          <button type="button" aria-label="Augmenter" onClick={() => setQty(Math.min(5, qty + 1))} className="grid h-10 w-10 place-items-center rounded-lg hover:bg-canvas"><Plus size={18} /></button>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold">Réception</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <button type="button" onClick={() => setMode('retrait')} className={`flex items-start gap-3 rounded-xl border p-3 text-left text-sm ${mode === 'retrait' ? 'border-primary bg-primary-soft' : 'border-line bg-surface'}`}>
            <Store size={20} className="mt-0.5 shrink-0 text-primary" /><span><b>Retrait en boutique</b>{shop?.shopAddress && <span className="block text-xs text-ink-soft">{shop.shopAddress}</span>}</span>
          </button>
          <button type="button" onClick={() => setMode('livraison')} className={`flex items-start gap-3 rounded-xl border p-3 text-left text-sm ${mode === 'livraison' ? 'border-primary bg-primary-soft' : 'border-line bg-surface'}`}>
            <Truck size={20} className="mt-0.5 shrink-0 text-primary" /><span><b>Livraison</b>{shop?.deliveryInfo && <span className="block whitespace-pre-line text-xs text-ink-soft">{shop.deliveryInfo}</span>}</span>
          </button>
        </div>
        {mode === 'livraison' && (
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Quartier ou adresse de livraison"
            className="mt-2 w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        )}
      </div>

      <div className="flex items-baseline justify-between border-t border-line pt-4">
        <span className="font-semibold">Total</span>
        <span className="font-display text-2xl font-bold text-primary">{formatFCFA(product.price * qty)}</span>
      </div>

      {!shop?.whatsappNumber ? (
        <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">Les commandes en ligne ne sont pas encore ouvertes. Passez à la boutique.</p>
      ) : ready ? (
        <a href={waLink(shop.whatsappNumber, message)} target="_blank" rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3.5 font-semibold text-white hover:brightness-95">
          <MessageCircle size={20} />Commander sur WhatsApp
        </a>
      ) : (
        <button type="button" disabled className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3.5 font-semibold text-white opacity-50">
          <MessageCircle size={20} />Choisissez couleur et pointure
        </button>
      )}
      <p className="text-center text-xs text-ink-soft">La disponibilité et le paiement sont confirmés avec la boutique sur WhatsApp.</p>
    </div>
  )
}
