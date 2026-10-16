import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/qilife-app/', // <--- Asegúrate de que coincida con el nombre de tu repositorio en GitHub
})