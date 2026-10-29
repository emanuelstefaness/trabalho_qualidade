// Caso do roteiro do 1º bimestre (Desafio 3), numeração mantida.
// Área: formulário rápido do botão flutuante "Abrir WhatsApp"
import Vestibular from "../support/pages/VestibularPage";

describe("Formulário do botão WhatsApp", () => {
  beforeEach(function () {
    cy.fixture("whatsapp").as("dados");
  });

  it("TC15 - envio vazio é bloqueado e indica campos obrigatórios", function () {
    const { pagina, caminho, regexObrigatorio } = this.dados;
    // Garantia: se algo tentasse enviar, a requisição é barrada e nada chega ao RD Station.
    cy.bloquearEnvioRdStation();

    cy.abrirFormularioWhatsApp(pagina);
    Vestibular.enviar();

    Vestibular.erros().should("have.length.greaterThan", 0);
    Vestibular.erros().each(($erro) => {
      expect($erro.text()).to.match(new RegExp(regexObrigatorio, "i"));
    });
    Vestibular.formulario().should("be.visible");
    cy.url().should("include", caminho);
    cy.get("@envio.all").should("have.length", 0);
  });
});
