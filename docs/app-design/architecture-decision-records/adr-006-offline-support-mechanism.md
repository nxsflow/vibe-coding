# ADR 006: Offline Support Mechanism for Note-Taking App

## Status

Accepted

## Context

The note-taking application requires a robust offline support mechanism to ensure users can read and update their notes even when disconnected from the internet for extended periods, up to a month. This introduces several challenges:

- **Long-Term Offline Access**: Users must be able to access and edit their notes locally without an internet connection, even after a month offline.
- **Expired JWT Tokens**: Authorization typically relies on JWT tokens, which may expire during the offline period. The app must allow local operations without a valid token.
- **Syncing Access Changes**: If a user loses access to a document while offline (e.g., due to revocation by another user), the app must detect this upon reconnection and delete the local copy of the document to enforce updated permissions.
- **Data Integrity**: Offline changes should be preserved and synced when possible, but discarded if access has been revoked.

The solution must balance usability, security, and data consistency, ensuring a seamless offline experience while respecting access controls.

## Decision

We will implement an offline support mechanism using **IndexedDB for local storage** and a **refresh token strategy for authorization**. The key components of this decision are:

- **Local Storage with IndexedDB**:
  - Notes, including their Y.Doc states (leveraging Yjs from previous ADRs), will be cached locally in IndexedDB when the user is online.
  - Offline updates will be stored as Yjs snippets in a queue, ready for syncing when connectivity is restored.

- **Offline Access Without Token Validation**:
  - Users can read and edit locally stored notes without requiring a valid JWT token, ensuring functionality during extended offline periods.

- **Token Refresh on Reconnection**:
  - Upon reconnection, the app will attempt to refresh the expired JWT token using a securely stored refresh token.
  - If the refresh token has also expired (e.g., after a month), the user will need to log in again to regain server access. However, local access remains unaffected during the offline period.

- **Access Rights Synchronization**:
  - When the user reconnects and the JWT token is refreshed, the app will query the server to verify current access rights for all locally stored documents.
  - If access to a document has been revoked, the local copy will be deleted, along with any unsynced offline changes to that document.

This approach ensures that users can work offline for up to a month, with local changes preserved until syncing, while enforcing security and access control upon reconnection.

## Consequences

### Positive
- **Seamless Offline Experience**: Users can read and update notes locally for extended periods, even if JWT tokens expire.
- **Security Enforcement**: Revoked access is respected by deleting local copies of unauthorized documents upon reconnection.
- **Data Consistency**: Yjs’s conflict-free replicated data type (CRDT) capabilities ensure that offline edits merge correctly with server changes when synced (unless access is revoked).
- **Transparent Token Management**: The refresh token mechanism handles expired JWTs without disrupting offline functionality.

### Negative
- **Potential Data Loss**: If access to a document is revoked, offline changes to that document are discarded upon reconnection, which may surprise users if not clearly communicated.
- **Increased Complexity**: Syncing logic must handle access checks and document deletion, adding implementation overhead.
- **Re-Authentication Risk**: If both the JWT and refresh token expire (e.g., after a month), users must log in again, which could interrupt their workflow if they remain offline longer than the refresh token’s lifespan.

## Options Considered

Several alternatives were evaluated before settling on the chosen approach:

1. **IndexedDB with Token Validation**
   - *Description*: Require a valid JWT token for all operations, even offline.
   - *Pros*: Simplifies access control logic.
   - *Cons*: Fails for long offline periods due to token expiration; rejected as impractical.

2. **Local Storage Without Access Sync**
   - *Description*: Store notes locally and sync changes without checking access rights.
   - *Pros*: Simple to implement.
   - *Cons*: Security risk, as revoked documents could persist locally; rejected for failing to meet access control requirements.

3. **IndexedDB with Refresh Tokens (Chosen Option)**
   - *Description*: Use IndexedDB for storage and refresh tokens to manage expired JWTs, with access rights synced on reconnection.
   - *Pros*: Balances offline access, security, and data consistency.
   - *Cons*: Requires careful management of tokens and sync logic; accepted as the best trade-off.

## Rationale

The decision to use **IndexedDB with a refresh token strategy** addresses all specified requirements effectively:

- **Long-Term Offline Support**: Storing notes in IndexedDB allows users to read and update them locally for up to a month, independent of JWT token validity.
- **Handling Expired Tokens**: Bypassing token validation for offline operations, combined with a refresh token mechanism, ensures continued functionality and smooth reconnection.
- **Access Revocation**: Syncing access rights upon reconnection and deleting revoked documents enforces security without compromising the offline experience.
- **Scalability**: Leveraging Yjs’s CRDT ensures robust conflict resolution for offline edits, making the solution future-proof for multi-user scenarios.

This approach provides a user-friendly offline experience while maintaining the integrity and security of the note-taking app’s data and access controls.
