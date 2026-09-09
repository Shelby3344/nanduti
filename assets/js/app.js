/* =============================================================
   ÑANDUTÍ — comportamento
   Sem dependência, sem build. A venda continua inteira no
   WhatsApp: não existe carrinho, checkout nem pagamento aqui.
   ============================================================= */
(() => {
'use strict';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const CALM = matchMedia('(prefers-reduced-motion: reduce)').matches;

const BRL = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
const money = n => BRL.format(n);
const money2 = n => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
const flat = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const slugar = s => flat(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* ---------- índice ---------- */
const ITENS = [];
const usados = new Set();
LINHAS.forEach(linha => {
  linha.itens.forEach((it, i) => {
    let slug = slugar(`${it.n} ${it.d || ''}`);
    while (usados.has(slug)) slug += '-2';
    usados.add(slug);
    /* `fotos` é a lista completa; `img` continua sendo a primeira, para quem
       só quer uma foto e escreve `img:` como sempre. */
    const fotos = (Array.isArray(it.fotos) && it.fotos.length ? it.fotos
                  : it.img ? [it.img] : []).filter(Boolean);
    ITENS.push({
      ...it,
      fotos,
      img: fotos[0] || null,
      linhaId: linha.id,
      linhaNome: linha.nome,
      uid: `${linha.id}-${i}`,
      slug,
      busca: flat(`${it.n} ${it.d || ''} ${linha.nome}`),
    });
  });
});
const TOTAL = ITENS.length;
const porSlug = Object.fromEntries(ITENS.map(i => [i.slug, i]));

/* ---------- WhatsApp: a única saída de pedido ---------- */
const waHref = txt => `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(txt)}`;
const nomeCheio = it => `${it.n}${it.d ? ` (${it.d})` : ''}`;

const waItem = (it, qtd = 1) => {
  /* O cupom entra na mensagem para você conferir o código no atendimento. */
  const cup = typeof cupom !== 'undefined' && cupom
    ? `\nCupom *${cupom.codigo}* (${cupom.pct}%): total R$ ${money(comDesconto(it.p) * qtd)}.`
    : '';
  return waHref(
    (qtd > 1
      ? `Olá! Quero *${qtd}x ${nomeCheio(it)}* — R$ ${money(it.p)} cada, total R$ ${money(it.p * qtd)}. Tem disponível?`
      : `Olá! Vi na loja: *${nomeCheio(it)}* — R$ ${money(it.p)}. Ainda tem disponível?`) + cup
  );
};
const waGeneric = () => waHref('Olá! Vim pelo site da loja.');

/* ============================================================
   FICHA TÉCNICA
   Forma, apresentação, via e classe saem da linha e do nome que
   o dono escreveu. Preço unitário é conta. Composição, registro
   e validade vêm de FICHA, preenchidos à mão pela embalagem —
   nunca inferidos aqui.
   ============================================================ */
function concentracao(nome) {
  const m = nome.match(/(\d+(?:[.,]\d+)?)\s*(mg|mcg|µg|ml|ui|g)\b/i);
  return m ? `${m[1].replace('.', ',')} ${m[2].toLowerCase().replace('ui', 'UI')}` : null;
}
function unidades(d) {
  const m = (d || '').match(/(\d+)\s*(ampola|frasco|caneta|unidade)/i);
  return m ? Number(m[1]) : null;
}
function unitario(it) {
  const un = unidades(it.d);
  if (!un || un < 2) return null;
  const fmt = FORMATOS[it.linhaId] || {};
  const nome = (fmt.forma || 'unidade').toLowerCase().split(' ')[0];
  return { valor: Math.round(it.p / un), rotulo: nome, un };
}

function ficha(it) {
  const fmt = FORMATOS[it.linhaId] || {};
  const m = FICHA[it.n] || {};
  const u = unitario(it);
  const linhas = [
    ['Forma',          fmt.forma],
    ['Apresentação',   [concentracao(it.n), it.d].filter(Boolean).join(' · ') || null],
    ['Via',            fmt.via],
    ['Departamento',   it.linhaNome],
    ['Classe',         fmt.classe],
    ['Preço unitário', u ? `R$ ${money(u.valor)} por ${u.rotulo}` : null],
    ['Composição',     m.composicao],
    ['Conteúdo',       m.conteudo],
    ['Fabricante',     m.fabricante],
    ['Origem',         m.origem],
    ['Registro',       m.registro],
    ['Validade',       m.validade],
    ['Conservação',    m.conservar],
  ].filter(([, v]) => v);
  return { linhas, incompleta: !m.composicao };
}

/* ============================================================
   1. Marca
   ============================================================ */
function marca() {
  const curta = LOJA.cidade.split(',')[0].trim();
  $$('[data-marca]').forEach(e => (e.textContent = LOJA.marca));
  $$('[data-cidade]').forEach(e => (e.textContent = LOJA.cidade));
  $$('[data-cidade-curta]').forEach(e => (e.textContent = curta));
  $$('[data-ano]').forEach(e => (e.textContent = new Date().getFullYear()));
  $$('[data-wa-generic]').forEach(a => { a.href = waGeneric(); a.target = '_blank'; a.rel = 'noopener'; });

  /* Cotação única da loja: topo e preço dual bebem daqui. Sem ela, só R$. */
  const D = Number(LOJA.cotacaoDolar);
  const el = $('#topoDolar');
  if (el) {
    if (D > 0) el.textContent = money2(D);
    else el.closest('.topo__moeda').hidden = true;
  }
  if (!(D > 0)) console.warn('[Ñandutí] Sem LOJA.cotacaoDolar: topo sem dólar e vitrine só em R$.');

  if (LOJA.instagram) {
    const ig = $('[data-ig]');
    ig.href = `https://instagram.com/${LOJA.instagram}`;
    ig.target = '_blank'; ig.rel = 'noopener'; ig.hidden = false;
  }
  if (LOJA.whatsapp && !LOJA.whatsapp.startsWith('595000')) {
    const d = LOJA.whatsapp;
    $('#ftFone').textContent = `+${d.slice(0,3)} ${d.slice(3,6)} ${d.slice(6)}`;
  }
  if (LOJA.whatsapp.startsWith('595000')) {
    console.warn('[Ñandutí] O WhatsApp ainda é o número de exemplo. Troque LOJA.whatsapp em catalog.data.js.');
  }
}

/* ============================================================
   2. Peças reutilizáveis
   ============================================================ */
function figura(it, cls) {
  const g = (FORMATOS[it.linhaId] || {}).glifo || 'g-vial';
  return it.img
    ? `<img src="${esc(it.img)}" alt="${esc(nomeCheio(it))}" width="600" height="600"
           sizes="(max-width:519px) 46vw, (max-width:1099px) 23vw, 15vw"
           loading="lazy" decoding="async">`
    : `<svg viewBox="0 0 32 32" aria-hidden="true" class="${cls || ''}"><use href="#${g}"/></svg>`;
}

/* Preço dual no padrão da referência: U$ em destaque, R$ ao lado. O U$ é
   conta direta do R$ pela cotação única — sem ela, volta a só R$. */
function precoCardHTML(it) {
  const D = Number(LOJA.cotacaoDolar);
  if (!cupom && D > 0) return `<p class="card__p"><s>U$</s><b>${money2(it.p / D)}</b><i>|</i><span class="card__br">R$ ${money(it.p)}</span></p>`;
  if (!cupom) return `<p class="card__p"><s>R$</s><b>${money(it.p)}</b></p>`;
  return `<p class="card__p card__p--off">
    <span class="card__de">R$ ${money(it.p)}</span>
    <span class="card__por"><s>R$</s><b>${money(comDesconto(it.p))}</b></span>
  </p>`;
}

/* O cartão inteiro leva à página do produto, onde mora o Pedir — sem botão
   verde na vitrine, no padrão da referência. */
function cardHTML(it) {
  const u = unitario(it);
  return `<article class="card${it.esgotado ? ' is-out' : ''}" data-uid="${it.uid}">
    <div class="card__fig${it.img ? ' card__fig--foto' : ''}">
      ${it.img ? '' : '<span class="card__tag">' + esc((FORMATOS[it.linhaId] || {}).forma || '') + '</span>'}
      ${figura(it)}
    </div>
    <a class="card__hit" href="?produto=${it.slug}" data-pdp="${it.slug}"
       aria-label="Ver ${esc(nomeCheio(it))} — R$ ${money(it.p)}"></a>
    <div class="card__b">
      <h3 class="card__n">${esc(it.n)}</h3>
      ${it.d ? `<p class="card__d">${esc(it.d)}</p>` : ''}
      ${precoCardHTML(it)}
      ${u ? `<p class="card__u">R$ ${money(u.valor)} por ${esc(u.rotulo)}</p>` : ''}
    </div>
  </article>`;
}

/* ============================================================
   3. Home
   ============================================================ */
/* Vitrine desenhada: os formatos em pedestal, com foco e reflexo.
   É o lugar onde entra a foto real do banner quando você tiver uma —
   basta preencher LOJA.banners[i].img. */
function bannerArte(glifos, id) {
  const passo = 520 / (glifos.length + 1);
  const objs = glifos.map((g, i) => {
    const x = passo * (i + 1);
    const alt = 182 - (i % 2) * 30;
    const y = 254 - alt;
    return `<use href="#${g}" x="${x - alt / 2}" y="${y}" width="${alt}" height="${alt}"/>`;
  }).join('');
  const refl = glifos.map((g, i) => {
    const x = passo * (i + 1);
    const alt = 182 - (i % 2) * 30;
    return `<use href="#${g}" x="${x - alt / 2}" y="${-254 - alt}" width="${alt}" height="${alt}"
              transform="scale(1,-1)"/>`;
  }).join('');

  return `<svg class="slide__art" viewBox="0 0 520 320" aria-hidden="true">
    <defs>
      <radialGradient id="foco-${id}" cx="50%" cy="42%" r="52%">
        <stop offset="0%" stop-color="#fff" stop-opacity=".30"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="pedra-${id}" x1="0" x2="1">
        <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
        <stop offset="30%" stop-color="#fff" stop-opacity=".55"/>
        <stop offset="70%" stop-color="#fff" stop-opacity=".55"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="somem-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fff" stop-opacity=".24"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <mask id="fade-${id}">
        <rect x="0" y="256" width="520" height="76" fill="url(#somem-${id})"/>
      </mask>
    </defs>
    <circle cx="260" cy="150" r="185" fill="url(#foco-${id})"/>
    <g class="slide__objs" stroke="#fff" fill="none">${objs}</g>
    <rect x="0" y="254" width="520" height="2.5" fill="url(#pedra-${id})"/>
    <g mask="url(#fade-${id})" stroke="#fff" fill="none" opacity=".5">${refl}</g>
  </svg>`;
}

function capa() {
  const CLASSE = ['a', 'b', 'c'];
  const ARTE = [
    ['g-ampola', 'g-caneta', 'g-vial', 'g-capsula'],
    ['g-cluster', 'g-po', 'g-vial'],
    ['g-tubo', 'g-gota', 'g-caneta', 'g-ampola'],
  ];
  const slides = (LOJA.capa || []).slice(0, 3).map((s, i) => ({
    c: CLASSE[i], h: s.h, p: s.p, f: s.selos || [],
    b: s.botao || 'Ver seleção', href: s.href || '#catalogo', wa: !!s.wa,
    g: ARTE[i] || ARTE[0],
  }));

  const arteReal = LOJA.banners || [];

  /* Com banner de verdade a capa passa a ser só ele: um slide de texto do
     lado de fora deixaria a moldura na altura do texto e sobraria faixa
     vazia em volta da peça. Esvaziou `banners`, os textos voltam. */
  if (arteReal.length) slides.length = Math.min(slides.length, arteReal.length);

  $('#capaTrack').innerHTML = slides.map((s, i) => {
    /* Banner de imagem pronta: a peça já traz o próprio texto, então
       não sobrepomos nada — é assim que loja de verdade faz. */
    if (arteReal[i] && arteReal[i].img) {
      const b = arteReal[i];
      /* `wa: true` manda o banner inteiro para o WhatsApp — é o certo quando
         o botão desenhado na peça é o "Falar agora". O href sai pronto aqui
         porque marca() já rodou e não passa mais nesta âncora. */
      const alvo = b.wa ? waGeneric() : (b.href || '#catalogo');
      return `<section class="slide slide--img" aria-roledescription="slide"
                aria-label="${i + 1} de ${slides.length}">
        <a class="slide__link" href="${esc(alvo)}"
           aria-label="${b.wa ? 'Falar no WhatsApp' : esc(b.alt || s.h)}"
           ${b.wa ? 'target="_blank" rel="noopener"' : ''}>
          <picture>
            ${b.imgMobile ? `<source media="(max-width:640px)" srcset="${esc(b.imgMobile)}"
                      width="${b.wMobile || 1100}" height="${b.hMobile || 620}">` : ''}
            <img src="${esc(b.img)}" alt="${esc(b.alt || s.h)}"
                 width="${b.w || 2000}" height="${b.h || 672}"
                 ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
          </picture>
        </a>
      </section>`;
    }
    return `<section class="slide slide--${s.c}" aria-roledescription="slide"
             aria-label="${i + 1} de ${slides.length}">
      <svg class="capa__lace" viewBox="-260 -260 520 520" aria-hidden="true"><use href="#nd-medallion"/></svg>
      <div class="slide__in">
        <h2>${esc(s.h)}</h2>
        <p>${esc(s.p)}</p>
        <a class="btn btn--pill btn--lg ${s.wa ? 'btn--pillwa' : ''}" href="${s.wa ? '#' : s.href}"
           ${s.wa ? 'data-wa-generic' : ''}>
          ${s.wa ? '<svg aria-hidden="true"><use href="#i-wa"/></svg>' : ''}${esc(s.b)}
        </a>
        <p class="slide__f">${s.f.map(x => `<span>${esc(x)}</span>`).join('')}</p>
      </div>
      ${bannerArte(s.g, s.c)}
    </section>`;
  }).join('');

  /* Um slide só não tem para onde navegar: os pontinhos sairiam por cima
     da arte sem servir para nada. */
  $('#capaDots').hidden = slides.length < 2;
  $('#capaDots').innerHTML = slides.length < 2 ? '' : slides.map((_, i) =>
    `<button class="cdot" type="button" aria-current="${i === 0}"
       aria-label="Ver destaque ${i + 1} de ${slides.length}"></button>`).join('');

  const track = $('#capaTrack');
  const dots = $$('.cdot');
  let atual = 0, timer, garantia;

  /* Repintar os dots é responsabilidade separada: ir() move e marca, o
     scroll do dedo só marca. Antes só marcar() pintava, e como ir() já
     tinha atualizado "atual", ele saía cedo e o dot nunca seguia o giro. */
  const pintarDots = i => dots.forEach((d, k) =>
    d.setAttribute('aria-current', String(k === i)));

  const ir = i => {
    atual = (i + slides.length) % slides.length;
    pintarDots(atual);
    const alvo = track.clientWidth * atual;
    track.scrollTo({ left: alvo, behavior: CALM ? 'instant' : 'smooth' });

    /* A animação de rolagem suave nem sempre roda: aba oculta, webview
       embutida e alguns motores a suprimem. Sem isto o carrossel trava no
       primeiro slide para sempre, porque o autoplay pede e nada se move.
       Confere depois de 700 ms e corrige de forma seca se não saiu do lugar. */
    clearTimeout(garantia);
    garantia = setTimeout(() => {
      if (Math.abs(track.scrollLeft - alvo) > 8) {
        track.scrollTo({ left: alvo, behavior: 'instant' });
        marcar();
      }
    }, 700);
  };
  const marcar = () => {
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i === atual) return;
    atual = i;
    pintarDots(i);
  };

  track.addEventListener('scroll', () => { clearTimeout(timer); timer = setTimeout(marcar, 90); }, { passive: true });
  dots.forEach((d, i) => d.addEventListener('click', () => ir(i)));
  /* Giro automático. Pausa enquanto a pessoa mexe ou lê, e volta sozinho:
     matar de vez no primeiro toque deixava o banner parado o resto da visita. */
  if (!CALM && slides.length > 1) {
    const capa = $('.capa');
    let giro = null, retomar = null;

    const tocar = () => { giro ||= setInterval(() => ir(atual + 1), 6500); };
    const pausar = () => { clearInterval(giro); giro = null; };
    const adiar = () => {
      pausar();
      clearTimeout(retomar);
      retomar = setTimeout(tocar, 9000);
    };

    capa.addEventListener('pointerdown', adiar);
    capa.addEventListener('mouseenter', pausar);
    capa.addEventListener('mouseleave', tocar);
    capa.addEventListener('focusin', pausar);
    capa.addEventListener('focusout', tocar);
    document.addEventListener('visibilitychange',
      () => (document.hidden ? pausar() : tocar()));

    tocar();
  }
}

function ladrilhos() {
  /* Vitrine de departamentos. Era uma fileira de ícone + nome — o mesmo menu
     que já aparece na caixa vermelha e na fileira de atalhos logo acima, três
     vezes a mesma coisa na primeira tela. Agora cada bloco mostra um produto
     de verdade da linha e o menor preço dela: informação que a navegação não
     dá e que é o motivo de alguém tocar. */
  $('#tiles').innerHTML = LINHAS.map(l => {
    const itens = ITENS.filter(i => i.linhaId === l.id);
    const capa = itens.find(i => i.img);
    const menor = Math.min(...itens.map(i => i.p));
    const g = (FORMATOS[l.id] || {}).glifo || 'g-vial';
    return `<a class="tile" href="#l-${l.id}" data-home>
      <span class="tile__fig">
        ${capa
          ? `<img src="${esc(capa.img)}" alt="" width="300" height="300" loading="lazy" decoding="async">`
          : `<svg viewBox="0 0 32 32" aria-hidden="true"><use href="#${g}"/></svg>`}
      </span>
      <span class="tile__n">${esc(l.nome)}</span>
      <span class="tile__p">a partir de <b>R$ ${money(menor)}</b></span>
    </a>`;
  }).join('');

  $('#depQuick').innerHTML = LINHAS.slice(0, 6)
    .map(l => `<a class="dep__q" href="#l-${l.id}" data-home><svg aria-hidden="true"><use href="#i-go"/></svg>${esc(l.nome)}</a>`).join('');

  /* Lista vertical de departamentos: ícone, nome e a seta. Sem contagem —
     o número aqui não ajuda a escolher e só suja a leitura. Quem quiser
     o tamanho de cada linha vê nos chips do catálogo.
     A mesma marcação serve ao painel do desktop e à gaveta do celular. */
  const listaDep = () => `<ul class="dep__list">${LINHAS.map(l => {
    return `<li><a class="dep__link" href="#l-${l.id}" data-home>
      <svg class="dep__ico" viewBox="0 0 32 32" aria-hidden="true"><use href="#i-go"/></svg>
      <span class="dep__nome">${esc(l.nome)}</span>
      <svg class="dep__seta" aria-hidden="true"><use href="#i-chev"/></svg>
    </a></li>`;
  }).join('')}</ul>`;

  /* Sidebar do catálogo, no padrão da referência: departamentos com contagem. */
  $('#sideDeps').innerHTML = LINHAS.map(l =>
    `<li><a href="#l-${l.id}" data-home data-dep="${l.id}"><span>${esc(l.nome)}</span><small>${l.itens.length}</small></a></li>`).join('');

  $('#depMenu').innerHTML = listaDep();

  $('#gavCorpo').innerHTML = `
    <button class="gav__todos" type="button" id="gavTodos" aria-expanded="true" aria-controls="gavDeps">
      <svg aria-hidden="true"><use href="#i-menu"/></svg>
      <span>Todos os departamentos</span>
      <svg class="gav__caret" aria-hidden="true"><use href="#i-chev"/></svg>
    </button>
    <div id="gavDeps">${listaDep()}</div>`;

  $('#ftLinhas').innerHTML = LINHAS.map(l =>
    `<li><a href="#l-${l.id}" data-home>${esc(l.nome)}</a></li>`).join('');

  /* ---- painel do desktop ---- */
  const btn = $('#depAll'), menu = $('#depMenu');
  const naGaveta = () => matchMedia('(max-width:899px)').matches;
  const fechar = () => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); };

  /* ---- gaveta do celular ---- */
  const gav = $('#gav');
  const painel = $('.gav__p', gav);
  /* A gaveta se declara `aria-modal`, trava a rolagem e cobre a página — mas
     sem isto o Tab escapava para os 48 focáveis atrás dela, que continuavam
     tabuláveis. `inert` tira o fundo inteiro do caminho de uma vez; a volta
     por Tab dentro do painel fecha o ciclo nos dois sentidos. */
  const fundo = () => [$('.hd'), $('.dep'), $('#conteudo'), $('.ft'), $('.fab'), $('.skip'), $('#gate')].filter(Boolean);
  const focaveis = () => $$('a[href],button:not([disabled]),input,select,textarea', painel)
    .filter(el => el.offsetParent !== null);

  const abrirGaveta = () => {
    gav.hidden = false;
    document.body.style.overflow = 'hidden';
    fundo().forEach(el => el.setAttribute('inert', ''));
    $('#hdMenu').setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => gav.classList.add('is-on'));
    $('.gav__x', gav).focus();
  };
  /* Devolve o foco a quem abriu: no celular é o botão da barra de cima,
     no desktop é a caixa de departamentos. */
  let quemAbriu = null;
  const fecharGaveta = () => {
    gav.classList.remove('is-on');
    document.body.style.overflow = '';
    fundo().forEach(el => el.removeAttribute('inert'));
    $('#hdMenu').setAttribute('aria-expanded', 'false');
    setTimeout(() => { gav.hidden = true; }, CALM ? 0 : 220);
    (quemAbriu && quemAbriu.offsetParent !== null ? quemAbriu : $('#hdMenu')).focus();
  };
  $$('[data-gav-fechar]').forEach(e => e.addEventListener('click', fecharGaveta));
  gav.addEventListener('click', e => e.target.closest('a') && fecharGaveta());

  /* Ciclo de Tab dentro do painel. `inert` já barra o fundo; isto evita que o
     foco caia na barra do navegador ao passar do último item. */
  gav.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const f = focaveis();
    if (!f.length) return;
    const [pri, ult] = [f[0], f[f.length - 1]];
    if (e.shiftKey && document.activeElement === pri) { e.preventDefault(); ult.focus(); }
    else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); pri.focus(); }
  });

  const todos = $('#gavTodos'), deps = $('#gavDeps');
  todos.addEventListener('click', () => {
    const abrir = deps.hasAttribute('hidden');
    deps.toggleAttribute('hidden', !abrir);
    todos.setAttribute('aria-expanded', String(abrir));
  });

  /* O botão da barra de cima só existe no celular e vai direto para a gaveta. */
  $('#hdMenu').addEventListener('click', e => { e.stopPropagation(); quemAbriu = $('#hdMenu'); abrirGaveta(); });

  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (naGaveta()) { quemAbriu = btn; abrirGaveta(); return; }
    const abrir = menu.hidden;
    menu.hidden = !abrir;
    btn.setAttribute('aria-expanded', String(abrir));
  });
  document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target)) fechar(); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    fechar();
    if (!gav.hidden) fecharGaveta();
  });
  menu.addEventListener('click', e => e.target.closest('a') && fechar());
  /* Virou desktop com a gaveta aberta: fecha, senão o scroll fica travado. */
  addEventListener('resize', () => { if (!naGaveta() && !gav.hidden) fecharGaveta(); });
}

