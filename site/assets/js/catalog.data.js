/* =============================================================
   CATÁLOGO — FONTE ÚNICA DA VERDADE
   -------------------------------------------------------------
   Para atualizar um preço: mude o número em `preco`. Só isso.
   Para adicionar foto:     "img": "assets/img/produtos/nome.jpg"
   Para pôr VÁRIAS fotos:   "fotos": ["assets/img/produtos/a.jpg", ".../b.jpg"]
                            (a primeira é a que aparece no card; na página do
                             produto o cliente troca clicando nas miniaturas)
   Para esgotar um item:    "esgotado": true
   Nenhum outro arquivo precisa ser tocado.
   ============================================================= */

const LOJA = {
  // ---- TROQUE ESTES VALORES ----
  marca:     'Ñandutí',
  whatsapp:  '595000000000',            // <- SEU NÚMERO. Formato: 595 + DDD + número, só dígitos.
  instagram: '',                        // <- seu @ sem a arroba. Vazio = esconde o link.
  cidade:    'Ciudad del Este, Paraguai',
  /* COTACAO DO DIA — TROQUE TODO DIA. Valor único que alimenta o
     "Dólar = R$" do topo e o preço dual U$+R$ da vitrine (U$ = R$ / cotação).
     Valor inicial observado na referência em 08/09/2026. Zerada ou ausente,
     o topo esconde o dólar e o cartão mostra só R$. */
  cotacaoDolar: 5.28,

  /* ---- A CHAMADA DA CAPA ----
     Estas três frases são AFIRMAÇÕES SUAS sobre o seu negócio.
     Só escreva aqui o que você sustenta se um cliente cobrar na loja.
     Nunca anuncie um número que a tabela não sustenta: ela publica 196
     preços, e o cliente que contar vai encontrar 196. Se a loja tem mais
     do que está aqui, escreva a diferença ("196 com preço no site"). */
  slogan: 'Sua compra no lugar certo.',   // vira o título da aba e o texto do link compartilhado

  /* Os três banners que giram sozinhos na capa. Edite à vontade:
     h = título, p = texto, selos = a linha de baixo, botao = o texto do botão.
     wa:true faz o botão abrir o WhatsApp; href manda para uma seção do site. */
  capa: [
    {
      h: 'Sua compra no lugar certo.',
      p: 'Loja física em Ciudad del Este, com o preço de cada produto publicado aqui. Atendimento direto, retirada em mãos ou envio — como ficar melhor para você.',
      selos: ['Loja física', 'Preço à vista', 'Atendimento direto'],
      botao: 'Ver seleção', href: '#catalogo',
    },
    {
      h: 'O produto está aqui, na fronteira.',
      p: 'O estoque fica em Ciudad del Este e quem te responde no WhatsApp é quem separa o seu pedido. Você retira em mãos ou a gente envia.',
      selos: ['Retirada ou envio', 'Sem intermediário'],
      botao: 'Falar agora', wa: true,
    },
    {
      h: 'Preço na tela. Sempre.',
      p: 'Todo produto desta loja tem o valor publicado e atualizado. Aqui ninguém precisa perguntar quanto custa — você já sabe antes de chamar.',
      selos: ['Sem “consulte valores”', 'Valor à vista'],
      botao: 'Ver a tabela', href: '#catalogo',
    },
  ],

  /* ---- BANNERS DA CAPA ----
     Enquanto estiver vazio, cada slide usa a vitrine desenhada
     (pedestal, foco e reflexo) com o texto acima. Quando você tiver
     banner de verdade, preencha por posição e a peça entra inteira,
     sem texto sobreposto — porque um banner bem feito já traz o dele.

     Medida: 1920 x 560 px (ou 2400 x 700 para telas retina).
     Deixe o texto do banner dentro dos 45% da esquerda: no celular
     a peça é cortada pelas laterais.

     banners: [
       { img:'assets/img/banner/1.jpg', alt:'Descrição da peça', href:'#catalogo' },
       { img:'assets/img/banner/2.jpg', alt:'...', href:'#l-renew' },
     ],

     `wa: true` no lugar do href faz a peça inteira abrir o WhatsApp — use
     quando o botão desenhado no banner for o "Falar agora".

     `imgMobile` é opcional e entra sozinho em telas até 640px. Vale a pena:
     uma peça de 1920x560 vira 130px de altura no celular e o texto some.
     Medida boa para o celular: 1080 x 1080 ou 1080 x 1350.

     Use foto sua ou arte encomendada. Banner de concorrente é material
     protegido, e selo de certificação que você não tem é declaração falsa. */
  banners: [
    /* w/h e wMobile/hMobile reservam o espaço antes da imagem chegar: sem
       eles a página pula quando o banner carrega. Meça e escreva a medida
       real do arquivo — não arredonde. */
    { img: 'assets/img/banner/1.webp', w: 2000, h: 667,
      imgMobile: 'assets/img/banner/1-mobile.webp', wMobile: 1100, hMobile: 613,
      alt: 'Ñandutí Paraguai — mais saúde para o seu dia a dia. Qualidade internacional ao seu alcance: produtos de qualidade, atendimento personalizado e mais bem-estar para você.',
      wa: true },
  ],
};

/* =============================================================
   CUPONS DE DESCONTO
   -------------------------------------------------------------
   O cliente digita o código no site e o desconto aparece na hora:
   nos preços do catálogo, no total da página do produto e no texto
   que vai para o WhatsApp.

   ATENÇÃO: quem honra o desconto é você, no atendimento. O site só
   calcula e escreve na mensagem. Se um código sair de circulação,
   apague a linha aqui — quem já tinha digitado deixa de ter efeito.

   `pct`   = porcentagem de desconto.
   `nome`  = aparece na etiqueta quando o cupom está ativo.
   ============================================================= */
const CUPONS = [
  { codigo: 'NANDU5',  pct: 5,  nome: 'Cupom 5%'  },
  { codigo: 'NANDU10', pct: 10, nome: 'Cupom 10%' },
  { codigo: 'NANDU15', pct: 15, nome: 'Cupom 15%' },
  { codigo: 'NANDU20', pct: 20, nome: 'Cupom 20%' },
];

