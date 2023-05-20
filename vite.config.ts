import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [tsConfigPaths()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'GPT Code Helper',
      fileName: () => `main.js`,
    },
  },
})
