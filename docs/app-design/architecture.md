# Application Architecture

## Project Structure Overview

The note-taking application follows a modern Next.js 15 architecture with the App Router pattern. This document outlines the purpose and organization of key files and directories.

### Root Directory

- `package.json`: Defines project dependencies, scripts, and metadata
- `tsconfig.json`: TypeScript configuration for type checking
- `next.config.js`: Next.js configuration options
- `postcss.config.js`: PostCSS configuration for Tailwind CSS
- `tailwind.config.js`: Tailwind CSS configuration and theme customization
- `.eslintrc.json`: ESLint rules for code quality
- `.gitignore`: Specifies files to be ignored by Git

### Source Directory (`src/`)

- `src/app/`: Contains the App Router pages and layouts
  - `layout.tsx`: Root layout component that wraps all pages
  - `page.tsx`: Home page component
  - `favicon.ico`: Application favicon
  - `globals.css`: Global CSS styles including Tailwind directives
- `src/components/`: Will contain reusable UI components (to be created)
- `src/features/`: Will contain feature-specific components organized by domain (to be created)
- `src/lib/`: Will contain shared utilities and business logic (to be created)

### Public Directory

- `public/`: Contains static assets accessible via the root URL
  - `next.svg` and `vercel.svg`: Default Next.js/Vercel logos

## Key Architectural Patterns

### App Router Architecture

The application uses Next.js App Router, which provides:

- File-system based routing
- Built-in support for layouts, loading states, and error boundaries
- React Server Components for improved performance
- Server-side and client-side rendering options

### Styling Approach

The application uses Tailwind CSS, a utility-first CSS framework that enables:

- Rapid UI development with predefined utility classes
- Easy customization through `tailwind.config.js`
- Efficient production builds with automatic CSS purging

### Type Safety

TypeScript provides static type checking throughout the application for:

- Improved developer experience with better autocompletion
- Early error detection
- Self-documenting code
- Safer refactoring

## Future Architecture Extensions

As development progresses, the architecture will be extended to include:

- Authentication with AWS Cognito
- GraphQL API with AWS AppSync
- Real-time collaboration using Yjs and WebSockets
- Offline capabilities with local storage and synchronization
- State management with React Context and hooks

This architecture document will be updated as new components and features are implemented.

## Key Dependencies

### Editor Framework

- `@tiptap/react`: React integration for the Tiptap editor
- `@tiptap/pm`: ProseMirror packages used by Tiptap
- `@tiptap/starter-kit`: Bundle of essential Tiptap extensions for common editing functionality

The Tiptap editor provides a rich text editing experience based on ProseMirror. It offers a modular architecture with extensions for various editing features like headings, lists, bold/italic formatting, and more.

### Real-time Collaboration

- `yjs`: Framework for building collaborative applications
- `y-prosemirror`: Yjs bindings for ProseMirror editors

Yjs uses Conflict-free Replicated Data Types (CRDTs) to enable real-time collaboration, allowing multiple users to edit documents simultaneously without conflicts.

### Backend Integration

- `aws-amplify`: Comprehensive framework for building cloud-powered applications
- `@aws-sdk/client-s3`: AWS SDK for interacting with Amazon S3 storage service
- `uuid`: Utility for generating unique identifiers

AWS Amplify provides authentication, storage, API, and other cloud services. The S3 client enables file upload/download functionality for note attachments.

## Backend Infrastructure

The application uses AWS Amplify Gen 2 for backend infrastructure, which provides a TypeScript-first approach to defining cloud resources:

### Amplify Directory Structure

- `amplify/`: Contains all backend configuration and resources
  - `backend.ts`: The main entry point that defines and exports the backend resources
  - `tsconfig.json`: TypeScript configuration specific to the Amplify backend
  - `auth/`: Contains authentication configuration
    - `resource.ts`: Defines the Cognito user pool settings for authentication
  - `data/`: Contains data model and API configuration
    - `resource.ts`: Defines the GraphQL schema and authorization rules
  - `package.json`: Dependencies specific to the Amplify backend

### Backend Resources

- **Authentication**: Implemented with AWS Cognito, configured for email-based login
- **Data API**: GraphQL API implemented with AWS AppSync, using the schema defined in `data/resource.ts`
- **Database**: DynamoDB tables created based on the data models defined in the GraphQL schema

The Amplify backend uses Infrastructure as Code principles, allowing for version control, reproducibility, and easier collaboration on backend changes.
