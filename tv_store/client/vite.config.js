import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['dayjs'], // Đảm bảo rằng Vite bao gồm "dayjs" trong quá trình tối ưu hóa
  },
  plugins: [tailwindcss(), react()],
})
