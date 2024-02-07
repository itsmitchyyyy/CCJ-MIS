import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const portNumber = Number(process.env.PORT);
const port = !isNaN(portNumber) ? portNumber : 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port,
    host: process.env.NODE_ENV === 'development',
    strictPort: true,
  },
});
