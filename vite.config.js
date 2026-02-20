import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Replace 'YOUR_REPO_NAME' with your actual repository name
  // Example: if your repo is github.com/mituu/DragonsDen, use '/DragonsDen/'
  base: 'Dragons-Den-Alliance', 
})
