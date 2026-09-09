# Ñandutí — loja

Site estático. Sem build, sem npm, sem framework. Abre `index.html` e funciona.

```
site/
  index.html
  assets/
    css/style.css
    js/catalog.data.js   ← você mexe aqui
    js/app.js
    img/favicon.svg
    img/produtos/        ← suas fotos vão aqui
```

---

## Antes de publicar

Tudo no topo de `assets/js/catalog.data.js`:

```js
const LOJA = {
  marca:     'Ñandutí',          // o nome da sua loja
  whatsapp:  '595000000000',     // SEU NÚMERO — 595 + DDD + número, só dígitos
  instagram: '',                 // seu @ sem arroba (vazio esconde o link)
  cidade:    'Ciudad del Este, Paraguai',

  slogan: 'Sua compra no lugar certo.',   // título da aba e texto do link compartilhado

  capa: [ /* os três banners que giram sozinhos — veja abaixo */ ],
};
```

O número **precisa** ser trocado. Enquanto for o de exemplo, o console avisa e nenhum botão leva a lugar nenhum.

### As copies dos banners

Ficam em `LOJA.capa`, um objeto por banner:

```js
{
  h: 'Preço na tela. Sempre.',                    // título
  p: 'Todo produto desta loja tem o valor…',      // texto
  selos: ['Sem "consulte valores"', 'Valor à vista'],
  botao: 'Ver a tabela', href: '#catalogo',       // ou wa:true para abrir o WhatsApp
}
```

São três. Giram sozinhos a cada 6,5 s, pausam quando a pessoa passa o mouse ou arrasta, e voltam a girar 9 s depois. Não há setas: no celular ninguém acerta seta, e elas cobriam o texto.

### Sobre o que você escreve nos banners

São **afirmações suas sobre o seu negócio** — não dados que o site calcula. "Mais de 500 produtos", "loja física", "o estoque fica em Ciudad del Este": só escreva o que você sustenta se um cliente cobrar no balcão.

Uma incoerência para resolver: a chamada anuncia 500 produtos e a tabela publica 99. Quem desce e conta percebe. Três saídas honestas:

- publique o resto do catálogo em `LINHAS` (o site aguenta bem: 108 cartões custam 0,1 ms de layout);
- escreva "mais de 500 na loja — 99 com preço publicado aqui";
- ou ajuste o número para o que está de fato na tabela.

Promessa que o cliente desmente na primeira visita custa mais caro que número menor.

---

## Mudar um preço

Uma linha, um arquivo:

```js
{ n: 'Tirzec', d: '4 ampolas', p: 732 },
```

`p` é o preço. Salvou, subiu, acabou. A contagem de produtos, a faixa de preço de cada bloco e as mensagens de WhatsApp se refazem sozinhas.

Esgotou? `{ n: 'Tirzec', p: 732, esgotado: true }` — a linha fica cinza e o botão para de chamar.

---

## Página do produto

Cada item tem página própria, no endereço `?produto=nome-do-produto`. É link compartilhável: você manda no WhatsApp e a pessoa cai direto no item, com preço, ficha e botão de pedido. O botão voltar do celular funciona normalmente.

Na página o cliente escolhe a quantidade — o total recalcula e a mensagem do WhatsApp já sai com `3x Produto — R$ X cada, total R$ Y`.

Nada é cobrado no site. Não há carrinho nem checkout: a venda inteira acontece na conversa.

## Banners da capa

Enquanto `LOJA.banners` estiver vazio, cada slide usa a vitrine desenhada — os formatos em pedestal, com foco e reflexo, feita dos mesmos vetores das miniaturas.

Quando tiver banner de verdade, é por posição:

```js
banners: [
  { img:'assets/img/banner/1.jpg', alt:'Descrição da peça', href:'#catalogo' },
],
```

Medida: **1920 x 560 px**. Mantenha o texto da peça dentro dos 45% da esquerda — no celular as laterais são cortadas. Com imagem, o texto sobreposto some: um banner bem feito já traz o dele.

Não use banner de concorrente. É material protegido, e selo de certificação que você não tem (Remessa Conforme, por exemplo) é declaração falsa perante a Receita.

## Ordem dos departamentos

É a ordem do array `LINHAS`. Hoje: Canetas, Peptídeos, Linha Injetável, e o resto. Mover um bloco de lugar no arquivo muda a ordem em **todos** os lugares de uma vez — vitrine, ladrilhos, menu, busca e rodapé.

