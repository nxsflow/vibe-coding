# Note-Taking Application Implementation Plan

This plan provides step-by-step instructions to build a feature-rich, collaborative note-taking app using Next.js, Tiptap, Yjs, AWS services, and an LLM for intelligent features. Each step includes a test to ensure proper implementation.

## Phase 1: Project Setup

### Step 1: Initialize the Next.js Project

- **Instructions**: Create a new Next.js project by running `npx create-next-app@latest note-taking-app` in the terminal. Choose the default options unless specified otherwise.
- **Test**: Navigate to the project directory (`cd note-taking-app`), run `npm run dev`, and open `http://localhost:3000` in a browser to confirm the default Next.js welcome page loads without errors.

### Step 2: Install Core Dependencies

- **Instructions**: Install the following packages:
  - Tiptap for the editor: `npm install @tiptap/react @tiptap/pm @tiptap/starter-kit`.
  - Yjs for real-time collaboration: `npm install yjs y-prosemirror`.
  - AWS Amplify for backend: `npm install aws-amplify`.
  - Utilities: `npm install uuid @aws-sdk/client-s3`.
- **Test**: Check `package.json` to ensure all listed dependencies are added correctly. Run `npm run dev` again to verify the app still starts without errors.

## Phase 2: Backend Configuration with AWS Amplify Gen 2

### Step 3: Initialize AWS Amplify Gen 2

- **Instructions**: Run `npm install @aws-amplify/backend @aws-amplify/backend-cli`. Create the directory structure with `npx ampx init`, and set up TypeScript configuration.
- **Test**: Verify the `amplify` directory is created with `backend.ts` file, and Amplify TypeScript configurations are set up correctly.

### Step 4: Define Authentication with AWS Cognito

- **Instructions**: Create `amplify/auth/resource.ts` to define Cognito authentication using TypeScript:

  ```typescript
  import { defineAuth } from "@aws-amplify/backend";

  export const auth = defineAuth({
    loginWith: {
      email: true,
      phone: false,
      username: false,
    },
    multifactor: {
      mode: "optional",
    },
  });
  ```

- **Test**: Launch an Amplify sandbox with `npx ampx sandbox` and verify in the AWS Cognito console that a user pool is created correctly.

### Step 5: Define GraphQL API with AWS AppSync

- **Instructions**: Create `amplify/data/resource.ts` and define the GraphQL schema using TypeScript-first schema builder:

  ```typescript
  import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

  const schema = a
    .schema({
      User: a.model({
        id: a.id().required(),
        email: a.string().required(),
        name: a.string(),
        notes: a.hasMany("Note"),
      }),

      Note: a.model({
        id: a.id().required(),
        title: a.string().required(),
        content: a.string().required(),
        type: a.enum(["MEETING", "READING", "THINKING"]).required(),
        createdAt: a.datetime().required(),
        updatedAt: a.datetime().required(),
        tags: a.manyToMany("Tag", "NoteTags"),
        resources: a.manyToMany("Resource", "NoteResources"),
        collaborationId: a.id(),
        collaborations: a.hasMany("Collaboration"),
      }),

      Tag: a.model({
        id: a.id().required(),
        name: a.string().required(),
        notes: a.manyToMany("Note", "NoteTags"),
      }),

      Resource: a.model({
        id: a.id().required(),
        name: a.string().required(),
        type: a
          .enum(["PERSON", "PROJECT", "BOOK", "ARTICLE", "COMPANY"])
          .required(),
        notes: a.manyToMany("Note", "NoteResources"),
      }),

      Collaboration: a.model({
        noteId: a.id().required(),
        userId: a.id().required(),
        permissionLevel: a.enum(["VIEW", "COMMENT", "EDIT"]).required(),
        note: a.belongsTo("Note"),
      }),

      NoteVersion: a.model({
        id: a.id().required(),
        noteId: a.id().required(),
        content: a.string().required(),
        timestamp: a.datetime().required(),
        createdBy: a.id().required(),
        note: a.belongsTo("Note"),
      }),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.specificRoles(["COLLABORATOR"], (rule) => [
        rule.read("Note"),
        rule.update("Note"),
      ]),
    ]);

  export type Schema = ClientSchema<typeof schema>;

  export const data = defineData({
    schema,
    authorizationModes: {
      defaultAuthorizationMode: "userPool",
      apiKeyAuthorizationMode: {
        expiresInDays: 30,
      },
    },
  });
  ```

- **Test**: Verify the schema using the sandbox with `npx ampx sandbox`. Check the AWS AppSync console to confirm the API exists and test a sample query to ensure it responds successfully.

