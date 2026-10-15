# Atividade 1 – Testes E2E com Cypress

Testes automatizados do site do Centro Universitário Campo Real (unidade Guarapuava),
`https://guarapuava.camporeal.edu.br`, cobrindo a **busca** (TC02, TC07, TC08, TC14) e a
**navegação pelo menu** (TC04).
Os 5 casos vêm do roteiro manual do 1º bimestre (Desafio 3) e mantêm a numeração original.
Detalhes e os casos que não foram automatizados: `docs/casos-de-teste.md`.

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
cypress/e2e/                 os 5 testes (busca.cy.js, navegacao.cy.js)
cypress/support/commands.js  comandos cy.dc(), cy.abrir(), cy.marcarDataCy()
cypress/support/data-cy-map.js  mapa data-cy -> elemento do site
docs/casos-de-teste.md       descrição dos casos
evidencias/                  prints, vídeos e saída do npx cypress run
```

## Sobre o `data-cy`

O site é de terceiros e não tem atributos `data-cy`. Por isso, o único lugar com seletores
CSS é `cypress/support/data-cy-map.js`, que marca os elementos com `data-cy` ao abrir a página.
**Os testes usam exclusivamente `[data-cy="..."]`** (via `cy.dc("id")`).
Se o site mudar o HTML, só esse arquivo precisa de ajuste.

## Observação

Os testes só fazem buscas e navegação (requisições de leitura); nenhum formulário é enviado
ao site real.

## Equipe

- Emanuel Souza Stefanes
- Roger Felipe
- Allan Lemos
- João Vitor