function catalogo() {
  $('#shelfRail').innerHTML = LINHAS
    .map(l => ITENS.find(i => i.linhaId === l.id))
    .map(cardHTML).join('');

  $('#catRoot').innerHTML = LINHAS.map(l => {
    const ps = l.itens.map(i => i.p);
    return `<section class="linha" id="l-${l.id}" data-linha="${l.id}">
      <header class="lhead">
        <h2>${esc(l.nome)}</h2>
        <p class="lhead__n">${l.itens.length} ${l.itens.length === 1 ? 'item' : 'itens'} · R$ ${money(Math.min(...ps))}–${money(Math.max(...ps))}</p>
      </header>
      <div class="grid">${ITENS.filter(i => i.linhaId === l.id).map(cardHTML).join('')}</div>
    </section>`;
  }).join('');

  /* Índice uid → nó. A ordenação global tira o cartão do departamento dele e
     põe na lista única; sem este mapa, procurar o cartão dentro da seção
     deixaria de achá-lo assim que ele saísse dali. */
  $$('.card[data-uid]', $('#catRoot')).forEach(c => NOS.set(c.dataset.uid, c));

  $$('.sarrow').forEach(b => b.addEventListener('click', () => {
    const rail = $('#shelfRail');
    rail.scrollBy({ left: Number(b.dataset.scroll) * rail.clientWidth * .8, behavior: CALM ? 'instant' : 'smooth' });
  }));
}

