import { defineConfig } from 'vitest/config';
import { angularTestSetup } from '@angular/standalone-test';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setup-tests.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
