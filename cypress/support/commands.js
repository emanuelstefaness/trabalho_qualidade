const mapa = require("./data-cy-map");

// Atalho para seletores data-cy
Cypress.Commands.add("dc", (id, options) => cy.get(`[data-cy="${id}"]`, options));

// Marca no DOM os elementos do site com data-cy (ver data-cy-map.js)
Cypress.Commands.add("marcarDataCy", () => {
  cy.document().then((doc) => {
    const marcar = () =>
      Object.entries(mapa).forEach(([id, regra]) => {
        const { sel, texto } = typeof regra === "string" ? { sel: regra } : regra;
        doc.querySelectorAll(sel).forEach((el) => {
          if (texto && !el.textContent.includes(texto)) return;
          if (!el.hasAttribute("data-cy")) el.setAttribute("data-cy", id);
        });
      });
    marcar();
    // Elementos criados depois (ex.: mensagens de sucesso) também são marcados
    new MutationObserver(marcar).observe(doc.body, { childList: true, subtree: true });
  });
});

// Visita uma página, aceita o aviso de cookies e marca os data-cy
Cypress.Commands.add("abrir", (caminho) => {
  cy.visit(caminho);
  cy.get("body").then(($b) => {
    if ($b.find("#cn-accept-cookie:visible").length) {
      $b.find("#cn-accept-cookie")[0].click();
    }
  });
  cy.marcarDataCy();
});
