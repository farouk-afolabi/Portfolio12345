import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // For GitHub Pages  use '/Portfolio12345/'
  build: {
    outDir: 'dist',
    copyPublicDir: true // Ensures CNAME is preserved
  }
})
