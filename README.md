# Electron PixiJS Game

An Electron application built with Vite and PixiJS for rendering graphics.

## Project Structure

```
.
├── src/
|   |
|   | # Electron Vite stuff for bundling and building the app correctly.
│   ├── main/           # Electron main process
│   │   └── index.ts    # Main application entry point
│   ├── preload/        # Bridge between main and renderer
│   │   └── index.ts
|   |
|   | # The directory we actually care about. This is where the game belongs.
│   └── renderer/       # Frontend code
│       ├── assets/     # Static assets
│       ├── src/        # Source code
│       └── index.html  # Entry point
|
├── electron.vite.config.ts
└── package.json
```

## Development

### Prerequisites

- Node.js (v18+)
- npm

### Setup

```bash
# Install dependencies
npm install
```

### Running

```bash
# Start the app in development mode
npm run dev
```

### Building

```bash
# Build the app
npm run build

# Preview the built app
npm run preview
```

## Important Notes

### PixiJS Configuration

This project uses PixiJS v8 for rendering. Note that the `pixi.js/unsafe-eval` import is required when using PixiJS with Electron:

```javascript
import 'pixi.js/unsafe-eval';
```

This is needed to handle worker creation and asset loading in Electron's security context.

## Documentation References

- [Electron Vite Development Guide](https://electron-vite.org/guide/dev)
- [PixiJS Getting Started Guide](https://pixijs.com/8.x/guides/basics/getting-started)
