#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT  = path.resolve(__dirname, '..', 'subpages');

const marked  = require(path.join(ROOT, 'Website/assets/lib/marked.min.js'));
const XLSX    = require(path.join(ROOT, 'Website/assets/lib/xlsx.full.min.js'));
const ExcelJS = require(path.join(ROOT, 'Website/assets/lib/exceljs.min.js'));

marked.setOptions({ gfm: true, breaks: false, headerIds: true, mangle: false });

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function renderMd(rel) {
  return marked.parse(read(rel));
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
  });
}

function xlsxToHtml(rel) {
  const buf = fs.readFileSync(path.join(ROOT, rel));
  const wb = XLSX.read(buf, { type: 'buffer', cellDates: true, cellStyles: false });
  let html = '<div class="xlsx-wrap">';
  html += '<div class="xlsx-tabs" role="tablist">';
  wb.SheetNames.forEach((name, i) => {
    html += `<button class="${i===0?'active':''}" data-xlsx-tab="${i}">${escapeHtml(name)}</button>`;
  });
  html += '</div>';
  wb.SheetNames.forEach((name, i) => {
    const sheet = wb.Sheets[name];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '', raw: false });
    html += `<div class="xlsx-sheet ${i===0?'active':''}" data-xlsx-panel="${i}">`;
    html += `<div class="xlsx-meta">${escapeHtml(name)} · 共 ${Math.max(0,rows.length-1)} 行</div>`;
    html += '<div class="xlsx-table-wrap"><table>';
    if (rows.length) {
      const header = rows[0];
      html += '<thead><tr>';
      header.forEach(h => { html += `<th>${escapeHtml(h)}</th>`; });
      html += '</tr></thead><tbody>';
      for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        html += '<tr>';
        for (let c = 0; c < header.length; c++) {
          const v = row[c] !== undefined ? row[c] : '';
          html += `<td>${escapeHtml(v)}</td>`;
        }
        html += '</tr>';
      }
      html += '</tbody>';
    }
    html += '</table></div></div>';
  });
  html += '</div>';
  return html;
}

// ---- rich xlsx renderer (ExcelJS) ----
function argbToHex(c) {
  if (!c) return null;
  if (c.argb && typeof c.argb === 'string') {
    const h = c.argb;
    if (h.length === 8) return '#' + h.slice(2);
    if (h.length === 6) return '#' + h;
  }
  return null;
}

function fmtNumber(num, numFmt) {
  if (typeof num !== 'number') return String(num);
  if (!isFinite(num)) return '';
  const fmt = String(numFmt || '');
  const isPct = fmt.includes('%');
  const useComma = fmt.includes(',');
  const negParen = /\(.+\)/.test(fmt);
  const decMatch = fmt.replace('%','').match(/\.(0+)/);
  const decimals = decMatch ? decMatch[1].length : 0;
  let n = isPct ? num * 100 : num;
  const sign = n < 0;
  const abs = Math.abs(n);
  let txt = abs.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: useComma
  });
  if (isPct) txt += '%';
  if (sign) txt = negParen ? '(' + txt + ')' : '-' + txt;
  return txt;
}

function fmtCellValue(cell) {
  let v = cell.value;
  if (v === null || v === undefined || v === '') return '';
  if (v && typeof v === 'object') {
    if ('result' in v) v = v.result;
    else if (Array.isArray(v.richText)) v = v.richText.map(p => p.text).join('');
    else if ('text' in v) v = v.text;
    else if ('error' in v) return v.error;
    else if (v instanceof Date) return v.toLocaleDateString('en-US');
  }
  if (v === null || v === undefined || v === '') return '';
  if (typeof v === 'number') return fmtNumber(v, cell.numFmt);
  return String(v);
}

function cellInlineStyle(cell) {
  const css = [];
  const fill = cell.fill;
  if (fill && fill.type === 'pattern' && fill.pattern === 'solid' && fill.fgColor) {
    const c = argbToHex(fill.fgColor);
    if (c) css.push('background:' + c);
  }
  const font = cell.font;
  if (font) {
    if (font.color) {
      const c = argbToHex(font.color);
      if (c) css.push('color:' + c);
    }
    if (font.bold) css.push('font-weight:600');
    if (font.italic) css.push('font-style:italic');
    if (font.underline) css.push('text-decoration:underline');
    if (font.size) css.push('font-size:' + font.size + 'px');
  }
  const al = cell.alignment;
  if (al) {
    if (al.horizontal) css.push('text-align:' + al.horizontal);
    if (al.vertical) {
      const v = ({top:'top', middle:'middle', bottom:'bottom'})[al.vertical] || al.vertical;
      css.push('vertical-align:' + v);
    }
    if (al.wrapText) css.push('white-space:normal');
  }
  const b = cell.border;
  if (b) {
    ['top','right','bottom','left'].forEach(side => {
      const bb = b[side];
      if (bb && bb.style && bb.style !== 'none') {
        const w = (bb.style === 'thick' || bb.style === 'double') ? '2px' : '1px';
        const color = (bb.color && argbToHex(bb.color)) || '#888';
        css.push('border-' + side + ':' + w + ' solid ' + color);
      }
    });
  }
  return css.join(';');
}

function findMergeSpan(ws, cell) {
  let colspan = 1, rowspan = 1;
  while (cell.col + colspan <= ws.columnCount) {
    const next = ws.getCell(cell.row, cell.col + colspan);
    if (next.master === cell) colspan++; else break;
  }
  while (cell.row + rowspan <= ws.rowCount) {
    const next = ws.getCell(cell.row + rowspan, cell.col);
    if (next.master === cell) rowspan++; else break;
  }
  return { colspan, rowspan };
}

