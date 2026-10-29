// Tela: página do vestibular, com o botão flutuante "Abrir WhatsApp" e seu formulário (RD Station).
const FORM = "form.rdstation-popup-js-form-identifier";

class VestibularPage {
  botaoWhatsApp() {
    return cy.get(".rdstation-popup-js-floating-button").first();
  }

  formulario() {
    return cy.get(FORM);
  }

  botaoEnviar() {
    return cy.get(`${FORM} .rdstation-popup-js-submit-button`);
  }

  erros() {
    return cy.get(`${FORM} .pristine-error`);
  }

  abrirFormulario() {
    this.botaoWhatsApp().click({ force: true });
    this.formulario().should("be.visible");
  }

  enviar() {
    this.botaoEnviar().click();
  }
}

export default new VestibularPage();