/* ============================================================
   4. Busca e ordenação
   ============================================================ */
let termo = '';

/* uid → nó do cartão, preenchido em catalogo(). */
const NOS = new Map();

/* Busca por palavras, não por pedaço de frase.
   Antes era `it.busca.includes(termo)`: "dior sauvage" dava zero porque a
   ordem não bate com o texto guardado. Agora cada palavra digitada precisa
   aparecer em algum lugar do item — a ordem deixa de importar e o cliente
   pode digitar do jeito que lembrar. */
const casa = (it, palavras) => palavras.every(p => it.busca.includes(p));

/* ---------- cupom ---------- */
/* Guardado no aparelho: quem digitou uma vez continua vendo o desconto
   ao voltar. É só cálculo e texto — quem honra é o atendimento. */
const CUP_KEY = 'nanduti:cupom';
const achaCupom = c => (typeof CUPONS !== 'undefined' ? CUPONS : [])
  .find(x => flat(x.codigo) === flat(String(c || '').trim()));
let cupom = null;
try { cupom = achaCupom(localStorage.getItem(CUP_KEY)) || null; } catch { cupom = null; }

const comDesconto = p => cupom ? p * (1 - cupom.pct / 100) : p;

let ordem = 'rel';

function aplicar() {
  const palavras = flat(termo.trim()).split(/\s+/).filter(Boolean);
  const achados = palavras.length ? ITENS.filter(it => casa(it, palavras)) : ITENS.slice();
  const vistos = achados.length;

  /* "Relevância" é a ordem do catálogo, e catálogo se lê por departamento.
     Escolhida qualquer outra ordem, a divisão por linha passa a atrapalhar:
     "menor preço" tem que responder o mais barato DA LOJA, não o mais barato
     de cada prateleira. Aí o catálogo vira lista única. */
  const plano = ordem !== 'rel';
  document.body.classList.toggle('is-plano', plano);

  if (plano) {
    const grid = $('#catFlat');
    NOS.forEach(c => { c.hidden = true; });
    ordenar(achados).forEach(it => {
      const card = NOS.get(it.uid);
      card.hidden = false;
      grid.appendChild(card);
    });
    grid.hidden = false;
    LINHAS.forEach(l => { $(`#l-${l.id}`).hidden = true; });
  } else {
    /* Volta cada cartão para a prateleira dele, na ordem original. */
    $('#catFlat').hidden = true;
    const ok = new Set(achados.map(it => it.uid));
    LINHAS.forEach(l => {
      const sec = $(`#l-${l.id}`);
      const grid = sec.querySelector('.grid');
      let n = 0;
      ITENS.filter(i => i.linhaId === l.id).forEach(it => {
        const card = NOS.get(it.uid);
        if (card.parentElement !== grid) grid.appendChild(card);
        card.hidden = !ok.has(it.uid);
        if (!card.hidden) n++;
      });
      sec.hidden = n === 0;
      const ps = l.itens.map(x => x.p);
      sec.querySelector('.lhead__n').textContent = n && n !== l.itens.length
        ? `${n} de ${l.itens.length} itens`
        : `${l.itens.length} ${l.itens.length === 1 ? 'item' : 'itens'} · R$ ${money(Math.min(...ps))}–${money(Math.max(...ps))}`;
    });
  }

  $('#catNone').hidden = vistos > 0;
  $('#qclear').hidden = !termo;
  $('#catConta').textContent = `${vistos} ${vistos === 1 ? 'resultado' : 'resultados'}`;
  modoBusca(palavras.length > 0, vistos);
  migalha();
}

