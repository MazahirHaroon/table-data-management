import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      src: '/src',
      '@assets': '/assets',
      '@pages': '/src/pages/index',
      '@components': '/src/components',
      '@constants': '/src/constants',
      '@utils': '/src/utils',
      '@typesData': '/src/typesData',
    },
  },
});
