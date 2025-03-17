# ADR 004: Choose Real-time Collaboration Solution for Note-Taking App

## Status

Accepted

## Context

The note-taking application requires a real-time collaboration feature, enabling multiple users to edit the same note simultaneously with changes reflected instantly across all participants. This functionality is critical for supporting teamwork and ensuring a consistent view of note content in real time. The solution must meet the following requirements:

- **Live Updates**: Deliver low-latency updates to all connected users.
- **Concurrent Editing**: Handle multiple users editing the same note, resolving conflicts automatically.
- **Integration with Tiptap**: Work seamlessly with the Tiptap editor, which is built on ProseMirror.
- **AWS Environment**: Operate within the AWS ecosystem, as the backend is built on AWS Amplify (per ADR 002), to maintain data privacy and control.
- **Compatibility**: Integrate with the Next.js frontend and AWS Amplify backend.

Collaborative text editing introduces complexities such as managing concurrent edits and ensuring data consistency, often requiring specialized techniques like operational transformation (OT) or conflict-free replicated data types (CRDTs). The chosen solution must balance these technical needs with ease of integration and operational feasibility within our AWS-centric architecture.

## Decision

We will implement **Yjs with a custom WebSocket server hosted on AWS** as the real-time collaboration solution for the note-taking app.

## Consequences

### Positive
- **Robust Collaboration**: Yjs uses CRDTs to manage concurrent edits and resolve conflicts automatically, providing a reliable foundation for real-time collaboration.
- **Tiptap Compatibility**: The `y-prosemirror` binding ensures seamless integration with Tiptap, simplifying development.
- **Data Privacy**: Hosting the WebSocket server on AWS keeps all data within our infrastructure, aligning with privacy requirements.
- **Offline Support**: Yjs enables offline editing with automatic synchronization upon reconnection, enhancing user experience.
- **Scalability**: AWS services like Elastic Load Balancing and Auto Scaling can ensure the WebSocket server scales with demand.
- **Efficient Database Usage**: By managing real-time updates separately from database writes, this approach reduces the frequency of database operations, potentially lowering costs and improving performance.

### Negative
- **Setup Complexity**: Building and deploying a custom WebSocket server requires additional development effort compared to fully managed solutions.
- **Operational Overhead**: We must monitor and maintain the WebSocket server, including scaling and fault tolerance.
- **Integration Work**: While Yjs fits well with Tiptap, connecting it to the broader AWS Amplify backend requires extra effort.

## Options Considered

Several solutions were evaluated based on the app’s requirements:

1. **Yjs with AWS WebSocket Server**  
   - *Description*: An open-source CRDT library paired with a custom WebSocket server hosted on AWS (e.g., via Elastic Beanstalk, ECS, or API Gateway WebSockets).  
   - *Pros*: Designed for collaborative editing; integrates with Tiptap; keeps data in AWS; supports offline editing; efficient database usage.  
   - *Cons*: Requires custom server setup and maintenance.

2. **AWS AppSync with GraphQL Subscriptions**  
   - *Description*: A managed GraphQL service providing real-time updates through subscriptions, integrated with AWS Amplify.  
   - *Pros*: Seamless AWS Amplify integration; managed service reduces infrastructure burden.  
   - *Cons*: Lacks native support for fine-grained text collaboration; requires custom conflict resolution logic; frequent database writes can increase costs.

3. **Liveblocks**  
   - *Description*: A third-party managed service offering real-time collaboration features with Tiptap support.  
   - *Pros*: Easy to implement; handles synchronization and conflicts out of the box.  
   - *Cons*: Operates outside AWS, conflicting with data privacy goals.

4. **Custom Solution with AWS API Gateway WebSockets**  
   - *Description*: A bespoke synchronization protocol using AWS API Gateway’s WebSocket capabilities.  
   - *Pros*: Full control over implementation; stays within AWS.  
   - *Cons*: High development effort; redundant given existing solutions like Yjs.

## Rationale

The decision to use **Yjs with a custom WebSocket server on AWS** is driven by its ability to meet the app’s core requirements effectively. Yjs is purpose-built for real-time collaboration, leveraging CRDTs to handle concurrent edits and ensure data consistency without manual conflict resolution. Its `y-prosemirror` binding provides direct compatibility with Tiptap, reducing integration complexity for the note-taking editor.

Hosting the WebSocket server on AWS ensures all data remains within our infrastructure, satisfying privacy requirements while leveraging AWS scalability tools. Although this approach involves setting up and managing a custom server (e.g., using Elastic Beanstalk or ECS), the trade-off is justified by Yjs’s robust feature set, including offline support and automatic synchronization—key enhancements for user experience.

In contrast, **AWS AppSync with GraphQL Subscriptions** excels at general real-time updates but lacks built-in mechanisms for collaborative text editing, necessitating complex custom logic that could introduce errors and delays. Additionally, AppSync’s reliance on database mutations for updates increases write frequency, potentially raising costs and impacting performance. **Liveblocks** offers a convenient managed solution but was ruled out due to its external hosting, which conflicts with our AWS-centric architecture. A **custom solution with AWS API Gateway WebSockets** was dismissed as overly resource-intensive, duplicating functionality that Yjs already provides.

Yjs will handle real-time synchronization of note content, while AWS Amplify and AppSync can manage other backend needs (e.g., authentication, metadata storage). This separation leverages the strengths of both systems, ensuring a cohesive architecture. The initial setup cost of the WebSocket server is outweighed by the long-term benefits of a proven, scalable collaboration solution tailored to the app’s needs.

**Note on Data Storage**: The decision regarding how to store note data (e.g., periodic saves of the Y.Doc state or storing individual updates) is out of scope for this ADR. This will be addressed in a separate ADR focused on data persistence and integration with the WebSocket server.
