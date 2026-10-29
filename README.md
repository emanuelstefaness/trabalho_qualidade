# Atividade 1 – Testes E2E com Cypress

Testes automatizados do site do Centro Universitário Campo Real (unidade Guarapuava),
`https://guarapuava.camporeal.edu.br`, cobrindo a **busca** (TC02, TC07, TC08, TC14), a
**navegação pelo menu** (TC04) e o **formulário do botão WhatsApp** (TC15).
Os 6 casos vêm do roteiro manual do 1º bimestre (Desafio 3) e mantêm a numeração original.
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
cypress.config.js              baseUrl e opções (sem retentativas)
cypress/e2e/                   os testes (busca, busca-stub, navegacao, whatsapp .cy.js)
cypress/support/pages/         Page Objects, um por tela (único lugar com seletores CSS)
cypress/support/commands.js    cy.abrir(), cy.pesquisar(), cy.abrirFormularioWhatsApp() ...
cypress/fixtures/              dados dos testes e respostas simuladas (stubs)
docs/casos-de-teste.md         descrição dos casos
REFATORACAO.md                 smells encontrados e como foram resolvidos
evidencias/                    prints, vídeos da A1 e logs das 3 execuções seguidas
```

## Sobre os seletores

O site é de terceiros e não tem atributos `data-cy`. Os seletores CSS ficam **somente** nos
Page Objects em `cypress/support/pages/` (`HomePage`, `ResultadoBuscaPage`, `CursoPage`,
`VestibularPage`). Os testes chamam métodos como `Resultado.cards()` e nunca escrevem um
seletor. Se o site mudar o HTML, só o Page Object da tela afetada precisa de ajuste.

## Observação

Os testes fazem buscas, navegação e uma tentativa de envio vazio (bloqueada pelo próprio
formulário). A requisição de envio é interceptada, então nenhum dado chega ao site real.
Os vídeos em `evidencias/*.mp4` são da execução da A1; os prints e os logs de
`evidencias/estabilidade/` são da suíte refatorada (A2).

## Equipe

- Emanuel Souza Stefanes
- Roger Felipe
- Allan Lemos
- João Vitor
