import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.SANITY_TOKEN': JSON.stringify(process.env.SANITY_TOKEN),
  },
  plugins: [react()],
})
