---
status: "accepted"
date: 2025-03-18
decision-makers: Carsten Koch
consulted: Grok 3
informed: -
---

# ADR 016: Documenting Changes and Releases

## Status

Accepted

## Context

The note-taking application needs a structured method for documenting changes and managing releases to maintain transparency, ensure quality, and provide a seamless user experience. Key requirements include:

- **Change Documentation**: Accurately log updates, bug fixes, and new features for each release.
- **Versioning**: Implement a consistent versioning system to track releases effectively.
- **Release Notes**: Deliver clear, accessible release notes to users and stakeholders.
- **Release Process**: Establish a repeatable process for deploying new versions.
- **Integration**: Ensure compatibility with existing development tools and workflows.

A well-defined process is essential for coordinating team efforts, communicating changes, and maintaining the application’s stability.

## Decision

We will use **Semantic Versioning (SemVer)** for versioning, **GitHub Releases** for documenting changes, and a **release checklist** to standardize the release process.

### Components of the Solution

- **Semantic Versioning (SemVer)**: Versions will follow the `MAJOR.MINOR.PATCH` format (e.g., 1.2.3), where:
  - `MAJOR` increments for breaking changes,
  - `MINOR` increments for new features,
  - `PATCH` increments for bug fixes.
- **GitHub Releases**: Each release will be documented via GitHub Releases, including a changelog summarizing changes, fixes, and features.
- **Release Checklist**: A step-by-step checklist will ensure all necessary tasks are completed during the release process.

## Consequences

### Positive

- **Clarity**: SemVer clearly indicates the significance of changes.
- **Transparency**: GitHub Releases provide a centralized, user-friendly platform for release notes.
- **Consistency**: The checklist ensures a reliable, repeatable release process.
- **Traceability**: Tagging releases in GitHub links them to specific commits, aiding debugging and accountability.

### Negative

- **Initial Effort**: Setting up the checklist and integrating it into workflows requires initial time investment.
- **Ongoing Maintenance**: Keeping changelogs and release notes current requires consistent effort.
- **Learning Curve**: Team members new to SemVer or GitHub Releases may need training.

## Options Considered

### 1. Semantic Versioning with GitHub Releases

- **Description**: Use SemVer for versioning and GitHub Releases for documentation.
- **Pros**: Industry-standard versioning, centralized documentation, and seamless GitHub integration.
- **Cons**: Requires adherence to SemVer conventions.

### 2. Manual Versioning with Changelog File

- **Description**: Maintain a changelog file in the repository and manually assign versions.
- **Pros**: Simple and flexible.
- **Cons**: Lacks automation and centralized release management.

### 3. Automated Release Tools (e.g., Semantic Release)

- **Description**: Automate versioning and changelog generation using commit messages.
- **Pros**: Reduces manual work and enforces consistency.
- **Cons**: Adds complexity and requires strict commit message formatting.

## Rationale

The chosen solution—**Semantic Versioning**, **GitHub Releases**, and a **release checklist**—strikes a balance between simplicity, transparency, and control:

- **SemVer** offers a standardized, intuitive versioning system.
- **GitHub Releases** centralizes release notes and integrates with existing GitHub workflows.
- **Release Checklist** ensures all steps are completed, minimizing errors.

Automated tools like Semantic Release were deemed too complex for current needs, while a manual changelog lacks the structure and visibility provided by GitHub Releases.

## Implementation Details

### Release Process

To release a new version of the note-taking app, follow these steps:

1. **Prepare the Release**:

   - Merge all changes into the `main` branch.
   - Update the changelog with a summary of updates, bug fixes, and new features.
   - Determine the new version number using SemVer rules (e.g., increment `PATCH` for fixes, `MINOR` for features).

2. **Create a Release Branch**:

   - Branch off `main` with the name `release/vX.Y.Z` (e.g., `release/v1.2.3`).
   - Update the version number in configuration files (e.g., `package.json`).

3. **Testing**:

   - Run the full test suite (unit, integration, and end-to-end tests).
   - Manually test critical features, such as offline mode and real-time syncing.

4. **Documentation**:

   - Finalize the release notes in the changelog.
   - Update supporting documentation (e.g., API docs, user guides).

5. **Tag and Release**:

   - Merge the release branch back into `main`.
   - Create a Git tag for the version (e.g., `git tag v1.2.3`).
   - Publish the release on GitHub, attaching the changelog.

6. **Deployment**:

   - Deploy the new version to production.
   - Monitor logs and metrics for issues post-deployment.

7. **Post-Release**:
   - Notify users and stakeholders of the release (e.g., via email or announcements).
   - Archive or delete the release branch if no longer needed.

### Release Checklist

- [ ] All changes merged into `main`.
- [ ] Changelog updated with changes, fixes, and features.
- [ ] Version number determined and updated in configuration files.
- [ ] Release branch created (`release/vX.Y.Z`).
- [ ] Full test suite executed and passed.
- [ ] Manual testing of critical features completed.
- [ ] Release notes finalized and documentation updated.
- [ ] Release branch merged into `main`.
- [ ] Git tag created and pushed (e.g., `vX.Y.Z`).
- [ ] Release published on GitHub with changelog.
- [ ] New version deployed to production.
- [ ] Users and stakeholders notified of the release.
