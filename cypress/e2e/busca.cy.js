// Casos do roteiro do 1º bimestre (Desafio 3), numeração mantida.
// Área: busca do site (guarapuava.camporeal.edu.br)
import Resultado from "../support/pages/ResultadoBuscaPage";

describe("Busca do site", () => {
  it("TC02 - busca por termo comum (Direito) mostra resultados relacionados", () => {
    cy.pesquisar("Direito");

    cy.url().should("include", "s=Direito");
    Resultado.titulo().should("exist");
    Resultado.cards().should("have.length.greaterThan", 0);
    Resultado.titulosDosCards().then(($titulos) => {
      expect($titulos.text()).to.match(/direito/i);
    });
  });

  it("TC07 - busca vazia não trava e pede para digitar algo", () => {
    cy.pesquisar("");

    cy.url().should("include", "s=");
    Resultado.mensagemVazia().should("contain", "Digite algo para pesquisar.");
    Resultado.cards().should("not.exist");
  });

  it("TC08 - termo muito grande (250 caracteres) não quebra a página", () => {
    const termo = "A".repeat(250);
    cy.pesquisar(termo);

    Resultado.mensagemSemResultado().should("contain", "Nenhum resultado para");
    Resultado.mensagemSemResultado().invoke("text").should("include", termo);
    Resultado.cards().should("not.exist");
  });

  it("TC14 - emoji na busca é tratado sem travar", () => {
    cy.pesquisar("🎓");

    Resultado.mensagemSemResultado().should("contain", "Nenhum resultado para");
    // O WordPress troca o emoji por <img alt="🎓">, então conferimos o HTML.
    Resultado.mensagemSemResultado().invoke("html").should("include", "🎓");
    cy.url().should("include", encodeURIComponent("🎓"));
  });
});