### Step 6: Set Up File Storage with AWS S3

- **Instructions**: Create `amplify/storage/resource.ts` to define S3 storage:

  ```typescript
  import { defineStorage } from "@aws-amplify/backend";

  export const storage = defineStorage({
    name: "noteStorage",
    access: ["authenticated"],
    fileAccess: {
      bucket: {
        owner: "readWrite",
      },
      identifiedBy: {
        userId: {
          readWrite: ["/*"],
        },
      },
    },
  });
  ```

- **Test**: Launch the sandbox and check the AWS S3 console to confirm a new bucket is created with the project name prefix.

## Phase 3: User Authentication

### Step 7: Integrate Amplify Auth in the Frontend

- **Instructions**: Create a configuration file at `src/amplify-config.ts`:

  ```typescript
  import { Amplify } from "aws-amplify";
  import config from "../amplifyconfiguration.json";

  Amplify.configure(config);
  ```

  In `pages/_app.js`, import and apply the configuration.

- **Test**: Run the app, visit `http://localhost:3000`, and ensure the app initializes without errors.

### Step 8: Create a Login Page

- **Instructions**: Create a new file `pages/login.js`. Implement authentication UI using Amplify UI:

  ```typescript
  import { Authenticator } from '@aws-amplify/ui-react';

  export default function Login() {
    return (
      <div>
        <Authenticator />
      </div>
    );
  }
  ```

- **Test**: Navigate to `/login`, sign up with a new email/password, verify the email via the received code, and log in successfully.

### Step 9: Implement Sign-Out Functionality

- **Instructions**: Add a sign-out button in the app header:

  ```typescript
  import { Auth } from "aws-amplify";

  const signOut = async () => {
    try {
      await Auth.signOut();
      // Handle post-signout navigation
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  ```

- **Test**: Log in, click the sign-out button, and confirm the user is redirected to the login page.

## Phase 4: Note Editor Setup

### Step 10: Create the Note Editor Component

- **Instructions**: Create `src/features/notes/components/NoteEditor.js`. Initialize Tiptap with the starter kit using `@tiptap/react`.
- **Test**: Render the `NoteEditor` component on a new page (e.g., `pages/notes/[id].js`), visit the page, and confirm a basic text editor appears.

### Step 11: Add Markdown Formatting

- **Instructions**: Configure Tiptap to support markdown shortcuts (e.g., `#` for headers, `*` for italic) using the starter kit extensions.
- **Test**: In the editor, type `# Heading` and press space, ensuring it converts to a header. Type `*italic*` and confirm it becomes italicized.

### Step 12: Implement Slash Command Menu

- **Instructions**: Add a custom Tiptap extension to show a menu when typing `/`. Include options like "Heading," "List," and "Bold."
- **Test**: Type `/` in the editor, verify a menu appears, select an option (e.g., "Heading"), and ensure the text formats correctly.

## Phase 5: Real-Time Collaboration

### Step 13: Set Up a WebSocket Server

- **Instructions**: Add a WebSocket API with CDK constructs in a custom stack:

  ```typescript
  import * as apigateway from "aws-cdk-lib/aws-apigatewayv2";
  import * as lambda from "aws-cdk-lib/aws-lambda";
  import { defineBackend } from "@aws-amplify/backend";
  import { auth } from "./auth/resource";
  import { data } from "./data/resource";
  import { storage } from "./storage/resource";

  const backend = defineBackend({
    auth,
    data,
    storage,
  });

  const websocketStack = backend.createStack("WebSocketStack");

  // Create the WebSocket API
  const websocketApi = new apigateway.WebSocketApi(
    websocketStack,
    "NoteEditorWebSocketApi",
    {
      apiName: "NoteEditorWebSocketApi",
      routeSelectionExpression: "$request.body.action",
    }
  );

  // Create Lambda handlers for connection and message events
  const connectHandler = new lambda.Function(websocketStack, "ConnectHandler", {
    runtime: lambda.Runtime.NODEJS_18_X,
    handler: "index.handler",
    code: lambda.Code.fromAsset("lambda/websocket/connect"),
  });

  const disconnectHandler = new lambda.Function(
    websocketStack,
    "DisconnectHandler",
    {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda/websocket/disconnect"),
    }
  );

  const messageHandler = new lambda.Function(websocketStack, "MessageHandler", {
    runtime: lambda.Runtime.NODEJS_18_X,
    handler: "index.handler",
    code: lambda.Code.fromAsset("lambda/websocket/message"),
  });

  // Add routes to the WebSocket API
  websocketApi.addRoute("$connect", {
    integration: new apigateway.WebSocketLambdaIntegration(
      "ConnectIntegration",
      connectHandler
    ),
  });

  websocketApi.addRoute("$disconnect", {
    integration: new apigateway.WebSocketLambdaIntegration(
      "DisconnectIntegration",
      disconnectHandler
    ),
  });

  websocketApi.addRoute("message", {
    integration: new apigateway.WebSocketLambdaIntegration(
      "MessageIntegration",
      messageHandler
    ),
  });

  // Create and deploy the WebSocket stage
  new apigateway.WebSocketStage(websocketStack, "ProdStage", {
    webSocketApi: websocketApi,
    stageName: "prod",
    autoDeploy: true,
  });
  ```