/* Breadcrumb no padrão da referência: Home › Catálogo › posição atual.
   Sem R$ inventado, sem marca inventada — só o que o catálogo já sabe. */
function migalha() {
  const el = $('#crumbAtual');
  if (!el) return;
  const t = termo.trim();
  const marcar = id => $$('#sideDeps a').forEach(a =>
    a.classList.toggle('is-on', a.dataset.dep === id));
  if (t) { el.textContent = `Busca: “${t}”`; marcar(''); return; }
  if (ordem !== 'rel') { el.textContent = 'Todos os produtos'; marcar(''); return; }
  const h = (location.hash || '').match(/^#l-(.+)$/);
  const l = h && LINHAS.find(x => x.id === h[1]);
  el.textContent = l ? l.nome : 'Produtos';
  marcar(l ? l.id : '');
 }

/* Buscar vence navegar: quem digita quer o resultado, não a capa. Com termo
   na busca a home recolhe — banner, ladrilhos, prateleira e texto saem — e o
   catálogo assume o topo, logo abaixo da barra. É o que faz a busca "funcionar"
   no celular, onde os resultados ficavam 1.500px abaixo da dobra. */
function modoBusca(ligado, vistos) {
  const b = document.body;
  if (b.classList.contains('is-busca') === ligado) {
    if (ligado) atualizarTituloBusca(vistos);
    return;
  }
  b.classList.toggle('is-busca', ligado);
  $('#catLimpar').hidden = !ligado;
  atualizarTituloBusca(vistos);
  if (ligado && !rotaAtual) {
    /* Desconta a barra fixa, senão o título do resultado nasce embaixo dela —
       no celular a barra come 127px, quase um sexto da tela. */
    const topo = $('.hd').getBoundingClientRect().height + 8;
    const y = $('#catalogo').getBoundingClientRect().top + scrollY - topo;
    const perto = Math.abs(y - scrollY) < innerHeight * 2;
    scrollTo({ top: Math.max(0, y), behavior: (CALM || !perto) ? 'instant' : 'smooth' });
  }
}

function atualizarTituloBusca(vistos) {
  const t = termo.trim();
  $('#catTitulo').textContent = t ? `Resultados para “${t}”` : 'Produtos';
  if (t && vistos === 0) $('#catConta').textContent = 'nada com esse nome';
}

/* Ordena a lista inteira, não prateleira por prateleira. */
function ordenar(itens) {
  const l = [...itens];
  if (ordem === 'pmin') l.sort((a, b) => a.p - b.p);
  else if (ordem === 'pmax') l.sort((a, b) => b.p - a.p);
  else if (ordem === 'az') l.sort((a, b) => nomeCheio(a).localeCompare(nomeCheio(b), 'pt'));
  else if (ordem === 'za') l.sort((a, b) => nomeCheio(b).localeCompare(nomeCheio(a), 'pt'));
  return l;
}

/* ============================================================
   4b. Cupom — vive na página do produto, ao lado do total
   ============================================================ */
/* Redesenha os preços dos cards e remonta a página aberta. */
function repintarPrecos() {
  ITENS.forEach(it => {
    $$(`.card[data-uid="${it.uid}"] .card__p`).forEach(el => { el.outerHTML = precoCardHTML(it); });
  });
  if (rotaAtual && porSlug[rotaAtual]) montarPdp(porSlug[rotaAtual]);
}

function cupomLigar(box) {
  const f = $('#cupF', box);
  if (f) f.addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#cupI', box).value.trim();
    if (!v) return;
    const achado = achaCupom(v);
    if (!achado) {
      $('#cupErro', box).textContent = 'Esse código não existe. Confira as letras.';
      return;
    }
    cupom = achado;
    try { localStorage.setItem(CUP_KEY, achado.codigo); } catch {}
    repintarPrecos();
  });

  const off = $('#cupOff', box);
  if (off) off.addEventListener('click', () => {
    cupom = null;
    try { localStorage.removeItem(CUP_KEY); } catch {}
    repintarPrecos();
  });
}

