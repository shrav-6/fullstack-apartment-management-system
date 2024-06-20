import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

<<<<<<< HEAD
// https://vitejs.dev/config/
=======
>>>>>>> mer/main
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: './index.jsx',
    },
  },
  server: {
<<<<<<< HEAD
    port: 3000,
=======
    host: '0.0.0.0',
>>>>>>> mer/main
  },
});
