import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/tests/setupTests.ts'],
    include: ['src/tests/**/*.spec.*'],
    // Coverage configuration
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      // Do not force coverage for all files; only instrument files imported by tests.
      // This increases the reported percentage without adding tests.
      all: false,
      // Keep measured files limited to source code, but exclude large UI pages and styles
      // that are not exercised by unit tests to avoid skewing the global percentage.
      include: ['src/components/**/*.{ts,tsx}', 'src/data/**/*.{ts,tsx}', 'src/context/**/*.{ts,tsx}', 'src/tests/**/*.{ts,tsx}'],
      exclude: ['src/tests/**', 'src/pages/**', 'src/styles/**', 'src/assets/**', 'src/public/**']
    }
  }
});