- **Test**: Launch the sandbox, connect to the WebSocket URL using a tool like `wscat`, and confirm messages can be sent and received.

### Step 14: Integrate Yjs with Tiptap

- **Instructions**: In `NoteEditor.js`, use `y-prosemirror` to bind Yjs with Tiptap. Connect Yjs to the WebSocket server for synchronization:

  ```javascript
  import * as Y from "yjs";
  import { WebsocketProvider } from "y-websocket";
  import { Editor, useEditor } from "@tiptap/react";
  import StarterKit from "@tiptap/starter-kit";
  import Collaboration from "@tiptap/extension-collaboration";

  const NoteEditor = ({ noteId }) => {
    // Create a Yjs document
    const ydoc = new Y.Doc();

    // Set up the WebSocket connection
    const provider = new WebsocketProvider(
      "wss://your-websocket-url/prod",
      noteId,
      ydoc
    );

    // Set up the Tiptap editor with Collaboration
    const editor = useEditor({
      extensions: [
        StarterKit,
        Collaboration.configure({
          document: ydoc,
        }),
      ],
    });

    return <Editor editor={editor} />;
  };
  ```

- **Test**: Open two browser windows, edit the same note, and verify changes sync in real-time between windows.

### Step 15: Add User Awareness

- **Instructions**: Implement Yjs awareness to show cursor positions and user names in the editor by adding a Collaboration Cursor extension:

  ```javascript
  import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

  // In your editor setup:
  const editor = useEditor({
    extensions: [
      StarterKit,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: currentUser.name,
          color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        },
      }),
    ],
  });
  ```

- **Test**: Log in as different users in two windows, edit a note, and confirm each user's cursor is visible with their name.

## Phase 6: Note Sharing and Mentions

### Step 16: Implement Note Sharing

- **Instructions**: Add a "Share" button that generates a unique URL for the note and updates permissions in DynamoDB via Amplify Data:

  ```typescript
  import { generateClient } from "aws-amplify/api";

  const client = generateClient();

  const shareNote = async (noteId, userId, permissionLevel) => {
    try {
      const result = await client.models.Collaboration.create({
        noteId,
        userId,
        permissionLevel,
      });
      return result;
    } catch (error) {
      console.error("Error sharing note:", error);
    }
  };
  ```

- **Test**: Share a note, access the URL as another user, and confirm the note is viewable or editable based on permissions.

### Step 17: Add Mention Functionality

- **Instructions**: Extend Tiptap to show a user list when typing `@`. Insert the selected username as a mention node:

  ```javascript
  import Mention from '@tiptap/extension-mention';

  // In your editor setup:
  const editor = useEditor({
    extensions: [
      // other extensions...
      Mention.configure({
        suggestion: {
          items: async ({ query }) => {
            // Fetch users from API based on query
            return users.filter(user =>
              user.name.toLowerCase().includes(query.toLowerCase())
            );
          },
          render: // Render logic for mention suggestions
        },
      }),
    ],
  });
  ```

- **Test**: Type `@`, select a user, and verify their name appears in the note. Check that the mentioned user receives a notification via GraphQL subscription.

## Phase 7: Media Integration

### Step 18: Enable File Uploads to S3

- **Instructions**: Add a file input in `NoteEditor.js` to upload images/PDFs using Amplify Storage:

  ```typescript
  import { uploadData } from "aws-amplify/storage";

  const uploadFile = async (file) => {
    try {
      const result = await uploadData({
        key: `${noteId}/${file.name}`,
        data: file,
        options: {
          contentType: file.type,
        },
      });
      return result;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  ```

- **Test**: Upload an image, confirm it's stored in S3, and retrieve it with a signed URL.

### Step 19: Display Media Previews

