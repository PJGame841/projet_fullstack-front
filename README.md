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
APP_REGISTER_KEY=register
```

- Créez l'image docker du back-end (cf. README back-end)
- Lancer le projet avec la commande :
```
docker compose up -d
```
- Le projet est maintenant disponible sur http://localhost/


### Développement

- Lancez en premier la partie back-end sur le port 3000
- Lancez les commandes suivantes:
```
npm install -g pnpm
pnpm install
pnpm run dev
```
- L'application sera disponible sur http://localhost:5173/