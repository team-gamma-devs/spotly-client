import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
  },
  component: {
    devServer: {
      framework: 'svelte',
      bundler: 'vite',
    },
    supportFile: 'cypress/support/component.ts',
    specPattern: 'cypress/component/**/*.cy.{js,ts}',
    indexHtmlFile: 'cypress/support/component-index.html',
    // Add Vite config integration
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    }
  }
});
