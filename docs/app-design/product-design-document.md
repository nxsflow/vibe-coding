# Product Design Document: Note-Taking App

## Overview

The Note-Taking App is a modern, intuitive platform designed to capture and organize thoughts, ideas, and information in a way that feels as natural and secure as writing on paper. By integrating simple formatting tools and an intelligent Large Language Model (LLM) for contextual understanding, the app enhances the note-taking experience with automatic tagging, resource linking, and media analysis. It supports collaboration, media integration, and smart organization, making it an ideal tool for individuals and teams to streamline their note-taking process.

## Key Features

### 1. Note Creation and Editing

- Markdown Support: Users can format their notes using simple markdown commands, such as headers, lists, bold, or italic text, for a lightweight and familiar editing experience.
- Context Menu: Typing a slash (/) opens a context menu with quick formatting options and additional commands, providing an efficient alternative to markdown.
- Media Integration: Users can add images and PDF files to their notes. The editor displays simple previews of these files, with an option to open them in full screen for a detailed view.

### 2. Collaboration

- Sharing Notes: Users can share their notes with others, enabling collaborative editing and viewing to foster teamwork and communication.
- Mentions: Typing @ followed by a username allows users to mention others within their notes, enhancing collaboration by drawing attention to specific individuals.

### 3. Tagging and Resource Management

- Automatic Tagging: An LLM analyzes each block of content—a paragraph, image, file, or list—and automatically applies relevant tags, such as projects, people, books, articles, or companies.
- User Control: Users can choose to accept, reject, or delete automatically applied tags. They can also manually add or remove tags to customize organization.
- Resource Linking: The LLM identifies if a block relates to an existing resource (e.g., a person or project) and links it accordingly. If no connection is found, it may suggest creating a new resource.
- Visual Indicators: The app uses clear visual cues (e.g., colors or icons) to show:
    - When tags are applied to a block.
	- When new resources are suggested or created.
    - The status of resource links: accepted, manually linked, rejected, or pending decision.

### 4. File and Image Analysis

- LLM Analysis: For images and PDF files, the LLM generates a summary or description, displayed alongside the preview and stored within the block.
- User Editing: Users can review and edit these summaries or descriptions to ensure accuracy and relevance.
- Tagging Based on Analysis: The LLM tags images and files based on the generated summary or description, aiding in organization and retrieval.

### 5. Note Types and Initial Tagging

- Note Types: When creating a new note, users specify its purpose: a meeting, something read, or general thinking. This contextualizes the note from the start.
- Initial Tagging: Users can manually tag the note based on anticipated content, such as meeting participants or the book being read, setting the stage for organization.
- LLM Propagation: The LLM suggests additional tags or resources by drawing on previous interactions, such as recent notes about a person, company, or project, enhancing connectivity and relevance.

### 6. User Experience

- Intimate Feel: The app mirrors the intimate, secure experience of writing on paper, offering a personal, blank canvas for thoughts, ideas, and actions.
- Assistant-Like Interactions: LLM contributions feel like a helpful assistant providing timely, relevant suggestions—akin to handing over the exact file needed for the moment—without disrupting the user’s flow.
- Offline Accessibility: Users can create and edit notes without an internet connection, with changes syncing automatically when connectivity is restored, ensuring constant access to their work.
