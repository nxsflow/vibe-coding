# NXSFlow App

This is the note taking app that helps you nurture your relationships and achieve your goals.

## Prerequisites

You need to add this line to `~/.zshrc`:

```zsh
export TIPTAP_PRO_TOKEN=THE_TOKEN
```

Replace `THE_TOKEN` with the token you find on the [TipTap Settings](https://cloud.tiptap.dev/pro-extensions).

When deploying to AWS Amplify make sure you add `TIPTAP_PRO_TOKEN` as an environment variable so the TipTap Pro packages can be installed when deploying changes.

## Development

Run the development server:

```zsh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
