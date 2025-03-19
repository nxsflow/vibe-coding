import { defineStorage } from "@aws-amplify/backend";

/**
 * Define and configure your storage resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/storage/
 */
export const storage = defineStorage({
  /**
   * Configure the S3 bucket with appropriate access permissions
   * using owner-based access patterns for enhanced security
   */
  name: "NoteAppStorage",
  access: (allow) => ({
    // Notes directory - users can only access their own files
    "notes/{entity_id}/*": [
      // Owner can perform all operations on their own files
      allow.entity("identity").to(["read", "write", "delete"]),
    ],

    // Resources directory - users can only access their own files
    "resources/{entity_id}/*": [
      // Owner can perform all operations on their own files
      allow.entity("identity").to(["read", "write", "delete"]),
    ],

    // Shared resources - can be read by all authenticated users but only modified by owner
    "shared/{entity_id}/*": [
      // Owner has full access
      allow.entity("identity").to(["read", "write", "delete"]),
      // Other authenticated users can only read
      allow.authenticated.to(["read"]),
    ],
  }),
});
