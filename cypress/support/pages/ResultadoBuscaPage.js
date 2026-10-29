// Tela: resultado da busca (?s=termo).
class ResultadoBuscaPage {
  titulo() {
    return cy.contains(".elementor-heading-title", "Resultado da pesquisa");
  }

  cards() {
    return cy.get("article.noticia-card");
  }

  titulosDosCards() {
    return cy.get("article.noticia-card .noticia-title");
  }

  mensagemVazia() {
    return cy.contains(".elementor-shortcode p", "Digite algo para pesquisar");
  }

  mensagemSemResultado() {
    return cy.contains(".elementor-shortcode p", "Nenhum resultado para");
  }

  // Usado só nos cenários com stub de falha (resposta 500).
  mensagemDeErro() {
    return cy.get(".erro-servidor");
  }
}

export default new ResultadoBuscaPage();
