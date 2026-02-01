# React Props

## Description

This project focuses on learning how to use props in React to pass data between components and build a modular, reusable component architecture. Starting from a monolithic App component, the project progressively refactors the codebase into smaller, focused components that communicate through props.

## Learning Objectives

- Create basic React components using functions
- Reuse components across the application
- Pass properties (props) to components
- Use Fragments to group elements without extra DOM nodes
- Use keys to improve loop rendering performance
- Define default prop values for graceful fallback behavior
- Conditionally render components based on props

## Technologies

- React 19
- Vite 7
- Jest 29 with React Testing Library
- JavaScript (ES6+)

## Project Structure

```
react_props/
├── task_0/   - Component extraction (Header, Footer, Login)
├── task_1/   - Unit tests for each component
├── task_2/   - Separation of concerns (NotificationItem, props passing)
├── task_3/   - React DevTools (profiler, property modification)
├── task_4/   - CourseList & CourseListRow components, conditional rendering
└── task_5/   - Enhanced Notifications with displayDrawer prop
```

## Tasks

### 0. Basic components
Split the monolithic `App.jsx` into reusable components: `Header`, `Footer`, and `Login`. Each component has its own folder with JSX, CSS, and test files.

### 1. Write the tests for each component
Add unit tests verifying that Header contains the logo and heading, Login has the correct form elements with label-input focus behavior, and Footer renders the copyright text.

### 2. Separation of Concerns
Create a `NotificationItem` component to handle individual notification rendering. Move notification data into `App` and pass it as a prop to `Notifications`. Apply inline styling for notification colors based on type.

### 3. Devtool React extension
Use the React DevTools Chrome extension to modify component props at runtime and profile the application load performance.

### 4. CourseList & CourseListRow
Build a `CourseList` table component with `CourseListRow` for rendering rows. Add conditional rendering in `App` based on `isLoggedIn` prop to toggle between `Login` and `CourseList`.

### 5. Enhance Notifications component
Add a `displayDrawer` prop to control notification panel visibility. Display "Your notifications" title at all times. Show "No new notification for now" when the notifications array is empty.

## Setup & Run

```bash
cd react_props/task_5/dashboard
npm install
npm run dev       # Start development server
npm test          # Run all unit tests
npm run lint      # Run ESLint
```

## Author

Frederic Bourouliou - Holberton School