async function xlsxToHtmlRich(rel) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(fs.readFileSync(path.join(ROOT, rel)));

  let html = '<div class="xlsx-wrap xlsx-rich">';
  html += '<div class="xlsx-tabs">';
  wb.worksheets.forEach((ws, i) => {
    html += '<button class="' + (i===0?'active':'') + '" data-xlsx-tab="' + i + '">' + escapeHtml(ws.name) + '</button>';
  });
  html += '</div>';

  wb.worksheets.forEach((ws, i) => {
    html += '<div class="xlsx-sheet ' + (i===0?'active':'') + '" data-xlsx-panel="' + i + '">';
    html += '<div class="xlsx-meta">' + escapeHtml(ws.name) + ' · ' + ws.rowCount + ' 行 × ' + ws.columnCount + ' 列</div>';
    html += '<div class="xlsx-table-wrap"><table class="xlsx-table-rich"><colgroup>';
    for (let c = 1; c <= ws.columnCount; c++) {
      const col = ws.getColumn(c);
      const w = col && col.width ? Math.max(56, Math.round(col.width * 7)) : 80;
      html += '<col style="width:' + w + 'px">';
    }
    html += '</colgroup><tbody>';

    const occupied = new Set();
    for (let r = 1; r <= ws.rowCount; r++) {
      const row = ws.getRow(r);
      const h = row.height ? Math.round(row.height * 1.33) : 22;
      html += '<tr style="height:' + h + 'px">';
      for (let c = 1; c <= ws.columnCount; c++) {
        const key = r + ',' + c;
        if (occupied.has(key)) continue;
        const cell = ws.getCell(r, c);
        if (cell.isMerged && cell.master !== cell) {
          continue;
        }
        let colspan = 1, rowspan = 1;
        if (cell.isMerged && cell.master === cell) {
          const span = findMergeSpan(ws, cell);
          colspan = span.colspan; rowspan = span.rowspan;
          for (let rr = r; rr < r + rowspan; rr++) {
            for (let cc = c; cc < c + colspan; cc++) {
              if (rr !== r || cc !== c) occupied.add(rr + ',' + cc);
            }
          }
        }
        const style = cellInlineStyle(cell);
        const value = fmtCellValue(cell);
        const spanAttr = (colspan>1 ? ' colspan="'+colspan+'"' : '') + (rowspan>1 ? ' rowspan="'+rowspan+'"' : '');
        html += '<td' + spanAttr + (style ? ' style="' + style + '"' : '') + '>' + escapeHtml(value) + '</td>';
      }
      html += '</tr>';
    }

    html += '</tbody></table></div></div>';
  });

  html += '</div>';
  return html;
}

function shell({ slug, title, eyebrow, breadcrumb, sourceTag, sourceCopy, noteHtml, bodyHtml, returnAnchor }) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)} · AI Workflow Notes</title>
<link rel="stylesheet" href="../assets/css/main.css">
</head>
<body>

<header class="site-header">
  <div class="container">
    <a href="../index.html" class="brand"><span class="brand-mark">●</span>AI Workflow Notes</a>
    <nav class="nav-anchors">
      <a href="../index.html#coreweave">CoreWeave Case</a>
      <a href="../index.html#mapping">Agent Mapping Case</a>
      <a href="../index.html#cognition">认知层</a>
      <a href="../index.html#tips">Tips</a>
    </nav>
  </div>
</header>

<div class="subpage-meta">
  <div class="container">
    <div class="crumbs">
      <a href="../index.html">主页</a>
      <span class="sep">/</span>
      ${breadcrumb}
    </div>
    <div class="source-tag">
      <span>source · ${escapeHtml(sourceTag)}</span>
      ${sourceCopy ? `<button class="copy-btn" data-copy="${escapeHtml(sourceCopy)}">复制路径</button>` : ''}
    </div>
  </div>
</div>

<section class="subpage-title">
  <div class="container-read">
    <div class="eyebrow">${escapeHtml(eyebrow)}</div>
    <h1>${escapeHtml(title)}</h1>
    ${noteHtml || ''}
  </div>
</section>

<main class="subpage-main">
  <div class="container-read">
    <article class="md-article">
${bodyHtml}
    </article>
  </div>
</main>

<footer class="site-footer">
  <div class="container">
    <span>← <a href="../index.html${returnAnchor||''}">返回主页</a></span>
    <span>本地静态站点 · 双击 index.html 即可访问</span>
  </div>
</footer>

<script src="../assets/js/common.js"></script>
</body>
</html>
`;
}

function write(name, content) {
  const p = path.join(OUT, name);
  fs.writeFileSync(p, content);
  console.log('  ✓ ' + path.relative(ROOT, p));
}

console.log('Building subpages…');

// ---- A · research framework (hard-coded outline + prompt from ai.md)
const aBody = `
<p class="muted small">这一步是"人对方向的掌握"。下面是当时和 Claude 对话使用的<strong>提纲</strong>与<strong>初始 Prompt</strong> — 不让 AI 直接给答案，而是先用提纲把研究框架立住。</p>

<h2>当时的提纲和 Prompt</h2>

<div class="prompt-wrap">
  <button class="copy-btn prompt-copy" data-copy="我打算分几个 module 来拆分当研究'是否投资 coreweave'这个专业 buyside hedge fund 命题的时候，有什么研究需要做，最终输出报告需要包含（Investment Thesis（投/不投的原因），Industry Research，AI Implication（AI 对公司业务的影响，利多/利空的逻辑，有什么 facts），Moat，Financial Model，Risk，Further Questions（关注可比公司））&#10;&#10;1. 请先帮我完善这个问题清单（需要非常 solid sharp 的研究框架）&#10;2. 【完善好问题清单之后】请结合 NotebookLM 中的 source / gemini deep reasoning 返回结果，和你的逻辑推演能力做针对每个模块问题的深度思考（可以分不同 session 去做）">复制 Prompt</button>
  <pre class="prompt-card">问 Claude：我打算分几个 module 来拆分当研究"是否投资 coreweave"这个专业 buyside hedge fund 命题的时候，有什么研究需要做，最终输出报告需要包含（<em>Investment Thesis（投/不投的原因），Industry Research，AI Implication（AI 对公司业务的影响，利多/利空的逻辑，有什么 facts），Moat，Financial Model，Risk，Further Questions（关注可比公司）</em>）

  1. 请先帮我完善这个问题清单（需要非常 solid sharp 的研究框架）
  2. 【完善好问题清单之后】请结合 NotebookLM 中的 source / gemini deep reasoning 返回结果，和你的逻辑推演能力做针对每个模块问题的深度思考（可以分不同 session 去做）</pre>
</div>

<h2>研究问题清单（提纲）</h2>

<h3>① 静态行业研究（fact-based industry research）</h3>
<ul class="check-list">
  <li>Coreweave 目前所在的行业的主要商业模式是什么？（上游供应商、下游客户有哪些？客户为什么有该需求？）</li>
  <li>该市场空间、过去 3 年和未来 3 年的增速如何？</li>
  <li>该行业除了 coreweave 还有什么玩家？（该行业是一个区域型行业还是全球化的行业？中国美国玩家是否在同一市场中竞争？）</li>
  <li>各个玩家大致的市场排名 / 份额如何？分别有什么区别 / 优劣势？</li>
  <li>该行业的核心竞争力是什么？为什么？</li>
  <li>该行业的核心压力来自什么？（比如大客户自建算力中心？高杠杆业务模式等？）</li>
</ul>

