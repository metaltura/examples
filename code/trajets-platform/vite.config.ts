import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The client on 8082 in development, the server on 8081: Vite passes the
// realtime link, the sign-in and the API on to the server. `npm start`
// builds into `dist/public`, which the server serves itself.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8082,
    proxy: {
      '/socket.io': { target: 'http://localhost:8081', ws: true },
      '/auth': 'http://localhost:8081',
      '/api': 'http://localhost:8081'
    }
  },
  build: { outDir: 'dist/public', emptyOutDir: true }
})
