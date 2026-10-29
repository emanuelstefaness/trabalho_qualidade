// Caso do roteiro do 1º bimestre (Desafio 3), numeração mantida.
// Área: navegação pelo menu principal
import Home from "../support/pages/HomePage";
import Curso from "../support/pages/CursoPage";

describe("Navegação pelo menu", () => {
  it("TC04 - menu Cursos > Direito abre a página do curso", () => {
    cy.abrir("/");

    Home.abrirCursoDireito();

    cy.url().should("include", "/cursos/direito");
    cy.title().should("match", /direito/i);
    Curso.conteudo().should("contain.text", "Direito");
  });
});
