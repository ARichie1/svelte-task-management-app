/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',           // Run store/unit tests in Node
    globals: true,                 // Allows using describe/it/expect without imports
    include: ['tests/**/*.test.ts'], // Only include your store/unit tests
    setupFiles: [],                // Optional, can include global mocks if needed
    coverage: {
      reporter: ['text', 'lcov'],  // Optional coverage reporters
    },
  },
});