- **Instructions**: Render uploaded images and PDFs in the editor with clickable previews using signed URLs:

  ```typescript
  import { getUrl } from "aws-amplify/storage";

  const getFileUrl = async (key) => {
    try {
      const result = await getUrl({
        key,
        options: {
          expiresIn: 3600, // 1 hour
        },
      });
      return result.url;
    } catch (error) {
      console.error("Error getting file URL:", error);
    }
  };
  ```

- **Test**: Upload an image and PDF, verify previews appear, and click to open them full-screen.

## Phase 8: Automatic Tagging and Resource Linking

### Step 20: Set Up an LLM API Endpoint

- **Instructions**: Create a Lambda function via Amplify to call Claude on AWS Bedrock for content analysis:

  ```typescript
  import { Function } from "aws-cdk-lib/aws-lambda";
  import { Role, ServicePrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";

  const llmStack = backend.createStack("LLMStack");

  // Create a role for the Lambda function with Bedrock permissions
  const lambdaRole = new Role(llmStack, "LLMFunctionRole", {
    assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
  });

  lambdaRole.addToPolicy(
    new PolicyStatement({
      actions: ["bedrock:InvokeModel"],
      resources: ["*"], // Restrict to specific model ARNs in production
    })
  );

  // Create the Lambda function
  const llmFunction = new Function(llmStack, "LLMFunction", {
    runtime: lambda.Runtime.NODEJS_18_X,
    handler: "index.handler",
    code: lambda.Code.fromAsset("lambda/llm"),
    role: lambdaRole,
  });
  ```

- **Test**: Send a sample paragraph to the endpoint and confirm it returns suggested tags.

### Step 21: Implement Automatic Tagging

- **Instructions**: Analyze editor content blocks with the LLM API and display suggested tags for user approval:

  ```typescript
  const suggestTags = async (content) => {
    try {
      const response = await fetch("/api/suggest-tags", {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to suggest tags");
      }

      return await response.json();
    } catch (error) {
      console.error("Error suggesting tags:", error);
    }
  };
  ```

- **Test**: Type a paragraph, verify tags appear (e.g., "project"), and accept or reject them successfully.

### Step 22: Add Resource Linking

- **Instructions**: Use the LLM to detect resource mentions (e.g., people, projects) and suggest links to existing DynamoDB entries or new resources.
- **Test**: Mention a known project, confirm it links, and introduce new content to see a new resource suggestion.

## Phase 9: File Analysis

### Step 23: Generate File Summaries

- **Instructions**: Send uploaded files to the LLM API for summary generation and display them alongside previews.
- **Test**: Upload an image and PDF, verify summaries appear, and edit one to ensure changes save.

## Phase 10: Note Types and Initial Tagging

### Step 24: Add Note Type Selection

- **Instructions**: On note creation, prompt the user to select a type (meeting, reading, thinking) and store it in DynamoDB using Amplify Data.
- **Test**: Create a note, select "meeting," and confirm the type is saved and displayed.

### Step 25: Enable Initial Tagging

- **Instructions**: Allow users to add initial tags during note creation, supplemented by LLM suggestions.
- **Test**: Add tags like "team," verify they apply, and check for additional LLM-suggested tags.

## Phase 11: "Chief of Staff" Meeting

### Step 26: Integrate Calendar API

- **Instructions**: Use a calendar API (e.g., Google Calendar) via a custom Lambda function:

  ```typescript
  const calendarStack = backend.createStack("CalendarStack");

  // Create a Lambda function for Google Calendar integration
  const calendarFunction = new Function(calendarStack, "CalendarFunction", {
    runtime: lambda.Runtime.NODEJS_18_X,
    handler: "index.handler",
    code: lambda.Code.fromAsset("lambda/calendar"),
    environment: {
      CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
      CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  });
  ```

- **Test**: Schedule a meeting, confirm it appears in the calendar, and delete it to ensure removal.

### Step 27: Set Up Call Initiation

- **Instructions**: Integrate Twilio for call initiation at the scheduled time, triggered by a Lambda function.
- **Test**: Schedule a call, wait for the time, and confirm a call is initiated.

### Step 28: Implement LLM Conversation Flow

- **Instructions**: Use Claude LLM to drive a conversation about the user's schedule and tasks during the call, following this structure:
  1. Greeting and Context: "Hi [User], how's your day going?"
  2. Schedule Review: "You have [event] tomorrow—any priorities to discuss?"
  3. Preparation Suggestions: "For your meeting with [X], consider reviewing [Y]."
  4. Proactive Suggestions: "It's been a while since you connected with [Z]—should we schedule that?"
  5. Closing: "To recap, your action items are [list]. Next meeting on [date]?"
