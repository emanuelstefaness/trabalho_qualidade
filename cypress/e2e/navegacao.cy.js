// Caso do roteiro do 1º bimestre (Desafio 3), numeração mantida.
// Área: navegação pelo menu principal
import Home from "../support/pages/HomePage";
import Curso from "../support/pages/CursoPage";

describe("Navegação pelo menu", () => {
  beforeEach(function () {
    cy.fixture("navegacao").as("dados");
  });

  it("TC04 - menu Cursos > Direito abre a página do curso", function () {
    const { nome, caminho, regexTitulo } = this.dados.curso;
    cy.abrir("/");

    Home.abrirCursoDireito();

    cy.url().should("include", caminho);
    cy.title().should("match", new RegExp(regexTitulo, "i"));
    Curso.conteudo().should("contain.text", nome);
  });
});
