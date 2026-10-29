// Tela: página inicial (cabeçalho com busca + menu principal).
class HomePage {
  campoBusca() {
    return cy.get("form.pill-search input[name='s']").first();
  }

  botaoBuscar() {
    return cy.get("form.pill-search button[type='submit']").first();
  }

  pesquisar(termo) {
    if (termo !== "") {
      this.campoBusca().type(termo, { force: true });
    }
    this.botaoBuscar().click({ force: true });
  }

  menuCursos() {
    return cy.get("ul.mbd-root > li.mbd-parent:has(a[href$='/cursos/direito/'])").first();
  }

  linkCursoDireito() {
    return cy.get("li.mbd-sub-item a[href$='/cursos/direito/']").first();
  }

  abrirCursoDireito() {
    this.menuCursos().trigger("mouseover");
    this.linkCursoDireito().click({ force: true });
  }
}

export default new HomePage();
