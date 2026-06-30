import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' memastikan path asset tetap valid di Vercel, Netlify, maupun sub-folder GH Pages
export default defineConfig({
  base: './',
  plugins: [react()],
});