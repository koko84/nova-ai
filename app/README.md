# NOVA AI — source de l'application

NOVA AI est une application web Next.js responsive, préparée comme PWA installable sur Android après déploiement HTTPS.

## Fonctions incluses
- Interface d'assistant IA multilingue
- Historique de conversation côté interface
- Outils d'écriture, traduction, idées et aide professionnelle
- Analyse d'images envoyées par l'utilisateur
- Génération d'images via l'API Images
- Contact et guide d'utilisation dans l'interface
- Manifest PWA et icônes Android 192/512 px
- Clé API utilisée uniquement côté serveur

## Démarrage local
Prérequis : Node.js 20.9+ et npm.

1. Décompresser le ZIP et ouvrir un terminal dans `NOVA_AI_Final`.
2. Installer : `npm install`
3. Copier `.env.example` vers `.env.local`.
4. Définir `OPENAI_API_KEY` dans `.env.local` (ne jamais publier cette clé).
5. Lancer : `npm run dev`
6. Ouvrir `http://localhost:3000`.

## Déploiement et installation Android
Déployer le projet sur un hébergeur compatible Next.js avec HTTPS. Ajouter `OPENAI_API_KEY` dans les variables secrètes du serveur. Ouvrir ensuite l'URL publique dans Chrome Android, puis choisir « Installer l'application » ou « Ajouter à l'écran d'accueil » si proposé.

Cette méthode installe la PWA. Ce ZIP n'est pas un APK signé. Pour un APK autonome, il faut une URL de production et Android SDK/Gradle, puis générer et signer le paquet Android.

## Production
Avant d'ouvrir au public : ajouter authentification, base de données, limites de requêtes, protection contre les abus, suivi des coûts, politique de confidentialité, conditions d'utilisation, sauvegardes et tests de sécurité. La disponibilité de la génération d'images dépend du modèle et des autorisations de facturation du compte API.
