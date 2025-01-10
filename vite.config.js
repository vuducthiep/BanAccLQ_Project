import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/BanAccLQ_Project/',  // Thay thế "BanAccLQ_Project" bằng tên repo của bạn
})
