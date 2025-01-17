import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteEnvs } from 'vite-envs'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react(), viteEnvs()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    preview: {
      host: true,
      port: 3010,
    },
    define: {
      'process.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
      'process.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(env.VITE_GOOGLE_MAPS_API_KEY),
    },
    build: {
      outDir: 'dist', // Explicitly define the output directory as 'dist'
    },
  }
})
