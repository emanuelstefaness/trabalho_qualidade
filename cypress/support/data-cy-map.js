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
  "busca-msg-vazia": { sel: ".elementor-shortcode p", texto: "Digite algo para pesquisar" },
  "busca-msg-sem-resultado": { sel: ".elementor-shortcode p", texto: "Nenhum resultado para" },

  // Menu principal (desktop)
  "menu-cursos": "ul.mbd-root > li.mbd-parent:has(a[href$='/cursos/direito/'])",
  "menu-curso-direito": "li.mbd-sub-item a[href$='/cursos/direito/']",

  // Botão flutuante "Abrir WhatsApp" e seu formulário (RD Station)
  "wa-botao": ".rdstation-popup-js-floating-button",
  "wa-form": "form.rdstation-popup-js-form-identifier",
  "wa-enviar": "form.rdstation-popup-js-form-identifier .rdstation-popup-js-submit-button",
  "wa-erro": "form.rdstation-popup-js-form-identifier .pristine-error",

  // Aviso de cookies
  "cookie-aceitar": "#cn-accept-cookie",
};
