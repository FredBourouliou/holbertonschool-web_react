# React Redux - Part 2

## Description

This project focuses on optimizing React application performance by addressing unnecessary re-renders caused by mixing UI visibility state with API data in Redux. The main goal is to decouple visual toggle logic from the global store by using local DOM manipulation with `useRef` and Aphrodite CSS classes.

## Technologies

- React 19
- Redux Toolkit
- React-Redux
- Aphrodite
- Jest / React Testing Library
- Vite
- ESLint

## Requirements

- Ubuntu 20.04 LTS
- Node 20.x.x
- npm 10.x.x
- Jest 29.7.0 (global)

## Setup

```bash
cd task_0/dashboard
npm install
```

## Usage

```bash
# Run development server
npm run dev

# Run tests
npm test

# Run linter
npm run lint
```

## Tasks

### 0. Now You See ME (The easy way)

Fix a performance issue where toggling the notification drawer triggers unnecessary re-renders of the `Notifications` component.

**Changes:**

- **notificationsSlice**: Removed `displayDrawer` from initial state, removed `showDrawer` and `hideDrawer` reducers
- **Notifications component**: Replaced Redux-based visibility with `useRef` + `classList.toggle()` using Aphrodite's `visible` style object
- **Styles**: Drawer starts hidden (`opacity: 0`, `visibility: hidden`), toggled via a `visible` Aphrodite class (`opacity: 1`, `visibility: visible`)
- **Tests**: Updated to verify Aphrodite class toggling instead of prop-based `displayDrawer`

**Key files:**
- `task_0/dashboard/src/features/notifications/notificationsSlice.js`
- `task_0/dashboard/src/components/Notifications/Notifications.jsx`
- `task_0/dashboard/src/components/Notifications/Notifications.spec.js`

## Author

Frederic Bourouliou - Holberton School