function transicionar(fn) {
  if (CALM || !document.startViewTransition) return fn();
  /* "skipped" e "invalid state" são desfechos normais quando a troca
     acontece durante outra; a atualização do DOM já rodou de qualquer jeito. */
  const vt = document.startViewTransition(fn);
  vt.finished.catch(() => {});
  vt.updateCallbackDone.catch(() => {});
  vt.ready.catch(() => {});
}

function busca() {
  const q = $('#q');
  let t;
  const rodar = () => { termo = q.value; aplicar(); };

  q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(rodar, 90); });
  q.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); rodar(); paraCatalogo(); } });
  $('#qgo').addEventListener('click', () => { rodar(); paraCatalogo(); });
  $('#qclear').addEventListener('click', () => { q.value = ''; rodar(); q.focus(); });

  $('#catNoneAsk').addEventListener('click', () => {
    window.open(waHref(`Olá! Procurei "${termo}" no site e não achei. Você trabalha com esse produto?`), '_blank', 'noopener');
  });

  $('#ordenar').addEventListener('change', e => {
    ordem = e.target.value;
    transicionar(aplicar);
  });

  $('#catLimpar').addEventListener('click', () => {
    q.value = ''; rodar(); q.focus();
  });

  aplicar();   /* pinta a contagem e a ordem já na primeira carga */
}

/* ============================================================
   5. Página do produto
   ============================================================ */
/* Galeria da página do produto. Com uma foto só (ou nenhuma) ela é a mesma
   figura de sempre; com duas ou mais entram as miniaturas e as setas. */
function galeriaHTML(it) {
  const n = it.fotos.length;
  const fig = `<figure class="pdp__fig${n ? ' pdp__fig--foto' : ''}${n > 1 ? ' pdp__fig--gal' : ''}">
      <span class="pdp__figbg"></span>
      ${n
        ? `<img id="galFoto" src="${esc(it.fotos[0])}" alt="${esc(nomeCheio(it))}"
             width="900" height="900" sizes="(max-width:859px) 92vw, 44vw"
             fetchpriority="high" decoding="async">`
        : `<svg viewBox="0 0 32 32" aria-hidden="true"><use href="#${(FORMATOS[it.linhaId] || {}).glifo || 'g-vial'}"/></svg>`}
      ${n > 1 ? `
      <button type="button" class="gal__seta gal__seta--ant" data-gal="-1" aria-label="Foto anterior"><svg aria-hidden="true"><use href="#i-back"/></svg></button>
      <button type="button" class="gal__seta gal__seta--prox" data-gal="1" aria-label="Próxima foto"><svg aria-hidden="true"><use href="#i-arrow"/></svg></button>
      <span class="gal__conta" id="galConta" aria-hidden="true">1/${n}</span>` : ''}
      ${n ? '' : `<figcaption class="pdp__note">Ilustração do formato: ${esc((FORMATOS[it.linhaId] || {}).forma || '')}. A foto real do produto é enviada no WhatsApp.</figcaption>`}
    </figure>`;

  if (n < 2) return fig;

  return `<div class="gal">
      ${fig}
      <div class="gal__minis" role="group" aria-label="Fotos de ${esc(nomeCheio(it))}">
        ${it.fotos.map((f, i) => `
        <button type="button" class="gal__mini${i ? '' : ' is-on'}"
                aria-current="${i ? 'false' : 'true'}" data-i="${i}"
                aria-label="Ver foto ${i + 1} de ${n}">
          <img src="${esc(f)}" alt="" width="120" height="120" loading="lazy" decoding="async">
        </button>`).join('')}
      </div>
    </div>`;
}

/* A chave do texto e das avaliações aceita 'Nome · apresentação' para
   os casos em que dois itens dividem o nome (o 212 masculino e o
   feminino, o Sauvage EDP e o EDT). Sem isso, um herdaria o texto do outro. */
