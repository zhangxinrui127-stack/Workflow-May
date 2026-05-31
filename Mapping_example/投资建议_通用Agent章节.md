# 投资建议

## 一、关于通用型 Agent

### （一）从初始筛选池到最终 9 家对比

在 AI Agent 这一大赛道下，通用型入口级产品是讨论最热、但也最容易被基础模型公司直接覆盖的一层。为聚焦"具有独立投资价值的第三方通用 Agent 公司"，我们从前期梳理的 175+ 标的池中按四道筛选条件做过滤：

**筛选标准**

1. **闭源产品**：排除 OpenClaw、OctoClaw、ZooClaw 等开源 Agent 框架。开源框架的核心壁垒在社区生态而非公司本身，资本退出路径不清晰，不构成传统意义上的财务投资标的。
2. **2C 入口级形态**：产品需面向终端用户或小团队直接可用，排除纯开发者 SDK 与 B 端编排平台（如 Browserbase Stagehand、Browser Use、Pokee AI、Director、Viktor 等）。
3. **通用任务定位**：产品对外宣称承担"跨场景通用任务"，区别于法律、医疗、编程等单一垂直 Agent。
4. **中、美、海外覆盖均衡**：以反映完整的全球竞争格局，而非只聚焦单一地缘市场。

经过四道筛选，得到 **9 家最终对比对象**：

| 区域 | 公司 | 产品形态 |
|---|---|---|
| 美国 | **Perplexity / Comet** | AI 搜索 + Agent 浏览器 + Computer 路由层 |
| 美国 | **Genspark Super Agent** | MoA 多模型编排 + Microsoft 365 嵌入 |
| 美国 | **Dia Browser**（The Browser Company） | AI 浏览器（已被 Atlassian 收购） |
| 美国 | **Poke**（Interaction Company） | iMessage / WhatsApp 消息入口 Agent |
| 新加坡（中国背景） | **Manus**（Butterfly Effect） | 云端虚拟机持续执行 Agent |
| 中国 | **智谱 AutoGLM 沉思 / Z.ai** | 基模一体 Agent 平台 |
| 中国 | **MiniMax / 稀宇** | Agentic Foundation Model + Agent 平台 |
| 中国 | **阶跃星辰 / StepFun** | 多模态 Step 基模 + 跃问 Agent |
| 中国（出海） | **Fellou** | Agentic Browser |

针对这 9 家，我们从**技术架构、产品能力、使用场景、商业化进展、护城河形态**五个维度做横向对比（详见下表）。

