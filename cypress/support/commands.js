// Passos repetidos dos testes. Seletores ficam só nos Page Objects (cypress/support/pages).
import Home from "./pages/HomePage";
import Vestibular from "./pages/VestibularPage";

// Aceita o aviso de cookies ANTES de abrir a página, via cookie do plugin Cookie Notice.
// Antes: abrir, procurar o botão com um if e clicar (condicional + corrida com o banner).
Cypress.Commands.add("aceitarCookies", () => {
  cy.setCookie("cookie_notice_accepted", "true", { domain: ".camporeal.edu.br" });
});

// Visita uma página já com os cookies aceitos.
Cypress.Commands.add("abrir", (caminho) => {
  cy.aceitarCookies();
  cy.visit(caminho);
});

// Abre a home e pesquisa o termo (string vazia = busca vazia).
Cypress.Commands.add("pesquisar", (termo) => {
  cy.abrir("/");
  Home.pesquisar(termo);
});

// Abre a página do vestibular e o formulário do botão flutuante "Abrir WhatsApp".
Cypress.Commands.add("abrirFormularioWhatsApp", (url) => {
  cy.abrir(url);
  Vestibular.abrirFormulario();
});

// Barra qualquer envio ao RD Station: nenhum dado chega ao serviço real.
Cypress.Commands.add("bloquearEnvioRdStation", () => {
  cy.intercept("POST", "**rdstation**", { statusCode: 200, body: {} }).as("envio");
});