<h3>② 静态 Coreweave 公司研究（fact-based company research）</h3>
<ul class="check-list">
  <li>公司的主营业务是什么？有哪几个板块的收入，2024 至今 by quarter 各板块收入分别是多少？（先检索年报 / earnings call 一级可信，如果没有则利用其他二级可靠信息源）</li>
  <li>每个板块的收入可以如何拆分？（比如 GPU 租赁收入 = GPU 块数 × 单 GPU 租赁价格）</li>
  <li>每个板块业务的 portfolio 是怎样的，核心的业务指标是什么？（请帮我罗列尽可能多的业务指标数据和变化情况，比如各型号 GPU 现有量、租赁的 capacity 利用率、各型号 GPU 租赁费率……）</li>
  <li>业务收入的客户集中度是怎样的？从 2023 至今每年的前五大客户分别是谁？</li>
</ul>

<h3>③ AI Implication</h3>
<ul class="check-list">
  <li>从第一性原理出发，AI 发展对于公司业务的直接影响是什么？（如何作用于公司的 P&amp;L 和 EBIT）</li>
  <li>根据 AI 发展的最新动态（比如 token 消耗量的增速、Anthropic / OpenAI ARR 的增速、CSP 自建 AIDC 的进度和速度）来判断，目前 AI 对公司业务分别有什么利多和利空的逻辑？核心最关键的变量是什么？</li>
  <li>公司自身在 AI 业务中的拓展方向是什么？进度如何？管理层意图是什么？</li>
</ul>

<h3>④ Moat</h3>
<ul class="check-list">
  <li>公司在 AI 产业链内的生态位置是如何的？</li>
  <li>最核心的壁垒是什么？</li>
  <li>针对这些壁垒最大的威胁是什么？</li>
</ul>

<h3>⑤ Risk</h3>
<ul class="check-list">
  <li>最核心的风险（包括但不限于 宏观利率、AI 行业整体景气度、neocloud 行业生态位、公司运营落实订单能力），股价敏感度从高到低做分析。</li>
</ul>

<h3>⑥ Other Questions</h3>
<ul class="check-list">
  <li>Coreweave 创始人的履历、领导力、学习能力、思考方式与执行力如何？（有什么案例）</li>
</ul>

<p class="muted small" style="margin-top:32px;">▸ 完成上述静态研究后，会拿着第一版报告进入 <a href="C-report-reviewed.html">Human Reads Draft Reports</a> 这一步，那里继续追加"动态公司叙事 / bet 差异"相关的迭代问题。</p>
`;
write('A-research-framework.html', shell({
  slug: 'A',
  title: '研究框架与初始 Prompt',
  eyebrow: 'CoreWeave · Phase 0 · Preparation',
  breadcrumb: `<a href="../index.html#coreweave">CoreWeave 案例</a><span class="sep">/</span><span>研究框架</span>`,
  sourceTag: 'inline · 摘自 ai.md',
  sourceCopy: '',
  noteHtml: '<p class="subtitle">人对方向的掌握 — 让 Claude 帮你"补完研究问题清单"，而不是直接给答案。</p>',
  bodyHtml: aBody,
  returnAnchor: '#coreweave'
}));

// ---- B · initial report 8 modules
write('B-initial-report.html', shell({
  slug: 'B',
  title: '8 Modules 初稿报告',
  eyebrow: 'CoreWeave · Phase 2 · Parallel Research',
  breadcrumb: `<a href="../index.html#coreweave">CoreWeave 案例</a><span class="sep">/</span><span>8 Modules 初稿</span>`,
  sourceTag: 'Coreweave_example/2. initial-report-8modules.md',
  sourceCopy: 'Coreweave_example/2. initial-report-8modules.md',
  noteHtml: '<p class="subtitle">Claude Session 2 并行研究：NLM API × 12 + Web × 10，~23,500 词 / 79 表。</p>' +
            '<div class="note-bar"><strong>可现场演示</strong>：Claude Session 2 并行研究、NotebookLM + web-access skill 的工作机制（登录态爬取 + source 管控）。报告全程沉淀为 md，方便后续审阅。</div>',
  bodyHtml: renderMd('Coreweave_example/2. initial-report-8modules.md'),
  returnAnchor: '#coreweave'
}));

// ---- C · report reviewed (prepend review-stage questions then md)
const cReviewQuestions = `
<section class="review-questions">
  <h2 style="margin-top:0;">迭代报告时追加的问题（看完一稿后形成）</h2>
  <p class="muted small">下面这些问题不是最初的提纲，而是<strong>读完 8 模块初稿后</strong>新追加给 Claude 的 deep question — 用来逼出"动态叙事 / bet 差异"层面的判断，触发估值与结论的修订。</p>

  <h3>动态公司叙事的 bet 差异</h3>
  <ul class="check-list">
    <li>目前针对该公司，市场的核心共识是什么？分歧在哪里？（what the market sees; what the market misses）股价增长 / 下跌的 catalyst 分别是什么？</li>
    <li>目前多方和空方不同的叙事里面，核心差异是什么？（各自坚定自己 position 的 bet 是什么？）</li>
    <li>我们机构的投资风格 / 哲学 / taste 是：<br>
      　1) "投资实际上是不需要共识的，能达成共识的项目一般投不出特别好的结果来"；<br>
      　2) 极度重视创始人的领导力、学习能力、思考方式与执行力；<br>
      　3) 在技术确定性与市场不确定性之间寻找平衡，风险评估更注重技术壁垒与商业化周期（比如利润回正时间点）。<br>
      针对这一哲学，给出对 CRWV 的综合评估。</li>
  </ul>
</section>

