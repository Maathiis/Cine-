# CinePlus - Portail cinéma avec Svelte & TMDB API

## Description

CinePlus est un portail web développé avec [Svelte](https://svelte.dev/) qui utilise l’API TMDB (The Movie Database) pour offrir une expérience riche autour des films et des acteurs. Le site permet de rechercher des films, naviguer parmi les films populaires, à venir, ou en cours, et consulter les détails complets des films et des membres de l’équipe technique.

---

## Fonctionnalités

- **Moteur de recherche** : Recherche instantanée de films via l’API TMDB.
- **Page de résultats de recherche** : Affichage des résultats avec filtres et pagination.
- **Sections dédiées** : Films populaires, films à venir, films du moment.
- **Page film** : Photos, vidéos (trailers), avis, résumé détaillé.
- **Page acteur/membre équipe technique** : Photo, biographie, filmographie.

---

## Installation

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/ton-username/cineplus.git
   cd cineplus
   ```
   
2. Installer les dépendances :
    
    ```bash
    npm install
    ```
   
3. Configurer la clé API TMDB :

    - Créer un fichier `.env` à la racine du projet et ajouter votre clé API TMDB :

    ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```
   
4. Lancer le projet :

    ```bash
    npm run dev
    ```
    

5. Ouvrir votre navigateur et accéder à `http://localhost:5173`.

---

## Technologies utilisées

- **Svelte** : Librairie JavaScript pour construire des interfaces utilisateur.
- **SvelteKit** : Framework pour Svelte, utilisé pour le routing et la gestion des pages.
- **TMDB API** : API pour récupérer des informations sur les films et les acteurs.
- **Tailwind CSS** : Pour le style et la mise en page.
- **Vercel** : Pour le déploiement.

## Déploiement

Le projet est déployé sur Vercel. Vous pouvez accéder à l'application via [ce lien](https://cineplus-rho.vercel.app/).
