# Note-Taking Application Implementation Plan

This plan provides step-by-step instructions to build a feature-rich, collaborative note-taking app using Next.js, Tiptap, Yjs, AWS services, and an LLM for intelligent features. Each step includes a test to ensure proper implementation.

## Phase 1: Project Setup

### Step 1: Initialize the Next.js Project

- **Instructions**: Create a new Next.js project using the create-next-app command with default options.
- **Test**: Navigate to the project directory, run the development server, and verify the default Next.js welcome page loads without errors.

### Step 2: Install Core Dependencies

- **Instructions**: Install the necessary package dependencies:
  - Tiptap packages for the editor functionality
  - Yjs packages for real-time collaboration
  - AWS Amplify for backend services
  - Utility packages including UUID and AWS S3 client
- **Test**: Check package.json to ensure all dependencies are added correctly and run the development server to verify the app still starts without errors.

## Phase 2: Backend Configuration with AWS Amplify Gen 2

### Step 3: Initialize AWS Amplify Gen 2

- **Instructions**: Install AWS Amplify backend packages and initialize the project structure using the Amplify CLI.
- **Test**: Verify the Amplify directory structure is created with the expected files and configurations.

### Step 4: Define Authentication with AWS Cognito

- **Instructions**: Create an authentication resource file to define Cognito settings with email-based login and optional multi-factor authentication.
- **Test**: Launch an Amplify sandbox and verify in the AWS Cognito console that a user pool is created with the correct configuration.

### Step 5: Define GraphQL API with AWS AppSync

- **Instructions**: Create a data resource file to define the GraphQL schema using TypeScript-first schema builder. Implement a domain-driven design approach with:

  - Core entities:
    - Note - Contains title, content (as JSON), type, and relationships to domain entities
    - NoteVersion - For tracking version history with sequential version numbering
  - Domain-specific entities:
    - Person - For people mentioned in notes
    - Project - For projects referenced in notes
    - Company - For companies discussed in notes
    - Book - For book references with title, authors, and year
    - Article - For article references with title, authors, and URL
  - Junction entities for block-level references:
    - PersonNote - Links specific blocks to people with blockId
    - ProjectNote - Links specific blocks to projects with blockId
    - CompanyNote - Links specific blocks to companies with blockId
  - File attachment entities:
    - Resource - For PDFs and images with S3 key, type, summary, and block reference

  Configure secondary indexes for efficient time-based queries and apply owner-based authorization for all models.

- **Test**: Verify the schema using the sandbox and check the AWS AppSync console to confirm the API exists and test queries work correctly.

### Step 6: Set Up File Storage with AWS S3

- **Instructions**: Create a storage resource file to define S3 storage for the application with appropriate access permissions for authenticated users.
- **Test**: Launch the sandbox and check the AWS S3 console to confirm a new bucket is created with the correct configuration.

## Phase 3: User Authentication

### Step 7: Integrate Amplify Auth in the Frontend

- **Instructions**: Create a configuration file to initialize AWS Amplify in the frontend application and import it in the app entry point.
- **Test**: Run the app and ensure it initializes without authentication-related errors.

### Step 8: Create a Login Page

- **Instructions**: Create a login page component using Amplify UI Authenticator to handle sign-up, sign-in, and verification flows.
- **Test**: Navigate to the login page, complete the sign-up process with email verification, and confirm successful login.

### Step 9: Implement Sign-Out Functionality

- **Instructions**: Add a sign-out function and button to the application header that uses Amplify Auth to log users out.
- **Test**: Log in, click the sign-out button, and verify the user is redirected to the login page.

## Phase 4: Note Editor Setup

### Step 10: Create the Note Editor Component

- **Instructions**: Create a note editor component using Tiptap with basic editor functionality.
- **Test**: Render the component on a note page and confirm a basic text editor appears.

### Step 11: Add Markdown Formatting

- **Instructions**: Configure Tiptap to support markdown shortcuts using the starter kit extensions.
- **Test**: Test various markdown patterns (headers, emphasis, lists) and confirm they convert to formatted text.

### Step 12: Implement Slash Command Menu

- **Instructions**: Add a custom Tiptap extension for a slash command menu with formatting options.
- **Test**: Type "/" in the editor, verify the menu appears, select an option, and check that formatting is applied correctly.

## Phase 5: Real-Time Collaboration

### Step 13: Set Up a WebSocket Server

- **Instructions**: Create a WebSocket API using AWS API Gateway with appropriate routes and Lambda handlers for connection, disconnection, and message events.
- **Test**: Launch the sandbox, connect to the WebSocket endpoint, and verify message transmission works.

### Step 14: Integrate Yjs with Tiptap

- **Instructions**: Enhance the note editor to use Yjs for real-time collaboration, connecting to the WebSocket server for synchronization.
- **Test**: Open the same note in two browser windows and verify changes sync in real-time between them.

### Step 15: Add User Awareness

