const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guarapuava.camporeal.edu.br",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    video: true,
    screenshotsFolder: "evidencias/prints",
    trashAssetsBeforeRuns: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    retries: { runMode: 1, openMode: 0 },
  },
});
