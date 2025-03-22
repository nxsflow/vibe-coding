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
  - `storage/`: Contains file storage configuration
    - `resource.ts`: Defines the S3 bucket settings for file storage
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
- **Storage**: S3 bucket for file storage, configured in `storage/resource.ts`:
  - Named 'NoteAppStorage' for easy identification
  - Secure access permissions for authenticated users only
  - Support for reading, writing, and deleting files
  - Designed for storing note attachments like PDFs, images, and other resources

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

## Storage Architecture

The application implements a secure file storage system using AWS S3 for storing and retrieving file attachments related to notes. This component is crucial for functionality like document references, image embedding, and resource linking.

### Key Storage Components

- **S3 Bucket**: A dedicated Amazon S3 bucket named 'NoteAppStorage' serves as the central repository for all file attachments.

- **Path-based Organization**:

  - `/notes/{entity_id}/*`: Stores files directly associated with notes
  - `/resources/{entity_id}/*`: Stores general purpose resources uploaded by users
  - `/shared/{entity_id}/*`: Stores resources that users choose to share with others

- **Owner-based Access Controls**:
  - Each user can only access files within their own {entity_id} path
  - The {entity_id} token is automatically substituted with the user's unique identifier
  - Fine-grained permissions:
    - Owners have full read/write/delete access to their own files
    - For shared resources, other authenticated users have read-only access
    - No access is granted to resources owned by other users

### Storage Implementation Details

- **Storage Resource Configuration**: Defined in `amplify/storage/resource.ts` using Amplify's TypeScript-first approach with entity-based permissions.

- **Resource Management**:

  - Files are referenced by S3 keys stored in the GraphQL database
  - Keys follow the pattern `<purpose>/{entity_id}/<filename>` for ownership enforcement
  - The Resource model links file references to specific note blocks

- **Integration with Note Editor**: The editor will interact with the storage system to enable:

  - File uploads directly from the editor interface with proper path prefixing
  - Image previews within notes
  - Document attachments with file type detection
  - Auto-generated summaries for attached documents (using LLM processing)

- **Security Considerations**:
  - Strict owner-based access patterns ensure data isolation between users
  - Path-based security prevents unauthorized access to other users' files
  - Selective sharing capabilities for collaboration while maintaining security
  - Content type validation to prevent security issues

This owner-based storage architecture provides a robust foundation for the file attachment features while maintaining strong security through data isolation and selective sharing.

## Authentication Architecture

The application implements a secure, user-friendly authentication system based on AWS Cognito. Instead of using the default Amplify UI components, custom authentication components have been developed to provide greater control over styling, user experience, and behavior.

### Authentication Components

The authentication system consists of the following core components:

1. **SignIn Component (`components/auth/SignIn.tsx`)**:

   - Handles user login with email and password
   - Manages error states for invalid credentials
   - Supports navigation to password recovery and sign-up flows
   - Handles redirection based on authentication challenges (MFA, new password required)

2. **SignUp Component (`components/auth/SignUp.tsx`)**:

   - Provides new user registration with email and password
   - Implements client-side validation for password matching
   - Handles the transition to email verification flow
   - Includes automatic sign-in option after successful registration

3. **ConfirmSignUp Component (`components/auth/ConfirmSignUp.tsx`)**:

   - Verifies user email addresses after registration
   - Supports resending verification codes if needed
   - Provides clear success and error feedback
   - Redirects to sign-in upon successful verification

4. **ForgotPassword and ResetPassword Components**:

   - `ForgotPassword.tsx`: Initiates the password reset process by requesting a verification code
   - `ResetPassword.tsx`: Completes the password reset with the verification code and new password
   - Both components include comprehensive error handling for various failure cases

5. **MFA Component (`components/auth/MFA.tsx`)**:

   - Handles multi-factor authentication challenges
   - Supports TOTP (Time-based One-Time Password) verification
   - Provides specialized input for authentication codes
   - Manages the continuation of the authentication flow after verification

6. **SignOut Component (`components/auth/SignOut.tsx`)**:
   - Implements secure user logout functionality
   - Offers multiple visual variants (button or link)
   - Supports custom styling through className prop
   - Handles redirect to sign-in page after successful logout

### Authentication Routes

The authentication system is organized with a dynamic, internationalized routing structure:

