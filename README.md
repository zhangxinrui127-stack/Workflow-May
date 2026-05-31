# Workflow-May

> 一个真实投研工作流的沉淀仓库：把"用 AI 做投研"的两套完整案例 + 一份方法论 + 一个数字校验 skill 全部固化下来，可点击、可复刻、可追溯。

---

## 这个仓库是什么

把 2025–2026 这一段时间在做投研 / 行业 mapping 时验证可行的 **AI 协作链路**沉淀成一个静态本地站点 + 一份 PRD + 一个可全局调用的 Claude skill。

不是教程、也不是 demo — 是真实跑过的工作产物（CoreWeave 深度研究、AI Agent 赛道扫描、3-Statement Model、Long List、投资报告），按"人定方向 + AI 并行实现 + 多轮 review"的链路组织起来。

---

## 目录结构

```
Workflow-May/
├── ai.md                          原始需求草稿（项目的"地基"）
├── PRD.md                         AI 反过来生成的结构化 PRD
├── README.md                      本文件
│
├── Coreweave_example/             案例 1 · CoreWeave 深度研究素材
│   ├── 1. research-framework.md       Phase 0 · 研究框架与初始 Prompt
│   ├── 2. initial-report-8modules.md  Phase 2 · 8 模块 markdown 初稿
│   ├── 3. report-reviewed.md          Phase 3 · 对抗审阅 + 估值修订
│   ├── 4. pptx-skill-generated.md     Phase 4 · pptx-research skill 共生设计
│   ├── 5–8.*.md                       辅助 session log + 最终 collaboration report
│   ├── CoreWeave_AI_Workflow.dot      工作流图源（Graphviz）
│   ├── CoreWeave_AI_Workflow.png      工作流图 PNG（7 Phases · 35+ 节点）
│   └── CRWV_3Statement_Model_Final_VF.xlsx   10 Tab 三表模型
│
├── Mapping_example/               案例 2 · AI Agent 赛道扫描素材
│   ├── perplexity_workflow_v3.png         整体工作流图
│   ├── question&verification.png          模型互审示意图
│   ├── multi-md.png                       Perplexity 中间产物清单
│   ├── AI_Agent_175_深度投研.xlsx          Long List Excel（175 家公司）
│   ├── 2/4/5. ...md                       分章节深度研究 md
│   ├── 通用agent标的.md / 垂类agent.md       早期版本研究稿
│   ├── 投资建议_通用Agent章节.md             分模块投资建议
│   ├── 投资报告书标准模板.docx              docx 排版骨架
│   ├── Agent_report.docx / .pdf           最终行研报告
│
├── Website/                       本地静态网站（双击即用）
│   ├── index.html                     主页 · 含两个 HTML/CSS 流程图
│   ├── README.md
│   ├── assets/
│   │   ├── css/main.css               全站样式（IDG 风格）
│   │   ├── js/common.js               交互（复制 / Tab / 灯箱 / details 持久化）
│   │   └── lib/                       依赖库（仅 build 用，不在浏览器加载）
│   │       ├── marked.min.js          (markdown → HTML)
│   │       ├── xlsx.full.min.js       (xlsx 数据)
│   │       └── exceljs.min.js         (xlsx 完整样式)
│   ├── subpages/                      11 个预渲染子页（A–K）
│   └── build/build.js                 一次性构建脚本
│
└── skills/                        Claude Code skill（独立可全局调用）
    └── number-verification/
        ├── SKILL.md                   AI 工作流指令
        ├── README.md                  人类文档
        ├── requirements.txt           Python 依赖
        ├── scripts/
        │   ├── extract_numbers.py     多格式 → JSON 候选清单
        │   └── build_report.py        JSON + 验证结果 → Excel 报告
        └── examples/sample_input.md
```

---

## 快速开始

### 1 · 浏览 Website

```bash
open Website/index.html
```

双击即可，**不需要任何服务器或依赖**（所有 md / xlsx 在构建时已预渲染为 HTML 内嵌）。

主页含两个折叠的工作流图：
- CoreWeave Case · 7 Phases · 5 个可跳转节点
- Agent Mapping Case · 8 Steps · 5 个可跳转节点 + 2 个 hover 提示

11 个子页（A–K）覆盖完整素材：从研究框架、深度研究 md、Long List Excel、三表模型、最终报告，到 meta 的"本网页是如何制作的"时间线。

### 2 · 修改 Website 内容后重建

修改了 `Coreweave_example/` 或 `Mapping_example/` 下任意 md / xlsx 后：

```bash
node Website/build/build.js
```

会把所有源文件重新渲染、合并样式后写入 `Website/subpages/*.html`。

### 3 · 注册 number-verification skill

把 skill 软链到 Claude Code 全局 skills 目录：

```bash
ln -s "$(pwd)/skills/number-verification" ~/.claude/skills/number-verification
```

安装 Python 依赖（PDF 解析是可选）：

```bash
python3 -m pip install --user --break-system-packages openpyxl python-docx python-pptx
# 需要解析 PDF 时再装：
python3 -m pip install --user --break-system-packages pdfplumber
```

之后在 Claude Code 里输入 `/number-verification`，或直接说"帮我对 xxx 做数字 sanity check"即可触发。

---

## 两个案例 · 一句话总览

### Case 1 · CoreWeave Deep Research

完整 7 个 Phase 的"人 × AI"协作链路 — 从手写研究框架，到 8 模块并行 markdown 初稿（~23,500 词 / 79 表），到 4 个对抗审阅 Agent（13 处数据错误 + 49 个逻辑审阅点），再到 44 页 McKinsey-grade PPT + 10 Tab 三表模型。最终产出 4 件交付物：研究 deck（PPTX）、三表模型（XLSX）、AI 协作报告（MD）、工作流图（PNG）。