<hr>
`;
write('C-report-reviewed.html', shell({
  slug: 'C',
  title: '审阅与修订后报告',
  eyebrow: 'CoreWeave · Phase 3 · Adversarial Review',
  breadcrumb: `<a href="../index.html#coreweave">CoreWeave 案例</a><span class="sep">/</span><span>审阅与修订</span>`,
  sourceTag: 'Coreweave_example/3. report-reviewed.md',
  sourceCopy: 'Coreweave_example/3. report-reviewed.md',
  noteHtml: '<p class="subtitle">4 Parallel Agents 对抗式审阅：财务 / 合同 / 行业 / 监管，13 处数字错误 + 49 个逻辑审阅点。</p>' +
            '<div class="note-bar"><strong>可现场演示</strong>：4 Parallel Agents 的对抗式审阅过程；人类回到结论上做 deep question 触发估值修订（Target $168 → $139）。</div>',
  bodyHtml: cReviewQuestions + renderMd('Coreweave_example/3. report-reviewed.md'),
  returnAnchor: '#coreweave'
}));

// ---- D · pptx skill
write('D-pptx-skill-generated.html', shell({
  slug: 'D',
  title: 'pptx-research Skill 协作设计',
  eyebrow: 'CoreWeave · Phase 4A · Skill Co-Design',
  breadcrumb: `<a href="../index.html#coreweave">CoreWeave 案例</a><span class="sep">/</span><span>pptx-research Skill</span>`,
  sourceTag: 'Coreweave_example/4. pptx-skill-generated.md',
  sourceCopy: 'Coreweave_example/4. pptx-skill-generated.md',
  noteHtml: '<p class="subtitle">与 Claude 共同设计 7-Step State Machine + 9 Global Rules + Resume Protocol，规则化产出 44 页研究 deck。</p>' +
            '<div class="note-bar"><strong>可现场演示</strong>：7-Step State Machine + 9 Global Rules + Resume Protocol，重点看 storyline → chapter-by-chapter rendering → markitdown QA 的循环。</div>',
  bodyHtml: renderMd('Coreweave_example/4. pptx-skill-generated.md'),
  returnAnchor: '#coreweave'
}));

// ---- E · mapping research outline (hard-coded)
const eBody = `
<p class="muted small">围绕 AI Agent 赛道，将研究拆解为三个互不重叠又互相印证的核心问题。每个问题都明确了"研究的边界 / 变量 / 评估框架"。</p>

<ol class="numbered-questions">
  <li>
    <h3>赛道 Mapping 与投资标的</h3>
    <p>Mapping AI Agent 赛道中 8–10 家国内及海外第三方创业公司，对比其技术架构、产品能力和使用场景的差异；在 Mapping 的公司中，最看好的 1–2 家投资标的是什么？阐述投资逻辑及潜在风险。</p>
  </li>
  <li>
    <h3>Agent 成熟度与时间窗口</h3>
    <p>如何选取 / 定义一个可量化的 Agent 成熟度指标，评估当前的技术水位；技术演进将解锁哪些应用场景，解锁的时间窗口是什么？</p>
  </li>
  <li>
    <h3>创业公司 vs 模型公司的长期竞争</h3>
    <p>如何看待 2C 及 2B Agent / Agent OS 类产品与模型公司的长期竞争？创业公司的关键成功要素是什么？</p>
  </li>
</ol>

<h2>为什么提纲必须由人来写</h2>
<p>AI 可以并行扫描海量信息、可以生成完整的报告骨架，但<strong>研究方向、变量取舍、与机构投资哲学的对齐</strong>必须由人完成 — 这是后续所有 deep research / mapping / 比较分析的"地基"。提纲越准，AI 越能在并行 session 里收敛到有用结论。</p>
`;
write('E-mapping-research-outline.html', shell({
  slug: 'E',
  title: 'Mapping 案例：核心研究问题与提纲',
  eyebrow: 'Mapping · Phase 1 · Human-defined Frame',
  breadcrumb: `<a href="../index.html#mapping">Mapping 案例</a><span class="sep">/</span><span>研究提纲</span>`,
  sourceTag: 'inline · 摘自 ai.md',
  sourceCopy: '',
  noteHtml: '<p class="subtitle">本提纲是人对研究方向的掌握，决定了后续 AI 并行研究的边界与质量。</p>',
  bodyHtml: eBody,
  returnAnchor: '#mapping'
}));

// ---- F · mapping deep research (overview image + 2 chapter mds)
const fMd4 = '4. Agent成熟度指标体系与技术演进路线图(3).md';
const fMd5 = '5. 2C 2B Agent与Agent OS：创业公司与模型厂的长期竞争格局(3).md';

const fBody = `
<p class="muted small">下图是 Perplexity 分 session deep research 后产出的<strong>中间文档清单</strong>（perplexity 侧的 md 文件原貌截图），每一份对应一个研究子问题。下方按顺序展开其中两份代表性章节。</p>

<figure style="margin: 18px 0 32px;">
  <img src="../../Mapping_example/multi-md.png" alt="Perplexity 产出的多份 md 文件清单" class="click-zoom" loading="lazy" style="display:block;width:100%;max-width:760px;margin:0 auto;border:1px solid var(--rule);border-radius:4px;">
  <figcaption class="muted small" style="text-align:center;margin-top:10px;">Perplexity 产出的多章节中间文档 · 命名按"序号 + 主题"</figcaption>
</figure>

<hr>

<h2>4 · Agent 成熟度指标体系与技术演进路线图</h2>
${renderMd('Mapping_example/' + fMd4)}

<hr>

<h2>5 · 2C / 2B Agent 与 Agent OS：创业公司与模型厂的长期竞争格局</h2>
${renderMd('Mapping_example/' + fMd5)}

<hr>

<section id="question-verification" style="margin-top:48px;">
  <h2>观点稳健 &amp; 无重大漏洞？审阅图示</h2>
  <p class="muted">质疑追问 + model council：把同一个观点放到不同模型里 cross-check，识别"漏掉的反方证据 / 弱论据"。下图为对照审阅时使用的对比卡：</p>
  <img src="../../Mapping_example/question%26verification.png" alt="质疑与验证图示" class="click-zoom" loading="lazy">
</section>
`;
write('F-mapping-deep-research.html', shell({
  slug: 'F',
  title: 'Mapping 案例：深度研究 .md 初稿',
  eyebrow: 'Mapping · Phase 3A · Deep Research',
  breadcrumb: `<a href="../index.html#mapping">Mapping 案例</a><span class="sep">/</span><span>深度研究初稿</span>`,
  sourceTag: 'Mapping_example/multi-md.png · 4.* · 5.* .md',
  sourceCopy: '',
  noteHtml: '<p class="subtitle">Perplexity 分 session deep research 产出的多章节 .md 中间文档。</p>',
  bodyHtml: fBody,
  returnAnchor: '#mapping'
}));

// ---- G · mapping longlist xlsx
const gBody = `
<p>由 Perplexity customize workflow + Pitchbook / CB Insights 数据库自动产出的 AI Agent 公司 Long List，含融资 / 产品 / 差异化维度。</p>
<div class="note-bar">
  <strong>Perplexity 原 session</strong>：<a href="https://www.perplexity.ai/computer/tasks/16c2586d-8163-492f-9c0a-5fe89082bb63" target="_blank" rel="noopener">https://www.perplexity.ai/computer/tasks/16c2586d-8163-492f-9c0a-5fe89082bb63</a><br>
  <span class="small muted">Tip · 可让 Claude 浏览器自动化检索 Product Hunt 上的产品，用于补全产品试用名单与社区评分。</span>
