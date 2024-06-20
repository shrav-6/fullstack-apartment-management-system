import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: './index.jsx',
    },
  },
  server: {
    host: '0.0.0.0',
  },
});
