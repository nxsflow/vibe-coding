---
status: "accepted"
date: 2025-03-18
decision-makers: Carsten Koch
consulted: Grok 3
informed: -
---

# ADR 010: Choose API Architecture for Note-Taking App

## Status

Accepted

## Context

The note-taking application requires an API architecture that ensures efficient communication between the frontend (built with Next.js) and the backend (leveraging AWS Amplify). The chosen architecture must address the following needs:

- **Data Handling**: Efficiently fetch, update, and manipulate notes, tags, and other app data.
- **Real-Time Features**: Support seamless integration with the real-time collaboration solution (e.g., Yjs with a WebSocket server) for live updates.
- **Scalability**: Handle growing user demand and increasing data complexity.
- **Developer Experience**: Provide ease of use and maintainability for the development team.
- **Integration**: Work seamlessly with AWS Amplify and other AWS services used in the app.

Two API architectures are under consideration: **GraphQL** and **REST**. Each offers distinct advantages and challenges, particularly in the context of AWS Amplify integration and real-time functionality.

## Decision

We will adopt **GraphQL** as the API architecture for the note-taking app.

## Consequences

### Positive

- **Efficient Data Fetching**: GraphQL enables the frontend to request only the data it needs, minimizing over-fetching and under-fetching compared to REST.
- **Real-Time Support**: AWS AppSync, a managed GraphQL service within AWS Amplify, provides built-in real-time capabilities through GraphQL subscriptions, enhancing the Yjs WebSocket solution for collaboration.
- **Strong Typing**: GraphQL’s schema and type system offer clear contracts between frontend and backend, improving development reliability.
- **Developer Experience**: GraphQL’s query language and introspection capabilities simplify API exploration and debugging.
- **AWS Amplify Integration**: AWS Amplify’s robust support for GraphQL via AWS AppSync streamlines setup, authentication, and management.

### Negative

- **Learning Curve**: Team members unfamiliar with GraphQL may face a steeper learning curve compared to the widely understood REST.
- **Complexity for Simple Use Cases**: GraphQL may introduce unnecessary complexity for basic CRUD operations.
- **Performance Considerations**: Poorly designed queries or resolvers could impact performance, though this can be addressed with optimization best practices.

## Options Considered

### 1. GraphQL

- **Description**: A query language for APIs that allows clients to specify exact data requirements and supports real-time updates via subscriptions.
- **Pros**:
  - Efficient data fetching with precise queries.
  - Real-time support through GraphQL subscriptions.
  - Strong typing and schema definition.
  - Seamless integration with AWS Amplify via AWS AppSync.
- **Cons**:
  - Requires additional learning for some developers.
  - Potential complexity for simple operations.

### 2. REST

- **Description**: A traditional API architecture using HTTP methods (GET, POST, PUT, DELETE) for CRUD operations.
- **Pros**:
  - Simple and widely adopted.
  - Familiar to most developers.
- **Cons**:
  - Prone to over-fetching or under-fetching data.
  - Lacks native real-time capabilities.
  - Requires multiple endpoints for complex data needs.

## Rationale

**GraphQL** was chosen as the API architecture because it best meets the note-taking app’s requirements for efficient data handling and real-time features:

- **Efficient Data Fetching**: GraphQL’s ability to retrieve only the necessary data in a single request reduces network overhead, which is critical for a data-intensive application like note-taking.
- **Real-Time Capabilities**: AWS AppSync’s GraphQL subscriptions offer a managed solution for real-time updates (e.g., notifying users of changes to shared notes), complementing the Yjs WebSocket solution for in-note collaboration.
- **Integration with AWS Amplify**: AWS Amplify’s first-class support for GraphQL through AWS AppSync simplifies infrastructure setup, authentication, and authorization, aligning with the app’s AWS-based backend.
- **Developer Productivity**: GraphQL’s self-documenting schema and tools like GraphiQL enhance the development experience, making it easier to build and maintain the API.

While **REST** is simpler and more familiar, it falls short in flexibility and efficiency for complex queries and real-time updates. The benefits of GraphQL outweigh its learning curve, given the app’s need for optimized data fetching and real-time collaboration.

### Implementation Details

- **GraphQL API**: Deploy the GraphQL API using AWS AppSync, with DynamoDB as the data storage solution.
- **Real-Time Updates**: Utilize GraphQL subscriptions for non-collaborative real-time features (e.g., notifications, metadata updates).
- **Collaboration Integration**: Rely on the Yjs WebSocket solution for live, in-note collaboration, while GraphQL handles broader app data and real-time notifications.
- **Authentication**: Integrate with AWS Cognito for secure access to the GraphQL API.