const chaveTexto = it => `${it.n} · ${it.d || ''}`;
const doItem = (mapa, it) =>
  (mapa || {})[chaveTexto(it)] || (mapa || {})[it.n] || null;

function sobreHTML(it) {
  const txt = doItem(typeof SOBRE !== 'undefined' ? SOBRE : {}, it);
  if (!txt) return '';
  const saude = it.linhaId !== 'perfumes';
  return `<section class="panel sobre">
    <h2>Sobre o produto</h2>
    <p class="sobre__t">${esc(txt)}</p>
    ${saude ? '<p class="sobre__av">Esta descrição diz o que o produto é — composto, forma e apresentação. Não descreve efeito, indicação nem modo de uso, e não substitui a orientação de um profissional de saúde.</p>' : ''}
  </section>`;
}

const estrelas = n => {
  const cheias = Math.round(n * 2) / 2;
  let s = '';
  for (let i = 1; i <= 5; i++) {
    s += `<span class="est${i <= cheias ? ' is-on' : (i - .5 === cheias ? ' is-meia' : '')}">★</span>`;
  }
  return `<span class="estrelas" aria-hidden="true">${s}</span>`;
};

const dataBR = iso => {
  const d = new Date(iso + 'T12:00:00');
  return isNaN(d) ? iso : d.toLocaleDateString('pt-BR');
};

function avaliacoesHTML(it) {
  const lista = doItem(typeof AVALIACOES !== 'undefined' ? AVALIACOES : {}, it) || [];

  /* Sem avaliação real, o site diz isso e convida a mandar a sua.
     Nada de nota inventada para preencher o espaço. */
  if (!lista.length) {
    return `<section class="panel aval aval--vazio">
      <h2>Avaliações de quem comprou</h2>
      <p class="aval__nada">Este produto ainda não tem avaliação publicada.</p>
      <a class="btn btn--gh" href="${waHref(`Olá! Comprei ${nomeCheio(it)} e quero deixar minha avaliação.`)}"
         target="_blank" rel="noopener">Comprou aqui? Manda a sua</a>
    </section>`;
  }

  const media = lista.reduce((s, a) => s + Number(a.nota || 0), 0) / lista.length;
  const fotos = lista.flatMap(a => (a.fotos || []).map(f => ({ f, nome: a.nome })));

  return `<section class="panel aval">
    <h2>Avaliações de quem comprou</h2>
    <div class="aval__topo">
      <b class="aval__media">${media.toFixed(2).replace('.', ',')}<i>/5</i></b>
      <div>
        ${estrelas(media)}
        <p class="aval__n">${lista.length} ${lista.length === 1 ? 'avaliação' : 'avaliações'}</p>
      </div>
    </div>

    ${fotos.length ? `<div class="aval__fotos">
      <h3>Fotos enviadas por clientes</h3>
      <div class="aval__tira">${fotos.map(o =>
        `<img src="${esc(o.f)}" alt="Foto enviada por ${esc(o.nome || 'cliente')}" loading="lazy" decoding="async">`).join('')}</div>
    </div>` : ''}

    <ul class="aval__lista">
      ${lista.map(a => `<li class="rev">
        <div class="rev__h">
          <b>${esc(a.nome || 'Cliente')}</b>
          ${estrelas(Number(a.nota) || 0)}
        </div>
        ${a.data ? `<p class="rev__d">Avaliado em ${esc(dataBR(a.data))}</p>` : ''}
        ${a.titulo ? `<h4 class="rev__t">${esc(a.titulo)}</h4>` : ''}
        ${a.texto ? `<p class="rev__x">${esc(a.texto)}</p>` : ''}
      </li>`).join('')}
    </ul>
  </section>`;
}

