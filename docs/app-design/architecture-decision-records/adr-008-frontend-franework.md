# ADR 008: Choose Frontend Framework for Note-Taking App

## Status

Accepted

## Context

The note-taking application requires a modern frontend framework to deliver a responsive, interactive, and efficient user experience. The framework must address the following key requirements:

- **Routing**: An intuitive and manageable routing system that is easy to understand and maintain.
- **API Integration**: Seamless integration with backend APIs for data fetching and updates, ideally with built-in support for server-side logic.
- **Performance**: Fast load times and smooth interactions to enhance user satisfaction.
- **Developer Experience**: Familiarity and ease of use for the development team to ensure efficient development.
- **Scalability**: Capability to support increasing complexity and a growing user base over time.

The development team has significant experience with React, and there is a strong preference for leveraging this expertise. Additionally, a framework that offers a clear routing structure—such as one where routes can be understood just by looking at the file system—and API-based routing is highly desirable.

## Decision

We will use Next.js (version 15) as the frontend framework for the note-taking app.

## Consequences

### Positive

- **File-Based Routing**: Next.js’s file-based routing system allows developers to understand and manage navigation simply by inspecting the file structure, aligning with the preference for intuitive routing.
- **API Routes**: Built-in API routes enable server-side logic and data handling directly within the framework, reducing complexity and supporting seamless API integration.
- **Performance**: Next.js provides automatic optimizations like static site generation (SSG) and server-side rendering (SSR), ensuring fast load times and a responsive user experience.
- **Developer Experience**: The team’s prior experience with React and Next.js can be fully utilized, accelerating development and minimizing the learning curve.
- **Scalability**: Features like incremental static regeneration (ISR) allow Next.js to handle growing datasets and complexity effectively.

### Negative

- **Learning Curve for Advanced Features**: While React knowledge is transferable, mastering Next.js-specific features (e.g., SSR, ISR) may require some additional learning for team members less familiar with them.
- **Version-Specific Dependency**: Committing to version 15 ties the project to its specific features and potential bugs, though Next.js’s active community and support mitigate this risk.

## Options Considered

Several frontend frameworks were evaluated based on the app’s requirements and team preferences:

### 1. Next.js

- Description: A React-based framework with built-in routing, SSR, and API routes.
- Pros: Intuitive file-based routing, API routes, performance optimizations, and alignment with team expertise in React and Next.js.
- Cons: Some advanced features may require additional learning.

### 2. React (with React Router)

- Description: A flexible JavaScript library for building UIs, typically paired with React Router for navigation.
- Pros: Highly customizable and familiar due to the team’s React experience.
- Cons: Requires additional setup for routing and lacks built-in API routes, increasing development overhead.

### 3. Vue.js with Nuxt.js

- Description: A Vue-based framework offering SSR and routing, similar to Next.js.
- Pros: Strong ecosystem and performance capabilities.
- Cons: Limited team familiarity with Vue.js, necessitating a larger learning investment.

### 4. SvelteKit

- Description: A framework for building web apps with Svelte, including SSR and routing.
- Pros: Lightweight and fast, with a simple development model.
- Cons: Smaller community and less proven in large-scale applications compared to Next.js.

## Rationale

Next.js (version 15) is selected as the frontend framework because it aligns closely with the app’s requirements and the team’s preferences. The file-based routing system satisfies the desire for an intuitive navigation structure, where routes are easily understood by examining the file system—a feature explicitly valued by the team lead. The API routes provide a streamlined way to handle server-side logic and integrate with backend APIs, matching the preference for this capability. Next.js builds on the team’s React expertise, enhancing developer productivity, while its performance optimizations (e.g., SSR, SSG) ensure a fast and scalable app. Although other frameworks like React with React Router offer flexibility, they lack the built-in features and simplicity of Next.js. Vue.js with Nuxt.js and SvelteKit, while capable, do not leverage the team’s existing skills as effectively. Thus, Next.js strikes the best balance of familiarity, functionality, and future-proofing for the note-taking app.
