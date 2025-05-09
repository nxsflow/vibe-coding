# Note-Taking Application Tech Stack

This document summarizes the key architectural decisions for our note-taking application as detailed in the Architecture Decision Records (ADRs).

## Frontend

| Component            | Technology                    | ADR Reference |
| -------------------- | ----------------------------- | ------------- |
| **Framework**        | Next.js (v15)                 | ADR-008       |
| **Editor**           | Tiptap (built on ProseMirror) | ADR-001       |
| **State Management** | React Context with Hooks      | ADR-011       |

## Backend

| Component             | Technology            | ADR Reference |
| --------------------- | --------------------- | ------------- |
| **Cloud Provider**    | AWS                   | ADR-002       |
| **Backend Framework** | AWS Amplify           | ADR-002       |
| **Authentication**    | AWS Cognito           | ADR-009       |
| **API Architecture**  | GraphQL (AWS AppSync) | ADR-010       |

## Data Management

| Component                   | Technology                                          | ADR Reference    |
| --------------------------- | --------------------------------------------------- | ---------------- |
| **Database**                | AWS DynamoDB (via Amplify)                          | ADR-002          |
| **File Storage**            | AWS S3                                              | ADR-007          |
| **Real-time Collaboration** | Yjs with custom AWS WebSocket server                | ADR-004          |
| **Document Persistence**    | Debounced writing strategy (5s inactivity, 30s max) | ADR-005          |
| **Offline Support**         | IndexedDB with synchronization mechanisms           | ADR-003, ADR-006 |

## Key Architectural Patterns

### Real-time Collaboration

The application implements collaborative editing using Yjs, a CRDT-based library that integrates with the Tiptap editor through the `y-prosemirror` binding. A custom WebSocket server hosted on AWS handles the synchronization of changes between users in real-time.

### Document State Persistence

A debounced writing strategy persists document state to the database after 5 seconds of inactivity, with a maximum wait time of 30 seconds during continuous editing. Both the full Y.Doc state and incremental updates are stored to ensure data integrity and support features like version history.

### API Architecture

GraphQL (via AWS AppSync) serves as the primary API architecture, enabling efficient data fetching with precise queries and providing real-time capabilities through GraphQL subscriptions. This complements the Yjs WebSocket solution for in-document collaboration while handling broader app data and notifications.

### Authentication & Authorization

AWS Cognito provides user authentication with support for email/password and social logins. Authorization is managed through a combination of Cognito's identity pools for IAM-based roles and application-specific permission logic stored in DynamoDB.

### Offline-First Approach

The application is designed with an offline-first mindset, storing data locally in IndexedDB and implementing synchronization mechanisms to reconcile changes when connectivity is restored. This approach ensures users can continue working regardless of their connection status.

### State Management

React Context with Hooks manages the application's state, providing a simple yet effective solution for real-time updates, UI state, and temporary data storage. This approach integrates well with React's ecosystem and supports the application's offline and real-time capabilities.

## Development & Operations

| Component              | Technology                           | ADR Reference |
| ---------------------- | ------------------------------------ | ------------- |
| **Testing**            | Jest, React Testing Library, Cypress | ADR-012       |
| **CI/CD**              | AWS Amplify                          | ADR-016       |
| **Observability**      | AWS CloudWatch, AWS X-Ray            | ADR-014       |
| **Analytics**          | AWS Pinpoint                         | ADR-013       |
| **Release Management** | Semantic Versioning, GitHub Releases | ADR-015       |

## Technology Selection Principles

Throughout the architectural decisions, several key principles guided technology selection:

1. **AWS Ecosystem Integration**: Preference for AWS services to maintain consistent infrastructure and data privacy
2. **Developer Experience**: Technologies that leverage the team's existing expertise (React/Next.js) and provide clear development patterns
3. **Offline Capability**: Solutions that support offline-first functionality for enhanced user experience
4. **Performance**: Focus on technologies that deliver fast load times and responsive interactions
5. **Scalability**: Architecture designed to handle increasing complexity and growing user base

This tech stack provides a robust foundation for building a feature-rich, collaborative note-taking application with strong offline capabilities and real-time collaboration features.
