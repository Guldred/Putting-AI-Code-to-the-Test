import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    maxWorkers: 1,
    coverage: {
      provider: 'v8',
      include: ['src/checkout.ts', 'src/discount.ts'],
      reporter: ['text', 'json-summary', 'html'],
      reportsDirectory: 'coverage',
    },
  },
});
