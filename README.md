# Site client – vitrine et commande WhatsApp (Next.js)

Catalogue public des chaussures disponibles. La cliente choisit couleur, pointure, quantité et mode de réception (retrait ou livraison), puis ouvre WhatsApp avec le message de commande déjà rédigé. Aucune quantité exacte n'est jamais affichée.

## Lancer en local
```bash
cd storefront
npm install
cp .env.example .env.local   # API_URL et SITE_URL
npm run dev                  # http://localhost:3000
```

## Déployer sur Vercel (projet séparé de l'application admin)
1. New Project > même dépôt > **Root Directory = `storefront`** (preset Next.js détecté).
2. Variables : `API_URL` (URL Render, avec `/api`) et `SITE_URL` (l'adresse finale du site, sans `/` final).
3. Dans l'application admin : **Paramètres > Boutique en ligne** (numéro WhatsApp, adresse, livraison).
4. Par produit : case « Afficher sur le site client » dans la fiche produit.

Le catalogue est mis en cache 60 s. Un produit sans stock disparaît automatiquement du site.