</div>
${xlsxToHtml('Mapping_example/AI_Agent_175_深度投研.xlsx')}
<p class="muted small">▲ 顶部 Tab 切换 Sheet · 表头吸顶 · 行 hover 高亮</p>
`;
write('G-mapping-longlist.html', shell({
  slug: 'G',
  title: 'Mapping 案例：Long List Excel',
  eyebrow: 'Mapping · Phase 3B · Long List',
  breadcrumb: `<a href="../index.html#mapping">Mapping 案例</a><span class="sep">/</span><span>Long List Excel</span>`,
  sourceTag: 'Mapping_example/AI_Agent_175_深度投研.xlsx',
  sourceCopy: 'Mapping_example/AI_Agent_175_深度投研.xlsx',
  noteHtml: '<p class="subtitle">通过 Perplexity customize workflow + Pitchbook / CB Insights 数据库，自动产出 175 家 AI Agent 公司的 Long List。</p>',
  bodyHtml: gBody,
  returnAnchor: '#mapping'
}));

// ---- H · mapping template (docx placeholder)
const hBody = `
<p>下方为模板源文件。<strong>浏览器无法原生预览 docx</strong>，因此提供下载入口与"模板使用规则"说明 — 在 AI 复刻流程里，模板里所有标题、段落、占位符、字体、文字都可被改写，AI 只保留它的"格式骨架"。</p>

<div class="tpl-wrap">
  <div class="tpl-icon">DOCX</div>
  <p class="tpl-name">投资报告书标准模板.docx</p>
  <p class="tpl-desc">此 docx 模板被用作排版骨架，AI 仅复用其格式不复用其内容。模板里所有标题、段落、格式、文字、占位符都可以修改、删除、新增、调整顺序与层级。</p>
  <a class="tpl-open-btn" href="../../Mapping_example/%E6%8A%95%E8%B5%84%E6%8A%A5%E5%91%8A%E4%B9%A6%E6%A0%87%E5%87%86%E6%A8%A1%E6%9D%BF.docx" target="_blank" rel="noopener" download>下载 / 打开模板 →</a>
</div>

<div class="note-bar">
  <strong>Perplexity 原网页</strong>：<a href="https://www.perplexity.ai/search/a62e91e2-3089-448e-8c61-b1f5a2dcf93b" target="_blank" rel="noopener">https://www.perplexity.ai/search/a62e91e2-3089-448e-8c61-b1f5a2dcf93b</a>
</div>

<h2>使用方法</h2>
<ol>
  <li><strong>把 docx 当作"框架"而非"参考"</strong>：让 AI 读取它的结构（标题层级、段落样式、图表占位），但禁止参考它的旧内容。</li>
  <li><strong>把 md 当作"内容"</strong>：让 AI 把已审阅的 md 内容精准映射到模板的占位位置。</li>
  <li><strong>字体与品牌统一</strong>：在 prompt 中明确字体（如 STKaiti）、色板、图表样式，避免 AI 自己发挥。</li>
  <li><strong>渲染后再 review 一遍</strong>：让 AI 重新读取生成的 docx，与 md 做逻辑一致性校验。</li>
</ol>

<p class="muted small">下游产物：<a href="I-mapping-final-report.html">Agent_report.pdf 最终行研报告 →</a></p>
`;
write('H-mapping-template.html', shell({
  slug: 'H',
  title: 'Mapping 案例：投资报告书模板',
  eyebrow: 'Mapping · Phase 6 · Template',
  breadcrumb: `<a href="../index.html#mapping">Mapping 案例</a><span class="sep">/</span><span>投资报告书模板</span>`,
  sourceTag: 'Mapping_example/投资报告书标准模板.docx',
  sourceCopy: 'Mapping_example/投资报告书标准模板.docx',
  noteHtml: '<p class="subtitle">Word/PPT 模板套用品牌格式、图表占位；AI 仅复用模板的"排版骨架"，不复用其中的旧内容。</p>',
  bodyHtml: hBody,
  returnAnchor: '#mapping'
}));

// ---- I · mapping final report (PDF + prompt)
const promptText =
`Prompt：请帮我生成一个格式完整的研究分析投资报告（docx 文件）
1. 读取当前目录下的【投资报告书标准模板.docx】作为固定文档骨架，模板里所有标题、段落、格式、文字、占位符都可以修改、删除、新增、调整顺序与层级，但不要参考任何内容，只把它当作排版框架使用。
2. 生成一个 AI_agent_report.docx 文件，将 md 里面的提纲内容完整精准填入模板占位位置（但是字体修改成 STKaiti）
3. 在完成这个任务之后，请重新 review 一遍生成的 docx 文件，检查其逻辑与 md 参考文件是否一致`;

const iBody = `
<h2>渲染 Prompt（严格复制版）</h2>
<div class="prompt-wrap">
  <button class="copy-btn prompt-copy" data-copy="${escapeHtml(promptText)}">复制 Prompt</button>
  <pre class="prompt-card">${escapeHtml(promptText)}</pre>
</div>

<h2>报告 PDF 内嵌预览</h2>
<p class="muted small">如果嵌入预览未加载（部分浏览器禁用本地 PDF iframe），可<a href="../../Mapping_example/Agent_report.pdf" target="_blank" rel="noopener">在新标签页打开 PDF →</a>。</p>
<iframe class="pdf-frame" src="../../Mapping_example/Agent_report.pdf#toolbar=1&amp;navpanes=0" title="Agent Report PDF"></iframe>

<h2>同时产出的可编辑 docx</h2>
<p>如果需要拿到可编辑的 docx 版本：<a href="../../Mapping_example/Agent_report.docx" download>下载 Agent_report.docx →</a></p>

<h2>背后的 multi-agent 思路</h2>
<p class="muted">最后一步 "人 + 模型（新开 session）" 是一种 multi-agent 思路 — 把"质疑者"换一个干净的 context、不同的角色、不同的目标，才能跳出原 session 的认知惯性。</p>
`;
write('I-mapping-final-report.html', shell({
  slug: 'I',
  title: 'Mapping 案例：Agent 行研最终报告',
  eyebrow: 'Mapping · Phase 7 · Final Render',
  breadcrumb: `<a href="../index.html#mapping">Mapping 案例</a><span class="sep">/</span><span>最终行研报告</span>`,
  sourceTag: 'Mapping_example/Agent_report.pdf',
  sourceCopy: 'Mapping_example/Agent_report.pdf',
  noteHtml: '<p class="subtitle">把 md 内容映射到 docx 模板骨架，AI 辅助图表生成 & 数据可视化（Perplexity / Python / Flourish），最终产出投资报告。</p>' +
            '<div class="note-bar"><strong>渲染 docx 的 Prompt 卡片</strong>在下方，点击右上角"复制"按钮可直接复用。</div>',
  bodyHtml: iBody,
  returnAnchor: '#mapping'
}));

// ---- J · CRWV 3-Statement Model xlsx (rich, async) — emitted at end via IIFE
async function buildJ() {
  const jBody = `
