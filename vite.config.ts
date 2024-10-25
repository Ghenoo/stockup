import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shadcn/ui': '/node_modules/@shadcn/ui',
      '@': resolve(__dirname, 'src'),
    },
  },
});