### Case 2 · AI Agent 赛道扫描

8 个 Step 的市场 mapping 链路 — Perplexity Deep Research × Pitchbook MCP × Claude Code 模板复刻。3A 路径产出多章节 md 研究稿，3B 路径产出 175 家公司 Long List Excel，合流后经过质疑追问 + model council，最后映射到 docx 模板生成最终行研报告。强调"人定方向、AI 并行、模型互审、人定边界"。

完整链路、可跳转节点、嵌入素材都在 `Website/index.html` 里点开看。

---

## skills/number-verification

一个 Claude Code skill：对任意文档（md/txt/docx/pptx/xlsx/pdf）里的**每一个数字**执行两层 sanity check，最后输出一份带配色、按异常排序的 Excel 报告。

| 验证层 | 说明 |
|---|---|
| ①  WebSearch 检索 | 用主语 + 时间 + 地域构造精准 query，挑权威 source 对比真实值 |
| ②  常识量级推算 | 用基础公理（全球 80 亿人 / 16 亿家庭 / 渗透率 / 更新周期）做推算 |

报告 6 + 1 列：数字值 / 文档位置 / 检索值 / source / 常识推算 / 判定（✓ / ⚠ / ✗） / 备注。verdict 自动配色，按 ✗ → ⚠ → ✓ 排序便于先看异常。全表统一 Arial 字体。

详见 `skills/number-verification/README.md`。

---

## 设计原则

这个项目本身就是一个 meta-case，下面是从交付过程中沉淀的几条原则：

1. **自然语言起手，PRD 收口** — 先用 `ai.md` 把"我想要什么"写出来，再让 AI 反过来产出一份结构化 PRD 给自己 review，强制把模糊点显化
2. **每一轮反馈只动小范围** — 一次给 AI 6-7 条调整就到上限，每条做完单独确认
3. **把工具固化下来** — `build.js` / `common.js` / skill 都作为产出物长在仓库里，下次复用
4. **静态 + 预渲染 ≠ 落后** — 这个站点没有 npm / 构建工具 / 后端，但有完整流程图、Excel 渲染（保留 cell 样式）、PDF 内嵌、状态持久化
5. **风格克制** — IDG Capital 米色 + 黑底红 accent，不带 AI 风装饰（无 emoji 堆叠 / 无玻璃拟态 / 无霓虹），让人想到 BCG / McKinsey 的内部报告而不是 SaaS 落地页

---

## Changelog

时间线还原在 `Website/subpages/K-how-this-site-was-made.html`，里面嵌入了每一轮真实 user prompt 原文 + `ai.md` / `PRD.md` 全文。下面是简要版：

| Round | 日期       | 主题                                           | 关键产出 |
|-------|-----------|------------------------------------------------|----------|
| 0     | 2026-05-30 | 起点 · 手写 `ai.md` 自然语言需求草稿               | `ai.md`（14 KB） |
| 1     | 2026-05-30 | AI 把 `ai.md` 转成结构化 PRD                       | `PRD.md`（27 KB） |
| 2     | 2026-05-30 | AI 按 PRD 实现 v1（PNG 热区 + fetch 渲染）          | 第一版 9 子页 |
| 3     | 2026-05-30 | 重构 v2 · Website 目录 + HTML 流程图 + 预渲染       | `Website/build/build.js` |
| 4     | 2026-05-30 | A 子页精简 + 旁注改 hover tooltip + Tips 软化      | `.wf-node.has-tip` + GitHub 卡片 |
| 5     | 2026-05-31 | 一次性 6 条调整 · A→C 迁移 / 持久化 / F 替换 / G 链接 | `bindWorkflowPersist()` sessionStorage |
| 6     | 2026-05-31 | F 子页去掉章节 2                                   | 体积 80K → 52K |
| 7     | 2026-05-31 | 新增 J（三表模型 xlsx）+ K（meta 时间线）             | 11 个子页 |
| 8     | 2026-05-31 | K 升级 · 嵌入原 prompt + PRD/ai.md 全文              | K 体积 9.5K → 116K |
| 9     | 2026-05-31 | xlsx 渲染升级到 ExcelJS（保留原文件样式）             | J 子页 105K → 371K · 1404 个 background cell |
| 10    | 2026-05-31 | 认知层 §1 追加"能 vs 不能" / "快 vs 慢"             | 4 条认知点 |
| 11    | 2026-05-31 | 认知层 §1 第一条改写 · proofread / 校对             | "工作流的流程化、标准化、proofread 与审阅流程" |
| 12    | 2026-05-31 | 新建 `number-verification` skill + 全局注册        | `skills/number-verification/` · 5 文件 |
| 13    | 2026-05-31 | skill Excel 强制 Arial + 主页"校对"加 inline tip   | `.inline-tip` 组件 + `FONT_NAME="Arial"` |
| 14    | 2026-05-31 | 项目整体上传到 GitHub · 写 README                  | 这一次 |

---

## 协作

- **作者**：[@zhangxinrui127-stack](https://github.com/zhangxinrui127-stack)
- **协作 AI**：Claude（claude-opus-4-7 · 通过 Claude Code CLI）

---

## License

仓库内容（包括所有研究素材、案例 md、网站代码）按 **CC BY-NC 4.0** 授权：可用于个人学习、可署名转载，但禁止商业使用。

如需用于商业目的，请联系作者。

---

## 致谢

- **3-statements-ultra** · open-source skill，用于 Phase 5 三表建模骨架
- **pptx-research** · skill 化的 deck 渲染管线
- **Counterpoint Research / IDC / Pitchbook / Grand View Research** · 多次出现的数据 source

