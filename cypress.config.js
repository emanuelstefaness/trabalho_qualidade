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
    // Sem retentativas: um teste instável precisa falhar à vista, não passar na 2ª tentativa.
    retries: { runMode: 0, openMode: 0 },
  },
});
