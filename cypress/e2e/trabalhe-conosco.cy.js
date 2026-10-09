describe("Formulário Trabalhe Conosco", () => {
  beforeEach(() => {
    cy.abrir("/trabalhe-conosco");
  });

  it("CT03 - envio vazio é bloqueado e indica campos obrigatórios", () => {
    cy.dc("tc-enviar").click();

    cy.dc("tc-email").then(($el) => {
      expect($el[0].validity.valueMissing, "e-mail obrigatório").to.be.true;
    });
    cy.dc("tc-curriculo").then(($el) => {
      expect($el[0].validity.valueMissing, "currículo obrigatório").to.be.true;
    });
    cy.dc("tc-msg-sucesso").should("not.exist");
    cy.url().should("include", "/trabalhe-conosco");
  });

  it("CT04 - e-mail em formato inválido é rejeitado e válido é aceito", () => {
    cy.dc("tc-email").type("email-sem-arroba");
    cy.dc("tc-email").then(($el) => {
      expect($el[0].validity.typeMismatch, "formato inválido").to.be.true;
      expect($el[0].checkValidity()).to.be.false;
    });

    cy.dc("tc-email").clear().type("candidato@exemplo.com");
    cy.dc("tc-email").then(($el) => {
      expect($el[0].validity.typeMismatch, "formato válido").to.be.false;
      expect($el[0].checkValidity()).to.be.true;
    });
  });

  it("CT05 - envio com dados válidos manda os dados e exibe confirmação", () => {
    // A requisição é interceptada e simulada: não enviamos dados de teste
    // para a caixa de entrada real da instituição.
    cy.intercept("POST", "**/admin-ajax.php*", (req) => {
      req.alias = "envio";
      req.reply({
        statusCode: 200,
        body: { success: true, data: { message: "Enviado com sucesso!", data: [] } },
      });
    });

    cy.dc("tc-nome").type("Maria Teste");
    cy.dc("tc-email").type("maria.teste@exemplo.com");
    cy.dc("tc-curriculo").selectFile("cypress/fixtures/curriculo.pdf");
    cy.dc("tc-mensagem").type("Tenho interesse em uma vaga na área administrativa.");
    cy.dc("tc-enviar").click();

    cy.wait("@envio").then(({ request }) => {
      const corpo = Buffer.from(request.body).toString("latin1");
      expect(corpo).to.include("Maria Teste");
      expect(corpo).to.include("maria.teste@exemplo.com");
      expect(corpo).to.include("curriculo.pdf");
    });
    cy.dc("tc-msg-sucesso").should("be.visible").and("contain", "Enviado com sucesso");
    cy.dc("tc-email").should("have.value", "");
  });
});