const LINHAS = [
  {
    id: 'canetas',
    nome: 'Canetas',
    itens: [
      { n: 'Glow',          p: 705, fotos: ['assets/img/produtos/caneta-glow-alluvi.webp',
                                            'assets/img/produtos/caneta-glow-alluvi-2.webp',
                                            'assets/img/produtos/caneta-glow-alluvi-3.webp',
                                            'assets/img/produtos/caneta-glow-alluvi-4.webp'] },
      { n: 'Glow Alpen',    p: 727, img: 'assets/img/produtos/caneta-glow-alpen.webp' },
      { n: 'Retra Verde',   p: 705, img: 'assets/img/produtos/caneta-retra-verde.webp' },
      { n: 'NAD + B12',     p: 675, img: 'assets/img/produtos/caneta-nad-b12.webp' },
      { n: 'Retra Alluvi',  p: 903, img: 'assets/img/produtos/caneta-retra-alluvi.webp' },
      { n: 'Tirzepatida',   p: 661, img: 'assets/img/produtos/caneta-tirzepatida.webp' },
      { n: 'Klow 80mg',     d: 'caneta', p: 930, img: 'assets/img/produtos/caneta-klow80.webp' },
      { n: 'Retra 40mg',    d: 'sem agulha', p: 885, img: 'assets/img/produtos/caneta-retra-alluvi.webp' },
      { n: 'Retra 40mg',    d: 'com agulha', p: 885, img: 'assets/img/produtos/caneta-retra-alluvi.webp' },
      { n: 'Tirzegen',      d: 'sem agulha', p: 885, img: 'assets/img/produtos/oxygen-tirzegen-pen.webp' },
      // Foto: caneta NAD+ 1000mg+B12 da fonte oficial (único NAD+ Pen do catálogo Oxygen); item sem dose na tabela.
      { n: 'NAD+ Pen',      p: 910, img: 'assets/img/produtos/caneta-nadpen.webp' },
      // Foto: caneta Mounjaro KwikPen real — Raimond Spekking, Wikimedia Commons (CC BY-SA 4.0). Fonte DailyMed confirma o registro do produto (Lilly).
      { n: 'Mounjaro',      p: 1480, img: 'assets/img/produtos/mounjaro-kwikpen.webp' },
    ],
  },
  {
    id: 'renew',
    nome: 'Peptídeos',
    itens: [
      { n: 'GHK-CU 50mg',    p: 470, img: 'assets/img/produtos/px-ghk-cu-50.webp' },
      { n: 'GHK-CU 100mg',   p: 500, fotos: ['assets/img/produtos/neo-ghk-cu-100.webp',
                                             'assets/img/produtos/neo-ghk-cu-100-b.webp'] },
      { n: 'Ipamorelin 10mg',p: 510, img: 'assets/img/produtos/px-ipamorelin.webp' },
      { n: 'BPC-157 10mg',   p: 510, img: 'assets/img/produtos/renew-bpc157.webp' },
      { n: 'TB-500 10mg',    p: 510, img: 'assets/img/produtos/renew-tb500.webp' },
      { n: 'Glutathione',    p: 510, img: 'assets/img/produtos/renew-bpc157.webp' },
      { n: 'Frag 176 10mg',  p: 551, img: 'assets/img/produtos/neo-frag176.webp' },
      { n: 'Frag 176 15mg',  p: 550, img: 'assets/img/produtos/neo-frag176.webp' },
      { n: 'PT-141',         p: 535, img: 'assets/img/produtos/px-pt141.webp' },
      { n: 'Glow 70mg',      p: 530, img: 'assets/img/produtos/neo-glow-70.webp' },
      { n: 'Klow 80mg',      p: 535, img: 'assets/img/produtos/renew-klow-80.webp' },
      { n: 'MOTS 10mg',      p: 535, img: 'assets/img/produtos/renew-mots.webp' },
      { n: 'DSIP',           p: 535, img: 'assets/img/produtos/renew-dsip.webp' },
      { n: 'CJC + IPA',      p: 535, img: 'assets/img/produtos/neo-cjc-ipa.webp' },
      { n: 'Epithalon',      p: 535, img: 'assets/img/produtos/renew-epithalon.webp' },
      { n: 'SS31',           p: 535, img: 'assets/img/produtos/renew-ss31.webp' },
      { n: 'AOD9604',        p: 550, img: 'assets/img/produtos/px-aod9604.webp' },
      { n: 'BB10',           p: 535, img: 'assets/img/produtos/renew-tb500.webp' },
      { n: 'Selank',         p: 535, img: 'assets/img/produtos/renew-selank.webp' },
      { n: 'Semax',          p: 535, img: 'assets/img/produtos/renew-semax.webp' },
      { n: 'NAD+ 100',       p: 480, img: 'assets/img/produtos/neo-nad-b12.webp' },
      { n: 'NAD+ 500',       p: 530, img: 'assets/img/produtos/px-nad500.webp' },
      { n: 'SLUP332',        p: 550, img: 'assets/img/produtos/neo-slupp332.webp' },
      { n: 'Kisspeptin',     p: 550, img: 'assets/img/produtos/renew-kisspeptin.webp' },
      { n: 'KPV',            p: 535, img: 'assets/img/produtos/px-kpv.webp' },
      { n: 'Wolverine',      p: 535, img: 'assets/img/produtos/neo-wolverine.webp' },
      { n: 'CBL 20mg',       p: 550, img: 'assets/img/produtos/px-cbl20.webp' },
      { n: 'Tesamorelin',    p: 545, img: 'assets/img/produtos/neo-tesamorelin.webp' },
      { n: 'Retatrutide',    p: 550, img: 'assets/img/produtos/renew-retatrutide.webp' },
      { n: 'MOTS 40mg',      p: 580, img: 'assets/img/produtos/renew-mots.webp' },
      { n: 'CBL 60mg',       p: 610, img: 'assets/img/produtos/px-cbl20.webp' },
      { n: 'Tirzec 30mg',     p: 510, img: 'assets/img/produtos/tirzec-15.webp' },
      { n: 'Tirzec 60mg',     p: 550, img: 'assets/img/produtos/tirzec-15.webp' },
      { n: 'Oxytocin 10mg',   p: 535, img: 'assets/img/produtos/renew-kisspeptin.webp' },
      { n: 'Pinealon 10mg',   p: 535, img: 'assets/img/produtos/renew-epithalon.webp' },
      { n: 'Tesa + Ipa 20mg', p: 580, img: 'assets/img/produtos/neo-cjc-ipa.webp' },
      { n: 'Tesa 20mg',       p: 580, img: 'assets/img/produtos/neo-tesamorelin.webp' },
    ],
  },
  {
    id: 'injetaveis',
    nome: 'Linha Injetável',
    itens: [
      { n: 'TG 15mg',                 p: 770, img: 'assets/img/produtos/tg-15mg.webp' },
      { n: 'Lipo Biotidina',          p: 480, img: 'assets/img/produtos/lipo-biotidina.webp' },
      { n: 'Lipoless MD',             p: 730, img: 'assets/img/produtos/lipoless-md.webp' },
      { n: 'Lipoless',                d: '4 ampolas', p: 735, img: 'assets/img/produtos/lipoless-md.webp' },
      { n: 'Lipoless Orgoglip 0.8',   p: 505, img: 'assets/img/produtos/lipoless-orgoglip.webp' },
      { n: 'Lipoless Orgoglip 2.5',   p: 530, img: 'assets/img/produtos/lipoless-orgoglip.webp' },
      { n: 'Lipoless Orgoglip 5.5',   p: 550, img: 'assets/img/produtos/lipoless-orgoglip.webp' },
      { n: 'Lipoland MD',             p: 680, img: 'assets/img/produtos/lipoland-md.webp' },
      { n: 'Lipoland',                d: '4 ampolas', p: 730, img: 'assets/img/produtos/lipoland.webp' },
      { n: 'Tirzec',                  d: '1 ampola',  p: 725, img: 'assets/img/produtos/tirzec-md.webp' },
      { n: 'Tirzec',                  d: '4 ampolas', p: 730, img: 'assets/img/produtos/tirzec.webp' },
      { n: 'Tirzedal',                d: '4 ampolas', p: 730, img: 'assets/img/produtos/tirzedal.webp' },
      { n: 'Tirzedral T36',           p: 780, img: 'assets/img/produtos/tirzedral-t36.webp' },
      { n: 'Tirzedral T36',           d: '4 ampolas', p: 780, img: 'assets/img/produtos/tirzedral-t36.webp' },
      { n: 'Gluconex',                p: 750, img: 'assets/img/produtos/gluconex.webp' },
      { n: 'Slimex MD',               p: 730, img: 'assets/img/produtos/slimex-md.webp' },
      { n: 'Slimex',                  d: '4 ampolas', p: 745, img: 'assets/img/produtos/slimex.webp' },
      { n: 'Lispax',                  p: 501, img: 'assets/img/produtos/lispax.webp' },
    ],
  },
  {
    id: 'po',
    nome: 'Pó Liofilizado & Diluídos',
    itens: [
      { n: 'Line Body',                       p: 990, img: 'assets/img/produtos/line-body.webp' },
      { n: 'Botox Dysport',                   p: 515, img: 'assets/img/produtos/dysport.webp' },
      { n: 'Botox Hutos',                     p: 661, img: 'assets/img/produtos/hutox.webp' },
      { n: 'Retra Pó',                        p: 606, img: 'assets/img/produtos/retra-po.webp' },
      { n: 'Retra Syned Diluída 90mg',        p: 848, img: 'assets/img/produtos/retra-syned-90.webp' },
      { n: 'Retra Synedica Pó 120mg',         p: 905, img: 'assets/img/produtos/retra-synedica-120.webp' },
      { n: 'Tirzepatide Synedica Pó 240mg',   p: 850, img: 'assets/img/produtos/tirzepatide-synedica-240.webp' },
      { n: 'Tirzepatide Thera',               p: 771, img: 'assets/img/produtos/tirzepatide-thera.webp' },
      { n: 'Masteron Elite',                  p: 567, img: 'assets/img/produtos/masteron-elite.webp' },
    ],
  },
  {
    id: 'oxygen',
    nome: 'Oxygen',
    itens: [
      { n: 'AHK-CU',         p: 600,  img: 'assets/img/produtos/oxygen-ahk-cu.webp' },
      { n: 'GHK-CU 50mg',    p: 545,  img: 'assets/img/produtos/oxygen-ghk-cu-50.webp' },
      { n: 'GHK-CU 100mg',   p: 600,  img: 'assets/img/produtos/oxygen-ghk-cu-100.webp' },
      { n: 'Cagrisema',      p: 700, img: 'assets/img/produtos/oxygen-cagrisema.webp' },
      { n: 'Tesamorelin',    p: 677,  img: 'assets/img/produtos/oxygen-tesamorelin.webp' },
      { n: 'HGH',            d: '5 ampolas', p: 864, img: 'assets/img/produtos/oxygen-hgh.webp' },
      { n: 'Retagen 80mg',   p: 835,  img: 'assets/img/produtos/oxygen-retagen-80.webp' },
      { n: 'Retagen 120mg',  d: 'diluído', p: 955, img: 'assets/img/produtos/oxygen-retagen-120.webp' },
      { n: 'Retagen 120mg',  d: 'liofilizada', p: 955, img: 'assets/img/produtos/oxygen-retagen-120.webp' },
      { n: 'Retagen 160mg',  p: 950, img: 'assets/img/produtos/oxygen-retagen-160.webp' },
      { n: 'Retagen 40mg',   d: 'diluída', p: 805, img: 'assets/img/produtos/oxygen-retagen40-diluida.webp' },
      { n: 'Retagen 40mg',   d: 'liofilizado', p: 780, img: 'assets/img/produtos/oxygen-retagen40-lio.webp' },
      { n: 'Retagen 60mg',   d: 'liofilizada', p: 830, img: 'assets/img/produtos/oxygen-retagen60.webp' },
      { n: 'Selank',         d: 'nasal', p: 610, img: 'assets/img/produtos/renew-selank.webp' },
      { n: 'Semax',          d: 'nasal', p: 610, img: 'assets/img/produtos/renew-semax.webp' },
      { n: 'Retatrutide Pen',p: 952,  img: 'assets/img/produtos/oxygen-retatrutide-pen.webp' },
      { n: 'Tirzegen Pen',   p: 685,  img: 'assets/img/produtos/oxygen-tirzegen-pen.webp' },
      { n: 'Glow Pen',       p: 810,  img: 'assets/img/produtos/oxygen-glow-pen.webp' },
      { n: 'GHK-CU Pen',     p: 810,  img: 'assets/img/produtos/oxygen-ghk-cu-pen.webp' },
      { n: 'Klow Pen',       p: 830,  img: 'assets/img/produtos/oxygen-klow-pen.webp' },
    ],
  },
  {
    id: 'esteticos',
    nome: 'Injetáveis Estéticos',
    itens: [
      { n: 'Veltrane 90mg',   p: 750, img: 'assets/img/produtos/veltrane-90.webp' },
      { n: 'Veltrane 120mg',  p: 790, img: 'assets/img/produtos/veltrane-120.webp' },
      { n: 'Veltrane Pure',   p: 727, img: 'assets/img/produtos/veltrane-pure.webp' },
      { n: 'Scuptra',         p: 1161, img: 'assets/img/produtos/sculptra.webp' },
      { n: 'Todo Cann CBO',   p: 771, img: 'assets/img/produtos/todocann-cbo.webp' },
    ],
  },
  {
    id: 'seruns',
    nome: 'Séruns',
    itens: [
      { n: 'Glow Alluvi',  p: 515, img: 'assets/img/produtos/serum-glow-alluvi.webp' },
      { n: 'GHK-CU',       p: 460, img: 'assets/img/produtos/serum-ghk-cu.webp' },
      { n: 'VL',           p: 540, img: 'assets/img/produtos/serum-vl.webp' },
      { n: 'Facial',       p: 441, img: 'assets/img/produtos/serum-facial.webp' },
      { n: 'Mousse',       p: 485, img: 'assets/img/produtos/serum-mousse.webp' },
    ],
  },
  {
    id: 'dermo',
    nome: 'Dermocosméticos',
    itens: [
      { n: 'Dr. Althea 147',  p: 485, img: 'assets/img/produtos/dr-althea-147.webp' },
      { n: 'Dr. Althea 345',  p: 485, img: 'assets/img/produtos/dr-althea-345.webp' },
      { n: 'Celimax Vita',    p: 430, img: 'assets/img/produtos/celimax-vita.webp' },
      { n: 'Numbuzin No.9',   p: 480, img: 'assets/img/produtos/numbuzin-no9.webp' },
      { n: 'Skin1004',        p: 457, img: 'assets/img/produtos/skin1004.webp' },
      { n: 'Medicube Pink',   p: 468, img: 'assets/img/produtos/medicube-pink.webp' },
      { n: 'Medicube Zero',   p: 460, img: 'assets/img/produtos/medicube-zero.webp' },
      { n: 'Quenavin',             d: '30 cápsulas', p: 430, img: 'assets/img/produtos/quenavin-capsulas.webp' },
      { n: 'Quenavin Shampoo',       p: 425, img: 'assets/img/produtos/quenavin-shampoo.webp' },
      { n: 'Quenavin Condicionador', p: 425, img: 'assets/img/produtos/quenavin-condicionador.webp' },
    ],
  },
  {
    id: 'dragon',
    nome: 'Dragon Elite — Cápsulas',
    itens: [
      { n: 'GHK-CU',      p: 530, img: 'assets/img/produtos/dragon-ghk-cu.webp' },
      { n: 'SLU-PP-332',  p: 530, img: 'assets/img/produtos/dragon-slu-pp-332.webp' },
      { n: 'Organ Shield',p: 515, img: 'assets/img/produtos/dragon-organ-shield.webp' },
      { n: 'MK-677',      p: 515, img: 'assets/img/produtos/dragon-mk-677.webp' },
      { n: 'Cardarine',   p: 556, img: 'assets/img/produtos/dragon-cardarine.webp' },
      { n: 'Ligandrol',   p: 515, img: 'assets/img/produtos/dragon-ligandrol.webp' },
    ],
  },
  {
    id: 'lander',
    nome: 'Lander',
    itens: [
      { n: 'Masteron',           p: 490, img: 'assets/img/produtos/lander-mfr-masteron.webp' },
      { n: 'Durateston',         p: 420, img: 'assets/img/produtos/lander-mfr-durateston.webp' },
      { n: 'Enantato',           p: 415, img: 'assets/img/produtos/lander-mfr-enantato.webp' },
      { n: 'Trembolona',         p: 420, img: 'assets/img/produtos/lander-mfr-trembolona.webp' },
      { n: 'Deca',               p: 415, img: 'assets/img/produtos/lander-mfr-deca.webp' },
      { n: 'Hemogenin',          p: 380, img: 'assets/img/produtos/lander-hemogenin.webp' },
      { n: 'Oxandrolona',        p: 450, img: 'assets/img/produtos/lander-oxan.webp' },
      { n: 'NPP',                p: 425, img: 'assets/img/produtos/lander-mfr-npp.webp' },
      { n: 'Sales de Trembo',    p: 465, img: 'assets/img/produtos/lander-mfr-trembolona.webp' },
      { n: 'Stano 15ml',         p: 385, img: 'assets/img/produtos/lander-mfr-stano15.webp' },
      { n: 'Stano 30ml',         p: 410, img: 'assets/img/produtos/lander-mfr-stano30.webp' },
      { n: 'Stano Comprimido',   p: 385, img: 'assets/img/produtos/lander-stano-caps.webp' },
      { n: 'Testoland',          p: 410, img: 'assets/img/produtos/lander-mfr-testoland.webp' },
      { n: 'Propionato Testo',   p: 400, img: 'assets/img/produtos/lander-mfr-propionato.webp' },
      { n: 'Deca Branco',        p: 385, img: 'assets/img/produtos/lander-mfr-deca.webp' },
      { n: 'Androlic',           p: 400, img: 'assets/img/produtos/lander-hemogenin.webp' },
      { n: 'Boldenona',          p: 425, img: 'assets/img/produtos/lander-boldenona.webp' },
      { n: 'Clemburerol',        p: 385, img: 'assets/img/produtos/lander-stano-caps.webp' },
      { n: 'Dianabol',           p: 390, img: 'assets/img/produtos/lander-mfr-dianabol.webp' },
      { n: 'GH',                 p: 1380, img: 'assets/img/produtos/oxygen-hgh.webp' },
      { n: 'HCG',                p: 440, img: 'assets/img/produtos/lander-ghc.webp' },
    ],
  },
  {
    id: 'perfumes',
    nome: 'Perfumes',
    itens: [
      { n: 'Paco Rabanne Invictus',                        d: 'EDT masculino 100 ml',            p: 360,      img: 'assets/img/produtos/perfume-paco-rabanne-invictus-edt-masculino-100-ml.webp' },
      { n: 'Calvin Klein Eternity',                        d: 'EDP feminino 100 ml',             p: 322,      img: 'assets/img/produtos/perfume-calvin-klein-eternity-edp-feminino-100-ml.webp' },
      { n: 'Calvin Klein Euphoria',                        d: 'EDP feminino 100 ml',             p: 298,      img: 'assets/img/produtos/perfume-calvin-klein-euphoria-edp-feminino-100-ml.webp' },
      { n: 'Issey Miyake L\'Eau d\'Issey',                 d: 'EDT masculino 125 ml',            p: 385,      img: 'assets/img/produtos/perfume-issey-miyake-l-eau-d-issey-edt-masculino-125-ml.webp' },
      { n: 'Christian Dior J\'adore',                      d: 'EDP feminino 100 ml',             p: 579,      img: 'assets/img/produtos/perfume-christian-dior-j-adore-edp-feminino-100-ml.webp' },
      { n: 'Jacques Bogart Silver Scent Intense',          d: 'EDT masculino 100 ml',            p: 199,      img: 'assets/img/produtos/perfume-jacques-bogart-silver-scent-intense-edt-masculino-10.webp' },
      { n: 'Animale For Men',                              d: 'EDT masculino 100 ml',            p: 215,      img: 'assets/img/produtos/perfume-animale-for-men-edt-masculino-100-ml.webp' },
      { n: 'Britney Spears Fantasy',                       d: 'EDP feminino 100 ml',             p: 226.5,    img: 'assets/img/produtos/perfume-britney-spears-fantasy-edp-feminino-100-ml.webp' },
      { n: 'Calvin Klein CK Be',                           d: 'EDT unissex 100 ml',              p: 209,      img: 'assets/img/produtos/perfume-calvin-klein-ck-be-edt-unissex-100-ml.webp' },
      { n: 'Paco Rabanne Lady Million',                    d: 'EDP feminino 80 ml',              p: 483,      img: 'assets/img/produtos/perfume-paco-rabanne-lady-million-edp-feminino-80-ml.webp' },
      { n: 'Hugo Boss Bottled',                            d: 'EDT masculino 100 ml',            p: 420,      img: 'assets/img/produtos/perfume-hugo-boss-bottled-edt-masculino-100-ml.webp' },
      { n: 'Paco Rabanne Phantom',                         d: 'EDT masculino 100 ml',            p: 429,      img: 'assets/img/produtos/perfume-paco-rabanne-phantom-edt-masculino-100-ml.webp' },
      { n: 'Animale',                                      d: 'EDP feminino 100 ml',             p: 239,      img: 'assets/img/produtos/perfume-animale-edp-feminino-100-ml.webp' },
      { n: 'Jacques Bogart Silver Scent',                  d: 'EDT masculino 100 ml',            p: 214,      img: 'assets/img/produtos/perfume-jacques-bogart-silver-scent-edt-masculino-100-ml.webp' },
      { n: 'Chloé',                                        d: 'EDP feminino 75 ml',              p: 499,      img: 'assets/img/produtos/perfume-chloe-edp-feminino-75-ml.webp' },
      { n: 'Montblanc Legend',                             d: 'EDT masculino 100 ml',            p: 335,      img: 'assets/img/produtos/perfume-montblanc-legend-edt-masculino-100-ml.webp' },
      { n: 'Paco Rabanne 1 Million',                       d: 'EDP masculino 100 ml',            p: 389,      img: 'assets/img/produtos/perfume-paco-rabanne-1-million-edp-masculino-100-ml.webp' },
      { n: 'Montblanc Starwalker',                         d: 'EDT masculino 75 ml',             p: 259,      img: 'assets/img/produtos/perfume-montblanc-starwalker-edt-masculino-75-ml.webp' },
      { n: 'Lancôme La Vie Est Belle',                     d: 'EDP feminino 100 ml',             p: 499,      img: 'assets/img/produtos/perfume-lancome-la-vie-est-belle-edp-feminino-100-ml.webp' },
      { n: 'Paco Rabanne Olympéa',                         d: 'EDP feminino 80 ml',              p: 514,      img: 'assets/img/produtos/perfume-paco-rabanne-olympea-edp-feminino-80-ml.webp' },
      { n: 'Marina de Bourbon Classique',                  d: 'EDP feminino 100 ml',             p: 259,      img: 'assets/img/produtos/perfume-marina-de-bourbon-classique-edp-feminino-100-ml.webp' },
      { n: 'Carolina Herrera 212 Men Heroes Forever Young',d: 'EDT masculino 90 ml',             p: 449,      img: 'assets/img/produtos/perfume-carolina-herrera-212-men-heroes-forever-young-edt-ma.webp' },
      { n: 'Giorgio Armani Acqua di Giò',                  d: 'EDT masculino 100 ml',            p: 459,      img: 'assets/img/produtos/perfume-giorgio-armani-acqua-di-gio-edt-masculino-100-ml.webp' },
      { n: 'Carolina Herrera 212',                         d: 'EDT feminino 100 ml',             p: 449,      img: 'assets/img/produtos/perfume-carolina-herrera-212-edt-feminino-100-ml.webp' },
      { n: 'Ted Lapidus Pour Homme',                       d: 'EDT masculino 100 ml',            p: 184,      img: 'assets/img/produtos/perfume-ted-lapidus-pour-homme-edt-masculino-100-ml.webp' },
      { n: 'Azzaro Chrome',                                d: 'EDT masculino 100 ml',            p: 325,      img: 'assets/img/produtos/perfume-azzaro-chrome-edt-masculino-100-ml.webp' },
      { n: 'Ferrari Scuderia Black',                       d: 'EDT masculino 125 ml',            p: 215,      img: 'assets/img/produtos/perfume-ferrari-scuderia-black-edt-masculino-125-ml.webp' },
      { n: 'Marina de Bourbon Royal Diamond',              d: 'EDP feminino 100 ml',             p: 265,      img: 'assets/img/produtos/perfume-marina-de-bourbon-royal-diamond-edp-feminino-100-ml.webp' },
      { n: 'Mercedes-Benz Club',                           d: 'EDT masculino 100 ml',            p: 310,      img: 'assets/img/produtos/perfume-mercedes-benz-club-edt-masculino-100-ml.webp' },
      { n: 'Elizabeth Arden Red Door',                     d: 'EDT feminino 100 ml',             p: 295,      img: 'assets/img/produtos/perfume-elizabeth-arden-red-door-edt-feminino-100-ml.webp' },
      { n: 'Antonio Banderas Blue Seduction',              d: 'EDT feminino 80 ml',              p: 195,      img: 'assets/img/produtos/perfume-antonio-banderas-blue-seduction-edt-feminino-80-ml.webp' },
      { n: 'Carolina Herrera CH Men',                      d: 'EDT masculino 100 ml',            p: 399,      img: 'assets/img/produtos/perfume-carolina-herrera-ch-men-edt-masculino-100-ml.webp' },
      { n: 'Mercedes-Benz For Men',                        d: 'EDT masculino 120 ml',            p: 280,      img: 'assets/img/produtos/perfume-mercedes-benz-for-men-edt-masculino-120-ml.webp' },
      { n: 'Carolina Herrera Bad Boy',                     d: 'EDT masculino 100 ml',            p: 445,      img: 'assets/img/produtos/perfume-carolina-herrera-bad-boy-edt-masculino-100-ml.webp' },
      { n: 'Montblanc Legend Red',                         d: 'EDP masculino 100 ml',            p: 315,      img: 'assets/img/produtos/perfume-montblanc-legend-red-edp-masculino-100-ml.webp' },
      { n: 'Paco Rabanne Fame',                            d: 'EDP feminino 80 ml',              p: 525,      img: 'assets/img/produtos/perfume-paco-rabanne-fame-edp-feminino-80-ml.webp' },
      { n: 'Montblanc Individuel',                         d: 'EDT masculino 75 ml',             p: 260,      img: 'assets/img/produtos/perfume-montblanc-individuel-edt-masculino-75-ml.webp' },
      { n: 'Calvin Klein CK One',                          d: 'EDT unissex 100 ml',              p: 220,      img: 'assets/img/produtos/perfume-calvin-klein-ck-one-edt-unissex-100-ml.webp' },
      { n: 'Ralph Lauren Polo Black',                      d: 'EDT masculino 125 ml',            p: 410,      img: 'assets/img/produtos/perfume-ralph-lauren-polo-black-edt-masculino-125-ml.webp' },
      { n: 'Antonio Banderas Seduction in Black',          d: 'EDT masculino 100 ml',            p: 190,      img: 'assets/img/produtos/perfume-antonio-banderas-seduction-in-black-edt-masculino-10.webp' },
      { n: 'Dolce & Gabbana Light Blue',                   d: 'EDT feminino 100 ml',             p: 425,      img: 'assets/img/produtos/perfume-dolce-gabbana-light-blue-edt-feminino-100-ml.webp' },
      { n: 'Azzaro Pour Homme',                            d: 'EDT masculino 100 ml',            p: 270,      img: 'assets/img/produtos/perfume-azzaro-pour-homme-edt-masculino-100-ml.webp' },
      { n: 'Animale Seduction Femme',                      d: 'EDP feminino 100 ml',             p: 260,      img: 'assets/img/produtos/perfume-animale-seduction-femme-edp-feminino-100-ml.webp' },
      { n: 'Christian Dior Sauvage',                       d: 'EDP masculino 100 ml',            p: 730,      img: 'assets/img/produtos/perfume-christian-dior-sauvage-edp-masculino-100-ml.webp' },
      { n: 'Calvin Klein Euphoria Men',                    d: 'EDT masculino 100 ml',            p: 280,      img: 'assets/img/produtos/perfume-calvin-klein-euphoria-men-edt-masculino-100-ml.webp' },
      { n: 'Carolina Herrera 212',                         d: 'EDT masculino 100 ml',            p: 420,      img: 'assets/img/produtos/perfume-carolina-herrera-212-edt-masculino-100-ml.webp' },
      { n: 'Carolina Herrera 212 Sexy',                    d: 'EDT masculino 100 ml',            p: 410,      img: 'assets/img/produtos/perfume-carolina-herrera-212-sexy-edt-masculino-100-ml.webp' },
      { n: 'Gilles Cantuel Arsenal Gold',                  d: 'EDP masculino 100 ml',            p: 190,      img: 'assets/img/produtos/perfume-gilles-cantuel-arsenal-gold-edp-masculino-100-ml.webp' },
      { n: 'Christian Dior Sauvage',                       d: 'EDT masculino 100 ml',            p: 525,      img: 'assets/img/produtos/perfume-christian-dior-sauvage-edt-masculino-100-ml.webp' },
      { n: 'Marina de Bourbon Passion Cristal Royal',      d: 'EDP feminino 100 ml',             p: 270, img: 'assets/img/produtos/perfume-marina-de-bourbon-passion-cristal-royal-edp-feminino.webp' },
      { n: 'Carolina Herrera 212 VIP',                     d: 'EDP feminino 80 ml',              p: 449,      img: 'assets/img/produtos/perfume-carolina-herrera-212-vip-edp-feminino-80-ml.webp' },
      { n: 'Victoria\'s Secret Rush',                      d: 'loção corporal 236 ml',           p: 145,      img: 'assets/img/produtos/perfume-victoria-s-secret-rush-locao-corporal-236-ml.webp' },
      { n: 'Victoria\'s Secret Temptation',                d: 'loção corporal 236 ml',           p: 145,      img: 'assets/img/produtos/perfume-victoria-s-secret-temptation-locao-corporal-236-ml.webp' },
      { n: 'Azzaro Chrome',                                d: 'miniatura EDT masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-azzaro-chrome-edt-masculino-100-ml.webp' },
      { n: 'Ferrari Scuderia Black',                       d: 'miniatura EDT masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-ferrari-scuderia-black-edt-masculino-125-ml.webp' },
      { n: 'Marina de Bourbon Royal Diamond',              d: 'miniatura EDP feminino 25 ml',    p: 140,      img: 'assets/img/produtos/perfume-marina-de-bourbon-royal-diamond-edp-feminino-100-ml.webp' },
      { n: 'Mercedes-Benz Club',                           d: 'miniatura EDT masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-mercedes-benz-club-edt-masculino-100-ml.webp' },
      { n: 'Elizabeth Arden Red Door',                     d: 'miniatura EDT feminino 25 ml',    p: 140,      img: 'assets/img/produtos/perfume-elizabeth-arden-red-door-edt-feminino-100-ml.webp' },
      { n: 'Antonio Banderas Blue Seduction',              d: 'miniatura EDT feminino 25 ml',    p: 140,      img: 'assets/img/produtos/perfume-antonio-banderas-blue-seduction-edt-feminino-80-ml.webp' },
      { n: 'Carolina Herrera CH Men',                      d: 'miniatura EDT masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-carolina-herrera-ch-men-edt-masculino-100-ml.webp' },
      { n: 'Mercedes-Benz For Men',                        d: 'miniatura EDT masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-mercedes-benz-for-men-edt-masculino-120-ml.webp' },
      { n: 'Carolina Herrera Bad Boy',                     d: 'miniatura EDT masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-carolina-herrera-bad-boy-edt-masculino-100-ml.webp' },
      { n: 'Montblanc Legend Red',                         d: 'miniatura EDP masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-montblanc-legend-red-edp-masculino-100-ml.webp' },
      { n: 'Paco Rabanne Fame',                            d: 'miniatura EDP feminino 25 ml',    p: 140,      img: 'assets/img/produtos/perfume-paco-rabanne-fame-edp-feminino-80-ml.webp' },
      { n: 'Montblanc Individuel',                         d: 'miniatura EDT masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-montblanc-individuel-edt-masculino-75-ml.webp' },
      { n: 'Calvin Klein CK One',                          d: 'miniatura EDT unissex 25 ml',     p: 140,      img: 'assets/img/produtos/perfume-calvin-klein-ck-one-edt-unissex-100-ml.webp' },
      { n: 'Ralph Lauren Polo Black',                      d: 'miniatura EDT masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-ralph-lauren-polo-black-edt-masculino-125-ml.webp' },
      { n: 'Antonio Banderas Seduction in Black',          d: 'miniatura EDT masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-antonio-banderas-seduction-in-black-edt-masculino-10.webp' },
      { n: 'Dolce & Gabbana Light Blue',                   d: 'miniatura EDT feminino 25 ml',    p: 140,      img: 'assets/img/produtos/perfume-dolce-gabbana-light-blue-edt-feminino-100-ml.webp' },
      { n: 'Azzaro Pour Homme',                            d: 'miniatura EDT masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-azzaro-pour-homme-edt-masculino-100-ml.webp' },
      { n: 'Animale Seduction Femme',                      d: 'miniatura EDP feminino 25 ml',    p: 140,      img: 'assets/img/produtos/perfume-animale-seduction-femme-edp-feminino-100-ml.webp' },
      { n: 'Christian Dior Sauvage',                       d: 'miniatura EDP masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-christian-dior-sauvage-edp-masculino-100-ml.webp' },
      { n: 'Calvin Klein Euphoria Men',                    d: 'miniatura EDT masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-calvin-klein-euphoria-men-edt-masculino-100-ml.webp' },
      { n: 'Carolina Herrera 212',                         d: 'miniatura EDT masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-carolina-herrera-212-edt-masculino-100-ml.webp' },
      { n: 'Carolina Herrera 212 Sexy',                    d: 'miniatura EDT masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-carolina-herrera-212-sexy-edt-masculino-100-ml.webp' },
      { n: 'Gilles Cantuel Arsenal Gold',                  d: 'miniatura EDP masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-gilles-cantuel-arsenal-gold-edp-masculino-100-ml.webp' },
      { n: 'Christian Dior Sauvage',                       d: 'miniatura EDT masculino 25 ml',   p: 140,      img: 'assets/img/produtos/perfume-christian-dior-sauvage-edt-masculino-100-ml.webp' },
      { n: 'Marina de Bourbon Passion Cristal Royal',      d: 'miniatura EDP feminino 25 ml',    p: 140, img: 'assets/img/produtos/perfume-marina-de-bourbon-passion-cristal-royal-edp-feminino.webp' },
      { n: '212 Rose',                                     d: 'Brand Collection 25 ml',          p: 140, img: 'assets/img/produtos/perfume-212-rose-brand-collection-25-ml.webp'        },
      { n: '212 Gold',                                     d: 'Brand Collection 25 ml',          p: 140, img: 'assets/img/produtos/perfume-212-gold-brand-collection-25-ml.webp'        },
      { n: 'Olympéa',                                      d: 'Brand Collection 25 ml',          p: 140, img: 'assets/img/produtos/perfume-olympea-brand-collection-25-ml.webp'        },
      { n: 'La Vie Est Belle',                             d: 'Brand Collection 25 ml',          p: 140, img: 'assets/img/produtos/perfume-la-vie-est-belle-brand-collection-25-ml.webp'        },
      { n: 'Dior',                                         d: 'Brand Collection 25 ml',          p: 140, img: 'assets/img/produtos/perfume-dior-brand-collection-25-ml.webp'        },
      { n: 'Lady Million',                                 d: 'Brand Collection 25 ml',          p: 140, img: 'assets/img/produtos/perfume-lady-million-brand-collection-25-ml.webp'        },
      { n: 'Scandal',                                      d: 'Brand Collection 25 ml',          p: 140, img: 'assets/img/produtos/perfume-scandal-brand-collection-25-ml.webp'        },
      { n: 'Carolina Herrera',                             d: 'Brand Collection 25 ml',          p: 140, img: 'assets/img/produtos/perfume-carolina-herrera-brand-collection-25-ml.webp'        },
      { n: 'One Million',                                  d: 'Brand Collection 25 ml',          p: 140, img: 'assets/img/produtos/perfume-one-million-brand-collection-25-ml.webp'        },
      { n: 'Invictus',                                     d: 'Brand Collection 25 ml',          p: 140, img: 'assets/img/produtos/perfume-invictus-brand-collection-25-ml.webp'        },
      { n: 'Lattafa Yara',                                 d: 'EDP 100 ml',                      p: 349.99,   img: 'assets/img/produtos/perfume-lattafa-yara-edp-100-ml.webp' },
      { n: 'Lattafa Fakhar Gold',                          d: 'EDP 100 ml',                      p: 370,      img: 'assets/img/produtos/perfume-lattafa-fakhar-gold-edp-100-ml.webp' },
      { n: 'Lattafa Fakhar Rose',                          d: 'EDP 100 ml',                      p: 370,      img: 'assets/img/produtos/perfume-lattafa-fakhar-rose-edp-100-ml.webp' },
      { n: 'Lattafa Emeer',                                d: 'EDP 100 ml',                      p: 464.9,    img: 'assets/img/produtos/perfume-lattafa-emeer-edp-100-ml.webp' },
      { n: 'Lattafa Asad',                                 d: 'EDP 100 ml',                      p: 370,      img: 'assets/img/produtos/perfume-lattafa-asad-edp-100-ml.webp' },
      { n: 'Al Wataniah Duha',                             d: 'EDP 100 ml',                      p: 339,      img: 'assets/img/produtos/perfume-al-wataniah-duha-edp-100-ml.webp' },
      { n: 'Al Wataniah Amnia',                            d: 'EDP 100 ml',                      p: 469,      img: 'assets/img/produtos/perfume-al-wataniah-amnia-edp-100-ml.webp' },
      { n: 'Lattafa Musamam',                              d: 'EDP 100 ml',                      p: 519,      img: 'assets/img/produtos/perfume-lattafa-musamam-edp-100-ml.webp' },
      { n: 'Al Wataniah Sabah Al Ward',                    d: 'EDP 100 ml',                      p: 349,      img: 'assets/img/produtos/perfume-al-wataniah-sabah-al-ward-edp-100-ml.webp' },
    ],
  },
];

