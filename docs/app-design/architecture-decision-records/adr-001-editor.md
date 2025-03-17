# ADR 001: Choose Editor Framework for Note-Taking App

## Status

Accepted

## Context

The note-taking app requires a robust editor framework as its core component. The editor must support the following key requirements:

- **Rich text editing** with markdown support for formatting.
- **Media embedding**, such as images and PDFs, within notes.
- **Custom extensions**, including tags and LLM-driven features (e.g., AI-powered suggestions or analysis).
- **Offline functionality** to ensure usability without an internet connection.
- **Integration** with Next.js (frontend) and a backend like AWS or Firebase.

The choice of editor framework will significantly impact development speed, feature implementation, and long-term maintainability.

## Decision

We will use **Tiptap** as the editor framework for the note-taking app.

## Consequences

### Positive
- **Faster Development**: Tiptap’s simpler API and pre-built components (e.g., for markdown and media embeds) enable quick implementation of core features.
- **Sufficient Extensibility**: Built on ProseMirror, Tiptap provides access to advanced customization for features like tags and LLM integration.
- **Offline Support**: As a client-side library, Tiptap works naturally in offline scenarios, aligning with a local-first design.
- **Good Support**: Tiptap offers solid documentation and a growing community, providing resources and examples for common use cases.

### Negative
- **Limited Flexibility**: Tiptap is slightly less flexible than raw ProseMirror for highly custom or niche requirements.
- **Smaller Community**: Compared to more established frameworks like ProseMirror or Slate, Tiptap has a smaller user base, which could limit available third-party resources.

## Options Considered

Below are the editor frameworks evaluated, along with their strengths and weaknesses:

1. **ProseMirror**
   - *Description*: A powerful toolkit for building rich text editors, used by apps like Notion.
   - *Pros*:
     - Highly extensible, ideal for complex features like custom nodes or real-time collaboration.
     - Strong community and proven in production.
   - *Cons*:
     - Steep learning curve and more complex initial setup.
     - Requires additional effort for basic features.

2. **Tiptap**
   - *Description*: A user-friendly wrapper around ProseMirror with a simpler API.
   - *Pros*:
     - Easier to use than ProseMirror while retaining its extensibility.
     - Pre-built components accelerate development.
   - *Cons*:
     - Less flexible than raw ProseMirror for very advanced customizations.
     - Smaller community than ProseMirror or Slate.

3. **Slate**
   - *Description*: A flexible rich text editor framework with a focus on customizability.
   - *Pros*:
     - Highly customizable with good documentation.
     - Active community support.
   - *Cons*:
     - More opinionated structure may constrain some use cases.
     - Offline support requires additional configuration.

4. **Quill**
   - *Description*: A lightweight editor focused on simplicity and ease of use.
   - *Pros*:
     - Quick to set up and lightweight for basic needs.
     - Good performance for simple documents.
   - *Cons*:
     - Limited extensibility makes it challenging to implement custom features like tags or LLM integration.
     - Not suited for complex document structures.

## Rationale

Tiptap was selected because it strikes an optimal balance between **ease of use** and **robustness** for the note-taking app’s requirements. Its simpler API and pre-built components allow for rapid development of essential features like markdown support and media embedding, while its ProseMirror foundation ensures extensibility for custom needs (e.g., tags and LLM-driven functionality). Tiptap’s client-side nature supports offline use out of the box, and its integration with Next.js is straightforward. Although ProseMirror offers more raw power and Slate provides strong flexibility, Tiptap’s combination of simplicity, sufficient customization, and good documentation makes it the most practical choice for this project. If future needs exceed Tiptap’s capabilities, we can leverage ProseMirror’s underlying API directly.

This decision aligns with the project’s goals of efficient development, feature support, and a local-first approach, ensuring a solid foundation for the editor.
