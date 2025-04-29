import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@wasp': path.resolve(__dirname, './.wasp/out/sdk/wasp')
    }
  }
});