/* =============================================================
   FICHA TÉCNICA — parte A: o que vale para a linha inteira
   -------------------------------------------------------------
   Forma farmacêutica, glifo do ícone e classe de inventário.
   São fatos de formato, não de farmacologia.
   ============================================================= */
const FORMATOS = {
  injetaveis: { forma: 'Ampola injetável',      glifo: 'g-ampola',  classe: 'Medicamento',            via: 'Injetável' },
  esteticos:  { forma: 'Frasco-ampola',         glifo: 'g-vial',    classe: 'Medicamento',            via: 'Injetável' },
  dermo:      { forma: 'Cosmético tópico',      glifo: 'g-tubo',    classe: 'Cosmético',              via: 'Tópico'    },
  canetas:    { forma: 'Caneta aplicadora',     glifo: 'g-caneta',  classe: 'Medicamento',            via: 'Injetável' },
  seruns:     { forma: 'Sérum com conta-gotas', glifo: 'g-gota',    classe: 'Cosmético',              via: 'Tópico'    },
  po:         { forma: 'Pó liofilizado',        glifo: 'g-po',      classe: 'Medicamento',            via: 'Injetável' },
  renew:      { forma: 'Frasco liofilizado',    glifo: 'g-cluster', classe: 'Composto de pesquisa',   via: 'Injetável' },
  oxygen:     { forma: 'Frasco e caneta',       glifo: 'g-vial',    classe: 'Composto de pesquisa',   via: 'Injetável' },
  perfumes:   { forma: 'Perfume',               glifo: 'g-perfume', classe: 'Cosmético',              via: 'Tópico'    },
  dragon:     { forma: 'Cápsula',               glifo: 'g-capsula', classe: 'Composto de pesquisa',   via: 'Oral'      },
  lander:     { forma: 'Ampola injetável',      glifo: 'g-ampola',  classe: 'Medicamento',            via: 'Injetável' },
};

