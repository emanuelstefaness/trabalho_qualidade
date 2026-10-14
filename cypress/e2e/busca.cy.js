describe("Busca do site", () => {
  it("CT01 - busca por termo existente lista notícias relacionadas", () => {
    cy.abrir("/");
    cy.dc("busca-input").first().type("vestibular", { force: true });
    cy.dc("busca-submit").first().click({ force: true });

    cy.url().should("include", "s=vestibular");
    cy.marcarDataCy();
    cy.dc("busca-titulo").should("exist");
    cy.dc("busca-card").should("have.length.greaterThan", 0);
    cy.dc("busca-card-titulo")
      .first()
      .invoke("text")
      .should("match", /vestibular/i);
  });
});

describe("Contato", () => {
  it("CT02 - página de contato exibe telefone e link do formulário externo", () => {
    cy.abrir("/contato");

    cy.dc("contato-telefone").first().should("contain", "(42) 3621");
    cy.dc("contato-link-form")
      .first()
      .should("have.attr", "href")
      .and("match", /^https:\/\/forms\.gle\//);
    cy.url().should("include", "/contato");
    cy.dc("contato-telefone").first().scrollIntoView();
  });
});