<p>本页直接把 <code>CRWV_3Statement_Model_Final_VF.xlsx</code> 渲染为多 Tab HTML 表格，<strong>尽量保留原文件的字体、颜色、底纹、对齐、合并单元格等格式</strong>。文件由 Claude + 开源 skill <strong>3-statements-ultra</strong> 共生成，含 IS / BS / CF / Returns + Scenarios + Cross-Check 共 10 Tab，9/9 QC 通过。</p>

<div class="note-bar">
  <strong>建模链路</strong>：Open-source skill 发现（GitHub + 社媒）→ Claude 用 3-Statements-Ultra 起骨架 → Bug fix（BS_COL_MAP / Revenue Build-Up / Scenarios / Formatting）→ Human verification（关键假设 / 方向 / 数字交叉）→ Final output。
</div>

${await xlsxToHtmlRich('Coreweave_example/CRWV_3Statement_Model_Final_VF.xlsx')}

<p class="muted small">▲ 顶部 Tab 切换 Sheet · 公式按计算结果显示 · 数字格式按 numFmt 还原（千分位 / 百分号 / 括号负数）· 单元格颜色 / 字体粗细 / 合并单元格保留。</p>
`;
  write('J-coreweave-3statement-model.html', shell({
    slug: 'J',
    title: 'CoreWeave 三表财务模型',
    eyebrow: 'CoreWeave · Phase 5 · 3-Statement Model',
    breadcrumb: `<a href="../index.html#coreweave">CoreWeave 案例</a><span class="sep">/</span><span>三表模型</span>`,
    sourceTag: 'Coreweave_example/CRWV_3Statement_Model_Final_VF.xlsx',
    sourceCopy: 'Coreweave_example/CRWV_3Statement_Model_Final_VF.xlsx',
    noteHtml: '<p class="subtitle">Claude + 开源 skill 3-statements-ultra 共生成 · 10 Tab · 9/9 QC Passed.</p>',
    bodyHtml: jBody,
    returnAnchor: '#coreweave'
  }));
}

// ---- K · meta · how this website was made (with embedded prompts + PRD)

// real user prompts from this session, verbatim
const userPrompts = {
  s1: `读取文件夹下面的ai.md文件，请你参考（按照我里面初步写的prd（请你进行深度理解）输出一个真正可以给AI工具（比如claude 理解的）网页制作PRD markdown文件 （这个link里面所有的文件名我都已经存放在本地了，给AI阅读的跳转sub-html参考文件名不要更改）`,
  s2: `@PRD.md 严格遵循prd文件，参考 此文件夹中的其他文件（所有需要做sub-html的source文件都可以找到索引，也需要制作相应的与主页面一致的网页风格）`,
  s3: `首先请你把整个 HTML 相关的文件，在当前的目录里面生成一个新的文件夹，就叫做 Website，然后把这些全部放进去，不要跟之前的文件夹混在一起。现在最显著的问题，就是我要求展示的这个流程图。

其实我是希望你重新把它做成适应这个页面风格的流程图，而不是直接把图片粘贴进去。所以我希望你根据图片里的内容，可以稍微简化一下图表，但要满足以下要求：

1. 保证保留那些需要跳转的部分
2. 把它做成一个自适应页面大小和风格、可滑动的流程图

另外就是你说的关于运行方式的问题。我并不希望在网页里点击这些 MD 文件时，是直接进入 Markdown 文件或者 Excel 文件。

我是希望你也把 Markdown 文件和 Excel 文件直接做成 HTML 页面，这些源文件只是作为一个参考。`,
  s4: `我发现有几个核心的小问题。

首先第一个问题是，我原来的那个 AI.md 文件里，其实是要求在点击"Manual Research Readings"这一部分时，我只想显示当时的提纲和 prompt。其实不需要把其他的那个 MD 文件里的交互写在跳转之后的页面里，就只写当时的提纲和 prompt。

具体如下：
"问 Claude：我打算分几个 module 来拆分？"

只要这一部分就可以了。 我在原本的文件里还写了：有一些是无跳转但需要标注在框框旁边的内容，也可以在鼠标 hover 到整个框上面的时候，显示相应的一些提示文字。最后这个部分，就是"其他 tips"这里的最后一个部分。

不要写"找工具大于自己造轮子"吧，稍微写得 soft 一点。可以只说我有一些喜欢去调用或者利用的工具，可以直接找到相应这种延展 Agent 能力的东西。附上我的github链接/头像 https://github.com/zhangxinrui127-stack`,
  s5: `把manual research reading 的html里面的这一段话 转移到human reads draft report的开头？这一段是看完报告之后review 的一些问题，不是最开始形成的；
2）页面右上角的 mapping case改为agent mapping case；
3）mapping case 完整工作流的 step2 sub-html页面里面，把下游分支的这一部分删掉（因为原本的工作流里面已经有跳转了；
4）我每一次点击到sub-html再按返回的时候，原来的工作流就缩起来了，要重新点击才展开，比较麻烦，可以让它点击进去之后，再返回的时候仍然保持展开吗？
5）output-多章节.md跳转之后的网页不太对，需要全部替换（仍然要保持格式），替换成 @"Mapping_example/multi-md.png" 图片（表示这是perplexity产出的中间文档）还有2.2c 4.agent 5.2c这三个文件的内容；
6）output-long list excel里面的perplexity 链接需要换成 https://www.perplexity.ai/computer/tasks/16c2586d-8163-492f-9c0a-5fe89082bb63 。
你做完之后每个任务确认一下都完成了`,
  s6: `file:///Users/liuzhiyuan/Documents/rb/idg/Website/subpages/F-mapping-deep-research.html 里面的 2 · 2C AI Agent 入口级产品赛道深度分析 这一个章节直接去掉`,
  s7: `1）CRWV_3Statement_Model 的这个框也添加一个 sub-html 页面，@Coreweave_example/CRWV_3Statement_Model_Final_VF.xlsx 用这个渲染到 sub-html 页面里面去；
2）在 tips 里面最后加一条，示意本网页是如何制作的，点击可以转向新增一个 html，将咱们这个 session 的交互部分（尤其是最开始 我输入了一个自然语言描述的 ai.md 需求，让 ai 生成一个 prd 以及后面交互修改的一些来回`,
  s8: `根据我们交互的过程 不要只描述，要我的原本的 prompt 和 你生成的那个 prd 文件也嵌入进去`
};

