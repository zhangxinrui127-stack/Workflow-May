# PRD：本地 AI 工作流知识库网页

> 目标读者：AI Coding Agent（如 Claude Code、Codex）。本 PRD 是**实现规范**，不是需求草稿；任何"看起来可以省略"的细节都已经被考虑过，请按字面意思实现。

---

## 0. 项目元信息

| 字段 | 值 |
|---|---|
| 项目名 | 本地 AI 工作流知识库网页 |
| 部署形态 | **纯静态站点，无后端、无构建工具、无 npm**。双击 `index.html` 即可在浏览器跑起来。 |
| 工作目录（绝对路径） | `/Users/liuzhiyuan/Documents/rb/idg/` |
| 浏览器目标 | 最新版 Chrome / Safari / Edge（macOS 优先）。**不需要兼容 IE/旧版 Edge。** |
| 联网要求 | 默认离线可用。允许引用 1 个 CDN（仅 marked.js 用于 markdown 渲染，见 §6）。 |
| 路径规范 | **所有引用一律相对路径**。禁止出现 `file://`、绝对路径、`http://localhost`。 |

---

## 1. 目录结构（**严格保留所有现有文件名，不得改名、不得移动**）

实现完成后整体目录如下：

```
/Users/liuzhiyuan/Documents/rb/idg/
├── ai.md                            # 原始素材，勿动
├── PRD.md                           # 本文件
│
├── index.html                       # ★ 主页面（新建）
│
├── assets/                          # ★ 新建目录
│   ├── css/
│   │   └── main.css                 # 主样式（IDG Capital 风格）
│   ├── js/
│   │   ├── md-renderer.js           # 通用 markdown 子页渲染器
│   │   ├── image-viewer.js          # 工作流大图可拖拽/缩放查看器
│   │   └── xlsx-viewer.js           # 仅 G 子页需要（见 §6.3）
│   └── lib/
│       ├── marked.min.js            # 本地缓存的 markdown 解析器
│       ├── highlight.min.js         # 代码高亮（可选）
│       └── xlsx.full.min.js         # SheetJS（仅 G 子页用）
│
├── subpages/                        # ★ 9 个子页（新建）
│   ├── A-research-framework.html
│   ├── B-initial-report.html
│   ├── C-report-reviewed.html
│   ├── D-pptx-skill-generated.html
│   ├── E-mapping-research-outline.html
│   ├── F-mapping-deep-research.html
│   ├── G-mapping-longlist.html
│   ├── H-mapping-template.html
│   └── I-mapping-final-report.html
│
├── Coreweave_example/               # 原文件夹，文件名禁止修改
│   ├── 1. research-framework.md
│   ├── 2. initial-report-8modules.md
│   ├── 3. report-reviewed.md
│   ├── 4. pptx-skill-generated.md
│   ├── 5. workflow-and-report-session.md
│   ├── 6. full-model.md
│   ├── 7. phase4-pptx.md
│   ├── 8. AI_Collaboration_Report.md
│   ├── CoreWeave_AI_Workflow.dot
│   └── CoreWeave_AI_Workflow.png
│
└── Mapping_example/                 # 原文件夹，文件名禁止修改
    ├── Agent_report.docx
    ├── Agent_report.pdf
    ├── AI_Agent_175_深度投研.xlsx
    ├── perplexity_workflow_v3.png
    ├── question&verification.png
    ├── 垂类agent.md
    ├── 通用agent标的.md
    ├── 投资报告书标准模板.docx
    └── 投资建议_通用Agent章节.md
```

> ⚠️ **文件名包含中文、空格、`&` 符号、点号开头数字（如 `1. research-framework.md`）。所有 HTML/JS 中引用路径必须做 `encodeURI()` 处理**，否则 fetch 会 404。

---

## 2. 视觉风格指南（参考 https://idgcapital.com/）

### 2.1 设计调性
- **机构投资风**：克制、留白多、版面理性、几乎不用阴影/渐变。
- **去 AI 味**：不要 emoji 海、不要彩色卡片堆叠、不要"赛博朋克"/"霓虹光晕"/"玻璃拟态"。
- **学术报告感**：让人想到 BCG / McKinsey / Bridgewater 的内部报告，而不是 SaaS 落地页。

