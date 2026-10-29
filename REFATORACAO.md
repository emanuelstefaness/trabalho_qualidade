# Refatoração da suíte (A1 → A2)

Suíte da A1 (tag `atividade-1`): 6 testes contra o site real da Campo Real. A refatoração manteve os
6 testes (TC02, TC04, TC07, TC08, TC14, TC15) com as mesmas asserções e acrescentou 2 cenários de stub.

## Tabela de smells (problema → solução)

| # | Problema (onde) | Por que atrapalha | Solução |
|---|-----------------|-------------------|---------|
| 1 | Todos os seletores num arquivo só, `data-cy-map.js`, ligado por ids em texto (`cy.dc("busca-card")`) | Arquivo-deus; erro de digitação no id só aparece na execução | Page Objects, um por tela (`HomePage`, `ResultadoBuscaPage`, `CursoPage`, `VestibularPage`); seletores só neles |
| 2 | `marcarDataCy` em `commands.js`: `MutationObserver` que altera o DOM do site, nunca desconectado e chamado em 4 pontos | Mágica difícil de entender; custo a cada mudança do DOM | Removido: o Page Object busca direto o elemento |
| 3 | Passo repetido: `pesquisar()` copiado dentro de `busca.cy.js` (4 testes); abrir o formulário do WhatsApp dentro do teste | Copia e cola; ajuste vira vários | Comandos `cy.pesquisar`, `cy.abrirFormularioWhatsApp`, `cy.aceitarCookies` (+ `cy.abrir`, `cy.bloquearEnvioRdStation`) |
| 4 | `cy.abrir` clicava no aviso de cookies com um `if` (existe? clica) | Condicional no teste; corrida com o banner | Cookie `cookie_notice_accepted` definido antes do `visit`; sem `if` |
| 5 | Dados dentro dos testes: "Direito", `"A".repeat(250)`, 🎓, URL do vestibular, mensagens, regex | Dado misturado com lógica | Fixtures `busca.json`, `navegacao.json`, `whatsapp.json`, lidas com `cy.fixture` |
| 6 | Tudo depende do conteúdo atual do site; falha de servidor nunca era testada | Teste muda de resultado sem mudar o código; caminho de erro sem cobertura | Stubs com `cy.intercept`: **STUB01** (sucesso, 200 com 2 cards) e **STUB02** (falha, 500) |
| 7 | `retries: { runMode: 1 }` no config | Esconde teste instável: falha na 1ª e passa na 2ª | `retries` em 0; a estabilidade é provada abaixo |
| 8 | Esperas fixas | Nenhuma `cy.wait(ms)` encontrada (verificado com `grep`) | Mantido: só asserções com retry e `cy.wait("@alias")` |

## Estabilidade

Suíte completa (8 testes) executada 3 vezes seguidas, sem retentativas: **8/8 verde nas 3 rodadas**.
Logs em `evidencias/estabilidade/rodada-1.txt`, `rodada-2.txt` e `rodada-3.txt`.

## Cobertura

Nenhum teste foi apagado. Os 6 testes da A1 continuam com o mesmo nome e as mesmas asserções.