Os nomes dos departamentos são deliberadamente descritivos de formato, não de efeito. "Canetas", não "canetas emagrecedoras": nome de categoria com promessa de resultado é o que faz o Meta e o Google reprovarem a conta de anúncio, e é o que transforma um catálogo de preços em anúncio de medicamento aos olhos da fiscalização.

## Colocar suas fotos

O jeito que converte: **fotografe o seu estoque.** Fundo branco liso, luz de janela (nunca flash), celular apoiado. Recorte quadrado, ~800×800px, salve como `.jpg` com qualidade 80.

Jogue em `assets/img/produtos/` e aponte:

```js
{ n: 'Tirzec', d: '4 ampolas', p: 732, img: 'assets/img/produtos/tirzec-4.jpg' },
```

Sem `img`, o produto mostra o glifo de formato da linha dele — ampola, caneta, cápsula, frasco. Vetorial, nítido em qualquer tela, peso zero. Não parece falta; parece escolha.

**Não use foto de catálogo de concorrente ou de fabricante.** É material protegido, é motivo de denúncia no nicho, e é o tipo de coisa que derruba o domínio.

---

## Ficha técnica

Divide em duas partes, de propósito.

**O que o site calcula sozinho** (não mexa): forma farmacêutica, apresentação, via, linha, classe e **preço unitário** — em item de 4 ampolas ele já mostra quanto sai a ampola.

**O que só a embalagem sabe** — em `FICHA`, no fim do arquivo de dados:

```js
const FICHA = {
  'Tirzec': {
    composicao: 'Tirzepatida 15 mg/mL',
    fabricante: 'Laboratório X',
    origem:     'Paraguai',
    registro:   'DNVS 12345-01',
    validade:   '08/2027',
    conteudo:   '4 ampolas de 1 mL',
    conservar:  'Refrigerado, 2 °C a 8 °C',
  },
};
```

A chave é o nome exato do produto. Campo em branco simplesmente não aparece.

> **Preencha lendo a caixa que você tem na mão.** Não preencha de cabeça e não copie de concorrente. Composição errada num injetável é o único erro deste site que machuca alguém — e é o que te processa.

Enquanto `composicao` estiver vazia, o produto mostra: *"Composição, registro e validade deste lote eu confirmo na hora."* Honesto e não trava a venda.

---

## Os leads do formulário

Hoje ficam no navegador de quem preencheu. Para recuperar, no console:

```js
copy(localStorage.getItem('nd.leads'))
```

Isso serve para testar, **não** para operar. Para os leads chegarem até você de verdade, abra `assets/js/app.js`, procure `ONDE O LEAD VAI PARAR` e descomente o `fetch`, apontando para o seu endpoint.

Opções que funcionam sem servidor: Google Apps Script publicado como web app (grátis, cai numa planilha), Formspree, Sheet.best, ou um webhook do n8n/Make.

O modal aparece por três gatilhos, o que vier primeiro: 22 segundos, rolagem até o segundo bloco, ou intenção de saída no desktop. Quem fecha só volta a ver em 7 dias; quem cadastra não vê mais.

---

## Publicar

Arraste a pasta `site/` em [app.netlify.com/drop](https://app.netlify.com/drop). Pronto, está no ar.

Alternativas iguais de simples: Cloudflare Pages, Vercel, GitHub Pages. Não precisa de Node em produção — `serve.mjs` existe só para você ver localmente:

```bash
node serve.mjs
```

---

## Por que está rápido

Sem framework, sem imagem no primeiro carregamento, uma fonte. A página inteira — 99 produtos, banner, páginas de produto — pesa **29 KB comprimidos**. A renda que se tece no scroll roda em `animation-timeline` do CSS, sem passar pelo JavaScript.

Medido no navegador: DOM interativo em 25 ms, e um layout completo com os 108 cartões custa 0,1 ms. Por isso o site **não** usa `content-visibility` — foi testado e removido, porque sem imagem nos cartões não há trabalho a adiar e a altura estimada por bloco só traria risco de pulo de rolagem.

Se um dia ficar lento, o culpado vai ser foto grande. Passe tudo no [Squoosh](https://squoosh.app) antes de subir — e, quando todo produto tiver foto, aí sim vale reavaliar o `content-visibility`.

---

## Avisos legais

A seção "Antes de pedir" traz +18, prescrição médica, jurisdição paraguaia e a ressalva de preço. **Não apague.** É o que separa um catálogo de preços de um anúncio de medicamento — e é o que mantém o site fora da mira de plataforma e de fiscalização.

Pela mesma razão o site em nenhum lugar promete resultado, perda de peso, dose ou efeito. Se você acrescentar esse tipo de texto depois, perde a proteção que a estrutura te dá hoje.
