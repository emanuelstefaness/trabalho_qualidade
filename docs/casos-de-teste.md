# Casos de teste

Sistema: site do Centro Universitário Campo Real – Guarapuava (`https://guarapuava.camporeal.edu.br`).
Todos os elementos são acessados por `data-cy` (ver `cypress/support/data-cy-map.js`).

| ID | Área | Arquivo |
|----|------|---------|
| CT01 | Busca | `cypress/e2e/busca.cy.js` |
| CT02 | Contato | `cypress/e2e/busca.cy.js` |
| CT03 | Formulário (validação) | `cypress/e2e/trabalhe-conosco.cy.js` |
| CT04 | Formulário (validação) | `cypress/e2e/trabalhe-conosco.cy.js` |
| CT05 | Formulário (envio) | `cypress/e2e/trabalhe-conosco.cy.js` |

## CT01 – Busca por termo existente lista notícias relacionadas

- **Pré-condição:** site no ar.
- **Passos:** 1. Abrir `/`. 2. Digitar "vestibular" no campo de busca. 3. Acionar o botão de buscar.
- **Resultado esperado:** a URL contém `s=vestibular`; o título "Resultado da pesquisa" aparece;
  há 1 ou mais cards de notícia; o título do primeiro card contém "vestibular".
- **data-cy usados:** `busca-input`, `busca-submit`, `busca-titulo`, `busca-card`, `busca-card-titulo`.

## CT02 – Página de contato exibe telefone e link do formulário externo

- **Pré-condição:** site no ar.
- **Passos:** 1. Abrir `/contato`.
- **Resultado esperado:** o telefone "(42) 3621 ..." é exibido; existe link para o formulário
  externo (`https://forms.gle/...`); a URL continua em `/contato`.
- **data-cy usados:** `contato-telefone`, `contato-link-form`.

## CT03 – Envio vazio é bloqueado e indica campos obrigatórios

- **Pré-condição:** nenhuma.
- **Passos:** 1. Abrir `/trabalhe-conosco`. 2. Clicar em enviar sem preencher nada.
- **Resultado esperado:** e-mail e currículo ficam inválidos por "campo obrigatório";
  nenhuma mensagem de sucesso aparece; a página permanece em `/trabalhe-conosco`.
- **data-cy usados:** `tc-enviar`, `tc-email`, `tc-curriculo`, `tc-msg-sucesso`.

## CT04 – E-mail inválido é rejeitado e válido é aceito

- **Passos:** 1. Abrir `/trabalhe-conosco`. 2. Digitar `email-sem-arroba` no e-mail.
  3. Limpar e digitar `candidato@exemplo.com`.
- **Resultado esperado:** com texto sem "@" o campo é inválido (formato incorreto);
  com e-mail bem formado o campo passa a ser válido.
- **data-cy usados:** `tc-email`.

## CT05 – Envio com dados válidos manda os dados e exibe confirmação

- **Pré-condição:** a requisição `admin-ajax.php` é simulada (`cy.intercept`) para não enviar dados reais.
- **Passos:** 1. Abrir `/trabalhe-conosco`. 2. Preencher nome, e-mail e mensagem.
  3. Anexar `curriculo.pdf`. 4. Clicar em enviar.
- **Resultado esperado:** o corpo da requisição contém nome, e-mail e nome do arquivo;
  a mensagem de sucesso aparece; o campo de e-mail é limpo.
- **data-cy usados:** `tc-nome`, `tc-email`, `tc-curriculo`, `tc-mensagem`, `tc-enviar`, `tc-msg-sucesso`.

## Observação

Os IDs acima foram numerados para esta atividade. Se o roteiro manual do 1º bimestre usava
outra numeração, ajustar a coluna de ID mantendo a correspondência.
