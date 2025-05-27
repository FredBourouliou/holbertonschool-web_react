# TypeScript Learning Project

This project contains TypeScript exercises covering fundamental concepts including interfaces, classes, functions, DOM manipulation, generic types, namespaces, declaration merging, ambient namespaces, and nominal typing.

## Learning Objectives

By the end of this project, you should be able to explain:

- Basic types in TypeScript
- Interfaces, Classes, and functions
- How to work with the DOM and TypeScript
- Generic types
- How to use namespaces
- How to merge declarations
- How to use an ambient Namespace to import an external library
- Basic nominal typing with TypeScript

## Project Structure

```
TypeScript/
├── task_0/          # Student interface and DOM manipulation
├── task_1/          # Teacher interface, Directors, and StudentClass
├── task_2/          # Advanced types, classes, and string literal types
├── task_3/          # Ambient namespaces and external library types
├── task_4/          # Namespaces and declaration merging
├── task_5/          # Brand convention and nominal typing
└── README.md
```

## Tasks Overview

### Task 0: Creating an interface for a student
- Define a `Student` interface with firstName, lastName, age, and location
- Create student objects and render them in an HTML table
- Use TypeScript with DOM manipulation

### Task 1: Let's build a Teacher interface
- Create a `Teacher` interface with readonly properties
- Implement interface extension with `Directors`
- Create a `printTeacher` function with interface
- Build a `StudentClass` with constructor and method interfaces

### Task 2: Advanced types Part 1
- Implement `DirectorInterface` and `TeacherInterface`
- Create Director and Teacher classes
- Use union types and type guards
- Implement string literal types

### Task 3: Ambient Namespaces
- Work with external JavaScript libraries
- Create type definitions with ambient declarations
- Use triple slash directives
- Import and use external CRUD functions with proper typing

### Task 4: Namespace & Declaration merging
- Use TypeScript namespaces
- Implement declaration merging to extend interfaces
- Create subject classes (Cpp, React, Java) with specific teacher requirements
- Demonstrate namespace organization

### Task 5: Brand convention & Nominal typing
- Implement brand properties for type safety
- Create distinct types that are structurally similar
- Use nominal typing to prevent mixing of similar types

## Configuration Files

Each task directory contains these configuration files:

- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript compiler configuration
- `webpack.config.js` - Webpack build configuration (where applicable)
- `.eslintrc.js` - ESLint configuration (task_0 only)

## Building and Running

To build any task:

```bash
cd TypeScript/task_X
npm install
npm run build
```

To start the development server:

```bash
npm run start-dev
```

To run tests:

```bash
npm test
```

## Requirements

- All files should end with a new line
- Files are transpiled on Ubuntu 18.04
- TypeScript scripts are checked with jest (version 24.9.*)
- Code should use the `.ts` extension when possible
- TypeScript compiler should show no warnings or errors
- Every variable should use TypeScript when possible

## Key Concepts Demonstrated

1. **Interfaces**: Type contracts for objects and functions
2. **Classes**: Object-oriented programming with TypeScript
3. **Type Guards**: Runtime type checking with `instanceof` and custom type predicates
4. **Union Types**: Variables that can hold multiple types
5. **Optional Properties**: Flexible interface definitions
6. **Readonly Properties**: Immutable object properties
7. **Index Signatures**: Dynamic property definitions
8. **Namespaces**: Code organization and encapsulation
9. **Declaration Merging**: Extending interfaces across files
10. **Ambient Declarations**: Type definitions for external libraries
11. **String Literal Types**: Specific string value constraints
12. **Brand Types**: Nominal typing for enhanced type safety 