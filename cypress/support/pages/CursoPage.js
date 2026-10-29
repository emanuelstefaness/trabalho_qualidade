// Tela: página de um curso (ex.: /cursos/direito/).
class CursoPage {
  conteudo() {
    return cy.get("body");
  }
}

export default new CursoPage();
