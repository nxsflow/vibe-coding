---
status: "accepted"
date: 2025-03-18
decision-makers: Carsten Koch
consulted: Grok 3
informed: -
---

# ADR 005: Storage Strategy for Y.Docs and Updates in Note-Taking App

## Status

Accepted

## Context

The note-taking application leverages Yjs for real-time collaboration, where each note is represented as a Y.Doc. To support persistence, we need a storage strategy that saves both the Y.Doc’s current state and all updates made to it. This ensures data integrity, enables features like version history or undo/redo, and maintains performance without compromising user experience. Key considerations include:

- **Data Integrity**: The latest Y.Doc state must be recoverable after failures or disconnections.
- **Complete Update History**: All changes must be stored to support auditing, versioning, or reverting edits.
- **Performance**: Excessive database writes (e.g., to DynamoDB) should be avoided to minimize latency and cost.
- **User Experience**: Changes should be saved promptly to avoid data loss, but without disrupting the editing flow.

Saving every update in real-time would overwhelm the database with frequent writes, increasing costs and potentially degrading performance. Conversely, infrequent saves risk losing significant data if a client disconnects unexpectedly. A balanced approach is required to handle both active editing and idle periods effectively.

## Decision

We will adopt a **debounced writing strategy** to store the Y.Doc state and its updates, with the following details:

- **Debounce Interval**: The Y.Doc state and accumulated updates will be saved to the database after **5 seconds of inactivity** (no new changes within 5 seconds).
- **Maximum Wait Time**: If a user continuously edits without pausing, the current Y.Doc state and all updates since the last save will be stored at least every **30 seconds**.
- **Storage Details**:
  - The **full Y.Doc state** will be saved periodically as a binary or JSON-serialized object.
  - All **incremental updates** (Yjs snippets) since the last save will be stored alongside the state to preserve the complete change history.

This strategy ensures that changes are saved frequently enough to limit data loss while reducing unnecessary database operations during active editing sessions.

## Consequences

### Positive

- **Efficient Resource Use**: Debouncing consolidates writes, reducing database operations and associated costs compared to saving every update instantly.
- **Reliable Persistence**: The 30-second maximum wait ensures regular saves during continuous editing, minimizing data loss risks.
- **Full History Support**: Storing both the Y.Doc state and all updates enables features like version history, undo/redo, and auditing.
- **Smooth User Experience**: The 5-second debounce interval saves changes quickly after a pause, preserving work without noticeable delays.

### Negative

- **Implementation Complexity**: Coordinating debounced saves with both state and updates requires careful logic between the app and database.
- **Small Data Loss Risk**: Up to 30 seconds of changes could be lost in a sudden disconnection, though this is mitigated by storing updates with each save.
- **Increased Storage Needs**: Retaining both the full state and incremental updates consumes more storage, a necessary trade-off for history preservation.

## Options Considered

We evaluated several approaches to meet the app’s needs:

1. **Immediate Update Saves**

   - _Description_: Save each Yjs update to the database as it occurs.
   - _Pros_: Near-zero data loss; straightforward to implement.
   - _Cons_: Excessive write frequency increases costs and may slow performance.

2. **Fixed-Interval State Saves**

   - _Description_: Save the full Y.Doc state every 10 seconds, ignoring updates.
   - _Pros_: Predictable writes; simple to manage.
   - _Cons_: No update history; higher data loss risk between saves.

3. **Debounced Writing with Maximum Wait**

   - _Description_: Save state and updates after inactivity, with a cap for continuous edits.
   - _Pros_: Balances efficiency and reliability; retains full history.
   - _Cons_: More complex; requires interval tuning.

4. **Event-Triggered Saves**
   - _Description_: Save on specific user actions (e.g., pausing, closing the app).
   - _Pros_: Aligns with user behavior; reduces unnecessary writes.
   - _Cons_: Misses saves during unexpected disconnections.

## Rationale

The **debounced writing strategy** with a **5-second inactivity period** and a **30-second maximum wait** optimally addresses the app’s requirements:

- **Responsive During Pauses**: After a user stops editing, changes are saved within 5 seconds, ensuring quick persistence without disrupting workflow.
- **Safe During Continuous Edits**: For nonstop writing, saves occur at least every 30 seconds, limiting potential data loss while keeping write frequency manageable.
- **Resource Efficiency**: Debouncing avoids the overhead of per-update saves, crucial for cost and performance in collaborative scenarios.

Storing the **full Y.Doc state** provides a snapshot for quick retrieval (e.g., when a new user joins), while saving **all incremental updates** ensures a complete history for advanced features. The chosen timeframes—5 seconds for debounce and 30 seconds for maximum wait—are informed by typical editing patterns in collaborative tools and can be refined based on usage data.

This ADR focuses on the storage strategy; details like database schema or server integration will be covered separately.
