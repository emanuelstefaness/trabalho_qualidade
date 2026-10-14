require("./commands");

// Scripts de terceiros do site (analytics, pixels etc.) podem lançar erros
// que não têm relação com o que está sendo testado.
Cypress.on("uncaught:exception", () => false);

// Print ao final de cada teste que passou (evidência), salvo em evidencias/prints
afterEach(function () {
  if (this.currentTest.state === "passed") {
    const nome = this.currentTest.title.split(" - ")[0];
    cy.screenshot(nome, { capture: "viewport", overwrite: true });
  }
});
