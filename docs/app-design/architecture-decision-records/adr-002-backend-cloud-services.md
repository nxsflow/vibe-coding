---
status: "accepted"
date: 2025-03-18
decision-makers: Carsten Koch
consulted: Grok 3
informed: -
---

# ADR 002: Choose Backend Environment for Note-Taking App

## Status

Accepted

## Context

The note-taking app requires a backend environment capable of supporting its core functionalities, including:

- **User authentication and authorization**: Securely manage user identities and access rights.
- **Data storage and synchronization**: Persist and sync notes, tags, and related data, with potential for offline access.
- **Real-time collaboration**: Allow multiple users to edit notes simultaneously with live updates.
- **File storage**: Support uploads and management of media files like images and PDFs.
- **API integration**: Enable communication with external services, such as AI-driven features.
- **Scalability and reliability**: Handle increasing user demand without performance degradation.

The backend must integrate smoothly with the frontend (built with Next.js and Tiptap) and provide an efficient development process. The environment should leverage cloud infrastructure to ensure flexibility and control over data privacy.

## Decision

We will use **AWS Amplify** as the backend environment for the note-taking app.

## Consequences

### Positive

- **Streamlined Integration**: Amplify simplifies connecting the frontend and backend, reducing development overhead.
- **Feature Support**: Provides built-in solutions for authentication, authorization, storage, GraphQL APIs, and WebSocket-based real-time features.
- **Development Efficiency**: Offers tools like CLI and SDKs to accelerate setup, testing, and deployment.
- **Scalability**: Leverages AWS’s robust infrastructure to scale seamlessly with user growth.

### Negative

- **Abstraction Overhead**: Amplify’s layer of abstraction may limit customization for complex backend needs.
- **Learning Curve**: Requires familiarity with Amplify’s workflows and tools.
- **AWS Dependency**: Ties the app to AWS, potentially complicating future migrations.

## Options Considered

The following backend environments were evaluated based on the app’s requirements:

1. **AWS Amplify**

   - _Description_: A platform that integrates frontend and backend development with AWS services.
   - _Pros_: Simplifies implementation of authentication, storage, APIs, and real-time features; accelerates development.
   - _Cons_: Adds an abstraction layer; increases reliance on AWS.

2. **Custom Cloud Solutions (AWS)**

   - _Description_: Directly utilize AWS’s suite of services tailored to specific needs.
   - _Pros_: Offers flexibility and full control over components; leverages AWS’s broad capabilities.
   - _Cons_: Requires more effort to configure and integrate services.

3. **Google Firebase**
   - _Description_: A backend-as-a-service platform with real-time and storage features.
   - _Pros_: Quick setup with strong real-time support.
   - _Cons_: Operates outside AWS, limiting data control alignment.

## Rationale

AWS was chosen as the foundational cloud provider due to its extensive range of services that can address the note-taking app’s requirements. AWS offers multiple options for authentication, storage, APIs, real-time communication, and scalability, providing flexibility to meet both current and future needs. Within this ecosystem, **AWS Amplify** stands out as the optimal backend environment because it simplifies the integration of these capabilities into a cohesive solution.

Amplify streamlines the development process by offering pre-built support for critical features like authentication, authorization, storage, GraphQL APIs, and WebSocket services. This reduces the complexity of manually configuring individual AWS components while ensuring compatibility with the Next.js and Tiptap frontend. Its developer-friendly tools and seamless AWS integration enable rapid prototyping and deployment, aligning with the project’s goals of efficiency and scalability.

While a custom AWS solution provides greater control, it demands significantly more setup and maintenance effort. Firebase, though feature-rich, was excluded as it operates outside AWS, conflicting with the preference for AWS-based data control. Amplify’s trade-offs—such as its abstraction layer and AWS dependency—are outweighed by its ability to deliver a robust, scalable backend with minimal overhead.

This decision establishes AWS Amplify as the backend environment, leveraging AWS’s versatile infrastructure to support the note-taking app’s requirements effectively.
