# KIA × FIFA World Cup 2026 — HUB Concession

Version HUB du jeu-concours KIA × Coupe du Monde de la FIFA 2026, destinée aux concessions.  
Permet de valider l'essai d'un visiteur en concession via vérification e-mail.  
Développée avec **Vue 3 + Vite**.

---

## Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm v9 ou supérieur

---

## Installation

```bash
npm install
```

---

## Lancer en développement

```bash
npm run dev
```

Le projet est accessible sur `http://localhost:5173`.

> ⚠️ Les appels API (check email, soumission de formulaire) renverront une erreur CORS en local — comportement normal. Pour tester le flux complet, utiliser les e-mails de test :
> - `test0@test.fr` → simule un e-mail inconnu (→ accès au quiz)
> - `test1@test.fr` → simule un e-mail déjà inscrit (→ écran de confirmation)

---

## Build pour livraison

```bash
npm run build
```

Le dossier `dist/` est généré à la racine du projet. C'est ce dossier qui est à déployer (Netlify, ou tout hébergeur statique).

### Déploiement Netlify

1. Glisser le dossier `dist/` dans l'interface Netlify, **ou**
2. Connecter le dépôt GitHub et configurer :
   - **Build command :** `npm run build`
   - **Publish directory :** `dist`

Le fichier `public/_redirects` est inclus pour gérer le routing Vue SPA.

---

## Structure du projet

```
src/
├── components/
│   ├── HeroSection.vue      # Section hero
│   ├── QuizSection.vue      # Vérification e-mail + quiz 4 questions + formulaire
│   └── AppFooter.vue        # Footer
├── useDealers.js            # Composable recherche de concessions
├── style.css                # Styles globaux
└── main.js

public/
├── reglement.html           # Règlement du jeu
├── mentions-legales.html    # Mentions légales
├── _redirects               # Redirections Netlify (SPA)
└── img/                     # Assets images
```

---

## Flux utilisateur

1. **Écran 0** — Saisie de l'e-mail → appel API de vérification
   - E-mail inconnu (API → `0`) : accès au quiz avec `source=concession`
   - E-mail déjà inscrit (API → `1`) : affichage de l'écran de confirmation directement
2. **Écrans 1–4** — Quiz 4 questions
3. **Écran 5** — Formulaire de coordonnées
4. **Confirmation** — Affichage en page (pas de redirection)

---

## Points à vérifier avant livraison en production

| Fichier | Élément | Action |
|---|---|---|
| `src/components/QuizSection.vue` | `testmode: 'y'` | **Supprimer** la ligne |
| `src/components/QuizSection.vue` | `EMAIL_CHECK_URL` | Vérifier l'URL de l'API de vérification e-mail |
| `src/components/QuizSection.vue` | Emails de test (`test0@test.fr`, `test1@test.fr`) | **Supprimer** les entrées `TEST_EMAILS` |
| `index.html` | Meta Pixel ID `3943571792615519` | Vérifier l'ID |
| `index.html` | CookieYes script ID | Vérifier le domaine dans le dashboard CookieYes |
| Dashboard CookieYes | Domaine enregistré | Ajouter le domaine de production |
| insightondemand | CORS whitelist | Whitelister le domaine de production pour `vml_cdm_2026.php` et `cdm2026.php` |
