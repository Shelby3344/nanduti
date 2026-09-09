# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS/JS (sem build step, sem framework). Confirmado pelo usuário. Deploy alvo: hospedagem estática (Vercel / Netlify / Cloudflare Pages). Catálogo vive em um único arquivo de dados JS editável à mão para o dono atualizar preços sem tocar em markup.

## Users

Primário confirmado: consumidor brasileiro que atravessa a fronteira para comprar no Paraguai. Chega quase sempre pelo celular, por link enviado no WhatsApp ou por bio de Instagram, muitas vezes em rede móvel instável e já dentro da viagem ou planejando-a. Job-to-be-done: descobrir se o produto específico que ele já pesquisou está disponível, por quanto, e falar com um humano no WhatsApp para reservar/retirar. Ele já sabe o nome do produto — não vem para ser educado, vem para conferir preço e falar com alguém.

Secundário não confirmado: revendedores e profissionais de estética. Não foi selecionado pelo usuário; não desenhar para eles sem confirmação.

## Product Purpose

Catálogo público de preços de produtos comercializados legalmente no Paraguai, organizado por categoria e marca, cuja única conversão é abrir uma conversa no WhatsApp com o produto e o preço já preenchidos. O site não processa pagamento, não guarda pedido e não faz entrega. Sucesso = mensagem de WhatsApp iniciada com produto identificado, e e-mail/WhatsApp capturado para remarketing.

## Positioning

O que um concorrente não copia de verdade: a tabela inteira, aberta, com preço à vista, sem "consulte valores". Nesse nicho o padrão é print de lista no Story e "chama no direct". Preço público e busca instantânea sobre o catálogo inteiro são a posição.

## Operating Context

- Uso predominante em celular, uma mão, em movimento, tela ao ar livre no calor da fronteira (Ciudad del Este / Pedro Juan Caballero). Luz ambiente alta.
- O cliente frequentemente já tem o nome do produto escrito num print ou numa mensagem. Buscar por nome é o caminho principal, não navegar por categoria.
- Preços cotados em Real (R$) e atualizados com frequência pelo dono, manualmente.
- Categorias reais do catálogo: injetáveis/emagrecimento, dermocosméticos coreanos, canetas, séruns, injetáveis estéticos, peptídeos (linha Renew), linha Oxygen, cápsulas Dragon Elite.
- Toda a negociação (disponibilidade, pagamento, retirada) acontece fora do site, no WhatsApp.

## Capabilities and Constraints

- Sem carrinho, sem checkout, sem gateway de pagamento. Confirmado pelo usuário.
- Cada item do catálogo abre `wa.me` com mensagem pré-preenchida contendo nome e preço.
- Formulário de captura (nome, e-mail, WhatsApp) exibido na entrada, para remarketing. Precisa de destino de dados — ainda não decidido.
- **Restrição de conteúdo (decisão do agente, aceita como constraint do projeto):** nenhuma alegação terapêutica, de emagrecimento, de resultado, antes/depois, dosagem ou orientação de uso em qualquer copy. O site lista nome comercial, apresentação e preço. Aviso 18+, "produtos comercializados no Paraguai" e "venda mediante prescrição médica quando aplicável" precisam existir e ser encontráveis.
- Nomes e preços dos produtos são fatos fornecidos pelo usuário e não podem ser alterados, arredondados ou inventados.

## Brand Commitments

- Sem nome de marca definido. O usuário pediu um provisório; ele precisa viver em um único token trocável.
- Bandeira do Paraguai é requisito explícito do usuário e é vinculante.
- Referência visual apontada pelo usuário: impeccable.style (nível de acabamento e ambição de movimento, não cópia de estilo).
- Botão flutuante de WhatsApp é requisito explícito.

## Evidence on Hand

- Lista completa e real de produtos com preços em R$, fornecida pelo usuário nesta conversa. É o único conteúdo verificado que existe.
- **Não existe e não pode ser fabricado:** fotos de produto, número de WhatsApp, logo, endereço da loja, depoimentos, contagem de clientes, avaliações, selos de certificação, prazos de entrega. Qualquer um deles precisa entrar como placeholder declarado.

## Product Principles

1. O preço é o conteúdo. Nada pode ficar entre o visitante e o número.
2. Buscar vence navegar. O visitante chega com o nome do produto na cabeça.
3. Uma única conversão: abrir o WhatsApp com contexto suficiente para o vendedor responder sem perguntar "qual produto?".
4. Fato, nunca promessa. O catálogo descreve o que é vendido, não o que acontece com quem usa.
5. Feito para uma mão, sol na tela, e sinal ruim. Peso da página é requisito de negócio.

## Accessibility & Inclusion

Sem requisito formal estabelecido pelo usuário. Contexto de uso impõe: alvos de toque grandes, contraste alto o suficiente para sol direto, e o catálogo inteiro precisa ser utilizável sem que nenhuma animação tenha rodado.
