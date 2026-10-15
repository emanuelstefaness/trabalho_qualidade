// Caso do roteiro do 1º bimestre (Desafio 3), numeração mantida.
// Área: navegação pelo menu principal

describe("Navegação pelo menu", () => {
  it("TC04 - menu Cursos > Direito abre a página do curso", () => {
    cy.abrir("/");

    cy.dc("menu-cursos").first().trigger("mouseover");
    cy.dc("menu-curso-direito").first().click({ force: true });

    cy.url().should("include", "/cursos/direito");
    cy.title().should("match", /direito/i);
    cy.get("body").should("contain.text", "Direito");
  });
});