function promptBlock(text, aiSummaryHtml) {
  const esc = escapeHtml(text);
  return `<details class="prompt-detail">
  <summary>📋 当时的 user prompt（点击展开 · 原文逐字）</summary>
  <div class="prompt-wrap">
    <button class="copy-btn prompt-copy" data-copy="${esc.replace(/"/g, '&quot;')}">复制 Prompt</button>
    <pre class="prompt-card">${esc}</pre>
  </div>
  ${aiSummaryHtml ? `<div class="ai-summary"><strong>AI 产出：</strong>${aiSummaryHtml}</div>` : ''}
</details>`;
}

const kBody = `
<p class="muted small">这一页本身就是一个 meta-case：<strong>这个网站从一份手写的 <code>ai.md</code> 需求草稿，到当前你正在看到的样子</strong>，整个过程同样是按"人定方向 + AI 并行实现 + 多轮 review"的链路做的。下面把<strong>每一轮 user prompt 的原文</strong>与对应 AI 产出按时间线还原，并把两份关键文档（<code>ai.md</code> / <code>PRD.md</code>）的全文也嵌进来。</p>

<div class="note-bar">
  <strong>核心原则</strong>：① 用自然语言把意图写清楚，让 AI 先产出一份 PRD 反过来对齐；② 每一轮反馈只动一小块，控制 context；③ 把"工具的工具"（build.js、common.js）也作为产出物固化下来，下一次迭代直接复用。
</div>

<h2>两份原始文档</h2>
<p class="muted small">这两份文件构成了整个项目的"地基"。点击展开可以看完整原文（带滚动条，避免淹没整页）。</p>

<details class="doc-embed">
  <summary>
    <span>📄 <strong>ai.md</strong> · 最初手写的自然语言需求草稿 <span class="de-tag">(${(read('ai.md').length/1024).toFixed(1)} KB · 原文嵌入)</span></span>
    <span class="de-toggle">EXPAND</span>
  </summary>
  <div class="doc-content">
    <div class="doc-actions">
      <button class="copy-btn" data-copy="${escapeHtml(read('ai.md')).replace(/"/g, '&quot;')}">复制 ai.md 全文</button>
      <a class="copy-btn" href="../../ai.md" target="_blank" rel="noopener" style="text-decoration:none;">在新标签页打开源文件 →</a>
    </div>
    <div class="doc-scroll">
      <article class="md-article">
        ${renderMd('ai.md')}
      </article>
    </div>
  </div>
</details>

<details class="doc-embed">
  <summary>
    <span>📄 <strong>PRD.md</strong> · AI 反过来生成的结构化 PRD <span class="de-tag">(${(read('PRD.md').length/1024).toFixed(1)} KB · 原文嵌入)</span></span>
    <span class="de-toggle">EXPAND</span>
  </summary>
  <div class="doc-content">
    <div class="doc-actions">
      <button class="copy-btn" data-copy="${escapeHtml(read('PRD.md')).replace(/"/g, '&quot;')}">复制 PRD.md 全文</button>
      <a class="copy-btn" href="../../PRD.md" target="_blank" rel="noopener" style="text-decoration:none;">在新标签页打开源文件 →</a>
    </div>
    <div class="doc-scroll">
      <article class="md-article">
        ${renderMd('PRD.md')}
      </article>
    </div>
  </div>
</details>

<hr>

<h2>时间线 · 每一轮交互</h2>
<p class="muted small">下面每个 step 都包含两部分：左侧编号 + 简短说明，下方折叠的当时 user prompt 原文（可逐字复制）。</p>

<ol class="timeline">
  <li>
    <div class="t-mark">00</div>
    <div class="t-body">
      <h3>Step 0 · 起点：手写 <code>ai.md</code></h3>
      <p class="t-meta">User · 自然语言需求（无 prompt）</p>
      <p>把脑子里希望呈现的两个案例（CoreWeave / Agent Mapping）+ 认知层 + Tips + 页面交互期望全部用自然语言写到 <code>ai.md</code>。<strong>不画 wireframe、不写 PRD，直接描述意图、跳转、约束</strong>。</p>
      <p class="small muted">↑ 这一份文档的完整原文已嵌入在上方"两份原始文档"区块。</p>
    </div>
  </li>

  <li>
    <div class="t-mark">01</div>
    <div class="t-body">
      <h3>Step 1 · 让 AI 把 <code>ai.md</code> 转成正式 PRD</h3>
      <p class="t-meta">User → AI · 让 AI 反过来对齐需求</p>
      <p>AI 输出 <code>PRD.md</code>（27 KB）— 含目录结构、视觉 token、子页清单、决策表、验收 checklist、不要做清单。这一步把"潜在歧义"显化，方便下一步实施的 AI 直接按字面执行。</p>
      ${promptBlock(userPrompts.s1, '生成 <strong>PRD.md</strong>（全文已嵌入在上方）— 把 ai.md 中的散点叙述转成 11 个章节 + 表格 + 验收 checklist 的结构化文档')}
    </div>
  </li>

  <li>
    <div class="t-mark">02</div>
    <div class="t-body">
      <h3>Step 2 · AI 按 PRD 实现 v1</h3>
      <p class="t-meta">User → AI · 第一轮交付</p>
      <p>第一版交付：主页 + 9 个子页 + image viewer（直接嵌入 PNG 工作流图 + 半透明热区做跳转）+ md/xlsx fetch 渲染。<strong>可工作但有两个根本问题</strong>：① 把流程图当 PNG 嵌入热区，对位麻烦；② 用 fetch 读本地 md/xlsx，<code>file://</code> 下浏览器禁用，必须起 HTTP 服务。</p>
      ${promptBlock(userPrompts.s2, '产出 v1：<code>index.html</code> + <code>subpages/A–I</code> + <code>image-viewer.js</code> + <code>md-renderer.js</code> + <code>xlsx-viewer.js</code>')}
    </div>
  </li>

  <li>
    <div class="t-mark">03</div>
    <div class="t-body">
      <h3>Step 3 · 三个根本性修改：Website 目录 / HTML 流程图 / 预渲染</h3>
      <p class="t-meta">User · 重构性反馈</p>
      <p>这一轮反馈是最关键的转折点。它把 v1 的两个根本问题一次性堵掉：流程图从"嵌图 + 热区"改成"纯 HTML 卡片"；运行方式从"必须起服务"改成"双击即用"。</p>
      ${promptBlock(userPrompts.s3, '① 建 <code>Website/</code> 目录把 HTML 隔离；② 用 CSS 卡片 + 虚线连接重制两个工作流图（节点按角色配色 / 可滑动）；③ 写 <code>build.js</code>，用 node + marked + SheetJS 一次性把所有 md/xlsx 预渲染为 HTML 字符串嵌到子页里。从此双击 <code>index.html</code> 就能用。')}
    </div>
  </li>

  <li>
    <div class="t-mark">04</div>
    <div class="t-body">
      <h3>Step 4 · A 子页精简 / hover tooltip / Tips 软化 + GitHub</h3>
      <p class="t-meta">User · 三处微调</p>
      <p>开始进入"内容打磨"阶段。这一轮把 A 子页从"md 全文"改回"提纲 + Prompt"；把流程图旁边的小字注释改成 hover 整框时弹出的 tooltip（视觉更干净）；Tips 第 5 条措辞从硬变软，加上 GitHub 卡片。</p>
      ${promptBlock(userPrompts.s4, '① A 子页改成硬编码"提纲 + 初始 Prompt"；② 新增 <code>.wf-node.has-tip</code> 组件 — 右上角 ⓘ + hover 弹出黑底 tooltip；③ Tips §5 软化为"一些喜欢调用的工具" + 圆形头像 GitHub 卡片（zhangxinrui127-stack）')}
    </div>
  </li>

  <li>
    <div class="t-mark">05</div>
    <div class="t-body">
      <h3>Step 5 · 一次性 6 条调整（含 sessionStorage 持久化）</h3>
      <p class="t-meta">User · 内容归属 / 文案 / UX / 数据替换</p>
      <p>这一轮最密集 — 一次给了 6 条，并要求"每条做完单独确认"。最重要的两条：<strong>把"迭代追加问题"从 A 搬到 C</strong>（因为那是 review 一稿后才形成的，不属于最初提纲）；<strong>工作流展开状态要持久化</strong>（点子页再返回不能塌回去）。</p>
      ${promptBlock(userPrompts.s5, '① A→C 内容迁移；② 导航 "Mapping Case" → "Agent Mapping Case"；③ E 子页删"下游分支"段；④ <code>common.js</code> 新增 <code>bindWorkflowPersist()</code> + <code>expandFromHash()</code> 用 sessionStorage 记录 details 状态；⑤ F 子页全部替换为 multi-md.png + 章节 2/4/5；⑥ G 子页 Perplexity 链接换成新 task id')}
    </div>
  </li>

  <li>
    <div class="t-mark">06</div>
    <div class="t-body">
      <h3>Step 6 · F 子页去掉章节 2</h3>
      <p class="t-meta">User · 单点删除</p>
      <p>典型的"做完之后再看一眼，想再砍一刀"的微调。F 子页从 80 KB → 52 KB。</p>
      ${promptBlock(userPrompts.s6, '改 <code>build.js</code> 中 F 子页拼装逻辑，删除章节 2 的 renderMd 调用与对应 <code>&lt;h2&gt;</code>，章节 4 / 5 保留')}
    </div>
  </li>

  <li>
    <div class="t-mark">07</div>
    <div class="t-body">
      <h3>Step 7 · 新增 J（三表模型 xlsx）+ K（meta 时间线）</h3>
      <p class="t-meta">User · 两个新增子页</p>
      <p>① CoreWeave 工作流里 <code>CRWV_3Statement_Model</code> 节点改为可跳转，新增 J 子页渲染 10 Tab 的三表模型 xlsx；② Tips 末尾新增第 6 条"本网页是如何制作的"，链接到 K 子页（即你正在看的这一页）。</p>
      ${promptBlock(userPrompts.s7, '新增 <code>J-coreweave-3statement-model.html</code>（10 sheet 全部渲染） + <code>K-how-this-site-was-made.html</code>（v1 描述型时间线） + Tips §6 <code>.faq-link</code> 直跳卡片')}
    </div>
  </li>

  <li>
    <div class="t-mark">08</div>
    <div class="t-body">
      <h3>Step 8 · K 子页升级 · 嵌入原始 prompt + PRD 全文</h3>
      <p class="t-meta">User · 当前轮 · meta 自我引用</p>
      <p>用户提示 v1 的 K 子页只是"描述"，不够 meta — 要把<strong>真正的 user prompt 原文</strong>和 <strong>PRD.md 全文</strong>嵌进来，让读者直接看到 AI 协作的"输入原貌"，而不是经过总结的二手描述。</p>
      ${promptBlock(userPrompts.s8, '① 顶部"两份原始文档"区块用 <code>.doc-embed</code> 折叠嵌入 ai.md + PRD.md 全文（带复制按钮 + 滚动条 + 跳源文件链接）；② 每个时间线 step 新增 <code>.prompt-detail</code> 折叠展示当时 user prompt 原文 + AI 产出说明 — 也就是你正在读的这一段')}
    </div>
  </li>
</ol>

<hr>

<h2>这一页想传达什么</h2>
<ul>
  <li><strong>自然语言起手，PRD 收口</strong>：不要一上来就写 PRD，先用 <code>ai.md</code> 把所有"我想要什么"写出来，再让 AI 反过来产出一份结构化 PRD 给自己 review。这一步会强制把模糊点显化。</li>
  <li><strong>每一轮反馈只动小范围</strong>：一次给 AI 6–7 条调整就到上限了，再多 context 会乱。每次让 AI 报告"每一条完成确认"，能保持节奏。</li>
  <li><strong>把工具固化下来</strong>：<code>build.js</code> 是这次的"工具的工具" — 改 md / xlsx 后重跑就行，下次再用同一套 skill 做新网站直接复用。</li>
  <li><strong>静态 + 预渲染 ≠ 落后</strong>：这个站点没有 npm、没有构建工具、没有后端，但有完整的工作流图、Excel 渲染、PDF 内嵌、状态持久化。"低工程复杂度 + 高交付质量" 是研究类网页的甜区。</li>
  <li><strong>Meta 自我引用</strong>：把项目本身的协作过程也作为一个 case 沉淀下来 — 这是 AI 时代研究工作流可复用的关键。</li>
</ul>
`;
write('K-how-this-site-was-made.html', shell({
  slug: 'K',
  title: '本网页是如何制作的',
  eyebrow: 'Meta · How this site was made',
  breadcrumb: `<a href="../index.html#tips">Tips</a><span class="sep">/</span><span>制作过程</span>`,
  sourceTag: 'inline · 还原自当前 session 的 prompt/response',
  sourceCopy: '',
  noteHtml: '<p class="subtitle">从一份手写 <code>ai.md</code> 草稿到当前这个站点 · 11 轮 user × AI 协作的时间线还原。</p>',
  bodyHtml: kBody,
  returnAnchor: '#tips'
}));

buildJ().then(() => {
  console.log('Done.');
}).catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
