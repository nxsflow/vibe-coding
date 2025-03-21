# Note Editor Component

This directory contains the implementation of the rich text editor using Tiptap.

## Components

- `Editor.tsx`: The main editor component that provides a rich text editing experience using Tiptap.

## Features

- Basic text formatting (bold, italic, headings, lists, etc.) via Tiptap's starter kit.
- Clean, accessible interface with responsive design.
- Customizable via props including initial content, editability, and placeholder text.

## Usage

```tsx
import Editor from '@/components/editor/Editor';

// Simple usage
<Editor onChange={(content) => console.log(content)} />

// With more options
<Editor
  initialContent="<p>Initial content here</p>"
  onChange={(content) => saveContent(content)}
  placeholder="Enter your note here..."
  editable={isEditable}
/>
```

## Props

| Prop             | Type                   | Default             | Description                         |
| ---------------- | ---------------------- | ------------------- | ----------------------------------- |
| `initialContent` | string                 | `''`                | Initial HTML content for the editor |
| `onChange`       | (html: string) => void | `undefined`         | Callback when content changes       |
| `placeholder`    | string                 | `'Start typing...'` | Placeholder text when empty         |
| `editable`       | boolean                | `true`              | Whether the editor is editable      |

## Future Enhancements

- Markdown support
- Slash commands
- Media embedding
- Mentions
- Block-based tagging
- Real-time collaboration
