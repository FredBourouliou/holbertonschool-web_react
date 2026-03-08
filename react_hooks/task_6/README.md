# Task 0 - Convert Header Component

Convert the `Header.jsx` class component into a functional component using `useContext`.

## Changes

- `Header.jsx`: class component replaced by a function component
  - `static contextType` + `this.context` replaced by `useContext(newContext)`
  - Same JSX structure preserved
- `Header.spec.js`: no changes needed, all 6 tests pass

## Run

```bash
cd dashboard
npm install
npx jest --testPathPattern='Header'
```