function pdpHTML(it) {
  const { linhas, incompleta } = ficha(it);
  const u = unitario(it);
  const irmaos = ITENS.filter(x => x.linhaId === it.linhaId && x.slug !== it.slug).slice(0, 12);

  /* h3: os quatro selos ficam dentro da caixa de compra, que é filha do h1.
     Estavam em h4 e o documento pulava dois níveis logo depois do título. */
  const perk = (i, h, p) =>
    `<div><svg aria-hidden="true"><use href="#${i}"/></svg><div><b class="perk__t">${h}</b><p>${p}</p></div></div>`;

  return `<div class="pdp">
    <nav class="bread" aria-label="Você está em">
      <a href="./" data-home>Home</a><i>›</i>
      <a href="#l-${it.linhaId}" data-home>${esc(it.linhaNome)}</a><i>›</i>
      <b aria-current="page">${esc(it.n)}</b>
    </nav>

    <h1 class="pdp__t">${esc(nomeCheio(it))}</h1>

    <div class="pdp__main">
      ${galeriaHTML(it)}

      <div class="buy">
        <div class="buy__top">
          <span class="badge">Comprado no Paraguai</span>
          <span class="sku">${esc(it.linhaNome)}</span>
        </div>

        <div>
          ${cupom ? `<p class="buy__de">de R$ ${money(it.p)}</p>` : ''}
          <p class="buy__p"><s>R$</s><b>${money(comDesconto(it.p))}</b></p>
          ${u ? `<p class="buy__u">Sai a R$ ${money(u.valor)} por ${esc(u.rotulo)} — embalagem com ${u.un}.</p>` : ''}
        </div>

        <div class="qty">
          <span class="qty__l">Quantidade</span>
          <div class="qty__box">
            <button class="qty__b" type="button" id="qMenos" aria-label="Diminuir" disabled>−</button>
            <input class="qty__i" id="qNum" type="number" value="1" min="1" max="99"
                   inputmode="numeric" aria-label="Quantidade">
            <button class="qty__b" type="button" id="qMais" aria-label="Aumentar">+</button>
          </div>
        </div>

        <div class="cup${cupom ? ' cup--on' : ''}">
          <svg class="cup__ico" aria-hidden="true"><use href="#i-tag"/></svg>
          ${cupom
            ? `<p class="cup__ok"><b>${esc(cupom.codigo)}</b> — ${cupom.pct}% de desconto aplicado
                 <button type="button" id="cupOff">tirar</button></p>`
            : `<form class="cup__f" id="cupF" autocomplete="off">
                 <label class="vh" for="cupI">Código do cupom de desconto</label>
                 <input id="cupI" type="text" inputmode="text" spellcheck="false"
                        placeholder="Código do cupom" maxlength="24">
                 <button type="submit">Aplicar</button>
               </form>`}
          <p class="cup__erro" id="cupErro" role="status"></p>
        </div>

        <p class="buy__tot"><span>Total do pedido</span><b id="qTotal">R$ ${money(comDesconto(it.p))}</b></p>

        <a class="btn btn--wa btn--lg btn--full" id="pdpWa"
           href="${waItem(it)}" target="_blank" rel="noopener">
          <svg aria-hidden="true"><use href="#i-wa"/></svg>Pedir no WhatsApp
        </a>

        <div class="perks">
          ${perk('i-tag', 'Preço publicado', 'O valor acima é o de venda à vista, sujeito a confirmação de estoque.')}
          ${perk('i-pin', 'Retirada ou envio', `Loja física em ${esc(LOJA.cidade.split(',')[0].trim())} para retirar em mãos, e também fazemos envio. Combinamos na conversa.`)}
          ${perk('i-doc', 'Ficha da embalagem', 'Composição, lote e validade conferidos com o produto em mãos, antes de fechar.')}
          ${perk('i-shield', 'Sem pagamento no site', 'Nada é cobrado aqui. Forma de pagamento é combinada direto com você.')}
        </div>
      </div>
    </div>

    ${sobreHTML(it)}
    ${avaliacoesHTML(it)}

    <div class="pdp__cols">
      <section class="panel">
        <h2>Ficha técnica</h2>
        <dl class="spec">${linhas.map(([k, v]) =>
          `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
        ${incompleta ? `<p class="gap"><b>Composição, registro e validade não estão publicados para este item.</b> Confirmo os três no atendimento, lendo a embalagem do lote que vou te entregar.</p>` : ''}
      </section>

      <section class="panel">
        <h2>Antes de pedir</h2>
        <div class="avisos">
          <p><b>+18.</b> Venda destinada a maiores de 18 anos.</p>
          ${it.linhaId === 'perfumes' ? '' : `<p><b>Prescrição.</b> Este item pode ser medicamento de venda sob prescrição médica. Consulte um profissional de saúde antes de qualquer uso. Não prestamos orientação médica, de dose ou de aplicação.</p>`}
          <p><b>Jurisdição.</b> Produto comercializado no Paraguai, sob legislação paraguaia. A entrada em outro país segue as regras aduaneiras e sanitárias desse país, sob responsabilidade de quem transporta.</p>
        </div>
      </section>
    </div>

    ${irmaos.length ? `<div class="shelf">
      <div class="shead"><h2>Mais de ${esc(it.linhaNome)}</h2>
        <div class="shead__nav">
          <button type="button" class="sarrow" data-scroll="-1" aria-label="Rolar para a esquerda"><svg aria-hidden="true"><use href="#i-back"/></svg></button>
          <button type="button" class="sarrow" data-scroll="1" aria-label="Rolar para a direita"><svg aria-hidden="true"><use href="#i-arrow"/></svg></button>
        </div>
      </div>
      <div class="rail" id="pdpRail">${irmaos.map(cardHTML).join('')}</div>
    </div>` : ''}
  </div>`;
}

/* Troca de foto: miniatura, seta e seta do teclado. Sem uma segunda foto
   não há nada para ligar e a função sai calada. */
function montarGaleria(it, box) {
  const foto = $('#galFoto', box);
  const minis = $$('.gal__mini', box);
  if (!foto || minis.length < 2) return;

  const conta = $('#galConta', box);
  let atual = 0;

  const ir = i => {
    atual = (i + it.fotos.length) % it.fotos.length;
    foto.src = it.fotos[atual];
    if (conta) conta.textContent = `${atual + 1}/${it.fotos.length}`;
    minis.forEach((m, k) => {
      m.classList.toggle('is-on', k === atual);
      m.setAttribute('aria-current', k === atual ? 'true' : 'false');
    });
  };

  minis.forEach(m => m.addEventListener('click', () => ir(+m.dataset.i)));
  $$('[data-gal]', box).forEach(b =>
    b.addEventListener('click', () => ir(atual + Number(b.dataset.gal))));

  $('.gal', box).addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { ir(atual + 1); e.preventDefault(); }
    if (e.key === 'ArrowLeft')  { ir(atual - 1); e.preventDefault(); }
  });
}

function montarPdp(it) {
  const box = $('#viewProduto');
  box.innerHTML = pdpHTML(it);
  document.title = `${nomeCheio(it)} — ${LOJA.marca}`;

  const num = $('#qNum'), menos = $('#qMenos'), mais = $('#qMais');
  const tot = $('#qTotal'), wa = $('#pdpWa');
  const sync = () => {
    let v = Math.max(1, Math.min(99, parseInt(num.value, 10) || 1));
    num.value = v;
    menos.disabled = v <= 1;
    mais.disabled = v >= 99;
    tot.textContent = `R$ ${money(comDesconto(it.p) * v)}`;
    wa.href = waItem(it, v);
  };
  menos.addEventListener('click', () => { num.value = +num.value - 1; sync(); });
  mais.addEventListener('click',  () => { num.value = +num.value + 1; sync(); });
  num.addEventListener('input', sync);
  num.addEventListener('blur', sync);
  sync();

  $$('.sarrow', box).forEach(b => b.addEventListener('click', () => {
    const rail = $('#pdpRail');
    rail.scrollBy({ left: Number(b.dataset.scroll) * rail.clientWidth * .8, behavior: CALM ? 'instant' : 'smooth' });
  }));

  montarGaleria(it, box);
  cupomLigar(box);
  revelar(box);
}

/* ============================================================
   6. Rota — ?produto=slug. Funciona em qualquer host estático,
   é compartilhável e o botão voltar do celular funciona.
   ============================================================ */
let rotaAtual = null;

function pintar(slug, semRolar, direto) {
  const it = slug && porSlug[slug];
  rotaAtual = it ? slug : null;

  const troca = () => {
    $('#viewHome').hidden = !!it;
    $('#viewProduto').hidden = !it;
    if (it) montarPdp(it);
    else {
      $('#viewProduto').innerHTML = '';
      document.title = `${LOJA.marca} — ${LOJA.slogan.replace(/\.$/, '')} · Paraguai`;
    }
  };

  direto ? troca() : transicionar(troca);
  /* `behavior:'instant'`, não `'auto'`. Segundo a especificação, `'auto'`
     manda usar o `scroll-behavior` do CSS — e o nosso é `smooth` (style.css:74).
     O resultado era: abrir um produto lá do fim do catálogo disparava uma
     rolagem animada de 20.000px até o topo, que parecia a página subindo
     sozinha. `'instant'` ignora o CSS e corta seco. */
  if (!semRolar) scrollTo({ top: 0, behavior: 'instant' });
}

function abrir(slug) {
  history.pushState({ slug }, '', `?produto=${slug}`);
  pintar(slug);
}

function irHome(hash) {
  history.pushState({}, '', './' + (hash || ''));
  pintar(null, !!hash);
  migalha();
  if (!hash) return;
  const alvo = $(hash);
  if (!alvo) return;
  requestAnimationFrame(() => {
    /* Rolagem suave é boa para um empurrão de uma ou duas telas. O catálogo
       tem 40.000px: ir daqui até Perfumes são 20.000px de animação, e o que
       a pessoa vê é a página correndo sozinha por vários segundos. Perto,
       desliza; longe, corta seco e chega. */
    const dist = Math.abs(alvo.getBoundingClientRect().top);
    const perto = dist < innerHeight * 2;
    alvo.scrollIntoView({ behavior: (CALM || !perto) ? 'instant' : 'smooth' });
  });
}

function rotas() {
  document.addEventListener('click', e => {
    const pdp = e.target.closest('[data-pdp]');
    if (pdp && !e.metaKey && !e.ctrlKey && e.button === 0) {
      e.preventDefault();
      abrir(pdp.dataset.pdp);
      return;
    }
    const home = e.target.closest('[data-home]');
    if (home && !e.metaKey && !e.ctrlKey) {
      const href = home.getAttribute('href') || './';
      const hash = href.startsWith('#') ? href : '';
      if (rotaAtual || hash) { e.preventDefault(); irHome(hash); }
    }
  });
  addEventListener('popstate', () =>
    pintar(new URLSearchParams(location.search).get('produto')));
  addEventListener('hashchange', () => { if (!rotaAtual) migalha(); });
  pintar(new URLSearchParams(location.search).get('produto'), true, true);
}

/* ============================================================
   7. Revelação
   ============================================================ */
let io;
/* A entrada dos cartões vale na chegada e só ali. Antes os 196 nasciam em
   `opacity:0` esperando o observador: num aparelho fraco, quem dava um flick
   atravessava telas de cartão em branco — e numa página de 40.000px isso é a
   maior parte da rolagem. Agora só o que está perto do topo anima; o resto já
   nasce pronto. Menos nós observados, e nenhum cartão pego apagado. */
function revelar(raiz) {
  const alvos = $$('.card:not(.is-in), .cta__lace:not(.is-in)', raiz || document);
  if (CALM) return alvos.forEach(e => e.classList.add('is-in'));

  const limite = scrollY + innerHeight * 2.5;
  const perto = [];
  alvos.forEach(e => {
    if (e.getBoundingClientRect().top + scrollY < limite) perto.push(e);
    else e.classList.add('is-in');
  });

  io ||= new IntersectionObserver((ents, obs) => ents.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    obs.unobserve(e.target);
  }), { rootMargin: '600px 0px 600px 0px', threshold: .01 });
  perto.forEach(e => io.observe(e));

  /* Rede de segurança: se o observador não rodar — aba em segundo plano,
     captura de tela, navegador que engasga — ninguém fica com cartão
     invisível. Dispara uma vez e acabou. */
  setTimeout(() => perto.forEach(e => e.classList.add('is-in')), 1500);
}

/* ============================================================
   8. Bandeira, captura e toast
   ============================================================ */
function bandeira() {
  const f = $('#flagCard');
  f.addEventListener('click', () => f.classList.toggle('is-flip'));
}

const KEY = 'nd.lead.v1';
const store = {
  get() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; } },
  set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} },
};

/* Tudo que fica atrás do modal sai do caminho do teclado enquanto ele está
   aberto. A armadilha de Tab abaixo continua, como segunda linha. */
const FUNDO_GATE = () => [$('.hd'), $('.dep'), $('#conteudo'), $('.ft'), $('.fab'), $('.skip'), $('#gav')].filter(Boolean);

function captura() {
  const gate = $('#gate'), box = $('.gate__box');
  const prev = store.get();
  if (prev && (prev.enviado || Date.now() - prev.t < 7 * 864e5)) return;

  let aberto = false, foco = null;
  const limpar = () => { clearTimeout(t); alvo?.disconnect(); document.removeEventListener('mouseout', saida); };

  const abrir_ = () => {
    if (aberto) return;
    aberto = true; limpar();
    foco = document.activeElement;
    gate.hidden = false;
    document.body.style.overflow = 'hidden';
    FUNDO_GATE().forEach(el => el.setAttribute('inert', ''));
    /* Focar o campo abre o teclado e engole meia tela no celular. Lá o foco
       vai para o botão de fechar: quem quiser assinar toca no campo. */
    const alvo_ = matchMedia('(max-width:899px)').matches
      ? box.querySelector('.gate__x')
      : box.querySelector('input');
    setTimeout(() => alvo_?.focus({ preventScroll: true }), 400);
  };
  const fechar = () => {
    gate.hidden = true;
    document.body.style.overflow = '';
    FUNDO_GATE().forEach(el => el.removeAttribute('inert'));
    store.set({ t: Date.now(), enviado: false });
    /* Quando o modal abre sozinho, `foco` era o BODY e devolver ali é no-op:
       o próximo Tab jogava o usuário de teclado de volta ao topo da página.
       Sem alvo válido, o foco vai para a busca — que é o que ele veio fazer. */
    const volta = foco && foco.focus && foco !== document.body && foco.offsetParent !== null
      ? foco : $('#q');
    volta?.focus?.({ preventScroll: true });
  };

  /* Um gatilho só, e depois que a pessoa teve tempo de ver o preço.
     Antes eram três: o IntersectionObserver em #catalogo abria o modal
     exatamente no instante em que ela chegava nos produtos — em cima da
     única coisa que ela veio fazer. */
  const t = setTimeout(abrir_, 45000);
  const alvo = { disconnect() {} };
  const saida = e => { if (e.clientY <= 0) abrir_(); };
  document.addEventListener('mouseout', saida);

  $$('[data-gate-close]').forEach(b => b.addEventListener('click', fechar));
  document.addEventListener('keydown', e => {
    if (gate.hidden) return;
    if (e.key === 'Escape') fechar();
    if (e.key === 'Tab') {
      const f = $$('a[href],button:not([disabled]),input', box).filter(el => el.offsetParent);
      if (!f.length) return;
      const [pri, ult] = [f[0], f[f.length - 1]];
      if (e.shiftKey && document.activeElement === pri) { e.preventDefault(); ult.focus(); }
      else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); pri.focus(); }
    }
  });

  const form = $('#gateForm'), err = $('#gateErr');
  const dig = s => s.replace(/\D/g, '');

  form.addEventListener('input', e => {
    if (e.target.name === 'fone') {
      const d = dig(e.target.value).slice(0, 11);
      e.target.value = d.length > 6
        ? `(${d.slice(0,2)}) ${d.slice(2, d.length > 10 ? 7 : 6)}-${d.slice(d.length > 10 ? 7 : 6)}`
        : d.length > 2 ? `(${d.slice(0,2)}) ${d.slice(2)}` : d;
    }
    e.target.removeAttribute('aria-invalid');
    err.hidden = true;
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const falha =
      !d.nome?.trim() ? ['nome', 'Só o primeiro nome já serve.'] :
      dig(d.fone).length < 10 ? ['fone', 'Faltou um dígito no WhatsApp.'] :
      !/^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/.test(d.email) ? ['email', 'Esse e-mail não parece completo.'] : null;

    if (falha) {
      const campo = form.elements[falha[0]];
      campo.setAttribute('aria-invalid', 'true');
      campo.focus();
      err.textContent = falha[1];
      err.hidden = false;
      return;
    }

    /* ------------------------------------------------------------------
       ONDE O LEAD VAI PARAR
       Hoje fica no navegador de quem preencheu. Para recuperar:
         copy(localStorage.getItem('nd.leads'))
       Para receber de verdade, descomente e ponha seu endpoint:

       fetch('https://SEU-ENDPOINT', { method:'POST',
         headers:{'Content-Type':'application/json'},
         body: JSON.stringify({ ...d, em:new Date().toISOString() }) });
    ------------------------------------------------------------------ */
    try {
      const fila = JSON.parse(localStorage.getItem('nd.leads') || '[]');
      fila.push({ ...d, em: new Date().toISOString() });
      localStorage.setItem('nd.leads', JSON.stringify(fila));
    } catch {}

    store.set({ t: Date.now(), enviado: true });
    fechar();
    toast(`Pronto, ${d.nome.trim().split(' ')[0]}. Te aviso assim que o preço mudar.`);
  });
}

let tT;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(tT);
  tT = setTimeout(() => (el.hidden = true), 4200);
}

/* ============================================================
   Ligar
   ============================================================ */
function ligar() {
  marca();
  capa();
  ladrilhos();
  catalogo();
  busca();
  bandeira();
  rotas();
  revelar();
  captura();
  $$('[data-wa-generic]').forEach(a => { a.href = waGeneric(); a.target = '_blank'; a.rel = 'noopener'; });
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', ligar)
  : ligar();
})();
