// Caso do roteiro do 1º bimestre (Desafio 3), numeração mantida.
// Área: formulário rápido do botão flutuante "Abrir WhatsApp"
import Vestibular from "../support/pages/VestibularPage";

describe("Formulário do botão WhatsApp", () => {
  it("TC15 - envio vazio é bloqueado e indica campos obrigatórios", () => {
    // Garantia: se algo tentasse enviar, a requisição é barrada e nada chega ao RD Station.
    cy.bloquearEnvioRdStation();

    cy.abrirFormularioWhatsApp("https://camporeal.camporeal.edu.br/vestibular");
    Vestibular.enviar();

    Vestibular.erros().should("have.length.greaterThan", 0);
    Vestibular.erros().each(($erro) => {
      expect($erro.text()).to.match(/obrigat/i);
    });
    Vestibular.formulario().should("be.visible");
    cy.url().should("include", "/vestibular");
    cy.get("@envio.all").should("have.length", 0);
  });
});