- **Dynamic Routing Pattern**: `/[lang]/auth/[step]`
  - `[lang]`: Provides internationalization support (e.g., 'en', 'fr', 'es')
  - `[step]`: Dynamically determines which authentication component to render

This single route pattern handles all authentication scenarios:

- Sign-in
- Sign-up
- Email verification
- Password reset (request and confirmation)
- Multi-factor authentication

The dynamic routing approach provides several key advantages:

- Simplified maintenance with a single route handler
- Built-in internationalization for all authentication pages
- Easy addition of new authentication steps without creating new routes
- Consistent URL structure and user experience

### Authentication Flows

The authentication architecture supports several key authentication flows:

1. **Sign-Up Flow**:

   - User creates account with email and password
   - Verification code is sent to the user's email
   - User confirms email by entering the verification code
   - Upon confirmation, the user is redirected to sign-in or automatically signed in

2. **Sign-In Flow**:

   - User enters email and password credentials
   - If MFA is enabled, the user is prompted for verification code
   - If a temporary password is being used, the user is prompted to set a new password
   - Upon successful authentication, the user is redirected to the application home page

3. **Password Recovery Flow**:

   - User requests password reset by providing their email
   - Reset code is sent to the user's email
   - User sets a new password using the reset code
   - Upon successful password reset, the user is redirected to sign-in

4. **Sign-Out Flow**:
   - User initiates sign-out from any authenticated page
   - Session is terminated and tokens are cleared
   - User is redirected to the sign-in page

### Authentication Guard

The application implements authentication protection through:

1. **Auth Layout (`app/[lang]/auth/layout.tsx`)**:

   - Redirects authenticated users away from auth pages
   - Provides consistent styling for all authentication pages
   - Shows application branding and description
   - Handles language-specific content based on the `[lang]` parameter

2. **Protected Route Middleware**:
   - Verifies authentication tokens for protected routes
   - Redirects unauthenticated users to the sign-in page
   - Uses AWS Amplify's `fetchAuthSession` to validate the user's session
   - Preserves the user's language preference during redirects

This authentication architecture provides a robust, secure foundation for the application while maintaining a clean, consistent user experience through custom-designed interface components and internationalized routes.

## Component Architecture

The application is organized into several key component categories:

### Editor Components

The note editor is a central feature of the application, providing a rich text editing experience with markdown support. The editor is implemented using the Tiptap framework, which is built on top of ProseMirror.

### Core Editor Components

- **Editor Component** (`src/components/editor/Editor.tsx`):
  - Main editor implementation using Tiptap with the following key features:
    - Markdown shortcut support for headings, lists, formatting, and more
    - Internationalized placeholder text
    - Client-side rendering with proper hydration handling
    - Clean separation of content and presentation
    - Type-safe props interface with language support
  - The component is built as a pure React functional component with hooks
  - Uses conditional CSS imports for better testing compatibility
- **Editor Styles** (`src/styles/editor.css` and `src/styles/partials/`):
  - Tailwind-based styling with custom CSS for editor-specific elements
  - Modular organization with partials for typography, lists, etc.
  - Responsive design for various screen sizes
  - Print-friendly styling for document output

### Markdown Support

The editor implements markdown shortcuts through Tiptap's StarterKit extension, enabling users to format content using familiar markdown syntax:

- **Heading Syntax**: `# Heading 1`, `## Heading 2`, etc.
- **Text Formatting**: `**bold**`, `*italic*`, `~~strikethrough~~`, `` `code` ``
- **Lists**: `- Bullet item`, `1. Numbered item`
- **Blockquotes**: `> Quote`
- **Dividers**: `---` for horizontal rules
- **Code Blocks**: Triple backticks for code blocks

When a user types markdown syntax, it is automatically converted to the corresponding formatted content in real-time, providing an intuitive editing experience while maintaining a clean visual interface.

### Internationalization

The editor implements a language-aware design:

- Placeholder text is available in multiple languages (English, German)
- Type-safe language handling with TypeScript union types
- Default text selection based on the current language context
- Extensible dictionary approach for adding more languages

This architecture allows the editor to seamlessly integrate with the application's overall internationalization system while maintaining type safety.

### Planned Extensions

The editor architecture is designed to be extended in future implementation phases:

1. **Slash Commands**: A menu of formatting options and actions when typing "/"
2. **Media Embedding**: Support for images, PDFs, and other file types
3. **Mentions**: User mentions with "@" syntax and suggestion dropdown
4. **Collaborative Editing**: Real-time collaboration using Yjs
5. **Block-Level Tagging**: Ability to tag specific blocks with metadata

