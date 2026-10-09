export const formatFCFA = (n) => `${String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`

// Photos Cloudinary : version réduite et optimisée
export const cld = (url, w = 600) =>
  url && url.includes('/upload/') ? url.replace('/upload/', `/upload/w_${w},c_limit,q_auto,f_auto/`) : url

export const waLink = (number, text) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`

export const one = (v) => (Array.isArray(v) ? v[0] : v) || ''
