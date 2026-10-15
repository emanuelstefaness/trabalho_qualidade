// Casos do roteiro do 1º bimestre (Desafio 3), numeração mantida.
// Área: busca do site (guarapuava.camporeal.edu.br)

const pesquisar = (termo) => {
  cy.abrir("/");
  if (termo) {
    cy.dc("busca-input").first().type(termo, { force: true });
  }
  cy.dc("busca-submit").first().click({ force: true });
  cy.marcarDataCy();
};

describe("Busca do site", () => {
  it("TC02 - busca por termo comum (Direito) mostra resultados relacionados", () => {
    pesquisar("Direito");

    cy.url().should("include", "s=Direito");
    cy.dc("busca-titulo").should("exist");
    cy.dc("busca-card").should("have.length.greaterThan", 0);
    cy.dc("busca-card-titulo").then(($titulos) => {
      expect($titulos.text()).to.match(/direito/i);
    });
  });

  it("TC07 - busca vazia não trava e pede para digitar algo", () => {
    pesquisar("");

    cy.url().should("include", "s=");
    cy.dc("busca-msg-vazia").should("contain", "Digite algo para pesquisar.");
    cy.dc("busca-card").should("not.exist");
  });

  it("TC08 - termo muito grande (250 caracteres) não quebra a página", () => {
    const termo = "A".repeat(250);
    pesquisar(termo);

    cy.dc("busca-msg-sem-resultado").should("contain", "Nenhum resultado para");
    cy.dc("busca-msg-sem-resultado").invoke("text").should("include", termo);
    cy.dc("busca-card").should("not.exist");
  });

  it("TC14 - emoji na busca é tratado sem travar", () => {
    pesquisar("🎓");

    cy.dc("busca-msg-sem-resultado").should("contain", "Nenhum resultado para");
    // O WordPress troca o emoji por <img alt="🎓">, então conferimos o HTML.
    cy.dc("busca-msg-sem-resultado").invoke("html").should("include", "🎓");
    cy.url().should("include", encodeURIComponent("🎓"));
  });
});
