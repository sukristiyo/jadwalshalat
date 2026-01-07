import { defineConfig } from 'vite';

export default defineConfig({
  // Ensure the root is the current directory (default, but explicit is good)
  root: './',
  // Ensure the server listens on all interfaces if needed, or specific port behavior
  server: {
    port: 5173,
    strictPort: false, // Try next port if 5173 is taken
  },
  build: {
    outDir: 'dist',
  }
});