| # | 公司 | 技术架构 | 产品能力 | 核心使用场景 | ARR（2026 Q1–Q2） | 估值 / ARR 倍数 | 留存与口碑 |
|---|------|----------|----------|--------------|---------------------|------------------|-----------|
| 1 | **Perplexity / Comet** | Chromium 内核 + 自研路由层 Perplexity Computer（2026 年 2 月上线，跨 19 个专用模型路由） | AI 搜索 + Agent 浏览器 + 多步任务 Computer | 研究、跨标签对比、表单/购物、长会话记忆 | **约 5 亿美元**（2026 年 4 月），同比增长 335%（[Sacra](https://sacra.com/c/perplexity/), [FT](https://fatjoe.com/blog/perplexity-ai-stats/)） | **约 180–200 亿美元 / 约 40×**（已较 2024 年 100× 显著压缩） | 跨产品 MAU 超 1 亿；ARPU 区间 20–200 美元/月；85% 留存率 |
| 2 | **Genspark Super Agent** | E2B 沙箱 + MoA 多模型编排 + Speakly 语音入口 | Super Agent + Slides/Excel/Inbox 子 Agent + Microsoft 365 嵌入 | 办公自动化（PPT/Excel/邮件） | **约 2.5 亿美元**（2026 年 4 月）（[e2b](https://e2b.dev/blog/genspark)） | **约 12.6 亿美元 / 约 5×**（成熟头部中估值倍数最低） | 与微软达成全球战略合作，Agent 嵌入 Office 与 Agent 365（[BusinessWire](https://www.businesswire.com/news/home/20260429907387/en/Genspark-Announces-Global-Strategic-Partnership-with-Microsoft-to-Embed-AI-Agents-Across-Microsoft-365-and-Agent-365)） |
| 3 | **Dia Browser**（The Browser Company） | Arc 团队基因 + macOS 原生 Swift 框架 | AI 浏览器 + Mac 上下文整合 | macOS 用户研究助手 | 未披露（收购前测算 < 2,000 万美元） | **2025 年被 Atlassian 以 6.1 亿美元收购** | 业界普遍评价为"建议性而非自主"，独立浏览器路线在成本结构上难以跑通 |
| 4 | **Poke**（Interaction Company） | iMessage / WhatsApp / SMS 接入 + 主动通知 | 消息入口 Agent，订餐/订票/通知 | 个人消息助手 | 未披露 | YC + a16z 早期支持，订阅 30 美元/月 | Product Hunt 评价两极化：入门"bouncer"流程劝退用户、定价不一致（[PH](https://www.producthunt.com/p/poke-by-interaction-co/a-week-with-poke-review-a-promising-start-for-a-proactive-ai-assistant)） |
| 5 | **Manus**（Butterfly Effect） | 云端虚拟机 + 长任务持续执行框架 | 通用任务执行，"AI 同事"形态 | 写代码、做研究、跑数据 | **约 1 亿美元**（2026 年 4 月）（[TNW](https://thenextweb.com/news/manus-1bn-raise-unwind-meta-acquisition-china-ndrc)） | **Meta 20 亿美元收购于 2026 年 4 月 27 日被中国 NDRC 叫停**，公司目前自筹 10 亿美元独立融资 | 创始人陈锴杰、季逸超被限制出境；100+ 名员工已实际入驻 Meta 新加坡办公（[CGTN](https://news.cgtn.com/news/2026-04-28/China-requires-Meta-to-unwind-Manus-acquisition-1MI6J2HQYsU/p.html)） |
| 6 | **智谱 AutoGLM / Z.ai** | 自研 GLM-5 基模 + AutoGLM 沉思 Agent 层 | 通用 Agent + MaaS API 平台 | C 端聊天/Agent + B 端 API | **MaaS ARR 约 17 亿元（约 2.5 亿美元）**，同比增长 60 倍（[HTX](https://www.htx.com/en-in/news/investors-frantically-snap-up-ai-firms-with-no-profits-a-hig-WI53OZfR/)） | **港股 02513，市值约 300 亿美元** | 注册企业/开发者超 400 万；GLM-5 发布 24 小时内字节 TRAE、阿里 Qoder、腾讯 CodeBuddy 全部接入 |
| 7 | **MiniMax / 稀宇** | 自研 MoE 基模 + Agent 平台 | C 端 Talkie/海螺 + B 端 Agent | 海外社交陪伴 + 中国企业 Agent | 已 IPO；2025 年营收超 30 亿元 | **港股 00100，市值约 250 亿美元** | 港股已纳入恒生科指预期 |
| 8 | **阶跃星辰 / StepFun** | 自研 Step 多模态基模 + 跃问 Agent | 多模态 Agent，强调视频/语音 | 多模态长任务 | 未披露（推测 < 5,000 万美元） | **B 轮融资 25 亿美元**（2026 年 5 月）（[LinkedIn](https://www.linkedin.com/posts/caproasia_china-ai-startup-stepfun-raised-25-billion-activity-7458802900878872576-U2lq)） | "中国版多模态领头羊"；阿里、字节、腾讯生态外的独立基模公司 |
| 9 | **Fellou** | Chromium fork + 中国团队（杭州） | Agentic Browser，跨网站自动化 | 中国出海工具型用户 | 未披露 | 早期，Series A | usefulai 2026 年 5 月榜列为"值得试验"，未进入推荐 7 强（[usefulai](https://usefulai.com/tools/ai-browsers)） |

**横向对比中的几个明确事实**：

- **ARR 量级与质量分化巨大**：从 Perplexity 的 5 亿美元、智谱的 2.5 亿美元、Genspark 的 2.5 亿美元，到 Dia/Poke/Fellou 几乎无公开 ARR，9 家公司事实上处于完全不同的商业化阶段。
- **估值倍数离散度极高**：从 Genspark 的 5×、Perplexity 的 40×，到 Sierra/Decagon 同赛道里的 100× 以上，资本市场对"基模一体公司"与"应用层 Agent 公司"的定价逻辑还在剧烈摇摆。
- **地缘事件正在重塑独立性**：Manus 的 Meta 收购被叫停、Dia 已被 Atlassian 收编、Genspark 与微软深度绑定，三个最具代表性的"独立通用 Agent"故事中，已经有两个事实上失去了独立性。

### （二）市场竞争终局的判断

为评估这 9 家公司的长期投资价值，必须把它们放到"基础模型公司+操作系统级巨头"构成的天花板下比较。

**天花板对照（截至 2026 年 5 月）**

| 对照公司 | ARR | 估值 | 关键事实 |
|---|---|---|---|
| **Anthropic / Claude** | **300–440 亿美元**（2026 年 4–5 月，每 6 周翻倍） | 公开融资 3,800 亿美元；据 WSJ 援引投资者文件，新一轮估值接近 9,000 亿美元 | Claude Code 单一产品 ARR 已达 25 亿美元；70% 财富 100 强为付费客户；Google 追加 400 亿美元投资（[fatjoe](https://fatjoe.com/blog/claude-ai-stats/), [WSJ](https://www.wsj.com/tech/ai/mind-blowing-growth-is-about-to-propel-anthropic-into-its-first-profitable-quarter-7edbf2f4)） |
| **OpenAI / ChatGPT Agent Mode** | 推测 150 亿美元以上 | 5,000 亿美元以上 | Operator 已并入 ChatGPT Agent Mode，订阅分层覆盖 Plus 20 美元/Pro 100 美元/Pro 200 美元三档 |
| **Google / Gemini Agent** | 内含于 Google AI Pro（19.99 美元）/ Ultra（249.99 美元） | — | 已默认嵌入 Chrome Auto Browse，2026 年 6 月起向 Android 12+ 系统推送 |

**几个冷酷的对比事实**：

1. **量级差**：Anthropic Claude 单一产品 Claude Code 的 ARR（25 亿美元）已是 Perplexity 全部业务 ARR（5 亿美元）的 5 倍；Anthropic 整体 ARR（440 亿美元）是 9 家通用 Agent 公司加总的数十倍。
2. **速度差**：Anthropic 从 90 亿美元到 440 亿美元仅用 5 个月，平均每 6 周翻倍。第三方通用 Agent 即便保持 300% 同比增长，也只是把"差距扩大的速度"放慢，而非缩小绝对差距。
3. **分发差**：Chrome 默认嵌入 Gemini Auto Browse、微软 Word/Excel/PowerPoint 默认嵌入 Genspark Agent、Apple Intelligence 在系统层整合 ChatGPT —— 入口级流量的争夺已经由操作系统和基础模型公司联手锁定。
4. **法律边界差**：Amazon 于 2025 年 11 月起诉 Perplexity Comet 自动购物行为，2026 年 3 月美国联邦法官颁发初步禁令（虽随后被第九巡回法院 stay），这是第一例针对 Agent 浏览器的判例（[AIMultiple](https://aimultiple.com/ai-web-browser)）。第三方通用 Agent 在没有平台授权的情况下代替用户操作，正面临可被复制至其他电商/票务/金融平台的诉讼风险。

**把 9 家分别放到天花板下重新评估**：

- **3 家事实上属于"特征级产品"（feature, not company）**：
  - **Dia**：已以 6.1 亿美元被 Atlassian 收编，对 VC 是 acqui-hire 价格而非独立 IPO 故事，验证了"独立 AI 浏览器"路线的不经济性；
  - **Poke**：定价混乱、用户量级有限，长期看会被 Apple Intelligence、iMessage 原生 AI 直接消解；
  - **Fellou**：用户量、商业化均处早期，独立壁垒不清晰。

- **2 家虽属"通用 Agent"，但本质是"中国版基模公司"**：
  - **MiniMax** 与**阶跃星辰**的估值锚是基模公司而非 Agent 公司，与 OpenAI/Anthropic 同框定价，应放到"中国基模公司"赛道单独评估，不在本节投资讨论范围内。

- **1 家已实际"被并入" Meta 但被监管阻断**：
  - **Manus** 在 2026 年 4 月 27 日被 NDRC 强制要求撤销 Meta 收购、创始人被限制出境、100+ 名员工已在 Meta 新加坡办公 —— 公司层面的独立性事实上已经丧失，未来 12–18 个月监管不确定性极高，不构成可投标的。

- **1 家走"分发寄生"路线，独立性逻辑递弱**：
  - **Genspark** 通过与微软深度合作把 Agent 嵌入 Office 与 Agent 365，短期实现了 ARR 从 0 到 2.5 亿美元的高速增长。但这条路径同时意味着，**Genspark 自己已经放弃了做独立入口、改做"微软 Copilot 之上的 Agent 层"**。一旦微软自身的 Agent 365 把同等能力做厚（这正是微软目前路线图的明确方向），Genspark 的定价权与议价能力将快速削弱。从财务投资角度，Genspark 当前 5× 的估值倍数极具吸引力，但需要把"被微软消解"作为核心风险敞口。

- **2 家存在真实独立投资价值**：
  - **Perplexity**：100M+ MAU、ARR 5 亿美元、335% 同比增速，估值倍数已从 2024 年的 100× 压缩到 40×，是 9 家中唯一具备独立 IPO 叙事的标的。其 2026 年 2 月上线的 Perplexity Computer 把战略从"基模公司"转向"19 个专用模型的路由层"，若通用 Agent 的终局是"工具调用编排"而非"模型层"，Perplexity 是该路线上目前唯一的规模化独立玩家。
  - **智谱（02513）**：MaaS ARR 17 亿元、60 倍同比增长、4 百万企业/开发者注册，作为港股上市公司具备二级市场流动性。地缘上是中国 AI 主权三大梯队之一，OpenAI/Anthropic 无法进入中国市场的事实，为其留下了完整的国内 TAM。

**对终局形态的判断**：

通用型 2C Agent 赛道的终局正在朝**"基模公司+操作系统巨头双寡头"** 的方向收敛。第三方独立公司在通用入口层的可持续窗口正在 12–24 个月内快速关闭。能够穿越窗口的公司，必须同时具备以下两个条件之一：

- **进入路由/编排层并保持模型中立**（Perplexity 路径），靠"用户记忆 + 多模型最优调度 + 引用透明度"建立非模型层差异化；
- **占据基础模型公司无法进入的地缘市场**（智谱路径），靠监管壁垒、国内分发渠道与国资客户构建主权 AI 业务。

其余通用 Agent 的合理终局是被基模公司或操作系统巨头收购，独立公司估值天花板不应超过 50–80 亿美元区间。

### （三）结论

基于上述对比与终局判断，对通用型 Agent 赛道得出以下三条结论：

1. **第三方独立通用 Agent 的窗口正在快速关闭**。Anthropic、OpenAI、Google 三家以"模型 + 操作系统级分发 + 法律资源"形成的天花板，已让多数第三方通用 Agent 失去独立成长为头部公司的物理可能性。9 家筛选对象中，3 家属于特征级产品、1 家已被并入 Meta、2 家应作为基模公司单独评估、1 家走分发寄生路线，真正具备独立投资价值的只剩 2 家。

2. **可投的 2 家路径完全不同，应分别配置**：
   - **Perplexity**：作为通用 Agent 赛道唯一"独立 IPO 候选 + 路由层赌注"，建议作为该赛道**主仓位**。核心赌的是"Agent 的终局是工具调用编排而非模型层"。当前 40× 倍数从 100× 压缩后属于合理进入点，主要风险为基模巨头默认整合（Chrome+Gemini、ChatGPT Atlas）和 Agent 浏览器的法律边界判例（Amazon v. Comet）。
   - **智谱（02513）**：作为中国 AI 主权战略卡位与港股二级市场流动性配置，建议作为**战略仓位**。核心赌的是中国监管与渠道壁垒带来的国内 TAM。可与 MiniMax（00100）做组合，但**智谱在 Agent 层的商业化进展（MaaS ARR 17 亿元、60× 同比）显著强于** MiniMax 的纯基模路径。

3. **明确回避的 4 类标的**：
   - **Manus**：监管不确定性极高，未来 12–18 个月不可投；
   - **Dia / Poke / Fellou**：特征级产品，无法支撑独立公司估值；
   - **MiniMax / 阶跃星辰**：归入"中国基模公司"另行评估，不在通用 Agent 投资语境内；
   - **Genspark**：5× 倍数极具吸引力，但"被微软消解"的核心风险敞口尚未释放，建议观察 2–3 个季度后再决策，关键监控指标为 Microsoft 365 Copilot 与 Genspark Agent 的功能重叠度变化。

## 二、从通用走向垂直：投资逻辑的迁移

通用型 Agent 赛道给出的结论是"独立公司的窗口正在快速关闭"，这看似悲观，实际上正指向了 AI Agent 真正的投资机会所在。通用 Agent 输给基模巨头的根本原因，是其差异化主要建立在"提示词 + UI + 路由"上，模型一旦升级，差异化的 70% 会被自动覆盖；其分发依赖浏览器与操作系统，必然被原生整合所消解。

但 Agent 这一品类并不必然受制于上述结构性约束。**当 Agent 不再追求"通用"，而是深扎到某个垂直行业的具体工作流时，差异化的来源从模型与 UI 转向了行业专属数据、工作流锁定与合规牌照——这三类资产恰恰是基础模型公司难以低成本复制的**。

下一节将以同样的对比框架，针对编程、法律、医疗、企业搜索、金融研究、客服六个垂直方向，梳理 8–10 家最具投资价值的垂直 Agent 公司，对比其技术架构、产品能力、使用场景与护城河结构，并给出对应的投资推荐与潜在风险。

---