/* =============================================================
   FICHA TÉCNICA — parte B: o que só a embalagem sabe
   -------------------------------------------------------------
   PREENCHA LENDO A CAIXA QUE VOCÊ TEM NA MÃO. Não preencha de
   cabeça e não copie de concorrente: composição errada num
   injetável é o único erro deste site que machuca alguém.
   Campo em branco simplesmente não aparece no site.

   A chave é o nome exato do produto, igual está na lista acima.

   Exemplo de um preenchido:

     'Tirzec': {
       composicao: 'Tirzepatida 15 mg/mL',
       fabricante: 'Laboratório X',
       origem:     'Paraguai',
       registro:   'DNVS 12345-01',
       validade:   '08/2027',
       conteudo:   '4 ampolas de 1 mL',
       conservar:  'Refrigerado, 2 °C a 8 °C',
     },
   ============================================================= */
const FICHA = {
  // 'TG 15mg': {},
  // 'Lipoless MD': {},
};

/* =============================================================
   SOBRE O PRODUTO — o texto que aparece na página do item
   -------------------------------------------------------------
   A chave é o nome exato do produto, igual está na lista acima.
   Um mesmo texto serve ao frasco grande e à miniatura, porque a
   fragrância é a mesma.

   PERFUME: família olfativa e a pirâmide de notas. É descrição de
   cheiro — pode e deve ser rica.

   SAÚDE: aqui o texto diz **o que o produto é** (composto, forma,
   apresentação), nunca o que ele faz em quem usa. Sem indicação,
   sem efeito, sem dose. Não é preciosismo: alegação terapêutica em
   produto sem registro é o tipo de frase que fecha loja e que faz
   alguém tomar decisão de saúde por causa de um site.
   ============================================================= */