### 2.2 颜色 token
```css
:root {
  --bg:           #FFFFFF;
  --bg-soft:      #F7F6F2;   /* 大面积浅米色衬底，IDG 同款 */
  --ink:          #111111;   /* 主文字 */
  --ink-soft:     #4A4A4A;   /* 次要文字 */
  --ink-mute:     #8A8A8A;   /* 注释/元信息 */
  --rule:         #E5E2DA;   /* 分割线 */
  --accent:       #C8102E;   /* IDG 红，仅用于强调/hover/激活态 */
  --accent-soft:  #F3DADE;   /* accent 8% 衬底 */
  --link:         #111111;   /* 链接默认色与正文一致，靠下划线区分 */
}
```

### 2.3 排版
- 中文：`"PingFang SC", "Noto Sans SC", "Hiragino Sans GB", sans-serif`
- 英文/数字：`"Inter", "Helvetica Neue", Arial, sans-serif`
- 标题字重 600，正文 400，行高 1.7，正文字号 16px，段间距 1em。
- 网页最大宽度 1180px，居中。区块之间用 96px 大间距区隔（IDG 同款节奏）。

### 2.4 交互细节
- 链接 hover：颜色变 `--accent`，下划线加粗。
- 卡片 hover：仅 1px 边框颜色变 `--accent`，**不允许 transform/scale/shadow 动画**。
- 折叠区域展开：用 `<details><summary>`，开合带 200ms 高度过渡。

---

## 3. 主页面 `index.html` 结构

### 3.1 页面骨架

```
┌─────────────────────────────────────────────────┐
│ Header（粘顶，48px 高，白底+下边框）             │
│  Logo文字"AI Workflow Notes"        锚点导航     │
├─────────────────────────────────────────────────┤
│ Hero（满宽，米色衬底 --bg-soft）                 │
│  H1: 本地 AI 工作流知识库                        │
│  Lead: 一行副标题，描述本页用途                  │
├─────────────────────────────────────────────────┤
│ §1 案例：CoreWeave 深度研究（可点击展开 workflow）│
├─────────────────────────────────────────────────┤
│ §2 案例：AI Agent 赛道扫描（可点击展开 workflow）│
├─────────────────────────────────────────────────┤
│ §3 理解和认知层（可点击展开）                    │
├─────────────────────────────────────────────────┤
│ §4 其他 Tips（可点击展开）                       │
├─────────────────────────────────────────────────┤
│ Footer：最后更新时间 + 一句免责声明              │
└─────────────────────────────────────────────────┘
```

### 3.2 §1 CoreWeave 案例区块（**核心交互**）

**容器**：标题行 + 一段引导文字 + 一张可点击展开的工作流大图。

**标题行**：`<h2>` 文案为 `Coreweave Case Study`，**点击 H2 整行**触发"展开工作流大图"（不是单独的按钮，整行可点）。展开/收起用 `<details>` 元素。

**展开后内容**：
- 渲染 `Coreweave_example/CoreWeave_AI_Workflow.png`（图片高 7380px，宽 2676px，非常长）。
- **必须用 `assets/js/image-viewer.js` 包裹**：
  - 在固定高度 720px 的窗口里展示，**可上下滑动**（overflow-y: auto）；
  - 顶部一行工具条：`[− 缩小] [当前缩放%] [+ 放大] [⤢ 全屏] [⟲ 复位]`；
  - 鼠标滚轮缩放（按住 Ctrl/⌘ 触发，避免误触发页面滚动）；
  - 鼠标拖拽平移（press-drag）；
  - 双击图片重置到 100%。
- 图片下方提示："点击下方高亮节点可跳转到对应素材"。

**关键热区（可点击跳转的节点）**：

参考 `Coreweave_example/CoreWeave_AI_Workflow.dot` 中的节点坐标，**在图片上层叠 4 个绝对定位的透明热区 `<a>`**（位置需肉眼对齐 PNG 中对应方框；首次实现时，先用红色半透明 `rgba(200,16,46,0.15)` 填充帮助调位，确认后再调成透明）：

