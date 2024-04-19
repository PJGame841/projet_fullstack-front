# Projet Fullstack ENSIM 2024
## Partie Front-end

### Lancement du projet

#### ATTENTION

Vous devez avoir les ports suivants non-utilisés:
```
80
27017
3000
8080
```

#### Etapes:

- Créez un fichier .env à la racine du projet avec les variables suivantes :
```
APP_JWT_SECRET=secret
APP_SECRET_KEY=secret
APP_REGISTER_KEY=register
```
Si vous désirez garder l'utilisateur "pj" (mdp: "pj"), laissez le APP_SECRET_KEY sur "secret"

- Créez l'image docker du back-end (cf. README back-end)
- Lancer le projet avec la commande :
```bash
docker compose up -d --build
```
- Le projet est maintenant disponible sur http://localhost/
- La documentation de l'API est disponible sur http://localhost/api/api-doc

### Développement

- Lancez en premier la partie back-end sur le port 3000
- Lancez les commandes suivantes:
```bash
npm install -g pnpm && \
pnpm install && \
pnpm run dev
```
- L'application sera disponible sur http://localhost:5173/