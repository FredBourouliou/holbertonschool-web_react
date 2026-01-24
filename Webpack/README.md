# Webpack

## Description

Ce projet permet d'apprendre les bases de Webpack, un bundler de modules JavaScript. Il couvre l'installation, la configuration et l'utilisation de Webpack pour regrouper des fichiers JavaScript et leurs dépendances.

## Environnement

- Ubuntu 20.04 LTS
- Node.js 20.x.x
- npm 9.x.x

## Structure du projet

```
Webpack/
├── README.md
├── task_0/
│   ├── package.json
│   ├── src/
│   │   └── index.js
│   └── dist/
│       └── index.html
├── task_1/
│   ├── package.json
│   ├── webpack.config.js
│   ├── js/
│   │   └── dashboard_main.js
│   └── public/
│       └── index.html
└── task_2/
    ├── package.json
    ├── webpack.config.js
    ├── assets/
    │   └── holberton-logo.jpg
    ├── css/
    │   └── main.css
    ├── js/
    │   └── dashboard_main.js
    └── public/
        └── index.html
```

## Tâches

### Task 0 - Basic setup

Configuration et exécution de Webpack avec une installation basique.

**Objectifs :**
- Installer webpack et webpack-cli en tant que dépendances de développement
- Installer jQuery en tant que dépendance de production
- Créer un fichier `src/index.js` qui utilise jQuery pour ajouter du contenu à la page
- Créer un fichier `dist/index.html` qui importe le bundle généré

**Installation :**

```bash
cd task_0
npm install
```

**Build :**

```bash
npx webpack --mode production
```

**Contenu généré :**

Le fichier `src/index.js` ajoute trois paragraphes à la page :
- Holberton Dashboard
- Dashboard data for the students
- Copyright - Holberton School

**Utilisation :**

Ouvrir `dist/index.html` dans un navigateur pour voir le résultat.

---

### Task 1 - Learning how to use Webpack with a config file

Utilisation de Webpack avec un fichier de configuration personnalisé.

**Objectifs :**
- Installer webpack (devDependency), jQuery et Lodash (dependencies)
- Créer un fichier de configuration `webpack.config.js`
- Utiliser un script `npm run build` pour exécuter Webpack
- Implémenter une fonction anti-spam avec Lodash debounce

**Installation :**

```bash
cd task_1
npm install
```

**Build :**

```bash
npm run build
```

**Fonctionnalités :**

Le fichier `js/dashboard_main.js` :
- Affiche "Holberton Dashboard" et "Dashboard data for the students"
- Ajoute un bouton "Click here to get started"
- Compte les clics sur le bouton avec protection anti-spam (debounce 500ms)
- Affiche "Copyright - Holberton School"

**Configuration Webpack :**

- Mode : production
- Entrée : `js/dashboard_main.js`
- Sortie : `public/bundle.js`

**Utilisation :**

Ouvrir `public/index.html` dans un navigateur pour tester le compteur de clics.

---

### Task 2 - Adding CSS & Images

Ajout du support CSS et images dans Webpack.

**Objectifs :**
- Installer css-loader, style-loader, file-loader et image-webpack-loader
- Configurer Webpack pour supporter les fichiers CSS et images
- Optimiser les images avec image-webpack-loader
- Créer un logo avec une image de fond

**Installation :**

```bash
cd task_2
npm install
```

**Build :**

```bash
npm run build
```

**Fonctionnalités :**

- Logo Holberton (200x200px) affiché en haut de page
- Compteur de clics positionné à droite du bouton, en gras
- Images optimisées automatiquement lors du build

**Loaders utilisés :**

| Loader | Fonction |
|--------|----------|
| css-loader | Interprète les imports CSS |
| style-loader | Injecte le CSS dans le DOM |
| file-loader | Gère les fichiers (images, fonts) |
| image-webpack-loader | Optimise les images |

**Utilisation :**

Ouvrir `public/index.html` dans un navigateur.

---

## Auteur

Holberton School
