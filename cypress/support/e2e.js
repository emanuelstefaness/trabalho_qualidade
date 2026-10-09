require("./commands");

// Scripts de terceiros do site (analytics, pixels etc.) podem lançar erros
// que não têm relação com o que está sendo testado.
Cypress.on("uncaught:exception", () => false);
