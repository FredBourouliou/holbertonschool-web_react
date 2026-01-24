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
└── task_0/
    ├── package.json
    ├── src/
    │   └── index.js
    └── dist/
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

## Auteur

Holberton School