- **Test**: Participate in a call, verify the LLM asks relevant questions and provides suggestions.

### Step 29: Transcribe and Save Meeting

- **Instructions**: Transcribe the call using Twilio, save it as a note, and tag it with the LLM.
- **Test**: Complete a call, check that a note is created with transcription and appropriate tags.

## Phase 12: Offline Support

### Step 30: Implement IndexedDB Storage

- **Instructions**: Store notes in IndexedDB when offline using a library like `idb`:

  ```javascript
  import { openDB } from "idb";

  const initDB = async () => {
    return openDB("notes-db", 1, {
      upgrade(db) {
        db.createObjectStore("notes", { keyPath: "id" });
        db.createObjectStore("syncQueue", { keyPath: "id" });
      },
    });
  };

  const saveNoteLocally = async (note) => {
    const db = await initDB();
    await db.put("notes", note);
  };
  ```

- **Test**: Go offline, create a note, and verify it's saved locally in IndexedDB.

### Step 31: Add Synchronization Logic

- **Instructions**: Sync IndexedDB with DynamoDB when online, handling conflicts with a last-write-wins strategy:

  ```javascript
  const syncNotes = async () => {
    const db = await initDB();
    const syncQueue = await db.getAll("syncQueue");

    for (const item of syncQueue) {
      try {
        // Sync with Amplify Data
        await client.models.Note.save(item.note);

        // Remove from sync queue
        await db.delete("syncQueue", item.id);
      } catch (error) {
        console.error("Error syncing note:", error);
      }
    }
  };

  // Listen for online events
  window.addEventListener("online", syncNotes);
  ```

- **Test**: Reconnect after editing offline, confirm the note syncs to the server without data loss.

## Phase 13: Final Touches

### Step 32: Optimize with Next.js Features

- **Instructions**: Use SSR for note pages, dynamic imports for heavy components, and `next/image` for media.
- **Test**: Measure page load time (under 2 seconds), confirm images are optimized, and verify no over-fetching.

### Step 33: Set Up Code Quality Tools

- **Instructions**: Configure ESLint and Prettier, add inline docs for complex logic, and organize code into `src/features/`.
- **Test**: Run linters with no errors, review a file for docs, and confirm modular structure.

### Step 34: Write Tests

- **Instructions**: Add Jest unit tests for `NoteEditor.js` and Cypress E2E tests for note creation/collaboration workflows.
- **Test**: Run tests, achieve 80%+ coverage, and verify key user flows work end-to-end.

### Step 35: Configure CI/CD with Amplify

- **Instructions**: Set up hosting in the Amplify Console to enable automatic builds and deployments from Git:
  ```typescript
  // amplify.yml
  version: 1
  frontend:
    phases:
      preBuild:
        commands:
          - npm ci
      build:
        commands:
          - npm run build
    artifacts:
      baseDirectory: .next
      files:
        - '**/*'
  ```
- **Test**: Push a change, confirm the build succeeds, and verify the app updates online.

### Step 36: Implement Note Version History

- **Instructions**: Update the data schema to add a `NoteVersion` model for tracking historical versions of notes:

  ```typescript
  // Update schema in data/resource.ts
  const schema = a
    .schema({
      // ... existing models

      NoteVersion: a.model({
        id: a.id().required(),
        noteId: a.id().required(),
        content: a.string().required(),
        timestamp: a.datetime().required(),
        createdBy: a.id().required(),
        note: a.belongsTo("Note"),
      }),
    })
    .authorization((allow) => [
      allow.owner(),
      // other authorization rules
    ]);
  ```

  Create versions on significant changes or timed intervals (every 5 minutes).

- **Test**: Edit a note multiple times, verify versions are created, and confirm you can view and restore previous versions.

### Step 37: Add User Preferences and Settings

- **Instructions**: Update the data schema to add a `UserSettings` model for storing user preferences:

  ```typescript
  // Update schema in data/resource.ts
  const schema = a
    .schema({
      // ... existing models

      UserSettings: a.model({
        id: a.id().required(),
        userId: a.id().required(),
        theme: a.string(),
        notificationPreferences: a.json(),
        defaultNoteType: a.enum(["MEETING", "READING", "THINKING"]),
        editorConfig: a.json(),
      }),
    })
    .authorization((allow) => [
      allow.owner(),
      // other authorization rules
    ]);
  ```

- **Test**: Change settings like theme or default note type and verify they persist across sessions.
