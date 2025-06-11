import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '172.237.149.11', // Your host setting is fine
    port: 5173,
    // The proxy is essential for API calls to work in development
    proxy: {
      '/api': {
        target: 'http://172.237.149.11:3000', // Forward requests to the backend
        changeOrigin: true,
        secure: false,
      }
    }
  },
})