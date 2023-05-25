import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr"
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config();
const { VITE_URL_BASENAME } = process.env

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: VITE_URL_BASENAME,
  server: {
    proxy: {
      [`${VITE_URL_BASENAME}/api`]: {
        target: 'http://localhost:8000/',
        rewrite: (path) => path.replace(RegExp(VITE_URL_BASENAME), '')
      }
    }
  }
})