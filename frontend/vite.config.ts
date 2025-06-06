import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    fs: {
      strict: false,
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // ? this is the key fix:
  build: {
    outDir: 'dist',
  },
  // ? fallback route
  preview: {
    open: true,
    port: 4173,
  },
});
