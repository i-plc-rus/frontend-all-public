import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      // Excluded shared/ui because it's shadcn UIKIT components
      exclude: ['**/browser', 'src/shared/ui'],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/'],
    },
  },
});
