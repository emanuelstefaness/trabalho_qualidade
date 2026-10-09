// O site da Campo Real não é nosso e não possui atributos data-cy.
// Este mapa é o ÚNICO lugar com seletores CSS: ele marca os elementos com
// data-cy em tempo de execução. Os testes usam exclusivamente [data-cy="..."].
//
// Formato: "id": "seletor css"  ou  "id": { sel: "seletor css", texto: "trecho" }
module.exports = {
  // Cabeçalho / busca
  "busca-form": "form.pill-search",
  "busca-input": "form.pill-search input[name='s']",
  "busca-submit": "form.pill-search button[type='submit']",

  // Resultados de busca
  "busca-titulo": { sel: ".elementor-heading-title", texto: "Resultado da pesquisa" },
  "busca-card": "article.noticia-card",
  "busca-card-titulo": "article.noticia-card .noticia-title",

  // Aviso de cookies
  "cookie-aceitar": "#cn-accept-cookie",

  // Trabalhe Conosco (formulário Elementor)
  "tc-form": "form.elementor-form[name='Trabalhe Conosco']",
  "tc-nome": "#form-field-name",
  "tc-email": "#form-field-email",
  "tc-curriculo": "#form-field-field_ed22cc5",
  "tc-mensagem": "#form-field-message",
  "tc-enviar": "form.elementor-form[name='Trabalhe Conosco'] button[type='submit']",
  "tc-msg-sucesso": ".elementor-message-success",

  // Contato
  "contato-link-form": "a[href*='forms.gle']",
  "contato-telefone": { sel: ".elementor-heading-title", texto: "(42) 3621" },
};
