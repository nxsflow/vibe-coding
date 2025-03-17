# ADR 003: Choose Synchronization Engine for Note-Taking App Supporting Offline Usage

## Status

Accepted

## Context

The note-taking app, built with Tiptap (a wrapper around ProseMirror), requires a synchronization engine to enable the following features:

- **Real-time collaboration**: Multiple users must edit notes simultaneously, with updates reflected instantly for all participants.
- **Offline support**: Users should be able to create and edit notes offline, with changes syncing seamlessly when they reconnect.
- **Conflict resolution**: The system must handle concurrent updates from multiple users and resolve conflicts automatically.
- **Integration with Tiptap**: The solution must integrate smoothly with Tiptap and the app’s architecture, including a Next.js frontend and an AWS backend.

A key requirement is that the synchronization engine must operate within our AWS environment. This ensures full control over user data, avoiding reliance on third-party services like Liveblocks, which would involve entrusting sensitive data to an external provider. The engine must manage document state, process updates, and maintain data consistency across devices, all while leveraging Tiptap’s ProseMirror foundation.

## Decision

We will implement **Yjs** with a custom WebSocket server hosted on AWS as the synchronization engine for the note-taking app.

## Consequences

### Positive
- **Full Data Control**: Hosting the synchronization server on AWS keeps all user data within our infrastructure, ensuring compliance with privacy standards.
- **Real-Time Collaboration**: Yjs supports live editing with features like shared cursors and user presence, meeting collaboration needs.
- **Offline Support**: Yjs enables offline editing and automatically syncs changes upon reconnection.
- **Conflict Resolution**: Using Conflict-Free Replicated Data Types (CRDTs), Yjs resolves conflicts without requiring additional logic.
- **Tiptap Compatibility**: The `y-prosemirror` binding ensures seamless integration with Tiptap.

### Negative
- **Development Overhead**: Building and maintaining a custom WebSocket server increases complexity compared to managed solutions.
- **Scalability Responsibility**: We must manage scaling the WebSocket server as the user base grows, requiring additional infrastructure effort.
- **Feature Gaps**: Unlike some third-party services, Yjs does not include built-in features like comments, which may need custom implementation.

## Options Considered

We evaluated several synchronization engines based on the app’s needs and the requirement to stay within AWS:

1. **Yjs with AWS WebSocket Server**
   - *Description*: An open-source CRDT library with a ProseMirror binding (`y-prosemirror`), paired with a custom WebSocket server on AWS (e.g., using EC2 or ECS).
   - *Pros*:
     - Keeps all data within AWS, ensuring privacy and control.
     - Supports real-time collaboration, offline editing, and automatic conflict resolution.
     - No dependency on external services.
   - *Cons*:
     - Requires setup and maintenance of a WebSocket server.
     - Adds initial development complexity.

2. **ProseMirror’s `collab` Module with AWS**
   - *Description*: ProseMirror’s built-in collaboration module, extended with AWS services like DynamoDB for state management.
   - *Pros*:
     - Native to ProseMirror, simplifying basic collaboration integration.
     - Fully controllable within AWS.
   - *Cons*:
     - Lacks built-in offline support and requires custom conflict resolution logic.
     - Less robust for complex offline use cases.

3. **AWS AppSync with GraphQL Subscriptions**
   - *Description*: A managed GraphQL service with real-time updates via subscriptions, hosted on AWS.
   - *Pros*:
     - Fully within AWS, ensuring data control.
     - Supports real-time updates natively.
   - *Cons*:
     - Not optimized for frequent, granular text edits typical in collaborative apps.
     - Requires significant custom logic for offline support and conflict resolution.

4. **Replicache with AWS**
   - *Description*: An offline-first synchronization engine, paired with an AWS backend (e.g., Lambda functions).
   - *Pros*:
     - Strong offline support with straightforward syncing.
     - Runs within AWS for data control.
   - *Cons*:
     - Limited native support for real-time collaboration features like live cursors.
     - Requires custom backend development.

## Rationale

We selected **Yjs with a custom WebSocket server on AWS** because it fully meets the app’s requirements—real-time collaboration, offline support, and automatic conflict resolution—while keeping all data within our AWS environment. This addresses your concern about data privacy by eliminating reliance on third-party services like Liveblocks.

Yjs’s `y-prosemirror` binding ensures compatibility with Tiptap, and its CRDT-based approach guarantees seamless conflict resolution, even in offline scenarios. While it requires us to build and manage a WebSocket server (e.g., using AWS EC2, ECS, or API Gateway with WebSocket support), this trade-off is justified by the complete control it provides over user data.

Other options fell short: **ProseMirror’s `collab` module** lacks offline support out of the box, **AWS AppSync** isn’t tailored for fine-grained text editing, and **Replicache** prioritizes offline use over real-time collaboration. Yjs strikes the best balance for our needs.

This solution requires an initial investment in development and ongoing infrastructure management, but it ensures long-term flexibility and compliance with your privacy priorities. If additional features (e.g., comments or notifications) are needed later, we can extend Yjs or integrate other AWS services.

This decision delivers a secure, feature-rich note-taking app with full data control within your AWS accounts. Let me know if you’d like to explore any adjustments!
