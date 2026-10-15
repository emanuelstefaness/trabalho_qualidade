# Casos de teste

Sistema: site do Centro Universitário Campo Real – Guarapuava (`https://guarapuava.camporeal.edu.br`).
Os 6 casos foram retirados do roteiro do 1º bimestre (Desafio 3, aplicando Particionamento de
Equivalência e Análise de Valor Limite), mantendo a numeração original.
Todos os elementos são acessados por `data-cy` (ver `cypress/support/data-cy-map.js`).

| ID (roteiro) | Área | Técnica | Arquivo |
|--------------|------|---------|---------|
| TC02 | Busca | Classe de equivalência válida | `cypress/e2e/busca.cy.js` |
| TC07 | Busca | Classe de equivalência inválida (campo vazio) | `cypress/e2e/busca.cy.js` |
| TC08 | Busca | Classe inválida por tamanho extremo (250 caracteres) | `cypress/e2e/busca.cy.js` |
| TC14 | Busca | Classe inválida (caractere fora do alfanumérico: emoji) | `cypress/e2e/busca.cy.js` |
| TC04 | Navegação (menu) | Classe de equivalência válida | `cypress/e2e/navegacao.cy.js` |
| TC15 | Formulário (WhatsApp) | Classe inválida (campos obrigatórios vazios) | `cypress/e2e/whatsapp.cy.js` |

## TC02 – Busca por termo comum mostra resultados relacionados

- **Passos:** 1. Abrir `/`. 2. Digitar "Direito" no campo de busca. 3. Acionar o botão de buscar.
- **Resultado esperado:** abre a página de resultados com conteúdo relacionado a "Direito".
- **Asserções:** URL contém `s=Direito`; título "Resultado da pesquisa" existe; há 1 ou mais cards;
  os títulos dos cards contêm "direito".
- **data-cy:** `busca-input`, `busca-submit`, `busca-titulo`, `busca-card`, `busca-card-titulo`.

## TC07 – Busca vazia não trava e pede para digitar algo

- **Passos:** 1. Abrir `/`. 2. Acionar o botão de buscar sem digitar nada.
- **Resultado esperado:** não trava; mostra a mensagem "Digite algo para pesquisar.".
- **Asserções:** URL contém `s=`; mensagem "Digite algo para pesquisar." aparece; nenhum card de resultado.
- **data-cy:** `busca-submit`, `busca-msg-vazia`, `busca-card`.

## TC08 – Termo muito grande não quebra a página

- **Passos:** 1. Abrir `/`. 2. Digitar 250 letras "A". 3. Acionar o botão de buscar.
- **Resultado esperado:** não trava nem quebra, mesmo sem achar nada.
- **Asserções:** mensagem "Nenhum resultado para" aparece; a mensagem contém o termo inteiro (250 caracteres);
  nenhum card de resultado.
- **data-cy:** `busca-input`, `busca-submit`, `busca-msg-sem-resultado`, `busca-card`.

## TC14 – Emoji na busca é tratado sem travar

- **Passos:** 1. Abrir `/`. 2. Digitar o emoji 🎓. 3. Acionar o botão de buscar.
- **Resultado esperado:** não trava; o emoji aparece na mensagem de "Nenhum resultado".
- **Asserções:** mensagem "Nenhum resultado para" aparece; o emoji está na mensagem (o WordPress o
  exibe como imagem com `alt="🎓"`); a URL contém o emoji codificado.
- **data-cy:** `busca-input`, `busca-submit`, `busca-msg-sem-resultado`.

## TC04 – Menu Cursos > Direito abre a página do curso

- **Passos:** 1. Abrir `/`. 2. Passar o mouse em "Cursos". 3. Clicar em "Direito".
- **Resultado esperado:** abre a página do curso de Direito.
- **Asserções:** URL contém `/cursos/direito`; título da página contém "Direito"; a página exibe "Direito".
- **data-cy:** `menu-cursos`, `menu-curso-direito`.

## TC15 – Formulário do botão WhatsApp bloqueia envio vazio

- **Pré-condição:** página `https://camporeal.camporeal.edu.br/vestibular` carregada.
- **Passos:** 1. Clicar no botão flutuante "Abrir WhatsApp". 2. Não preencher nenhum campo.
  3. Clicar em "Iniciar conversa".
- **Resultado esperado:** o envio é bloqueado e os avisos de campo obrigatório aparecem.
- **Asserções:** o formulário abre e continua visível; há 1 ou mais avisos e todos contêm "obrigatório"
  ("Campo é obrigatório."); a URL continua em `/vestibular`; nenhuma requisição de envio é feita.
- **Observação:** a requisição ao RD Station é interceptada por segurança, então nenhum dado chega ao site real.
  Na execução manual o aviso do campo de ano veio em inglês; hoje o formulário não tem mais esse
  campo e os 4 avisos aparecem em português.
- **data-cy:** `wa-botao`, `wa-form`, `wa-enviar`, `wa-erro`.

## Casos do roteiro que não foram automatizados

- **TC01, TC05, TC05B, TC05C, TC06, TC09 a TC13 (formulário de inscrição do vestibular):** a página
  `vestibular-inverno-2026-online-agora-guarapuava` saiu do ar (404) e o vestibular atual
  não tem os mesmos campos (CPF, data de nascimento etc.).
- **TC03:** depende do site institucional `camporeal.edu.br` (outro domínio).
