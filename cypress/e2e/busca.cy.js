// Casos do roteiro do 1º bimestre (Desafio 3), numeração mantida.
// Área: busca do site (guarapuava.camporeal.edu.br)
import Resultado from "../support/pages/ResultadoBuscaPage";

describe("Busca do site", () => {
  beforeEach(function () {
    cy.fixture("busca").as("dados");
  });

  it("TC02 - busca por termo comum (Direito) mostra resultados relacionados", function () {
    const { termo, parametroUrl, regexTitulo } = this.dados.comum;
    cy.pesquisar(termo);

    cy.url().should("include", parametroUrl);
    Resultado.titulo().should("exist");
    Resultado.cards().should("have.length.greaterThan", 0);
    Resultado.titulosDosCards().then(($titulos) => {
      expect($titulos.text()).to.match(new RegExp(regexTitulo, "i"));
    });
  });

  it("TC07 - busca vazia não trava e pede para digitar algo", function () {
    const { termo, parametroUrl, mensagem } = this.dados.vazia;
    cy.pesquisar(termo);

    cy.url().should("include", parametroUrl);
    Resultado.mensagemVazia().should("contain", mensagem);
    Resultado.cards().should("not.exist");
  });

  it("TC08 - termo muito grande (250 caracteres) não quebra a página", function () {
    const { caractere, tamanho } = this.dados.grande;
    const termo = caractere.repeat(tamanho);
    cy.pesquisar(termo);

    Resultado.mensagemSemResultado().should("contain", this.dados.semResultado.mensagem);
    Resultado.mensagemSemResultado().invoke("text").should("include", termo);
    Resultado.cards().should("not.exist");
  });

  it("TC14 - emoji na busca é tratado sem travar", function () {
    const { termo } = this.dados.emoji;
    cy.pesquisar(termo);

    Resultado.mensagemSemResultado().should("contain", this.dados.semResultado.mensagem);
    // O WordPress troca o emoji por <img alt="🎓">, então conferimos o HTML.
    Resultado.mensagemSemResultado().invoke("html").should("include", termo);
    cy.url().should("include", encodeURIComponent(termo));
  });
});