| 节点 ID（在 .dot 中） | 节点显示文案（截取） | 热区目标 |
|---|---|---|
| `human_prep` | Manual Research & Reading / S-1 / 10-K / Industry Reports / Hand-written Research Plan | `subpages/A-research-framework.html` |
| `claude_research` | Claude Session 2 / Parallel Research / (NLM API × 12 + Web × 10) | `subpages/B-initial-report.html` |
| `human_read_report` | Human Reads Draft Reports / Identifies Review Direction / & Key Issues to Investigate | `subpages/C-report-reviewed.html` |
| `skill_design` | Co-design pptx-research Skill / 7-Step State Machine / 9 Global Rules + Resume Protocol | `subpages/D-pptx-skill-generated.html` |

**热区视觉反馈**（鼠标悬停时）：
- 节点边框"发光/加粗"：用 `box-shadow: 0 0 0 3px var(--accent), 0 0 16px 4px rgba(200,16,46,0.45);`
- 鼠标 cursor: pointer
- 配合 `title` 属性给出 hover tooltip："点击查看 → 研究框架"等

> 实现细节：因为热区是 absolute 定位在 PNG 上层，必须用百分比定位（`top: x%; left: y%; width: w%; height: h%`），保证图片缩放时热区跟随。

### 3.3 §2 Mapping 案例区块

结构与 §1 一致，**点击 H2 `AI Agent 赛道扫描 Mapping Case Study` 整行展开**工作流大图。

**展开后内容**：
- 渲染 `Mapping_example/perplexity_workflow_v3.png`（2193 × 6660）。
- 同样使用 `image-viewer.js`，同样的工具条 + 缩放 + 拖拽。

**关键热区**（共 7 个，5 个跳转 + 2 个仅文字标注无跳转）：

| 节点文案（在 PNG 中）| 行为 |
|---|---|
| `Human:明确研究赛道 & 核心投资问题（边界/变量/框架）` | 跳转 `subpages/E-mapping-research-outline.html` |
| `OUTPUT: 多章节 .md 研究报告初稿` | 跳转 `subpages/F-mapping-deep-research.html` |
| `OUTPUT: Long List Excel（公司/产品/融资/差异化维度）` | 跳转 `subpages/G-mapping-longlist.html` |
| `产品试用 / social hearing` 旁边 | **无跳转**，在节点右侧贴一个永久可见的灰色小标签："去试用产品（AI 可读评测，但体感需自己获取）+ social hearing（可用 playwright 看社区 / 访谈深度用户）" |
| `观点稳健? 无重大漏洞?` | 跳转 `subpages/F-mapping-deep-research.html#question-verification`，该子页内嵌 `Mapping_example/question&verification.png`（**注意 URL encode `&` 为 `%26`**） |
| `Human: Word/PPT 模板套用品牌格式/图表占位` | 跳转 `subpages/H-mapping-template.html` |
| `AI 辅助图表生成 & 数据可视化 Perplexity / Python / Flourish` | 跳转 `subpages/I-mapping-final-report.html` |
| 流程最后一个节点旁边 | **无跳转**，贴标签："人 + 模型（新开 session）是一种 multi-agent 的思路，需要新的 context / 视角 / 目标" |

### 3.4 §3 理解和认知层

使用 `<details>` 三段折叠，全部默认收起。文案严格按 ai.md 第 133–157 行：

1. **应该用 AI 来做什么？目前能力边界如何？**
   - 工作流的流程化（outsource 认知带宽和重复性工作给它，但是自己要把握关键问题和判断能力）
   - 个人知识沉淀（embedding RAG / 或者直接存 md 文件）做自己的 Agent 友好型数据库

2. **从 Agent 的结构，来理解 Agent 的能力边界？**
   - 执行环境（Claude Code 能直接读/写本地文件、有完整的文件系统权限 + 命令执行权限）
   - 权限/工具链 — 展示 GitHub（这里放一个外链按钮，跳转到 `https://github.com/`，target="_blank" rel="noopener"）
   - 上下文管理（可以自己写 projects 里的 md 文件记录进度，也可以 /compact）

