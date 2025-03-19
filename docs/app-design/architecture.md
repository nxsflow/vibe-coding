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

- **Authentication**: Implemented with AWS Cognito, configured for email-based login with optional multi-factor authentication:
  - `amplify/auth/resource.ts`: Defines authentication configuration with:
    - Email-based login as the primary authentication method
    - Optional TOTP (Time-based One-Time Password) multi-factor authentication
    - Automatic email verification for user accounts
    - Foundation for secure user authentication workflows
- **Data API**: GraphQL API implemented with AWS AppSync, using the schema defined in `data/resource.ts`
- **Database**: DynamoDB tables created based on the data models defined in the GraphQL schema

The Amplify backend uses Infrastructure as Code principles, allowing for version control, reproducibility, and easier collaboration on backend changes.

## Data Model Architecture

The application's data model is built around a domain-driven design with specialized entities representing real-world concepts:

### Core Entities

- **Note**: The primary content entity that stores:
  - Metadata (title, type, creation/update timestamps)
  - Content as a structured JSON object representing blocks
  - Relationships to various domain-specific entities and file resources

### Domain-Specific Entities

- **Person**: Represents people referenced in notes.
- **Project**: Represents projects discussed in notes.
- **Company**: Represents organizations mentioned in notes.
- **Book**: Represents book references with title, authors, and publication year.
- **Article**: Represents article references with title, authors, publication date, and URL.

### Junction Entities

The model uses junction tables to create block-level associations between notes and domain entities:

- **PersonNote**: Links a specific block in a note to a person.
- **ProjectNote**: Links a specific block in a note to a project.
- **CompanyNote**: Links a specific block in a note to a company.

These junction tables include a blockId field to identify exactly which block within a note's content refers to the entity.

### File Entities

- **Resource**: Represents file attachments (PDFs, images) referenced in notes, including:
  - File type classification
  - S3 storage key
  - Optional LLM-generated summary
  - Block-level reference within the note

### Version Management

- **NoteVersion**: Stores historical versions of notes for version history and recovery, including:
  - Complete content snapshot
  - Sequential version numbering
  - Relationship to the parent note

### Design Considerations

- **JSON Content Structure**: Note content is stored as JSON rather than plain text, allowing for structured representation of blocks and their properties.

- **Domain-Specific Models**: Rather than a generic "Resource" approach, the schema uses specialized models for different entity types (Person, Project, etc.) to enable type-specific properties and relationships.

- **Block-Level References**: All references to entities and resources are made at the block level, enabling precise annotation and retrieval.

- **Secondary Indexes**: The data model includes secondary indexes with sort keys to optimize common query patterns:

  - Finding notes by type and creation date
  - Finding notes by type and last update date
  - Retrieving entities associated with specific notes or blocks

- **Authorization**: All entities use owner-based authorization to ensure data security, with collaboration features planned for future implementation.

- **Automatic Fields**: AWS Amplify automatically handles id, createdAt, and updatedAt fields, simplifying schema definition and ensuring consistent timestamps.

This domain-driven architecture enables semantic organization of notes and their relationships to real-world entities, while the block-level reference system allows for fine-grained annotation and intelligent retrieval of content.
