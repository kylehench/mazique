import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/mazique',
  server: {
    proxy: {
      '/mazique/api': {
        target: 'http://localhost:8000/',
        rewrite: (path) => path.replace(/^\/mazique/, '')
      }
    }
  }
})