const SOBRE = {
  /* ---------- PERFUMES ---------- */
  'Paco Rabanne Invictus': 'Aromático fougère fresco. Abre em toranja e folha de louro, coração de jasmim aquático e âmbar cinza, fundo de guaiaco, patchouli e almíscar. Assinatura esportiva e salgada — o frasco em forma de troféu é o cartão de visita.',
  'Calvin Klein Eternity': 'Floral verde clássico de 1988. Freesia, sálvia e mandarina na abertura; coração branco de lírio-do-vale, narciso e violeta; fundo de sândalo, patchouli e almíscar. Elegante e sóbrio, o oposto de doce.',
  'Calvin Klein Euphoria': 'Floral oriental amadeirado. Romã e caqui na saída, orquídea negra e lótus no coração, fundo cremoso de âmbar líquido, violeta e mogno. Denso e hipnótico, de noite.',
  'Issey Miyake L\'Eau d\'Issey': 'Aquático amadeirado, marco do gênero. Yuzu, bergamota e noz-moscada abrem; gerânio, lírio e canela no coração; fundo de sândalo, cedro, âmbar e tabaco. Fresco e mineral, com corpo seco no fim.',
  'Christian Dior J\'adore': 'Floral frutado luminoso. Pera e melão na abertura, um buquê largo de jasmim sambac, rosa de damasco, tuberosa e ylang-ylang no coração, fundo de almíscar, baunilha e cedro. Solar, de rastro generoso.',
  'Jacques Bogart Silver Scent Intense': 'Aromático amadeirado, versão mais concentrada do Silver Scent. Bergamota e lavanda na saída, coração especiado de gengibre e cardamomo, fundo de cedro, vetiver e couro. Seco e sério.',
  'Animale For Men': 'Amadeirado especiado. Bergamota e cardamomo abrem; coração de canela, gerânio e noz-moscada; fundo de sândalo, patchouli, âmbar e almíscar. Quente e envolvente, de perfil noturno.',
  'Britney Spears Fantasy': 'Gourmand frutado. Kiwi, lichia e amora vermelha na abertura, coração de orquídea branca e jasmim, fundo de almíscar, madeira e caramelo cremoso. Doce declarado, jovem.',
  'Calvin Klein CK Be': 'Aromático unissex e minimalista. Bergamota, mandarina e menta na saída, coração de lavanda, jasmim e magnólia, fundo de almíscar, sândalo e baunilha. Leve e limpo, de uso diário.',
  'Paco Rabanne Lady Million': 'Floral frutado com fundo de mel. Néroli, framboesa e limão abrem; coração de flor de laranjeira, jasmim sambac e gardênia; fundo de patchouli, âmbar, mel e almíscar branco. Doce e brilhante, de projeção alta.',
  'Hugo Boss Bottled': 'Amadeirado especiado, um dos masculinos mais reconhecíveis. Maçã, ameixa e bergamota na abertura, coração de canela, cravo e mogno, fundo de sândalo, vetiver, cedro e baunilha. Formal e versátil, sem estação.',
  'Paco Rabanne Phantom': 'Aromático fougère moderno. Limão siciliano e lavanda na saída, coração de alecrim e um acorde de vanilina, fundo de patchouli e madeira. Fresco na largada e doce no fim — o contraste é a graça dele.',
  'Animale': 'Floral oriental. Abertura cítrica de bergamota e mandarina, coração de ylang-ylang, jasmim e canela, fundo de baunilha, sândalo, âmbar e almíscar. Quente e adocicado, de assinatura marcante.',
  'Jacques Bogart Silver Scent': 'Aromático fougère. Bergamota, lavanda e alecrim na saída, coração de gengibre e cardamomo, fundo de vetiver, cedro e almíscar. Seco e limpo, o clássico custo-benefício da casa.',
  'Chloé': 'Floral almiscarado em torno da rosa. Peônia, lichia e freesia abrem; coração de rosa, magnólia e lírio-do-vale; fundo de cedro, âmbar e almíscar. Discreto e elegante, com ar de sabonete fino — no melhor sentido.',
  'Montblanc Legend': 'Aromático fougère. Bergamota, lavanda, abacaxi e maçã verde na abertura, coração de rosa, maçã vermelha e jasmim aquático, fundo de carvalho, tonka e sândalo. Limpo e fácil de usar.',
  'Paco Rabanne 1 Million': 'Amadeirado especiado doce. Toranja, hortelã e mandarina na saída, coração de canela, rosa e couro especiado, fundo de âmbar, patchouli, madeira e couro branco. Potente e doce, ícone da noite.',
  'Montblanc Starwalker': 'Amadeirado fresco. Bambu e bergamota abrem; coração de noz-moscada e cedro; fundo de sândalo, tonka e almíscar. Suave e discreto, bom para calor.',
  'Lancôme La Vie Est Belle': 'Gourmand floral com íris e patchouli. Groselha-preta e pera na abertura, coração de íris, jasmim e flor de laranjeira, fundo de praliné, baunilha, patchouli e tonka. Doce e cremoso, de fixação longa.',
  'Paco Rabanne Olympéa': 'Floral oriental com baunilha salgada. Água de jasmim, tangerina verde e flor de gengibre na saída, coração de baunilha salgada, fundo de âmbar cinza, sândalo e cashmeran. Doce com um lado salino, muito próprio.',
  'Marina de Bourbon Classique': 'Floral frutado. Frutas vermelhas e bergamota na abertura, coração de rosa, jasmim e violeta, fundo de baunilha, sândalo e almíscar. Feminino tradicional, de boa presença.',
  'Carolina Herrera 212 Men Heroes Forever Young': 'Aromático amadeirado. Toranja, bergamota e gengibre na saída, coração de sálvia e lavanda, fundo de cedro, vetiver e âmbar. Fresco e jovem, para o dia.',
  'Giorgio Armani Acqua di Giò': 'Aquático aromático, referência do gênero. Limão, bergamota e néroli abrem; coração de jasmim, alecrim, pêssego e notas marinhas; fundo de almíscar branco, patchouli, âmbar e cedro. Fresco, salgado, atemporal.',
  'Ted Lapidus Pour Homme': 'Fougère amadeirado à moda antiga. Lavanda, bergamota e alecrim na saída, coração de gerânio, cravo e canela, fundo de carvalho, vetiver, âmbar e couro. Seco e masculino no sentido clássico.',
  'Azzaro Chrome': 'Cítrico aromático. Limão siciliano, bergamota e néroli na abertura, coração de gengibre, coentro e jasmim, fundo de almíscar, sândalo, cedro e tonka. Limpo como sabonete bom, ótimo para o calor.',
  'Ferrari Scuderia Black': 'Amadeirado aromático. Bergamota e cítricos na saída, coração de flor de laranjeira, gerânio e cardamomo, fundo de cedro, patchouli, tonka e âmbar. Versátil e discreto.',
  'Marina de Bourbon Royal Diamond': 'Floral frutado. Pêssego, framboesa e bergamota abrem; coração de rosa, jasmim e lírio; fundo de baunilha, âmbar, sândalo e almíscar. Doce e delicado.',
  'Mercedes-Benz Club': 'Aromático amadeirado fresco. Toranja, bergamota e maçã verde na saída, coração de lavanda, gerânio e noz-moscada, fundo de cedro, vetiver, âmbar e almíscar. Discreto, de escritório.',
  'Elizabeth Arden Red Door': 'Floral clássico de 1989. Ameixa, laranja e pimenta na abertura, buquê cheio de rosa, jasmim, ylang-ylang e violeta no coração, fundo de sândalo, âmbar, cedro e almíscar. Encorpado, com ar de perfumaria antiga.',
  'Antonio Banderas Blue Seduction': 'Aquático frutado. Melão, groselha e maçã na saída, coração de flor de laranjeira, jasmim e lírio, fundo de almíscar, sândalo e âmbar. Leve e fácil, de dia.',
  'Carolina Herrera CH Men': 'Couro amadeirado. Bergamota, toranja e açafrão na abertura, coração de couro, canela, noz-moscada e jasmim, fundo de baunilha, sândalo, cedro, tonka e almíscar. Quente e elegante, de outono.',
  'Mercedes-Benz For Men': 'Amadeirado especiado. Bergamota, pera e pimenta rosa na saída, coração de flor de laranjeira, sálvia e lavanda, fundo de cedro, patchouli, âmbar e couro. Sóbrio e adulto.',
  'Carolina Herrera Bad Boy': 'Amadeirado especiado com cacau. Pimenta branca, pimenta preta e bergamota na abertura, coração de sálvia e cedro, fundo de cacau, tonka e âmbar. Doce e seco ao mesmo tempo, de noite.',
  'Montblanc Legend Red': 'Amadeirado especiado. Toranja e pimenta rosa na saída, coração de gengibre e sálvia, fundo de cedro, vetiver e âmbar. Mais quente e vermelho que o Legend original.',
  'Paco Rabanne Fame': 'Floral com manga e incenso. Manga e pimenta rosa na abertura, coração de jasmim sambac, fundo de incenso, sândalo e almíscar. Frutado e resinoso, contemporâneo.',
  'Montblanc Individuel': 'Amadeirado aromático. Bergamota, mandarina e ameixa na saída, coração de gerânio, canela e noz-moscada, fundo de sândalo, cedro, tonka e baunilha. Discreto, com fundo doce.',
  'Calvin Klein CK One': 'Cítrico aromático unissex, o marco dos anos 90. Abacaxi, mandarina, bergamota e limão abrem; coração de noz-moscada, violeta, jasmim e lírio-do-vale; fundo de almíscar, âmbar, sândalo e cedro. Limpo e leve, para qualquer um.',
  'Ralph Lauren Polo Black': 'Amadeirado aromático. Manga, tangerina e artemísia na abertura, coração de sálvia, patchouli e pimenta, fundo de tonka, sândalo e almíscar. Escuro e suave, de noite.',
  'Antonio Banderas Seduction in Black': 'Aromático amadeirado. Bergamota, gengibre e cardamomo na saída, coração de violeta, sálvia e canela, fundo de cedro, patchouli, tonka e baunilha. Simples e eficiente, bom giro para o preço.',
  'Dolce & Gabbana Light Blue': 'Cítrico floral mediterrâneo. Maçã Granny Smith, cidra da Sicília e campânula abrem; coração de bambu, jasmim e rosa branca; fundo de cedro, âmbar e almíscar. Fresco e ácido, cara de verão.',
  'Azzaro Pour Homme': 'Fougère aromático de 1978. Anis, alfazema e manjericão na abertura, coração largo de gerânio, cardamomo, vetiver e sândalo, fundo de couro, âmbar, tonka e almíscar. Clássico absoluto, seco e viril.',
  'Animale Seduction Femme': 'Floral frutado. Frutas vermelhas e bergamota na saída, coração de flor de laranjeira, jasmim e rosa, fundo de baunilha, âmbar e almíscar. Doce e envolvente.',
  'Calvin Klein Euphoria Men': 'Amadeirado especiado. Pimenta preta, gengibre e cominho na abertura, coração de cedro, sálvia e couro, fundo de âmbar, patchouli, almíscar e vetiver. Escuro e quente, de noite.',
  'Carolina Herrera 212 Sexy': 'Oriental especiado. Bergamota, mandarina e pimenta rosa na saída, coração de gengibre, canela e sálvia, fundo de baunilha, sândalo, almíscar e tonka. Doce e apimentado, o mais quente da família 212.',
  'Gilles Cantuel Arsenal Gold': 'Amadeirado oriental. Bergamota e frutas na abertura, coração de especiarias e flores brancas, fundo de baunilha, âmbar, sândalo e almíscar. Doce e cheio, com desempenho alto para a faixa.',
  'Victoria\'s Secret Rush': 'Loção corporal hidratante da linha Rush. Perfil floral frutado — frutas vermelhas, flores brancas e um fundo de baunilha e almíscar. Frasco de 236 ml.',
  'Victoria\'s Secret Temptation': 'Loção corporal hidratante da linha Temptation. Perfil gourmand frutado — pêssego, maçã e um fundo cremoso de baunilha e âmbar. Frasco de 236 ml.',

  /* mesmo nome, fragrâncias diferentes: a chave leva a apresentação junto */
  'Carolina Herrera 212 · EDT feminino 100 ml': 'Floral almiscarado urbano. Bergamota, gardênia e flor de laranjeira na abertura, coração de lírio, freesia e rosa, fundo de almíscar branco, sândalo e baunilha. Limpo e metálico, cara de cidade.',
  'Carolina Herrera 212 · EDT masculino 100 ml': 'Amadeirado especiado fresco. Toranja, bergamota e folhas verdes na saída, coração de gengibre, gardênia e flor de laranjeira, fundo de almíscar, sândalo e incenso. Fresco e limpo, o 212 masculino clássico.',
  'Carolina Herrera 212 · miniatura EDT masculino 25 ml': 'Amadeirado especiado fresco. Toranja, bergamota e folhas verdes na saída, coração de gengibre e flor de laranjeira, fundo de almíscar, sândalo e incenso.',
  'Carolina Herrera 212 VIP': 'Oriental baunilhado. Maracujá e rum na abertura, coração de gardênia e um acorde de gim-tônica, fundo de baunilha, almíscar e tonka. Doce e festivo, de balada.',
  'Christian Dior Sauvage · EDP masculino 100 ml': 'Amadeirado especiado, versão mais densa e doce do Sauvage. Bergamota de Reggio e pimenta na saída, coração de lavanda, noz-moscada e anis estrelado, fundo de baunilha, âmbar cinza e patchouli. Cremoso, de projeção forte.',
  'Christian Dior Sauvage · EDT masculino 100 ml': 'Aromático fougère. Bergamota da Calábria e pimenta de Sichuan abrem; coração de lavanda, pimenta rosa, gerânio e vetiver; fundo de âmbar cinza, cedro e labdanum. Seco, mineral e cortante — a versão mais fresca da linha.',
  'Christian Dior Sauvage · miniatura EDP masculino 25 ml': 'Amadeirado especiado, versão mais densa e doce do Sauvage. Bergamota e pimenta na saída, lavanda e anis estrelado no coração, fundo de baunilha, âmbar cinza e patchouli.',
  'Christian Dior Sauvage · miniatura EDT masculino 25 ml': 'Aromático fougère. Bergamota da Calábria e pimenta de Sichuan, coração de lavanda e gerânio, fundo de âmbar cinza e cedro. Seco e mineral.',
  'Marina de Bourbon Passion Cristal Royal': 'Oriental frutado. Maçã e frutas vermelhas na abertura, coração de amêndoa, jasmim e tuberosa, fundo de praliné, baunilha e sândalo. Doce e cremoso, no frasco vermelho facetado da casa.',

  /* ---------- ÁRABES ---------- */
  'Lattafa Yara': 'Oriental gourmand. Orquídea, tangerina e heliotrópio na abertura, coração de baunilha e almíscar, fundo de sândalo e âmbar. Muito doce, cremoso e de rastro longo — o best-seller árabe.',
  'Lattafa Fakhar Gold': 'Floral almiscarado. Bergamota e flores brancas na saída, coração de rosa e jasmim, fundo de almíscar branco, baunilha e âmbar. Limpo e cremoso, com ar de sabonete caro.',
  'Lattafa Fakhar Rose': 'Floral frutado em torno da rosa. Frutas vermelhas e pêra na abertura, coração de rosa e peônia, fundo de almíscar, baunilha e madeira. Mais doce e rosado que o Fakhar Gold.',
  'Lattafa Emeer': 'Amadeirado especiado. Açafrão, canela e maçã na saída, coração de oud e rosa, fundo de âmbar, baunilha e almíscar. Denso e oriental, unissex.',
  'Lattafa Asad': 'Amadeirado especiado. Abacaxi, pimenta preta e bergamota na abertura, coração de lavanda, patchouli e cedro, fundo de baunilha, âmbar e almíscar. Doce e potente, de projeção alta.',
  'Al Wataniah Duha': 'Floral frutado. Frutas vermelhas e cítricos na saída, coração de rosa e flores brancas, fundo de baunilha, âmbar e almíscar. Doce e feminino, de boa fixação.',
  'Al Wataniah Amnia': 'Oriental amadeirado. Especiarias e cítricos na abertura, coração de rosa, jasmim e oud, fundo de âmbar, baunilha e sândalo. Quente e denso, unissex.',
  'Lattafa Musamam': 'Oriental amadeirado. Açafrão e especiarias na saída, coração de oud, rosa e patchouli, fundo de âmbar, almíscar e madeiras. Encorpado, de perfil árabe clássico.',
  'Al Wataniah Sabah Al Ward': 'Floral em torno da rosa. Frutas e cítricos na abertura, coração de rosa damascena e jasmim, fundo de almíscar, baunilha e madeiras. Doce, floral e de rastro longo.',

  /* ---------- BRAND COLLECTION (25 ml) ----------
     São perfumes inspirados, da marca Brand Collection: fragrância
     própria, com o número de referência da casa. Não são o original
     e não têm vínculo com a marca citada — isso precisa ficar dito. */
  '212 Rose': 'Brand Collection nº 034, inspirado no 212 VIP Rosé. Floral frutado espumante: pêssego e frutas vermelhas na abertura, coração de rosa e flor de laranjeira, fundo de almíscar e baunilha. Perfume inspirado, sem vínculo com a marca original.',
  '212 Gold': 'Brand Collection nº 008, inspirado no 212 VIP Men. Amadeirado especiado: pimenta e vodca na saída, coração de couro e gengibre, fundo de âmbar e madeira. Perfume inspirado, sem vínculo com a marca original.',
  'Olympéa': 'Brand Collection nº 087, inspirado no Olympéa. Floral oriental com baunilha salgada, jasmim aquático e âmbar cinza. Perfume inspirado, sem vínculo com a marca original.',
  'La Vie Est Belle': 'Brand Collection nº 076, inspirado no La Vie Est Belle. Gourmand floral: íris e jasmim no coração, fundo de praliné, baunilha e patchouli. Perfume inspirado, sem vínculo com a marca original.',
  'Dior': 'Brand Collection nº 015, inspirado no Miss Dior. Floral chipre: frutas vermelhas na abertura, coração de rosa e jasmim, fundo de patchouli e almíscar. Perfume inspirado, sem vínculo com a marca original.',
  'Lady Million': 'Brand Collection nº 105, inspirado no Lady Million. Floral frutado com mel: framboesa e néroli na saída, jasmim no coração, fundo de patchouli, mel e âmbar. Perfume inspirado, sem vínculo com a marca original.',
  'Scandal': 'Brand Collection nº 136, inspirado no Scandal. Gourmand com mel: laranja sanguínea e gardênia na abertura, coração de mel e gardênia, fundo de patchouli e cera de abelha. Perfume inspirado, sem vínculo com a marca original.',
  'Carolina Herrera': 'Brand Collection nº 009, inspirado no 212 VIP. Oriental baunilhado: maracujá e rum na saída, gardênia no coração, fundo de baunilha, almíscar e tonka. Perfume inspirado, sem vínculo com a marca original.',
  'One Million': 'Brand Collection nº 005, inspirado no 1 Million. Amadeirado especiado doce: toranja e hortelã na abertura, canela e couro no coração, fundo de âmbar e madeira. Perfume inspirado, sem vínculo com a marca original.',
  'Invictus': 'Brand Collection nº 116, inspirado no Invictus. Aromático fresco: toranja e louro na saída, jasmim aquático e âmbar cinza no coração, fundo de guaiaco e almíscar. Perfume inspirado, sem vínculo com a marca original.',

  /* =============================================================
     LINHAS DE SAÚDE
     -------------------------------------------------------------
     Aqui o texto diz O QUE O PRODUTO É: composto, forma, marca e
     apresentação. Nada do que ele faz em quem usa — sem indicação,
     sem efeito, sem dose. Vale para todos os itens abaixo.
     ============================================================= */

  /* ---- Canetas ---- */
  'Glow': 'Caneta aplicadora Alluvi Healthcare. Blend de três peptídeos: BPC-157 10 mg, TB-500 10 mg e GHK-Cu 50 mg, 70 mg no total. Uso subcutâneo. Conservar refrigerado.',
  'Glow Alpen': 'Caneta aplicadora Alluvi Healthcare, kit com duas unidades. Blend GHK-Cu 50 mg + BPC-157 10 mg + TB-500 10 mg. Uso subcutâneo. Conservar refrigerado.',
  'Retra Verde': 'Caneta aplicadora Synedica, marcador verde. Composto: retatrutida, 40 mg em caneta pré-cheia de 3 mL. Medicamento de venda sob prescrição médica.',
  'NAD + B12': 'Caneta aplicadora Oxygen KW Pharma. Composto: NAD+ 1000 mg com vitamina B12 4000 mcg. Uso subcutâneo. Conservar refrigerado.',
  'Retra Alluvi': 'Caneta aplicadora Alluvi Healthcare. Composto: retatrutida, 40 mg em 4 doses de 10 mg. Medicamento de venda sob prescrição médica. Conservar entre 2 °C e 8 °C.',
  'Tirzepatida': 'Caneta aplicadora Synedica Labs. Composto: tirzepatida, 40 mg em caneta pré-cheia de 3 mL, 4 doses de 10 mg. Medicamento de venda sob prescrição médica.',
  'Retra 40mg · sem agulha': 'Caneta aplicadora. Composto: retatrutida 40 mg, apresentação sem agulha. Medicamento de venda sob prescrição médica.',
  'Retra 40mg · com agulha': 'Caneta aplicadora. Composto: retatrutida 40 mg, apresentação com agulha. Medicamento de venda sob prescrição médica.',
  'Tirzegen · sem agulha': 'Caneta aplicadora Oxygen KW Pharma. Composto: tirzepatida 60 mg, apresentação sem agulha. Medicamento de venda sob prescrição médica.',
  'NAD+ Pen': 'Caneta aplicadora Oxygen KW Pharma. Composto: NAD+ 1000 mg com vitamina B12. Uso subcutâneo. Conservar refrigerado.',
  'Mounjaro': 'Caneta aplicadora Lilly (Mounjaro KwikPen). Composto: tirzepatida. Medicamento de venda sob prescrição médica.',

  /* ---- Peptídeos ---- */
  'GHK-CU 50mg': 'Kit PEPTIDE-X: um frasco liofilizado de GHK-Cu (tripeptídeo de cobre) 50 mg, um frasco de água estéril e uma seringa. Composto de pesquisa — rotulado para uso laboratorial, não destinado a consumo humano.',
  'GHK-CU 100mg': 'NeoPeptides: frasco liofilizado de GHK-Cu (tripeptídeo de cobre) 100 mg, com frasco de água bacteriostática de 2 mL. Composto de pesquisa — não destinado a consumo humano.',
  'Ipamorelin 10mg': 'Kit PEPTIDE-X: frasco liofilizado de ipamorelina 10 mg, água estéril e seringa. Composto de pesquisa — não destinado a consumo humano.',
  'BPC-157 10mg': 'Frasco liofilizado de BPC-157 10 mg, peptídeo de 15 aminoácidos. Composto de pesquisa — não destinado a consumo humano.',
  'TB-500 10mg': 'Frasco liofilizado de TB-500 (timosina beta-4, fragmento 43aa) 10 mg. Composto de pesquisa — não destinado a consumo humano.',
  'Glutathione': 'Frasco liofilizado de glutationa, tripeptídeo de glutamato, cisteína e glicina. Composto de pesquisa — não destinado a consumo humano.',
  'Frag 176 10mg': 'NeoPeptides: frasco liofilizado de hGH Fragment 176-191, 10 mg, com água bacteriostática. Composto de pesquisa — não destinado a consumo humano.',
  'Frag 176 15mg': 'NeoPeptides: frasco liofilizado de hGH Fragment 176-191, 15 mg, com água bacteriostática. Composto de pesquisa — não destinado a consumo humano.',
  'PT-141': 'Kit PEPTIDE-X: frasco liofilizado de PT-141 (bremelanotida) 10 mg, água estéril e seringa. Composto de pesquisa — não destinado a consumo humano.',
  'Glow 70mg': 'NeoPeptides: frasco liofilizado com blend de GHK-Cu 50 mg, TB-500 10 mg e BPC-157 10 mg, 70 mg no total, com água bacteriostática. Composto de pesquisa.',
  'Klow 80mg': 'Frasco liofilizado com blend de GHK-Cu 50 mg, TB-500 10 mg, BPC-157 10 mg e KPV 10 mg, 80 mg no total, com frasco de água bacteriostática de 3 mL. Composto de pesquisa.',
  'MOTS 10mg': 'Frasco liofilizado de MOTS-c 10 mg, peptídeo mitocondrial de 16 aminoácidos. Composto de pesquisa — não destinado a consumo humano.',
  'DSIP': 'Frasco liofilizado de DSIP (delta sleep-inducing peptide) 5 mg, nonapeptídeo. Composto de pesquisa — não destinado a consumo humano.',
  'CJC + IPA': 'NeoPeptides: frasco liofilizado com blend de CJC-1295 e ipamorelina, 10 mg no total, com água bacteriostática. Composto de pesquisa.',
  'Epithalon': 'Frasco liofilizado de epitalon (epithalon) 50 mg, tetrapeptídeo. Composto de pesquisa — não destinado a consumo humano.',
  'SS31': 'Frasco liofilizado de SS-31 (elamipretida) 10 mg, tetrapeptídeo. Composto de pesquisa — não destinado a consumo humano.',
  'AOD9604': 'Kit PEPTIDE-X: frasco liofilizado de AOD-9604 5 mg, fragmento sintético da hGH, com água estéril e seringa. Composto de pesquisa.',
  'BB10': 'Frasco liofilizado, blend de peptídeos 10 mg. Composto de pesquisa — não destinado a consumo humano. Composição exata conferida na embalagem, no atendimento.',
  'Selank': 'Frasco liofilizado de selank 10 mg, heptapeptídeo sintético. Composto de pesquisa — não destinado a consumo humano.',
  'Semax': 'Frasco liofilizado de semax 10 mg, peptídeo sintético derivado do ACTH. Composto de pesquisa — não destinado a consumo humano.',
  'NAD+ 100': 'NeoPeptides: frasco liofilizado de NAD+ com vitamina B12, com água bacteriostática. Composto de pesquisa — não destinado a consumo humano.',
  'NAD+ 500': 'NeoPeptides: frasco liofilizado de NAD+ 500 mg com vitamina B12, com água bacteriostática. Composto de pesquisa — não destinado a consumo humano.',
  'SLUP332': 'NeoPeptides: frasco liofilizado de SLU-PP-332, com água bacteriostática. Composto de pesquisa — não destinado a consumo humano.',
  'Kisspeptin': 'Frasco liofilizado de kisspeptina-10, 10 mg. Composto de pesquisa — não destinado a consumo humano.',
  'KPV': 'Frasco liofilizado de KPV (Ac-KPV-NH2) 10 mg, tripeptídeo. Composto de pesquisa — não destinado a consumo humano.',
  'Wolverine': 'NeoPeptides: frasco liofilizado com blend de TB-500 e BPC-157, 10 mg no total, com água bacteriostática. Composto de pesquisa.',
  'CBL 20mg': 'Frasco liofilizado de CBL-514, 20 mg. Composto de pesquisa — não destinado a consumo humano.',
  'Tesamorelin': 'NeoPeptides: frasco liofilizado de tesamorelina 10 mg, com água bacteriostática. Composto de pesquisa — não destinado a consumo humano.',
  'Retatrutide': 'Frasco liofilizado de retatrutida. Composto de pesquisa — molécula ainda em fase de estudo clínico, sem registro sanitário. Não destinado a consumo humano.',
  'MOTS 40mg': 'Frasco liofilizado de MOTS-c 40 mg, peptídeo mitocondrial. Composto de pesquisa — não destinado a consumo humano.',
  'CBL 60mg': 'Frasco liofilizado de CBL-514, 60 mg. Composto de pesquisa — não destinado a consumo humano.',
  'Tirzec 30mg': 'Frasco de tirzepatida (Tirzec), apresentação 30 mg. Medicamento de venda sob prescrição médica. Composição do lote conferida na embalagem, no atendimento.',
  'Tirzec 60mg': 'Frasco de tirzepatida (Tirzec), apresentação 60 mg. Medicamento de venda sob prescrição médica. Composição do lote conferida na embalagem, no atendimento.',
  'Oxytocin 10mg': 'Frasco liofilizado de ocitocina 10 mg. Composto de pesquisa — não destinado a consumo humano.',
  'Pinealon 10mg': 'Frasco liofilizado de pinealon 10 mg. Composto de pesquisa — não destinado a consumo humano.',
  'Tesa + Ipa 20mg': 'Frasco liofilizado com blend de tesamorelina e ipamorelina, 20 mg no total. Composto de pesquisa — não destinado a consumo humano.',
  'Tesa 20mg': 'Frasco liofilizado de tesamorelina 20 mg. Composto de pesquisa — não destinado a consumo humano.',
  /* ---- Linha Injetável ---- */
  'TG 15mg': 'Composto: tirzepatida 15 mg/0,5 mL. Ampola injetável. Medicamento de venda sob prescrição médica.',
  'Lipo Biotidina': 'Solução injetável composta. Medicamento de venda sob prescrição médica. Composição completa conferida na embalagem, no atendimento.',
  'Lipoless MD': 'Composto: tirzepatida. Frasco multidose Lipoless. Medicamento de venda sob prescrição médica.',
  'Lipoless': 'Composto: tirzepatida. Caixa com 4 ampolas de 0,5 mL. Medicamento de venda sob prescrição médica.',
  'Lipoless Orgoglip 0.8': 'Composto: tirzepatida, apresentação Orgoglip 0,8. Medicamento de venda sob prescrição médica.',
  'Lipoless Orgoglip 2.5': 'Composto: tirzepatida, apresentação Orgoglip 2,5. Medicamento de venda sob prescrição médica.',
  'Lipoless Orgoglip 5.5': 'Composto: tirzepatida, apresentação Orgoglip 5,5. Medicamento de venda sob prescrição médica.',
  'Lipoland MD': 'Composto: tirzepatida. Frasco multidose Lipoland, Landerlan. Medicamento de venda sob prescrição médica.',
  'Lipoland': 'Composto: tirzepatida. Landerlan, caixa com 4 ampolas de 0,5 mL. Medicamento de venda sob prescrição médica.',
  'Tirzec': 'Composto: tirzepatida. Quimfa, frasco de 2 mL. Medicamento de venda sob prescrição médica.',
  'Tirzedal': 'Composto: tirzepatida. Caixa com 4 ampolas de 0,5 mL. Medicamento de venda sob prescrição médica.',
  'Tirzedral T36': 'Composto: tirzepatida, apresentação T36. Catedral. Medicamento de venda sob prescrição médica.',
  'Gluconex': 'Composto: tirzepatida. Lasca, seringas preenchidas. Medicamento de venda sob prescrição médica.',
  'Slimex MD': 'Frasco multidose Slimex. Medicamento de venda sob prescrição médica. Composição conferida na embalagem, no atendimento.',
  'Slimex': 'Caixa Slimex com 4 ampolas. Medicamento de venda sob prescrição médica. Composição conferida na embalagem, no atendimento.',
  'Lispax': 'Composto: dimesilato de lisdexanfetamina 50 mg. Quimfa, caixa com 30 cápsulas. Medicamento sujeito a controle especial e a receita de controle sanitário.',

  /* ---- Pó Liofilizado & Diluídos ---- */
  'Line Body': 'Frasco Line Body 55 mL, tipo hard. Medicamento de venda sob prescrição médica. Composição conferida na embalagem, no atendimento.',
  'Botox Dysport': 'Composto: toxina botulínica tipo A (Dysport), 500 UI. Pó liofilizado para solução injetável. Produto de uso exclusivo por profissional habilitado, sob prescrição.',
  'Botox Hutos': 'Composto: toxina botulínica tipo A (Hutox). Pó liofilizado para solução injetável. Produto de uso exclusivo por profissional habilitado, sob prescrição.',
  'Retra Pó': 'Frasco liofilizado de retatrutida 40 mg, rotulado para uso em pesquisa. Não destinado a consumo humano.',
  'Retra Syned Diluída 90mg': 'Synedica Labs: retatrutida em frasco multidose já diluído. Medicamento de venda sob prescrição médica.',
  'Retra Synedica Pó 120mg': 'Synedica Labs: retatrutida 120 mg em frasco de 7 mL, acompanhado de água bacteriostática. Medicamento de venda sob prescrição médica.',
  'Tirzepatide Synedica Pó 240mg': 'Synedica Labs: tirzepatida em frasco multidose. Medicamento de venda sob prescrição médica.',
  'Tirzepatide Thera': 'Thera Genetics: tirzepatida, caixa com 4 frascos de 15 mg (60 mg no total). Composto de pesquisa — não destinado a consumo humano.',
  'Masteron Elite': 'Composto: propionato de drostanolona 100 mg/mL. Elite Pharma, frasco de 10 mL. Substância anabolizante — venda sob prescrição e sujeita a controle especial.',

  /* ---- Oxygen ---- */
  'AHK-CU': 'Oxygen KW Pharma: frasco liofilizado de AHK-Cu 100 mg, tripeptídeo de cobre. Composto de pesquisa — não destinado a consumo humano.',
  'Tesamorelin': 'Oxygen KW Pharma: frasco liofilizado de tesamorelina 10 mg, com água. Composto de pesquisa — não destinado a consumo humano.',
  'HGH': 'Somatropina (hGH, sequência 191AA), pó liofilizado com diluente. Medicamento de venda sob prescrição médica e sujeito a controle especial.',
  'Retagen 80mg': 'Oxygen KW Pharma: retatrutida 80 mg em frasco multidose de 4,8 mL. Composto de pesquisa — molécula sem registro sanitário.',
  'Retagen 120mg': 'Oxygen KW Pharma: retatrutida 120 mg em frasco multidose de 6 mL. Composto de pesquisa — molécula sem registro sanitário.',
  'Retagen 160mg': 'Oxygen KW Pharma: retatrutida 160 mg em frasco multidose de 9 mL. Composto de pesquisa — molécula sem registro sanitário.',
  'Retatrutide Pen': 'Oxygen KW Pharma: caneta injetável com retatrutida 40 mg. Composto de pesquisa — molécula sem registro sanitário.',
  'Tirzegen Pen': 'Oxygen KW Pharma: caneta injetável com tirzepatida 60 mg. Medicamento de venda sob prescrição médica.',
  'Glow Pen': 'Oxygen KW Pharma: caneta injetável com blend Glow 70 mg — GHK-Cu, TB-500 e BPC-157. Composto de pesquisa.',
  'GHK-CU Pen': 'Oxygen KW Pharma: caneta injetável com GHK-Cu 100 mg. Composto de pesquisa — não destinado a consumo humano.',
  'Klow Pen': 'Oxygen KW Pharma: caneta injetável com blend Klow 80 mg — GHK-Cu 50 mg, TB-500 10 mg, BPC-157 10 mg e KPV 10 mg. Composto de pesquisa.',
  'Cagrisema': 'Oxygen KW Pharma: frasco de cagrisema. Composto de pesquisa — molécula sem registro sanitário. Não destinado a consumo humano.',
  'Retagen 40mg · diluída': 'Oxygen KW Pharma: retatrutida 40 mg em frasco multidose já diluído. Composto de pesquisa — molécula sem registro sanitário.',
  'Retagen 40mg · liofilizado': 'Oxygen KW Pharma: retatrutida 40 mg em frasco liofilizado. Composto de pesquisa — molécula sem registro sanitário.',
  'Retagen 60mg · liofilizada': 'Oxygen KW Pharma: retatrutida 60 mg em frasco liofilizado. Composto de pesquisa — molécula sem registro sanitário.',

  /* ---- Injetáveis Estéticos ---- */
  'Veltrane 90mg': 'Veltrane Gold: retatrutida 90 mg em frasco de 6 mL (15 mg/mL). Composto de pesquisa — molécula sem registro sanitário.',
  'Veltrane 120mg': 'Veltrane Diamond: retatrutida 120 mg em frasco de 6 mL (20 mg/mL). Composto de pesquisa — molécula sem registro sanitário.',
  'Veltrane Pure': 'Veltrane: retatrutida 60 mg em frasco de 6 mL (10 mg/mL). Composto de pesquisa — molécula sem registro sanitário.',
  'Scuptra': 'Composto: ácido poli-L-láctico (PLLA). Pó liofilizado para suspensão injetável. Uso exclusivo por profissional habilitado, sob prescrição.',
  'Todo Cann CBO': 'Composto: canabidiol (CBD). Solução em gotas Todo CANN. Medicamento de venda sob prescrição médica.',

  /* ---- Séruns ---- */
  'Glow Alluvi': 'Alluvi Labs GLOW Copper Peptide Face Serum, 30 mL. Sérum facial de uso tópico com peptídeo de cobre (GHK-Cu) e colágeno, textura leve em gotas que espalha fácil e deixa acabamento viçoso. Aplicação com conta-gotas. Cosmético — sem promessa de tratamento.',
  'GHK-CU · ': 'Sérum facial de uso tópico com peptídeo de cobre GHK-Cu, 30 mL, com conta-gotas. Textura aquosa leve, de rápida absorção e acabamento sequinho. Cosmético — sem promessa de tratamento.',
  'VL': 'Sérum facial VL de uso tópico com PDRN, 30 mL. Textura leve em gotas, espalha fácil e deixa a pele com viço. Cosmético — sem promessa de tratamento.',
  'Facial': 'Sérum facial de uso tópico com GHK-Cu e PDRN, 30 mL, com conta-gotas. Textura leve, absorve rápido e deixa acabamento macio ao toque. Cosmético — sem promessa de tratamento.',
  'Mousse': 'Sérum facial de textura mousse com PDRN e ácido hialurônico, 70 mL, com válvula pump. Espuma cremosa que espalha com pouco produto e deixa sensação macia na aplicação. Cosmético — sem promessa de tratamento.',

  /* ---- Dermocosméticos ---- */
  'Dr. Althea 147': 'Dr. Althea 147, creme facial coreano de uso tópico. Textura cremosa que espalha fácil e deixa acabamento macio e confortável. Cosmético — sem promessa de tratamento.',
  'Dr. Althea 345': 'Dr. Althea 345 Relief Cream, creme facial coreano de uso tópico com peptídeos e niacinamida. Textura cremosa leve, de rápida absorção e acabamento macio. Cosmético — sem promessa de tratamento.',
  'Celimax Vita': 'Celimax Vita, sérum facial coreano de uso tópico com vitamina C. Textura leve em gotas, espalha fácil e deixa acabamento viçoso. Cosmético — sem promessa de tratamento.',
  'Numbuzin No.9': 'Numbuzin nº 9, sérum facial coreano de uso tópico da linha de peptídeos. Textura leve, absorve rápido e deixa a pele com viço. Cosmético — sem promessa de tratamento.',
  'Skin1004': 'SKIN1004 Madagascar Centella, cosmético coreano de uso tópico com extrato de centella asiática. Textura aquosa leve, refrescante na aplicação e de rápida absorção. Cosmético — sem promessa de tratamento.',
  'Medicube Pink': 'Medicube Pink, cosmético coreano de uso tópico. Textura cremosa leve, espalha fácil e deixa acabamento macio. Cosmético — sem promessa de tratamento.',
  'Medicube Zero': 'Medicube Zero Pore, cosmético coreano de uso tópico. Textura leve de rápida absorção e acabamento sequinho. Cosmético — sem promessa de tratamento.',
  'Quenavin · 30 cápsulas': 'Quenavin: frasco com 30 cápsulas. Composição completa conferida na embalagem, no atendimento.',
  'Quenavin Shampoo': 'Quenavin Shampoo: cosmético de uso tópico para limpeza dos cabelos. Espuma cremosa, fragrância suave e enxágue fácil. Composição conferida na embalagem, no atendimento.',
  'Quenavin Condicionador': 'Quenavin Condicionador: cosmético de uso tópico para condicionamento dos cabelos. Textura cremosa que desembaraça fácil e deixa toque macio. Composição conferida na embalagem, no atendimento.',
  /* ---- Dragon Elite ---- */
  'GHK-CU': 'Dragon Elite: cápsulas de GHK-Cu, 60 cápsulas. Composto de pesquisa — não destinado a consumo humano.',
  'SLU-PP-332': 'Dragon Elite: cápsulas de SLU-PP-332 1000 mcg, 60 cápsulas. Composto de pesquisa — não destinado a consumo humano.',
  'Organ Shield': 'Dragon Elite: cápsulas com blend de suporte, 60 cápsulas. Composto de pesquisa — não destinado a consumo humano.',
  'MK-677': 'Dragon Elite: cápsulas de MK-677 (ibutamoren), 60 cápsulas. Composto de pesquisa — não destinado a consumo humano.',
  'Cardarine': 'Dragon Elite: cápsulas de cardarina (GW-501516), 60 cápsulas. Composto de pesquisa — não destinado a consumo humano.',
  'Ligandrol': 'Dragon Elite: cápsulas de ligandrol (LGD-4033), 60 cápsulas. Composto de pesquisa — não destinado a consumo humano.',
  /* ---- Lander: só fato de forma e classe, dose na embalagem ---- */
  'Masteron': 'Landerlan: apresentação injetável de drostanolona (Masteron). Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Durateston': 'Landerlan: apresentação injetável de testosterona (Durateston). Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Enantato': 'Landerlan: apresentação injetável de enantato de testosterona. Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Trembolona': 'Landerlan: apresentação injetável de trembolona. Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Deca': 'Landerlan: apresentação injetável de nandrolona (Deca). Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Hemogenin': 'Landerlan: apresentação oral de oximetolona (Hemogenin). Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Oxandrolona': 'Landerlan: apresentação oral de oxandrolona. Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'NPP': 'Landerlan: apresentação injetável de fenilpropionato de nandrolona (NPP). Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Sales de Trembo': 'Landerlan: apresentação de sais de trembolona. Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Stano 15ml': 'Landerlan: apresentação injetável de stanozolol, 15 mL. Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Stano 30ml': 'Landerlan: apresentação injetável de stanozolol, 30 mL. Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Stano Comprimido': 'Landerlan: apresentação oral de stanozolol em comprimidos. Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Testoland': 'Landerlan: apresentação injetável de testosterona (Testoland). Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Propionato Testo': 'Landerlan: apresentação injetável de propionato de testosterona. Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Deca Branco': 'Landerlan: apresentação injetável de nandrolona (Deca Branco). Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Androlic': 'Landerlan: apresentação oral de oximetolona (Androlic). Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Boldenona': 'Landerlan: apresentação injetável de boldenona. Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'Clemburerol': 'Landerlan: apresentação oral de clembuterol. Medicamento de venda sob prescrição médica. Composição do lote conferida na embalagem, no atendimento.',
  'Dianabol': 'Landerlan: apresentação oral de metandrostenolona (Dianabol). Substância anabolizante — venda sob prescrição e sujeita a controle especial. Composição do lote conferida na embalagem, no atendimento.',
  'GH': 'Landerlan: apresentação de somatropina (hGH), pó liofilizado com diluente. Medicamento de venda sob prescrição médica e sujeito a controle especial.',
  'HCG': 'Landerlan: apresentação de gonadotrofina coriônica humana (HCG). Medicamento de venda sob prescrição médica. Composição do lote conferida na embalagem, no atendimento.',
};

/* =============================================================
   AVALIAÇÕES DE CLIENTES
   -------------------------------------------------------------
   COLE AQUI SÓ AVALIAÇÃO DE VERDADE. Peça no WhatsApp depois da
   retirada ("pode me mandar o que achou e uma foto?"), copie o
   texto e o nome, e cole abaixo. A foto vai para
   site/assets/img/avaliacoes/.

   Avaliação inventada é propaganda enganosa (CDC art. 37) e, num
   catálogo com injetável e medicamento sob prescrição, fabrica
   confiança em cima de decisão de saúde. Enquanto estiver vazio o
   site diz que ainda não há avaliação — o que é honesto e não
   custa venda nenhuma.

   A chave é o nome exato do produto (ou 'Nome · apresentação'
   quando dois itens dividem o nome).

     'Paco Rabanne Invictus': [
       { nome: 'Ana', nota: 5, data: '2026-08-14',
         titulo: 'Chegou certinho',
         texto: 'Comprei na loja e levei na hora. Original, lacrado.',
         fotos: ['assets/img/avaliacoes/ana-invictus.jpg'] },
     ],
   ============================================================= */
const AVALIACOES = {
};