These extensions will build upon the existing editor foundation while maintaining its clean, intuitive interface.

### Page Components

- **Notes Page** (`src/app/[lang]/notes/page.tsx`):
  - Demonstrates the editor component in a practical context
  - Provides a title input field for the note
  - Implements a save button for future backend integration
  - Uses React state to track note content changes

### Layout Components

- **Navigation** (`src/components/layout/Navigation.tsx`):

  - Implements site-wide navigation with dynamic language path support
  - Highlights the current active route
  - Provides links to key application pages

- **Root Layout** (`src/app/[lang]/layout.tsx`):
  - Wraps all pages with common layout elements
  - Includes the navigation component
  - Handles font loading and application-wide styling
  - Sets up Amplify configuration for authentication

## Editor Component Architecture

The note editor is built using Tiptap, a headless, extendable rich-text editor based on ProseMirror. The editor architecture follows a modular approach, separating core functionality from extensions to enable flexible customization.

### Editor Components

- **Core Editor Component** (`src/components/editor/Editor.tsx`):

  - Main wrapper component that sets up the Tiptap editor
  - Manages content state and event handlers
  - Configures and initializes extensions
  - Provides the editing interface

- **Extensions Kit** (`src/components/editor/extensions-kit.ts`):
  - Centralizes and organizes all editor extensions
  - Provides a simple API for configuring and enabling extensions
  - Ensures extensions are properly initialized with required options
  - Facilitates internationalization by passing language settings to extensions

### Extension Architecture

Extensions are organized into separate modules to maintain a clean separation of concerns:

- **Document Extension** (`src/components/editor/extensions/document.ts`):

  - Defines the root document structure for the editor
  - Sets up the basic document node schema

- **Heading Extension** (`src/components/editor/extensions/heading.ts`):

  - Configures heading nodes with multiple levels (h1, h2, h3)
  - Enables proper semantic structure for content

- **StarterKit Extension** (`src/components/editor/extensions/starter-kit.ts`):

  - Bundles common editor functionality:
    - Basic formatting (bold, italic, underline)
    - Lists (bullet and ordered)
    - Code blocks
    - Blockquotes
    - Horizontal rules
  - Excludes functionality managed by custom extensions (document and heading)

- **Placeholder Extension** (`src/components/editor/extensions/placeholder.ts`):

  - Provides placeholder text when the editor is empty
  - Adapts placeholder text based on the node type (heading vs paragraph)
  - Supports internationalization with localized placeholder messages

- **Slash Command Extension** (`src/components/editor/extensions/slash-command.ts`):
  - Implements a slash command menu triggered by typing "/"
  - Uses ProseMirror plugins to detect the trigger character
  - Employs storage-based state management to track menu state and text positions
  - Provides comprehensive keyboard interaction support:
    - Arrow keys for navigating menu options
    - Enter/Tab keys for selecting commands
    - Escape key for dismissing the menu with text cleanup
  - Intelligently handles text manipulation by:
    - Tracking the exact position of the slash character
    - Cleanly deleting command text when a command is selected or the menu is dismissed
  - Includes robust error handling and resource management
  - Manages the menu's complete lifecycle (creation, positioning, and destruction)
  - Leverages tippy.js for floating menu positioning with fallback positioning
  - Communicates bidirectionally with the SlashCommandMenu React component

### Menu Components

- **Slash Command Menu** (`src/components/editor/menu/SlashCommandMenu.tsx`):
  - React component that displays formatting options when triggered
  - Supports keyboard navigation (arrow keys, enter, escape)
  - Implements a rich set of commands for text formatting
  - Provides visual feedback for selected commands
  - Supports internationalization through a localization dictionary
  - Uses React's forwardRef and useImperativeHandle for exposing methods to parent components

### Styling Architecture

- **Editor Styles** (`src/styles/editor.css`):
  - Provides base styling for the editor
  - Imports external dependencies like tippy.js styles
  - Sets up theming and dark mode support
  - Organizes styles into logical partials for better maintainability

This modular architecture provides several benefits:

- Clear separation of concerns
- Easy addition of new extensions
- Maintainable code through focused components
- Flexible internationalization
- Consistent styling
- Extensible command system

Future editor enhancements can follow this pattern, adding new extensions and menu options while maintaining the established architecture.
