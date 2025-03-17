# Product Design Document: Note-Taking App

## Overview

The Note-Taking App is a modern, intuitive tool designed to capture and organize your thoughts, ideas, and information with the ease and security of writing on paper. It combines simple formatting tools, an intelligent Large Language Model (LLM) for contextual understanding, and a “Chief of Staff” meeting feature to enhance productivity. This app supports collaboration, media integration, smart organization, and offers personalized scheduling and task management assistance through interactive meetings.

## Key Features

### 1. Note Creation and Editing

- **Markdown Support**: Users can format their notes using simple markdown commands, such as headers, lists, bold, or italic text, for a lightweight and familiar editing experience.
- **Context Menu**: Typing a slash (/) opens a context menu with quick formatting options and additional commands, providing an efficient alternative to markdown.
- **Media Integration**: Users can add images and PDF files to their notes. The editor displays simple previews of these files, with an option to open them in full screen for a detailed view.

### 2. Collaboration

- **Sharing Notes**: Users can share their notes with others, enabling collaborative editing and viewing to foster teamwork and communication.
- **Mentions**: Typing @ followed by a username allows users to mention others within their notes, enhancing collaboration by drawing attention to specific individuals.

### 3. Tagging and Resource Management

- **Automatic Tagging**: An LLM analyzes each block of content—a paragraph, image, file, or list—and automatically applies relevant tags, such as projects, people, books, articles, or companies.
- **User Control**: Users can choose to accept, reject, or delete automatically applied tags. They can also manually add or remove tags to customize organization.
- **Resource Linking**: The LLM identifies if a block relates to an existing resource (e.g., a person or project) and links it accordingly. If no connection is found, it may suggest creating a new resource.
- **Visual Indicators**: The app uses clear visual cues (e.g., colors or icons) to show:
    - When tags are applied to a block.
	- When new resources are suggested or created.
    - The status of resource links: accepted, manually linked, rejected, or pending decision.

### 4. File and Image Analysis

- **LLM Analysis**: For images and PDF files, the LLM generates a summary or description, displayed alongside the preview and stored within the block.
- **User Editing**: Users can review and edit these summaries or descriptions to ensure accuracy and relevance.
- **Tagging Based on Analysis**: The LLM tags images and files based on the generated summary or description, aiding in organization and retrieval.

### 5. Note Types and Initial Tagging

- **Note Types**: When creating a new note, users specify its purpose: a meeting, something read, or general thinking. This contextualizes the note from the start.
- **Initial Tagging**: Users can manually tag the note based on anticipated content, such as meeting participants or the book being read, setting the stage for organization.
- **LLM Propagation**: The LLM suggests additional tags or resources by drawing on previous interactions, such as recent notes about a person, company, or project, enhancing connectivity and relevance.

### 6. “Chief of Staff” Meeting

- **Scheduling and Initiation**:
    - The app reserves a time slot on the user's calendar for a “Chief of Staff” meeting.
    - At the scheduled time, it initiates a call (phone or video) to begin the session.
- **Interactive Assistance**:
    - The “Chief of Staff” (powered by the LLM) asks the user about their day or week, depending on the meeting’s scope.
    - It reviews the user's upcoming events and tasks, helping them organize their schedule.
    - It reminds the user of key topics to discuss in upcoming meetings and suggests preparations or delegations needed beforehand.
    - At the meeting’s end, it proactively:
        - Suggests reconnecting with a contact the user hasn't engaged with recently but who might be relevant.
        - Brings up a dormant project, asking if the user wishs to continue and discussing next steps to make progress.
- **Note Generation**:
    - The entire meeting is transcribed automatically and saved as a new note in the app.
    - The note is tagged and linked to relevant resources (e.g., people, projects) for easy reference later.

### 7. User Experience

- **Intimate Feel**: The app mirrors the intimate, secure experience of writing on paper, offering a personal, blank canvas for thoughts, ideas, and actions.
- **“Chief of Staff”-Like Interactions**: LLM contributions feel like a helpful assistant providing timely, relevant suggestions—akin to handing over the exact file needed for the moment—without disrupting the user’s flow. 
- **Offline Accessibility**: Users can create and edit notes without an internet connection, with changes syncing automatically when connectivity is restored, ensuring constant access to their work.
