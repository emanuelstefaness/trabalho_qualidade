// Caso do roteiro do 1º bimestre (Desafio 3), numeração mantida.
// Área: formulário rápido do botão flutuante "Abrir WhatsApp"

describe("Formulário do botão WhatsApp", () => {
  it("TC15 - envio vazio é bloqueado e indica campos obrigatórios", () => {
    // Garantia: se algo tentasse enviar, a requisição é barrada e nada chega ao RD Station.
    cy.intercept("POST", "**rdstation**", { statusCode: 200, body: {} }).as("envio");

    cy.abrir("https://camporeal.camporeal.edu.br/vestibular");

    cy.dc("wa-botao").first().click({ force: true });
    cy.dc("wa-form").should("be.visible");
    cy.marcarDataCy();

    cy.dc("wa-enviar").click();

    cy.dc("wa-erro").should("have.length.greaterThan", 0);
    cy.dc("wa-erro").each(($erro) => {
      expect($erro.text()).to.match(/obrigat/i);
    });
    cy.dc("wa-form").should("be.visible");
    cy.url().should("include", "/vestibular");
    cy.get("@envio.all").should("have.length", 0);
  });
});
