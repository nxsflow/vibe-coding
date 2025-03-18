---
status: "accepted"
date: 2025-03-18
decision-makers: Carsten Koch
consulted: Grok 3
informed: -
---

# ADR 016: CI/CD Solution

## Status

Accepted

## Context

The note-taking application requires an automated CI/CD system to streamline development, ensure code quality, and facilitate rapid deployment. Key requirements include:

- **Customizable Build Process**: Ability to define build steps using a YAML file to tailor the CI/CD pipeline to specific needs.
- **Testing Integration**: Automated execution of unit tests and end-to-end (E2E) tests within the pipeline to maintain code reliability.
- **Automatic Previews**: For every pull request targeting the main branch, deploy a temporary environment with both frontend and backend for manual testing before merging.
- **Data Seeding in Previews**: Populate preview environments with seed data to accelerate manual testing.
- **AWS Integration**: Leverage AWS services, given the app’s existing reliance on the AWS ecosystem.

The CI/CD solution must balance ease of use, customization, and integration with AWS to support efficient workflows for the development team.

## Decision

We will adopt **AWS Amplify** as the CI/CD solution, utilizing its integrated pipelines and a custom YAML build file to meet the note-taking app’s needs.

## Consequences

### Positive

- **Integrated Pipelines**: AWS Amplify offers built-in CI/CD pipelines that simplify setup and management within AWS.
- **Custom Builds**: The YAML build file allows us to define precise build, test, and deployment steps tailored to the app.
- **Testing Support**: Unit tests and E2E tests can be seamlessly integrated into the pipeline via YAML configuration.
- **Automatic Previews**: For each pull request, Amplify deploys a fully functional preview environment (frontend and backend), enabling manual testing prior to merging into the main branch.
- **Data Seeding**: Custom scripts in the YAML file can seed preview environments with test data, speeding up manual testing.
- **AWS Synergy**: Amplify’s native integration with AWS services (e.g., AppSync, Cognito) aligns with the app’s infrastructure, reducing complexity.

### Negative

- **Learning Curve**: Team members new to Amplify may require time to learn its pipeline configuration and features.
- **Customization Limits**: While flexible, Amplify’s YAML-based customization is optimized for AWS workflows, potentially restricting non-AWS integrations.
- **Cost**: Frequent builds, previews, or large test suites could increase Amplify’s usage-based costs.

## Options Considered

### 1. AWS Amplify

- **Description**: A managed CI/CD service within AWS, offering pipelines, YAML configuration, and automatic previews.
- **Pros**: Tight AWS integration, built-in previews, and support for testing and seeding.
- **Cons**: Limited flexibility outside AWS and a potential learning curve.

### 2. GitHub Actions

- **Description**: A CI/CD platform embedded in GitHub, driven by YAML workflows.
- **Pros**: Highly customizable and GitHub-native.
- **Cons**: Requires manual AWS integration and lacks automatic preview environments.

### 3. Jenkins

- **Description**: An open-source automation server for CI/CD.
- **Pros**: Extremely customizable.
- **Cons**: High setup and maintenance overhead, especially for AWS integration.

### 4. CircleCI

- **Description**: A cloud-based CI/CD tool with robust automation features.
- **Pros**: Fast and flexible with strong GitHub support.
- **Cons**: External to AWS, requiring additional effort for integration.

## Rationale

**AWS Amplify** is the chosen CI/CD solution because it directly addresses the app’s requirements while leveraging its AWS-based infrastructure:

- **Custom YAML Builds**: Amplify’s YAML build file allows us to tailor the pipeline, defining stages for building, testing, and deploying the app.
- **Testing Integration**: Unit tests (e.g., using Jest) and E2E tests (e.g., using Cypress) can be executed automatically within the pipeline, ensuring quality at every step.
- **Automatic Previews**: When a pull request is created for the main branch, Amplify deploys a preview environment with both frontend (e.g., Next.js) and backend, enabling manual testing before merging.
- **Data Seeding**: The YAML file can include a script to seed the database with test data (e.g., sample notes and users) in preview environments, making manual testing faster and more effective.
- **AWS Compatibility**: Amplify’s seamless integration with AWS services simplifies deployment and aligns with the app’s architecture.

Alternatives like **GitHub Actions** and **CircleCI** offer flexibility but lack Amplify’s automatic previews and native AWS integration. **Jenkins**, while powerful, demands excessive setup effort. Amplify provides the optimal mix of functionality, ease of use, and ecosystem alignment for this project.

## Implementation Details

### YAML Build File

The custom YAML file will orchestrate the CI/CD pipeline with the following stages:

- **Build Stage**:

  - Install dependencies (e.g., `npm install`).
  - Build the frontend and backend components.
  - Run unit tests (e.g., `npm test` with Jest).

- **Test Stage**:

  - Execute E2E tests (e.g., `npx cypress run`) to validate key user flows.

- **Deploy Stage**:

  - **Pull Requests**: Deploy to a preview environment with seeded data.
  - **Main Branch**: Deploy to production after successful builds and tests.

- **Data Seeding**:
  - Add a conditional script in the YAML file (e.g., `if [ "$AWS_BRANCH" != "main" ]; then npm run seed; fi`) to seed the database with test data only in preview environments.

Example YAML snippet:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
        - npm test
    postBuild:
      commands:
        - if [ "$AWS_BRANCH" != "main" ]; then npm run seed; fi
  artifacts:
    baseDirectory: .next
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
test:
  phases:
    test:
      commands:
        - npx cypress run
```

### Automatic Previews

- **Pull Request Trigger**: On pull request creation, Amplify builds the app and deploys a preview environment with both frontend and backend.
- **Seeded Data**: The YAML script seeds the database with test data (e.g., sample notes) in previews, enabling rapid manual testing.
- **Manual Testing**: Developers can interact with the preview URL to verify changes before merging into the main branch.

### CI/CD Pipeline

- **Execution**: The pipeline triggers on commits to feature branches and pull requests, running the same YAML configuration.
- **Preview vs. Production**:
  - Previews include data seeding for testing.
  - Production deployments (main branch) skip seeding to preserve real data.
- **Validation**: Unit and E2E tests run in all scenarios, ensuring reliability.