- **Instructions**: Implement cursor awareness to show user names and positions during collaborative editing.
- **Test**: Edit a note as different users and confirm each user's cursor is visible with their name.

## Phase 6: Note Sharing and Mentions

### Step 16: Implement Note Sharing

- **Instructions**: Create functionality to share notes with other users by generating unique URLs and updating permissions in the database.
- **Test**: Share a note, access it as another user, and verify appropriate access based on permissions.

### Step 17: Add Mention Functionality

- **Instructions**: Extend the editor to support @mentions of users with a suggestion dropdown.
- **Test**: Type "@", select a user, and confirm the mention appears in the note and triggers appropriate notifications.

## Phase 7: Media Integration

### Step 18: Enable File Uploads to S3

- **Instructions**: Add a file upload component to the editor that stores files in S3 using Amplify Storage.
- **Test**: Upload an image, verify it's stored in S3, and confirm retrieval works.

### Step 19: Display Media Previews

- **Instructions**: Create preview components for uploaded media files with ability to view full-screen.
- **Test**: Upload various file types and verify previews render correctly and can be expanded.

## Phase 8: Automatic Tagging and Resource Linking

### Step 20: Set Up an LLM API Endpoint

- **Instructions**: Create a Lambda function to call Claude (or another LLM) on AWS Bedrock for content analysis.
- **Test**: Send sample content to the endpoint and verify it returns appropriate tag suggestions.

### Step 21: Implement Automatic Tagging

- **Instructions**: Create a system to analyze content blocks and suggest tags based on LLM analysis.
- **Test**: Type content that should trigger certain tags and verify they appear for user approval.

### Step 22: Add Resource Linking

- **Instructions**: Implement detection of resource mentions and link them to existing resources or suggest new ones.
- **Test**: Reference known and new resources in content and verify proper linking and suggestions.

## Phase 9: File Analysis

### Step 23: Generate File Summaries

- **Instructions**: Send uploaded files to the LLM API for automatic summary generation.
- **Test**: Upload various file types and verify summaries are generated and editable.

## Phase 10: Note Types and Initial Tagging

### Step 24: Add Note Type Selection

- **Instructions**: Create a type selector for new notes (meeting, reading, thinking) that affects storage and display.
- **Test**: Create notes of different types and verify the type is saved and reflected in the interface.

### Step 25: Enable Initial Tagging

- **Instructions**: Add ability to tag notes during creation with both manual tags and LLM suggestions.
- **Test**: Create a note with initial tags and verify both manual and suggested tags are applied.

## Phase 11: "Chief of Staff" Meeting

### Step 26: Integrate Calendar API

- **Instructions**: Create Lambda functions to integrate with a calendar API for scheduling and managing meetings.
- **Test**: Schedule and delete test meetings and verify calendar synchronization.

### Step 27: Set Up Call Initiation

- **Instructions**: Integrate a service like Twilio to initiate calls at scheduled meeting times.
- **Test**: Schedule a call and verify it triggers at the designated time.

### Step 28: Implement LLM Conversation Flow

- **Instructions**: Create a conversational flow using an LLM to guide the "Chief of Staff" meeting discussion.
- **Test**: Participate in a test meeting and verify the conversation follows the designed structure.

### Step 29: Transcribe and Save Meeting

- **Instructions**: Implement automatic transcription of calls and saving as notes with appropriate tagging.
- **Test**: Complete a call and verify a properly formatted and tagged note is created.

## Phase 12: Offline Support

### Step 30: Implement IndexedDB Storage

- **Instructions**: Set up local storage using IndexedDB for offline note creation and editing.
- **Test**: Disconnect from the network, create and edit notes, and verify they're saved locally.

### Step 31: Add Synchronization Logic

- **Instructions**: Implement logic to synchronize local changes with the backend when connectivity is restored.
- **Test**: Make changes offline, reconnect, and verify changes are properly synchronized.

## Phase 13: Final Touches

### Step 32: Optimize with Next.js Features

- **Instructions**: Implement performance optimizations using Next.js features like SSR, dynamic imports, and image optimization.
- **Test**: Measure performance metrics and verify improvements.

### Step 33: Set Up Code Quality Tools

- **Instructions**: Configure linting, formatting, and documentation tools for code quality.
- **Test**: Run linters and verify code meets quality standards.

### Step 34: Write Tests

- **Instructions**: Add unit and end-to-end tests for critical application flows.
- **Test**: Run the test suite and verify coverage meets targets.

### Step 35: Configure CI/CD with Amplify

- **Instructions**: Set up continuous integration and deployment pipelines using Amplify Hosting.
- **Test**: Push a change and verify automatic building and deployment.

### Step 36: Implement Note Version History

- **Instructions**: Create functionality to track and display note version history with ability to restore previous versions.
- **Test**: Edit a note multiple times and verify version history capture and restoration works.

### Step 37: Add User Preferences and Settings

- **Instructions**: Create a user settings interface for preferences like theme, notifications, and default note type.
- **Test**: Change settings and verify they persist across sessions.
