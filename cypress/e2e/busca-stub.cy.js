// Cenários com stub (cy.intercept): a resposta da busca é controlada pelo teste,
// sem depender do conteúdo atual do site. Um cenário de sucesso e um de falha.
import Resultado from "../support/pages/ResultadoBuscaPage";

const HTML = { "content-type": "text/html; charset=utf-8" };

describe("Busca com stub", () => {
  beforeEach(function () {
    cy.fixture("busca-stub").as("dados");
  });

  it("STUB01 - sucesso: servidor devolve 2 resultados e a página os exibe", function () {
    const { termo, sucesso } = this.dados;
    cy.intercept(
      { method: "GET", pathname: "/", query: { s: termo } },
      { statusCode: sucesso.statusCode, fixture: "busca-resultado.html", headers: HTML }
    ).as("buscaStub");

    cy.pesquisar(termo);

    cy.wait("@buscaStub").its("response.statusCode").should("eq", sucesso.statusCode);
    Resultado.titulo().should("exist");
    Resultado.cards().should("have.length", sucesso.totalCards);
    Resultado.titulosDosCards().each(($t) => {
      expect($t.text()).to.match(new RegExp(sucesso.regexTitulo, "i"));
    });
  });

  it("STUB02 - falha: servidor responde 500 e nenhum resultado é exibido", function () {
    const { termo, falha } = this.dados;
    cy.intercept(
      { method: "GET", pathname: "/", query: { s: termo } },
      { statusCode: falha.statusCode, fixture: "busca-erro.html", headers: HTML }
    ).as("buscaFalha");

    cy.pesquisar(termo);

    cy.wait("@buscaFalha").its("response.statusCode").should("eq", falha.statusCode);
    Resultado.mensagemDeErro().should("contain", falha.mensagem);
    Resultado.cards().should("not.exist");
  });
});
