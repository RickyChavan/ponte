import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs, so the build works at a domain root and under a sub-path such as github.io/ponte/.
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    // Forward the contact form to the Python backend once it exists.
    proxy: { '/api': 'http://127.0.0.1:8000' },
  },
})
