# Design

Mundo visual: **transposição PontoCom** — o layout da loja de fronteira que o
visitante já usa, vestindo a marca Ñandutí. Escrito a partir do que foi construído.

## Tese

Loja conhecida, não loja nova. O comprador da fronteira reconhece o formato da
referência em meio segundo: faixa institucional fina, cabeçalho branco com a
marca vermelha, busca pílula no centro, links de ajuda e botão pílula
vermelho, fileira de departamentos com setas circulares, vitrine com sidebar,
breadcrumb, ordenação em pílula e cartões com foto, nome e preço. A diferença
segue gasta onde a categoria costuma esconder: **preço publicado em toda
vitrine**, em R$ e à vista — sem dólar inventado, sem Ref. inventada, sem
carrinho. A venda continua inteira no WhatsApp.

## Cor

| Token | Valor | Papel |
|---|---|---|
| `--red` | `#8E0C22` | marca, preço, botão pílula, títulos de seção |
| `--red-lo` | `#6D0618` | rodapé, fundo do carrossel |
| `--red-hi` | `#A81530` | hover do botão pílula |
| `--red-wash` | `#FBEFF1` | realces, hover de item |
| `--indigo` | `#0A2A63` | só o bloco Paraguai — a única quebra de campo |
| `--gold` | `#E8A93C` | dot ativo, títulos do rodapé, seleção de texto |
| `--wa` | `#0D7F37` | só WhatsApp |
| `--page` | `#FFFFFF` | campo branco de loja, como na referência |
| `--line` | `#E7E2E0` | bordas finas neutras |
| `--ink` | `#1F1B1A` | texto, neutro sobre branco |
| `--ink-2` | `#57504D` | secundário neutro |
| `--ink-3` | `#6F625E` | terciário — escurecido até passar 4,5:1 sobre branco |

## Tipo

**Archivo** variável, como antes. Busca e ordenação em pílula; preço em
`tabular-nums`. Nome e apresentação do cartão em até 2 linhas — as variantes
de mesmo nome se distinguem pela apresentação legível, sem elipse de 1 linha.

## Cabeçalho

Faixa fina com cidade à esquerda e `Português (BRL) · Preços em R$ à vista`
à direita — só fatos da loja, sem cotação de dólar nem troca de idioma que
não existe. Abaixo, cabeçalho branco: medalhão Ñandutí num selo vermelho +
wordmark vermelho, busca pílula com a lupa dentro, `Como comprar` e `Dúvidas`
separados por divisor, e pílula vermelha `Vendedores` abrindo o WhatsApp. No
celular a pílula vira só-ícone e a busca ocupa a linha de baixo.

## Catálogo

Grade com sidebar fixa (230px, só desktop): departamentos com contagem e
estado ativo sincronizado com busca, ordem e hash, mais caixa de atendimento.
Breadcrumb `Home › Catálogo › posição` com o atual em vermelho — na página do
produto, `Home › departamento › nome`. Grade de 4 colunas no desktop da
vitrine (3 em 960–1200, 2–3 no mobile). Cartão branco, borda fina, raio 12:
foto contida, nome e apresentação em até 2 linhas, preço dual `U$ | R$` no
padrão da referência, sem botão — o cartão inteiro abre a página, onde mora
o Pedir. Faixa institucional com `Dólar = R$` da cotação única. Faixa de
informações em 4 colunas (Documentos, Entregas, Preços, Valores) com ícones
de traço próprios. No celular o flutuante vira barra inferior de
`calc(60px + safe-area)` com 60px úteis.

## Piso verificado

Renderizado de verdade (Chromium relay + headless, 390 e 1360/1920px):

- 240 resultados, 251 cartões, 11 departamentos na sidebar, breadcrumb `Produtos`.
- IDs únicos (`depQuick`, `sideDeps`, `crumbAtual` — 1 ocorrência cada).
- `scrollWidth === innerWidth` em 390px, com sidebar recolhida e CTA só-ícone.
- `node --check` limpo em `app.js`, `catalog.data.js` e `serve.mjs`; HTML/CSS/JS servidos com 200.
- Hit-test em espaço de viewport: zero interseções nas paradas de repouso
  (11 fins de seção + fim da página). Durante a rolagem a barra fixa cobre
  o conteúdo como qualquer chrome fixo — comportamento padrão, documentado,
  não defeito: exigi-lo zero também em movimento custaria o CTA sempre
  visível ou quebraria a rolagem que o app.js mede via `scrollY`.
- Detector Impeccable (modo degradado, sem parser): 1 aviso pré-existente
  (`transition: width` no dot do carrossel, intencional e fora do caminho crítico).
## Decisões que custaram uma medição

- **Sem preço dual.** A referência mostra U$ + R$; o catálogo só conhece R$.
  Inventar cotação seria declarar fato falso — o cartão mostra só R$.
- **Sem Ref.** A referência exibe `Ref.:` por produto; os dados não têm código.
  Linha omitida em vez de numerada à mão.
- **Sem carrinho.** A conversão é abrir o `wa.me` com nome e preço — do cartão
  via página do produto (mensagem com quantidade), direto na barra e na sidebar.
- **Cotação única.** `LOJA.cotacaoDolar` alimenta topo e vitrine; U$ é conta
  direta do R$ real. Valor inicial observado na referência — o dono troca todo
  dia. Zerada, tudo volta a só R$ com aviso no console.
- **Grade `minmax(0,1fr)` em toda coluna.** Item de grade com mínimo automático
  estourava os 390px; o mínimo zerado vale para vitrine, ladrilhos e cartões.

## O que este mundo recusa

Gradiente em texto. Kicker acima de título. Vidro decorativo. Emoji no lugar
de ícone — todo glifo é desenhado, e a seta dos departamentos é o círculo com
seta da referência, redesenhado. Foto de terceiro: as miniaturas seguem vetor
próprio ou foto real do dono até ele fotografar o estoque.

E, no texto: nenhuma promessa de resultado, dose ou efeito. O catálogo
descreve o que é vendido, não o que acontece com quem usa.
