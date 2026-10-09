# Atividade 1 – Testes E2E com Cypress

Testes automatizados do site do Centro Universitário Campo Real (unidade Guarapuava),
`https://guarapuava.camporeal.edu.br`, cobrindo busca, contato e o formulário **Trabalhe Conosco**.
Os casos vêm do roteiro manual do 1º bimestre (testes de formulário do site).

## Pré-requisitos

- Node.js 18 ou superior
- Acesso à internet (os testes rodam contra o site real)

## Instalação

```bash
npm install
```

## Como executar

Modo interativo (abre a interface do Cypress):

```bash
npm run cy:open
```

Modo headless (terminal, grava vídeo em `cypress/videos/`):

```bash
npm run cy:run
```

Para rodar um arquivo só: `npx cypress run --spec cypress/e2e/busca.cy.js`

## Estrutura

```
cypress.config.js            baseUrl e opções
cypress/e2e/                 os 5 testes (busca.cy.js, trabalhe-conosco.cy.js)
cypress/support/commands.js  comandos cy.dc(), cy.abrir(), cy.marcarDataCy()
cypress/support/data-cy-map.js  mapa data-cy -> elemento do site
cypress/fixtures/            arquivo de currículo fictício
docs/casos-de-teste.md       descrição dos casos
evidencias/                  vídeos e saída do npx cypress run
```

## Sobre o `data-cy`

O site é de terceiros e não tem atributos `data-cy`. Por isso, o único lugar com seletores
CSS é `cypress/support/data-cy-map.js`, que marca os elementos com `data-cy` ao abrir a página.
**Os testes usam exclusivamente `[data-cy="..."]`** (via `cy.dc("id")`).
Se o site mudar o HTML, só esse arquivo precisa de ajuste.

## Sobre o envio do formulário

No CT05 a requisição de envio (`admin-ajax.php`) é interceptada e respondida pelo Cypress,
para não mandar candidaturas falsas à instituição. O teste verifica que os dados
digitados e o arquivo anexado saem corretamente no corpo da requisição.

## Equipe

Preencher com nome de cada integrante e a divisão de tarefas.
