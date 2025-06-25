import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: true
  },
  preview: {
    port: 3001
  },
  base: '/mvp/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});