3. **AI 目前明显不能替代的部分，如何人机协同？**
   - 提供信息源、寻找资源、包括寻找工具
   - 判断（尤其是方向性的、需要体感的、不一定是在语言边界里的判断，例如投资），所以人无法从这个过程里 off 出去

### 3.5 §4 其他 Tips

同样用 `<details>` 折叠，5 条编号列表，文案严格按 ai.md 第 159–177 行原文：

1. 要提高 AI 产出质量，需要的是输入更多信息（包括问能够提升置信空间的问题），包括更相关的参考文献和思路更清晰的提纲，还有人看到产出物后，给出的具体修改意见
2. 每一步可拆解、有中间结果、控制 context 上下文和方向
3. 想清楚功能/目标，让 AI 生成 requirement prompt；然后用此 prompt 去发起任务；对于渲染 rendering 类工作，最好是有模板来复刻，否则需要写很长的 PRD 才能 harness 住格式
4. 没有什么工程问题是 Codex 开十几个子代理解决不了的，而非得在一个群聊里 @ 好几个 Agent 来完成的（吐槽 Slack）
5. 寻找工具 AI（word/excel/ppt 小工具 / 产品三大件的 skills），其余的一些需求我会找合适的产品
   - 信息：[https://aihot.virxact.com/](https://aihot.virxact.com/)（外链，新窗口）
   - PPT：最后希望把要求的 Grid、边距、占位符、字体、色值全部规定在 skills 里面，python-pptx 等引擎去执行
   - word：也是 python-docx 去做执行，核心是格式，但已经通过 perplexity 试验过它可以执行复刻动作
   - 其他工具暂时不做……

### 3.6 锚点导航

Header 右侧放 4 个锚点：`#coreweave`、`#mapping`、`#cognition`、`#tips`。点击平滑滚动到对应区块。

---

## 4. 子页面（subpages/*.html）通用规范

### 4.1 公共模板（所有子页都遵循）

```
┌─────────────────────────────────────────────────┐
│ Header（与主页一致，含"← 返回主页"链接到 index.html#锚点）│
├─────────────────────────────────────────────────┤
│ 子页 Meta 条（米色衬底）                          │
│  面包屑：主页 / CoreWeave 案例 / 研究框架        │
│  右侧：源文件路径 + "📋 复制路径"按钮             │
├─────────────────────────────────────────────────┤
│ 标题区                                           │
│  H1：本子页标题                                  │
│  可选 Note 条（黄色细边框）：现场演示提示等       │
├─────────────────────────────────────────────────┤
│ 主体（最大宽度 880px，居中，正文优先阅读）        │
│  根据子页类型渲染：md / 图片 / Excel / PDF       │
├─────────────────────────────────────────────────┤
│ Footer（同主页）                                 │
└─────────────────────────────────────────────────┘
```

### 4.2 共九个子页明细

| 子页文件 | 标题 | 主体内容 | 顶部提示条 |
|---|---|---|---|
| `A-research-framework.html` | 研究框架与初始 Prompt | 渲染 `Coreweave_example/1. research-framework.md` | — |
| `B-initial-report.html` | 8 Modules 初稿报告 | 渲染 `Coreweave_example/2. initial-report-8modules.md` | "💡 可以现场演示：演示 Claude Session 2 并行研究、NotebookLM + web-access skill 的工作机制" |
| `C-report-reviewed.html` | 审阅与修订后报告 | 渲染 `Coreweave_example/3. report-reviewed.md` | "💡 可以现场演示：演示 4 Parallel Agents 的对抗式审阅过程" |
| `D-pptx-skill-generated.html` | pptx-research Skill 协作设计 | 渲染 `Coreweave_example/4. pptx-skill-generated.md` | "💡 可以现场演示：演示 7-Step State Machine + 9 Global Rules + Resume Protocol" |
| `E-mapping-research-outline.html` | Mapping 案例：研究提纲 | **不读外部文件**，直接在 HTML 中硬编码渲染 ai.md 第 103–110 行的 3 条核心研究问题 | — |
| `F-mapping-deep-research.html` | Mapping 案例：深度研究 .md 初稿 | **同时渲染两份 md，用 Tab 切换**：①`Mapping_example/通用agent标的.md` ②`Mapping_example/垂类agent.md`。**页面底部**追加一个 `<section id="question-verification">`，标题"观点稳健 & 无重大漏洞？审阅图示"，下方插入 `Mapping_example/question&verification.png`（最大宽度 100%，可点击放大） | — |
| `G-mapping-longlist.html` | Mapping 案例：Long List Excel | 用 `xlsx-viewer.js` + SheetJS 读取并渲染 `Mapping_example/AI_Agent_175_深度投研.xlsx`。**Tab 切换 sheet**。 | **顶部黄色提示条**："Perplexity 原 session：https://www.perplexity.ai/computer/tasks/6325c6aa-8cac-4d7e-86fb-a17ea49d3229（可点击外链）" + 第二行："💡 可让 Claude 浏览器自动化检索 Product Hunt 上的产品" |
| `H-mapping-template.html` | Mapping 案例：投资报告书模板 | 显示模板封面截图（**这一步需要执行实现时把 docx 第一页转 png，存到 `assets/img/template-cover.png`；若无法转换，则显示一个"打开 docx 文件"链接**，链接到 `Mapping_example/投资报告书标准模板.docx`）。同时显示一段说明文字："此 docx 模板被用作排版骨架，AI 仅复用其格式不复用其内容。" | **顶部黄色提示条**："Perplexity 原网页：https://www.perplexity.ai/search/a62e91e2-3089-448e-8c61-b1f5a2dcf93b" |
| `I-mapping-final-report.html` | Mapping 案例：Agent 行研最终报告 | **PDF 内嵌预览**：`<iframe src="../Mapping_example/Agent_report.pdf" width="100%" height="900">`；上方放一个 Prompt 卡片（米色背景、等宽字体），原文如下： | "💡 渲染 docx 的 Prompt（点击复制按钮可复制）" |

I 子页的 Prompt 原文（**严格复制**，禁止改写、禁止精简）：

> Prompt：请帮我生成一个格式完整的研究分析投资报告（docx 文件）
> 1. 读取当前目录下的【投资报告书标准模板.docx】作为固定文档骨架，模板里所有标题、段落、格式、文字、占位符都可以修改、删除、新增、调整顺序与层级，但不要参考任何内容，只把它当作排版框架使用。
> 2. 生成一个 AI_agent_report.docx 文件，将 md 里面的提纲内容完整精准填入模板占位位置（但是字体修改成 STKaiti）
> 3. 在完成这个任务之后，请重新 review 一遍生成的 docx 文件，检查其逻辑与 md 参考文件是否一致

---

## 5. JavaScript 模块规范

### 5.1 `assets/js/md-renderer.js`

**职责**：在子页中通过 `fetch()` 读取本地 md，转 HTML 渲染。

**接口**：
```js
// 在子页 HTML 末尾调用
renderMarkdown({
  source: '../Coreweave_example/1. research-framework.md',  // 必须 encodeURI
  target: '#content',
  highlight: true   // 是否启用代码高亮
});
```

**关键约束**：
- 用 `marked.js`（本地化在 `assets/lib/marked.min.js`）。
- 渲染前对路径做 `encodeURI()`，避免中文/空格 404。
- 渲染失败时显示友好提示："无法加载 {path}。请确认双击 `index.html` 打开（部分浏览器在 file:// 协议下禁用 fetch，此时请用 `python3 -m http.server` 起一个本地服务）。"
- **fetch 失败兜底**：在错误提示下方提供"打开源文件"链接（直接 a 标签 + download 属性）。

> ⚠️ **浏览器 file:// 协议下 fetch 本地文件会被 Chrome 阻止**。在主页 footer 和每个子页的错误提示里都要给出兜底指引：
> ```
> 推荐启动方式：在项目根目录执行 `python3 -m http.server 8000`，浏览器访问 http://localhost:8000
> ```

### 5.2 `assets/js/image-viewer.js`

**职责**：把一张超长 PNG 包装成可滚、可缩、可拖、可热区点击的查看器。

**接口**：
```js
new ImageViewer({
  container: '#coreweave-workflow',
  src: 'Coreweave_example/CoreWeave_AI_Workflow.png',
  viewportHeight: 720,
  hotspots: [
    { top: '8.2%',  left: '12.5%', width: '22%', height: '4.5%',
      href: 'subpages/A-research-framework.html', label: '研究框架' },
    // ...
  ]
});
```

**实现要点**：
- 缩放范围 0.25× – 4×，步进 0.25。
- 拖拽用 pointer events，移动端兼容。
- 热区是 absolute 定位在 `<img>` 上层的 `<a>` 标签；hover 时通过 ::after 伪元素画一个发光边框（`box-shadow` 见 §3.2）。
- **首次实现时把热区背景设为 `rgba(200,16,46,0.15)` 方便对位**，PRD 完成后改回 `transparent`。

### 5.3 `assets/js/xlsx-viewer.js`

**职责**：仅供 G 子页用。用 SheetJS (`xlsx.full.min.js`) 读取 xlsx 并渲染成 HTML table，Tab 切换 sheet。

**实现要点**：
- 单元格保留数字格式（货币、百分比、日期）。
- 表头吸顶（`position: sticky; top: 0`）。
- 表格行 hover 高亮。
- 大数据量时分页（每页 200 行）。

---

## 6. 文件类型 → 渲染方式 决策表

| 文件类型 | 渲染方式 | 库 |
|---|---|---|
| `.md` | fetch → marked.js → 注入 `#content` | marked.js |
| `.png` | `<img>` 或 image-viewer.js | 原生 |
| `.xlsx` | SheetJS → HTML table，Tab 切 sheet | xlsx.full.min.js |
| `.pdf` | `<iframe>` 内嵌 | 浏览器原生 |
| `.docx` | **不直接渲染**。提供下载链接 + 封面截图占位（见 §4.2 H 子页） | — |
| `.dot` (Graphviz) | 仅用于查阅，不需要在网页上渲染 | — |

---

## 7. 内容硬编码：E 子页正文（不依赖外部文件）

E 子页 `<main id="content">` 内直接写入：

```html
<h1>Mapping 案例：核心研究问题与提纲</h1>
<p class="lead">本提纲是人对研究方向的掌握，决定了后续 AI 并行研究的边界与质量。</p>

<ol class="numbered-questions">
  <li>
    <h3>Q1 · 赛道 Mapping 与投资标的</h3>
    <p>Mapping AI Agent 赛道中 8–10 家国内及海外第三方创业公司，对比其技术架构、产品能力和使用场景的差异；在 Mapping 的公司中，最看好的 1–2 家投资标的是什么？阐述投资逻辑及潜在风险。</p>
  </li>
  <li>
    <h3>Q2 · Agent 成熟度与时间窗口</h3>
    <p>如何选取/定义一个可量化的 Agent 成熟度指标，评估当前的技术水位；技术演进将解锁哪些应用场景，解锁的时间窗口是什么？</p>
  </li>
  <li>
    <h3>Q3 · 创业公司 vs 模型公司的长期竞争</h3>
    <p>如何看待 2C 及 2B Agent / Agent OS 类产品与模型公司的长期竞争？创业公司的关键成功要素是什么？</p>
  </li>
</ol>
```

---

## 8. 验收 Checklist（实现完成后逐条勾选）

### 8.1 主页功能
- [ ] 双击 `index.html` 或在 `python3 -m http.server` 下访问，主页正常显示
- [ ] 4 个区块都存在、锚点导航可滚动
- [ ] §1、§2 标题行可点击展开/收起工作流大图
- [ ] 大图可滚动、可缩放、可拖拽、可全屏、可复位
- [ ] CoreWeave 图上 4 个热区悬停时边框发光，点击跳转正确子页
- [ ] Mapping 图上 5 个热区跳转正确，2 个仅文字标注不可点
- [ ] §3、§4 的 details 折叠区可展开

### 8.2 子页功能
- [ ] 9 个子页全部可从主页直达
- [ ] 子页左上角"← 返回主页"能回到对应锚点
- [ ] A/B/C/D 子页能正确渲染对应 Coreweave_example md
- [ ] B/C/D 有"现场演示"黄色提示条
- [ ] E 子页硬编码 3 条研究问题
- [ ] F 子页有 Tab 切换两份 mapping md + 底部 question&verification.png
- [ ] G 子页 xlsx 完整渲染 + Tab 切 sheet + 顶部 Perplexity URL 提示条
- [ ] H 子页显示 docx 提示 + Perplexity URL
- [ ] I 子页 PDF 内嵌预览 + Prompt 卡片（带"复制"按钮）

### 8.3 视觉与代码质量
- [ ] 配色严格使用 §2.2 token，没出现 emoji / 玻璃拟态 / 霓虹
- [ ] 所有文件路径都是相对路径，跨电脑/移动文件夹后仍可工作
- [ ] 中文/空格/`&` 文件名通过 `encodeURI` 处理
- [ ] 全站打开 DevTools，console 无报错
- [ ] 文件夹整体打包发给别人，对方按 README 指引能跑起来

### 8.4 文档
- [ ] 项目根目录补一个 `README.md`（**仅本条允许新建 md 文件**），3 行说明：
  - 如何启动（`python3 -m http.server`）
  - 文件夹结构
  - 已知限制（file:// 下 fetch 受限）

---

## 9. 给实现 Agent 的开发顺序建议

1. **先搭骨架**：创建目录、写 `main.css` 的 token + 基础排版，做出 `index.html` 的纯静态版（不带交互）。
2. **再做主页区块 §3 §4**：纯文本折叠最简单，先把"非交互内容"打通跑顺。
3. **做 9 个子页**：A、B、C、D（都是 md 渲染，复用 `md-renderer.js`）→ E（硬编码）→ F（双 md + 图片）→ G（xlsx）→ H（docx 提示）→ I（PDF iframe + Prompt 卡）。
4. **最后做 §1 §2 的图片热区**：这一步最复杂、需要肉眼对位。建议先让热区有半透明背景，对完位再清空背景。
5. **回归测试**：按 §8 验收 checklist 跑一遍。

---

## 10. 明确的"不要做"清单

- ❌ 不要引入 React / Vue / Vite / Tailwind / 任何构建工具
- ❌ 不要给文件改名、不要移动 `Coreweave_example/` 和 `Mapping_example/` 内的文件
- ❌ 不要把 md 内容复制到 HTML 里硬编码（除 E 子页明确要求外），始终通过 fetch 读取，保证内容更新时网页自动同步
- ❌ 不要给页面加 emoji 表情装饰（PRD 中本身的 💡 黄色提示条除外）
- ❌ 不要做"AI 风"动效（粒子背景、霓虹流光、3D 倾斜卡片）
- ❌ 不要写注释解释代码做什么（命名足够清晰即可）
- ❌ 不要为 IE / 旧 Edge / 移动端做兼容（桌面端 macOS Chrome / Safari 即可）

---

## 附录 A：热区坐标参考（基于 .dot 节点顺序的人眼估算，实现时需在浏览器中微调）

> 坐标格式：`top% / left% / width% / height%`（相对图片完整尺寸）。
> CoreWeave PNG 尺寸 2676 × 7380。

| 子页 | 节点 | 估算坐标（首次实现时参考，需视觉对齐后微调）|
|---|---|---|
| A | human_prep (Manual Research) | top ≈ 5%, left ≈ 35%, w ≈ 28%, h ≈ 3% |
| B | claude_research (Session 2) | top ≈ 25%, left ≈ 5%, w ≈ 28%, h ≈ 3% |
| C | human_read_report (Reads Draft) | top ≈ 33%, left ≈ 5%, w ≈ 28%, h ≈ 3.5% |
| D | skill_design (pptx-research) | top ≈ 50%, left ≈ 5%, w ≈ 28%, h ≈ 3.5% |

Mapping PNG 同理，建议实现时先把热区背景设为半透明红，肉眼对齐后再清空。

---

**PRD 结束。请按上述规范开始实现，遇到 PRD 未覆盖的边界情况，按"最克制、最不打扰用户阅读"的原则决策。**
