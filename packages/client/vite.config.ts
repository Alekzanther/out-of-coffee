import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'build',
  },
  root: 'src',
  plugins: [react()],
  resolve: {
    alias: {
      api: resolve(__dirname, './src/api'),
      assets: resolve(__dirname, './src/assets'),
      components: resolve(__dirname, './src/components'),
      generated: resolve(__dirname, './src/generated'),
      helpers: resolve(__dirname, './src/helpers'),
      mutations: resolve(__dirname, './src/mutations'),
      queries: resolve(__dirname, './src/queries'),
      views: resolve(__dirname, './src/views'),
    },
  },
});
