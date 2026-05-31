# 中美闭源创业公司垂类 AI Agent 产品调研

> **调研时间**：2026/05/28
> **信息源**：ProductHunt、a16z、Crunchbase、TechCrunch、Bloomberg、Fortune、36氪、量子位、SiliconANGLE、各公司官网等
> **筛选口径**：①闭源 ②独立创业公司（剔除大厂内嵌产品如 Adobe Firefly、Microsoft Copilot、字节豆包、阿里通义、百度文心等） ③具备 Agent 能力（自主规划/工具调用/多步执行）
> **统计**：覆盖 6 大行业、约 **150+ 个产品**（美国/海外 ~115，中国 ~55）

---

## 目录

- [一、编程 / 软件开发 / DevOps Agent](#一编程--软件开发--devops-agent)
- [二、销售 / CRM / 客服 / 外呼 Agent](#二销售--crm--客服--外呼-agent)
- [三、营销 / 内容创作 / 设计 Agent](#三营销--内容创作--设计-agent)
- [四、法律 / 金融 / 财税 / 审计 Agent](#四法律--金融--财税--审计-agent)
- [五、医疗 / HR招聘 / 教育 Agent](#五医疗--hr招聘--教育-agent)
- [六、数据分析 / 研究 / 科研 / 企业搜索 Agent](#六数据分析--研究--科研--企业搜索-agent)
- [关键洞察与趋势](#关键洞察与趋势)

---

## 一、编程 / 软件开发 / DevOps Agent

### 美国 / 海外

#### IDE 原生编程 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Cursor](https://www.cursor.com)** | Anysphere（SF） | AI 编辑器 + Agent 模式 | AI 原生 IDE，多文件 Agent 模式，后台 Agent 运行于隔离 VM | D 轮 $2.3B，估值 $29.3B；ARR $1B+；2026 上半年传 $50B 新估值 |
| **[Windsurf](https://windsurf.com)** | Cognition Labs（原 Codeium） | Agentic IDE | Cascade 大代码库索引 Agent，面向大型 monorepo | 2025 Cognition 以 $250M 收购 |
| **[Augment (Auggie)](https://www.augmentcode.com)** | Augment Code | 企业级 Coding Agent | 200K Context Engine、多 Agent 编排、SOC2 合规；客户 MongoDB、Spotify | 累计 $250M+，独角兽 |
| **[Tabnine](https://www.tabnine.com)** | Tabnine（特拉维夫/SF） | 隐私优先编程助手 | 灵活部署（云/本地/air-gapped），合规友好；Agent 模式 | 累计 $60M+ |
| **[Cody / Amp](https://ampcode.com)** | Sourcegraph / Amp Inc. | 跨仓库代码理解 | 跨 repo 代码理解（Enterprise）；2025/12 Sourcegraph 拆分出 Amp | Sourcegraph D 轮 $300M |
| **[Warp](https://www.warp.dev)** | Warp（SF） | Agentic 终端 | Rust 终端基础上构建 agentic 工作流，70 万开发者 | 估值 $700M，累计 $135M |

#### 端到端软件工程 Agent（云原生）

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Devin](https://devin.ai)** | Cognition Labs | 自主软件工程师 | 规划/编码/测试/部署全自主；客户 Goldman Sachs、Citi、Mercedes、Nubank | 2026/05 D 轮 $1B+，$26B 估值；ARR ~$492M |
| **[Factory (Droids)](https://factory.ai)** | Factory AI | Agent-native 开发 | 模型无关，Droids 在终端/IDE 内运行；处理 repo context、CI、review | 2026/04 Series C $150M @ $1.5B |
| **[Blitzy](https://blitzy.com)** | Blitzy（波士顿） | Legacy 代码现代化 | 编排上千 AI Agent 重构遗产代码，内置测试/验证；客户 State Street | Series A $200M @ $1.4B |
| **[Asimov](https://reflection.ai)** | Reflection AI（前 Google DeepMind） | 代码理解 Agent | 多 Agent 协同，部署在客户云内理解超大代码库 | 2025/10 Series B $2B（Nvidia 领投），$8B 估值 |
| **[Tessl](https://tessl.io)** | Tessl（Snyk 创始人创立） | Spec-driven 工程 | 从自然语言 spec 出发持续生成/测试/维护代码 | $100M Series A + $25M seed，估值 $500-750M |
| **[Solver](https://solver.io)** | Laredo Labs（SF） | 异步软件工程 | Cloud-native Agent，异步领取任务、走开后收 PR | 种子 $11M |
| **[Magic](https://magic.dev)** | Magic.dev | 超长上下文模型 Agent | 自研 100M token 级模型 | 累计 $470M+，估值 $1.5B |
| **[Poolside](https://poolside.ai)** | Poolside AI | 私有部署编程模型+Agent | 自研 Malibu/Point 模型，部署到客户私有环境 | 累计 $626M+，Nvidia 投 $1B，估值 $12B |

#### 浏览器 / 应用生成 / Vibe Coding

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Replit Agent](https://replit.com)** | Replit | 全栈应用生成 | 浏览器原生 IDE+Agent，自然语言生成全栈应用，Agent 3 支持 200 分钟自主运行 | 2026/03 D 轮 $400M，估值 $9B；ARR $150M |
| **[Bolt.new](https://bolt.new)** | StackBlitz（SF） | 浏览器全栈生成 | 基于 WebContainer 在浏览器内运行 Node.js | B 轮 $105M，估值 $700M，ARR $40M |
| **[Lovable](https://lovable.dev)** | Lovable（瑞典） | Vibe Coding | 对话生成全栈应用，原生 Supabase | B 轮 $330M @ $6.6B，ARR $200-400M |
| **[v0](https://v0.dev)** | Vercel | AI UI 生成 | 自然语言生成 React+Tailwind 组件/页面 | Vercel 累计 $563M，估值 $3.25B |

#### 代码评审 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[CodeRabbit](https://www.coderabbit.ai)** | CodeRabbit | AI PR Review | GitHub/GitLab/Bitbucket 全平台 review，集成 40+ linters；2M+ 仓库 | Series B $60M，营收 10× 增长 |
| **[Greptile](https://www.greptile.com)** | Greptile（YC） | AI Code Review | GitHub PR 评审，bug/漏洞检测、一键修复 | Series A $25M（Benchmark 领投） |
| **[Diamond (Graphite)](https://graphite.dev)** | Graphite（被 Anysphere 收购） | AI Code Review + Stacked PR | Diamond 像 senior engineer 评审 PR，客户 Shopify、Snowflake、Perplexity | Series B $52M |
| **[Qodo (前 CodiumAI)](https://www.qodo.ai)** | Qodo | 代码评审+测试生成 | Qodo Cover 自动回归测试、CLI Agent 框架 | Series B $70M，累计 $120M |

#### DevOps / SRE Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Resolve.ai](https://resolve.ai)** | Resolve.ai（前 Splunk 高管） | 自主 SRE | Always-on AI SRE，关联告警/排查/生成 remediation PR，目标 80% 自主解决 | 独角兽 $1B 估值 |
| **[Cleric](https://cleric.ai)** | Cleric（SF） | AI SRE Agent | 自主调查生产告警、根因分析、Slack 交付；Gartner Cool Vendor 2025 | 种子 $4.3M（Zetta） |
| **[Hawkeye](https://www.neubird.ai)** | NeuBird | AI SRE Co-pilot | Agentic AI 处理 telemetry data，企业级安全 | $22.5M（M12 领投） |
| **[Traversal](https://traversal.ai)** | Traversal（Columbia/Cornell 教授） | Causal ML SRE | 因果机器学习，90%+ 根因准确率；DigitalOcean 节省 36k 工程师时长/年 | 种子 $48M（Sequoia） |

#### 测试 / QA Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Momentic](https://momentic.ai)** | Momentic（YC W24） | Intent-based 测试 | 用自然语言描述意图，AI 运行时定位，自愈式；每月捕获 39 万 bug | Series A $15M |
| **[Propolis](https://propolis.tech)** | Propolis（YC S25） | Browser QA Swarm | 浏览器 Agent 集群模拟真实用户测试，无需脚本 | YC 种子轮 |
| **[Browserbase / Stagehand](https://www.browserbase.com)** | Browserbase（SF） | 浏览器 Agent 基础设施 | 托管 headless browser，Stagehand 提供 act/extract/observe/agent 原语 | Series B $40M，估值 $300M |

#### AI 安全 / 自主渗透 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[XBOW](https://xbow.com)** | XBOW（SF） | 自主 Pentest | AI Agent 持续 pentest Web app；HackerOne 第一，发现 200+ 零日 | Series C $120M + Nvidia 扩展 $35M |
| **[Snyk Agent Fix](https://snyk.io)** | Snyk | AI 自动修复 | 自研 SAST + Agent Fix 自动修复 AI 生成代码漏洞，MTTR 降 84% | 估值 $7.4B |
| **[Pixee](https://www.pixee.ai)** | Pixee（北卡） | 安全修复 Agent | 补足现有 SAST/SCA 扫描器，自动生成 PR 修复漏洞 | Series A $15M（GV/Decibel） |

### 中国

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[MGX / Atoms](https://mgx.dev)** | DeepWisdom 深度赋智（深圳） | 多智能体 Vibe Coding | 5 角色协同；Atoms 内置 Login/DB/Auth/部署/支付，5 分钟交付可运营网站 | 蚂蚁/凯辉/锦秋投资；MGX 1 个月 50 万注册+$1M ARR |
| **[AutoCoder.cc](https://autocoder.cc)** | AIGCode 蔻町智能（清华博士宿文） | 端到端 Autopilot | 跳过 Copilot，端到端 Autopilot 软件生成 | 博华/力合资本连续融资 |
| **[Yourware](https://www.yourware.so)** | 新言意码（前月之暗面明超平） | Vibe Coding 社区 | 灵感转为可分享的网站/前端作品，主打海外 | 红杉中国领投，估值数亿美元 |
| **[InfCode](https://www.infcode.ai)** | 词元无限（前字节杨萍+清华王伟） | 企业级 Coding Agent | 与北航联合研发，SWE-Bench Verified Pass@1 79.4%（SOTA） | 数千万人民币天使轮 |
| **[Manus](https://manus.im)** | 蝴蝶效应（肖弘） | 通用 Agent（含编程） | GAIA 86.5%；自主调用 API/写代码/复杂多步任务；2025/12 被 Meta 收购 | Benchmark 领投，估值 $5 亿→Meta 数十亿美元收购 |
| **[Genspark](https://www.genspark.ai)** | MainFunc（前百度景鲲+朱凯华，Palo Alto） | 通用 Super Agent（含 Coding） | MoA 架构整合 8 LLM+80+ 工具；上线 9 天 $10M ARR | 2025/11 B 轮 $275M，估值 $1.25B |

---

## 二、销售 / CRM / 客服 / 外呼 Agent

### 美国 / 海外

#### AI SDR / BDR（销售线索开发）

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Alice / Julian](https://11x.ai)** | 11x.ai | AI SDR + 入站 | Alice 出站 SDR + Julian 入站电话资格审核 | a16z/Benchmark 投 $76M Series B；2025 客户流失 70-80% |
| **[Ava](https://www.artisan.co)** | Artisan AI | 全栈 BDR | "AI 员工"自主完成线索发现/邮件润色/Email+LinkedIn 外联 | 总融资 $46M（含 $25M Series A by Glade Brook） |
| **[Regie.ai](https://www.regie.ai)** | Regie.ai | AI 销售互动 + 内容生成 | 客户开发 + 话术/邮件/社交帖文生成 | $30M 一轮 |
| **[Jason AI SDR](https://reply.io)** | Reply.io | AI SDR 多渠道排序 | Copilot/Autopilot/审批多模式 | 未披露 |
| **[AiSDR](https://aisdr.com)** | AiSDR | AI SDR | 自动撰写/回复/处理拒绝/安排会议，分析官网形成 ICP | 种子 $3M（YC、DST） |
| **[Aomni](https://www.aomni.com)** | Aomni | 销售研究 Agent | 并行浏览器爬取潜客信息；服务 Nvidia、AMD | 种子 $4M（Decibel） |
| **[Bosh.ai](https://relevanceai.com/bosh-sales-agent)** | Relevance AI 子产品 | AI Sales Rep | 处理外联、对话、会议预约；超个性化 | 母公司融资 |

#### AI 销售 Copilot

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Clay](https://www.clay.com)** | Clay | GTM 数据/外联编排 | BYO-API 数据丰富与外联编排；服务 OpenAI、Canva 等 14000+ 客户 | 2025/8 Series C $100M @ $3.1B，ARR $100M |
| **[Apollo.io](https://www.apollo.io)** | Apollo.io | 销售互动平台 + AI | 联系人数据库+AI 外联 | $1.6B 估值，累计 $250M，ARR $150M |
| **[Lavender](https://www.lavender.ai)** | Lavender | AI 邮件教练 | 实时邮件指导；客户 Twilio、Clari | 累计 $14M |
| **[Nooks](https://www.nooks.ai)** | Nooks | AI 拨号+ASAP 助理 | AI 优化潜客生成；服务 Seismic、Fivetran；4x YoY 增长 | $43M Series B（Kleiner Perkins） |
| **[Gong](https://www.gong.io)** | Gong | 营收智能/会话分析 | B2B 销售对话分析+Revenue AI OS | 2021 估值 $7.25B，ARR $300M+ |

#### AI 客服 / 支持 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Decagon](https://decagon.ai)** | Decagon | 企业级 AI 客服 | AI Concierge 帮助客户追踪订单/退货/旅行；客户 Avis、Deutsche Telekom | $4.5B 估值（2026/1 Series D $250M），ARR $35M |
| **[Sierra](https://sierra.ai)** | Sierra（Bret Taylor 创立） | 会话+语音 AI Agent | 聚焦减少幻觉；客户 WeightWatchers、SiriusXM；子秒级语音延迟 | $4.5B → 2025/9 $350M 轮估值 $10B+ |
| **[Ada](https://www.ada.cx)** | Ada（多伦多） | AI 客服 Agent | 服务 350+ 企业，客户 Monday.com、Pinterest、Verizon | $1.2B 估值，累计 $200M+ |
| **[Cresta](https://cresta.com)** | Cresta（Sebastian Thrun） | 呼叫中心实时智能 | Conversation Intelligence + Agent Assist + AI Agent 平台 | $1.6B 估值，累计 $282M，ARR $100M+ |
| **[Maven AGI](https://www.mavenagi.com)** | Maven AGI | CX Agents | 结果导向 AI Agent，深度理解客户、解决复杂问题 | $50M Series B，累计 $78M |
| **[Ema (Universal AI Employee)](https://www.ema.co)** | Ema Unlimited | 通用 AI 员工 | 覆盖客服/HR 等业务自动化 | $50M Series A（Accel & Section 32） |
| **[Lorikeet](https://www.lorikeetcx.ai)** | Lorikeet（前 Stripe 团队） | AI Concierge（FinTech） | 解决复杂工单；客户 Airwallex、Linktree | $35M Series A（QED 领投） |
| **[Parloa](https://www.parloa.com)** | Parloa（柏林+SF） | 企业级语音 AI | 已为 Allianz、Booking.com、SAP、Swiss Life 接听电话 | $3B 估值（2026/1 $350M Series D） |
| **[My AskAI](https://myaskai.com)** | My AskAI | SMB AI 客服 | 比对手便宜 10×；4 万+ 注册，$25K/月营收 | Bootstrap |

#### 电商客服

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Siena AI](https://www.siena.cx)** | Siena AI | 电商共情客服 | CoRE 推理引擎 + Vision；客户 K18、HexClad、Eight Sleep | 种子 $4.7M（Sierra Ventures） |
| **[Tymely](https://www.tymely.ai)** | Tymely（以色列） | 电商 AI 客服 | 端到端处理复杂工单（退换货/改地址/退款）；按工单解决付费 | $7M Series A |

#### 语音外呼 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Bland AI](https://www.bland.ai)** | Bland AI | 超大规模出站语音 | 5 万+ 通/月，1M+ 并发；自带电信基础设施 | $50M+ |
| **[Vapi](https://vapi.ai)** | Vapi | 语音 AI 开发者平台 | 统一 API 编排语音 AI 管线 | 未披露 |
| **[Retell AI](https://www.retellai.com)** | Retell AI | 低延迟语音 Agent | ~600ms 响应；HIPAA/SOC2 合规；90 分钟可上线 | 未披露 |
| **[PolyAI](https://poly.ai)** | PolyAI（伦敦+纽约） | 企业级呼叫中心语音 | 80%+ 通话解决率；客户 ROI 331-391% | 未披露 |
| **[Synthflow AI](https://synthflow.ai)** | Synthflow（柏林） | 无代码语音 Agent | 1000+ 客户，45M+ 通话；HIPAA/GDPR 合规 | 累计 $30M（$20M Series A by Accel） |
| **[Slang.ai](https://www.slang.ai)** | Slang AI（纽约） | 餐饮业语音 Concierge | 2000+ 餐厅，95% 满意度 | 累计 $68M（2026/2 $36M Series B by USVP） |

### 中国

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[BetterYeah AI](https://www.betteryeah.com)** | 杭州斑头雁智能（前钉钉核心团队） | 企业级 AI Agent 平台 | NeuroFlow 工作流引擎，100+ 大模型；添可案例客服效率 22× | 2025 超亿元 B 轮（阿里云领投） |
| **[追一科技](https://zhuiyi.ai)** | 追一科技 | 金融 AI 员工 | 博文领域大模型+数字人多模态；300+ 头部企业（金融占 70%+） | 多轮融资 |
| **[容联七陌](https://www.7moor.com)** | 容联七陌 | 全场景智能客服+AICC | 意图识别 82%+，全渠道；金融案例人工替代率 35%+ | — |
| **[智齿科技](https://www.zhichi.com)** | 智齿博创 | 全球化客户联络+AI Agent | 基于 Amazon Bedrock；准确率 87%+，幻觉降 90% | — |
| **[循环智能](https://www.rcrai.com)** | Recurrent AI | SalesTech/会话智能 | 覆盖 8500+ 汽车零售门店，赋能 20+ 头部汽车品牌 | — |
| **[百型智能](https://qianxing-ai.com)** | 百型智能 | 外贸垂类 AI Agent | 中国首家外贸垂类 Agent，AI 外贸员 Zoe/David/Lisa | Pre-A 数千万人民币（金沙江领投） |
| **[Udesk + GaussMind](https://www.udesk.cn)** | 沃丰科技 | 全球化 AI 客服/CRM | 38 项国际认证，20+ 国家合规模块 | 多轮融资 |
| **[美洽 Meiqia](https://meiqia.com)** | 成都美洽 | 一站式客户互动 SaaS | 自研 LLM，3 分钟部署；40 万+ 企业客户 | — |
| **[衔远 Frontis AI](https://frontis.cn)** | 衔远科技 | 企业级 AI 原生平台 | ME+WE+MA 三层，含销售商务专属场景 | — |

---

## 三、营销 / 内容创作 / 设计 Agent

### 美国 / 海外

#### 营销 Agent / 文案 / GTM

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Jasper](https://jasper.ai)** | Jasper AI | 品牌内容 Agent | 围绕"品牌声音+50+ 模板+协同画布"端到端营销工作流；2025 转型 Agent | 累计 $140M+，估值 $1.5B |
| **[Copy.ai](https://copy.ai)** | Copy.ai | GTM Agent | 从 AI Copywriter 升级为 GTM AI Platform | 累计 $13.9M |
| **[Writer (Palmyra)](https://writer.com)** | Writer | 企业级营销/内容 Agent | 自研 Palmyra 大模型，合规品牌写作；Agent platform 路线 | Series C $200M @ $1.9B |
| **[Anyword](https://anyword.com)** | Anyword | 转化预测文案 | 基于预测性能评分生成与优化营销文案 | 累计 $21M |
| **[Mutiny](https://mutinyhq.com)** | Mutiny | B2B 网站个性化 ABM | AI 驱动账户级网站和 outbound 个性化；2026 升级为 customer-facing Agent | Series B $50M，估值 $600M |
| **[Rox](https://rox.com)** | Rox AI | Agentic CRM | 多 Agent 协同自动化客户获取/保留/增长闭环 | 累计 $50M+，估值 $1.2B |
| **[Common Room](https://commonroom.io)** | Common Room | Signal-based ABM | 识别购买信号、自动外联与个性化 | 累计 $53M |
| **[Coframe](https://coframe.com)** | Coframe | 自动 A/B 优化 | 持续测试与优化网站与广告落地页（"living websites"） | 种子 $9M（Khosla/NFDG） |

#### 广告创意 / 视频广告 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Arcads](https://arcads.ai)** | Arcads.ai（美/法） | AI 视频广告 Agent | AI "真人化身演员"批量生成广告短视频 | 种子 $16M；ARR $10M+ |
| **[Omneky](https://omneky.com)** | Omneky | 跨渠道广告创意 | Brand LLM + Meta/Google/TikTok 多渠道发布与归因 | 累计 ~$24M |
| **[Pencil](https://trypencil.com)** | Brandtech Group | 大牌品牌广告创意 | AI 广告创意+预测打分；专长金融、CPG 等合规品类 | 被 Brandtech 收购 |
| **[Persado](https://persado.com)** | Persado | 受监管行业文案 | 330B 企业消费者数据训练的 Motivation AI；增收 $25 亿+ | 累计 $85M+ |

#### SEO / GEO（AI 搜索可见度）

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Profound](https://tryprofound.com)** | Profound（纽约） | GEO / AI 搜索可见度 | 跟踪并优化品牌在 ChatGPT/Perplexity/Gemini/Copilot/Grok 中的呈现 | 累计 $155M（Series C $96M） |
| **[AthenaHQ](https://athenahq.ai)** | AthenaHQ | GEO / AEO Agent | 跟踪品牌在 AI 答案中的份额，主动 Action 优化曝光 | 累计 $2.2M（YC） |

#### 视频 / 数字人 / 内容 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[HeyGen](https://heygen.com)** | HeyGen Labs | 数字人视频 Agent | 一句话/一图/一段音频 → 数字人视频；Video Agent 端到端营销视频 | Series A $60M @ $500M；ARR $100M |
| **[Synthesia](https://synthesia.io)** | Synthesia（伦敦） | 企业级 AI 视频 | 合规数字人视频；2025 加 Agent 化能力 | Series E $200M @ $4B |
| **[Captions / Mirage](https://mirage.app)** | Mirage（前 Captions） | Agentic 视频编辑 | 自研短视频基础模型，raw footage → 完整剪辑 | 累计 $175M；2026/3 $75M |
| **[Tavus](https://tavus.io)** | Tavus | 对话式 AI 数字人 | 实时人形渲染+多模态感知（Phoenix-4/Raven-1） | Series B $40M（Sequoia 领投） |
| **[ElevenLabs](https://elevenlabs.io)** | ElevenLabs | 语音/音乐/对话 Agent | 业界领先合成语音；2025 推 Eleven Music + Conversational Agents | Series D $500M @ $11B |

#### 设计 / UI Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Recraft](https://recraft.ai)** | Recraft（美/英） | 矢量+品牌设计 Agent | V4 模型登顶 HF 文本→图竞技场；Studio Agentic Mode + node-based 工作流 | Series B $30M（Khosla） |
| **[Krea](https://krea.ai)** | Krea AI | 多模型聚合创作 Agent | 聚合 64+ 图像/视频/3D 模型；实时增强、上采样至 22K | Series B $83M @ ~$700M |
| **[Magnific](https://magnific.ai)** | Freepik 旗下 | 图像 AI 设计 refine | AI 图像上采、细节增强、风格转换 | 被 Freepik 收购 |
| **[Visily](https://visily.ai)** | Visily | UI/Wireframe Agent | 从草图/截图/文本生成 UI Wireframe，导出 Figma | 种子轮 |
| **[Uizard](https://uizard.io)** | Uizard（被 Miro 收购） | 原型 Agent | 草图→数字 mockup，文本→UI | 被 Miro 收购 |

### 中国

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Lovart / 星流](https://lovart.ai)** | LiblibAI（北京奇点星宇） | 全球首个 AI Design Agent | 自然语言驱动 Logo→包装→海报→视频广告全链路；整合 Flux/GPT-image-1/自研 Star-3 | 累计近 10 亿元；B 轮 $130M @ ARR $30M |
| **[百型智能](https://qianxing-ai.com)** | 上海百型智能 | 外贸 AI 员工 | AI 外贸员端到端获客/筛选/跟进；6 万成本拿 1200 万订单 | Pre-A 数千万人民币 |
| **[易蛙智能](https://huiwa.ai)** | 易蛙科技 | 跨境/TikTok Shop Vibe Marketing | 商品级营销 Agent，自研视觉理解+智能剪辑+智能投流 | 天使轮已完成 |
| **[AiPPT](https://aippt.cn)** | 爱设计科技 PixelBloom | PPT 一键生成 | 一键生成 PPT+智能排版+配图+AI 演讲；12 月用户破千万 | B1 轮数千万元（视觉中国领投，智谱 Z Plan） |
| **[ChatPPT](https://chatppt.cn)** | 珠海必优科技 | PPT 生成+美化 | 与 WPS/企业微信深度集成的 AI PPT+智能美化+AI 路演 | 金沙江/险峰等 |
| **[Motiff 妙多](https://motiff.com)** | 北京摹高（猿辅导孵化） | UI 设计 Agent | AI-native UI 工具，AI 复刻+魔法框+Agent 模式生成生产级 UI | 猿辅导独立公司 |
| **[硅基智能](https://guiji.ai)** | 南京硅基智能 | 数字人/直播 Agent | AIGC 数字人+直播带货+大模型交互；旗下硅语 AI | 9 轮融资（至 C 轮） |
| **[Manus](https://manus.im)** | 蝴蝶效应（Monica） | 通用/营销内容 Agent | 多模型动态调用，市场调研/文案/报告/HR 筛选数字员工场景 | Benchmark 领投 $75M，估值 $5 亿 |

---

## 四、法律 / 金融 / 财税 / 审计 Agent

### 美国 / 海外

#### 法律 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Harvey](https://harvey.ai)** | Counsel AI | 大所通用法律 Agent | 25,000+ 自定义 agent 执行 M&A/尽调/合同起草/文档审查；Agent Builder | 2026/3 $200M @ $11B，累计 $1B+，ARR $190M |
| **[EvenUp](https://evenuplaw.com)** | EvenUp | 人身伤害诉讼 | 自动化案件分析、demand letter；处理 20 万+ 案件 | Series E $150M @ $2B+，累计 $385M |
| **[Eve](https://eve.legal)** | Butler Labs | 原告/中小所 | LLM 案件管理平台，行政工作/文书准确性 | 2025/9 Series B $103M @ $1B |
| **[Supio](https://supio.com)** | Supio | 人身伤害/大规模侵权 | 医疗记录/手写笔记/法律文档→案件时间线；含 Litigation Agent Suite | Series B $60M，累计 $91M |
| **[Spellbook](https://spellbook.legal)** | Rally | 合同起草/审查 | 内嵌 Word；Associate Agent 跨多文档执行多步任务 | 早期/成长期 |
| **[Ironclad (Jurist AI)](https://ironcladapp.com)** | Ironclad | 合同 CLM | Drafting/Editing/Review/Research 多 agent + Manager Agent 编排；处理 10 亿+ 合同 | 估值 ~$3B |
| **[Legora (前 Leya)](https://legora.com)** | Legora（瑞典/美国） | 法律 Agent | 研究/起草/协作；服务 400+ 律所、40 个市场 | 2025 Series C $150M @ $1.8B |
| **[Paxton AI](https://paxton.ai)** | Paxton | 法律研究/起草 | 94% 非幻觉率（Stanford 基准）；服务从独立律师到 Top 20 大所 | 2025/1 Series A $22M |
| **[Robin AI](https://robinai.com)** | Robin AI（英） | 合同审查 | 内嵌 Word 按 playbook 自动 redline；2025 工程团队被微软收购 | 累计 $71.7M（解散中） |
| **[Filevine (LOIS)](https://filevine.com)** | Filevine | 律所案件管理 | LOIS agentic 工作空间：case data 查询、文书起草、监控 deposition | 成长期独角兽 |
| **[Hona](https://hona.com)** | Hona | 客户沟通自动化 | 24/7 双向沟通、品牌化客户门户；与 Clio、MyCase、Filevine 集成 | 成长期 |
| **[Solomon AI](https://solomontax.ai)** | Solomon Labs | 报税/会计所自动化 | 每份申报从 5h 压缩到 30 分钟；6 个月 $1M ARR | 累计 $11.5M+ |

#### 合规 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Norm AI](https://norm.ai)** | Norm Ai | 监管合规自动化 | 法规和企业政策→代码化 AI 合规 agent；衍生 Norm Law（AI 原生律所） | 累计 $87M（2025/3 $48M） |
| **[Greenlite AI](https://greenlite.ai)** | Greenlite | AML/KYC/制裁筛查 | 面向受 OCC/FDIC/SEC 监管的银行与 FinTech；内置 Trust Infrastructure | 早期 |

#### 投研 / 金融 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Hebbia (Matrix)](https://hebbia.com)** | Hebbia | 深度研究（金融/法律） | Matrix 多 agent 平台并行编排多 LLM；信贷协议审查减时 75% | 累计 $161M（Series B $130M by a16z） |
| **[Rogo (Felix)](https://rogo.ai)** | Rogo | 投行/卖方研究 | Felix agent 处理 deal screening、CIM 生成、买家 outreach、尽调 | 2026/4 Series D $160M @ $2B |
| **[AlphaSense](https://alpha-sense.com)** | AlphaSense | 投研搜索情报 | 6500 企业客户，ARR $500M；并购 Tegus ($930M)、Carousel | 估值 $4B |
| **[Fintool](https://fintool.com)** | Fintool | 财务文档 Q&A | 从 SEC filings、电话会议转录提取财务指标和定性洞察 | 早期 |
| **[Bridgetown Research](https://bridgetownresearch.com)** | Bridgetown | 尽调自动化 | 三层 AI agent：voice agent 访谈+LLM 解析+小模型出报告，24h 出尽调 | 2025/2 Series A $19M |
| **[Daloopa](https://daloopa.com)** | Daloopa | 金融数据基础设施 | 覆盖 5500+ 全球上市公司，每个数据点可溯源；160+ 金融机构 | Series C $47M |
| **[LinqAlpha](https://linqalpha.com)** | LinqAlpha（波士顿） | 公开市场研究 | 多 agent 系统，覆盖 139+ 国家、57000+ 公司原语言 | 2024/6 $6.6M |
| **[Wokelo AI](https://wokelo.ai)** | Wokelo（西雅图） | PE/IB 尽调 | 尽调/行业研究/组合监控 agentic 平台 | 累计 $5.5M |
| **[Aiera](https://aiera.com)** | Aiera | 投资者活动情报 | 面向 earnings call 等的实时 AI 情报平台 | 成长期 |

#### 财税 / 会计 / 审计 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Basis](https://basis.ai)** | Basis（纽约） | 财税/审计 long-horizon Agent | 首个完成端到端 1065 报税的 AI agent；30% 美国 Top 25 会计所客户 | 2026/2 Series B $100M @ $1.15B |
| **[Numeric](https://numeric.io)** | Numeric | 月结自动化 | 财务月结 AI 平台 | 成长期 |
| **[Tabs](https://teamtabs.com)** | Tabs | 应收/账单自动化 | AI 原生收入平台，invoice-to-cash 全流程 | 成长期 |
| **[Truewind](https://truewind.ai)** | Truewind | 数字会计 | 基于 OpenAI 的数字记账员；30+ 会计所、200+ 企业 | Series A（Rho/Thomson Reuters Ventures） |
| **[Pilot](https://pilot.com)** | Pilot | 中小企业代账/咨询 | "AI Accountant"号称首个全自动端到端记账 | 累计 $222M @ $1.2B |
| **[Klarity](https://tryklarity.com)** | Klarity | 合同抽取/审查 | 从销售合同抽取条款用于收入确认和审计 | 成长期 |
| **[MindBridge AI](https://mindbridge.ai)** | MindBridge（加拿大） | 金融异常检测 | 基于 2600 亿交易、3000+ ERP 训练；覆盖 100% 交易 | VC 支持 |
| **[DataSnipper](https://datasnipper.com)** | DataSnipper（荷兰） | 智能审计自动化 | 内嵌 Excel 自动 ticking & tying；服务 Big 4 + 40 万审计师 | 2024 Series B $100M @ $1B |
| **[Centime](https://centime.com)** | Centime | AP/AR/现金流 | 现金流管控+智能发票/3-way PO 匹配/应收自动催收 | 成长期 |
| **[Float Intelligence](https://floatfinancial.com)** | Float（加拿大） | 企业卡/费控 Agent | 首个 agent 自动给企业卡交易分配 GL 码和加拿大税码 | 累计 $193M（Goldman Sachs） |

### 中国

#### 法律 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[吾律 / PowerLawGLM](https://powerlaw.ai)** | 幂律智能（清华系） | 合同审查/中小企业法律 | 2025/9 推"吾律"AI 律师智能体；联合智谱推千亿参数 PowerLawGLM | Pre-B 8000 万元（蓝驰领投） |
| **智合 AI** | 智合 | 一站式法律工作平台 | 多智能体推演生成深度法律研究；合同覆盖 99% 场景；文书覆盖 70% 案由 | 未披露 |
| **Yodex / 万象法律大模型** | 华宇元典（华宇软件子公司） | 法务管理+合规 | 2 亿+ 法律数据；矩阵含元典智库（150 万律师用户）、Yodex、元一合规助手 | 母公司已上市 |
| **[法狗狗](https://fagougou.com)** | 法狗狗 | 智能案情预测 | 刑事/婚姻/交通/劳动案情预测+类案；模块化降低定制周期 | 天使轮 |
| **[MetaLaw / 秘塔](https://meta.law)** | 秘塔科技（上海） | 类案检索/法律研究 | MetaLaw 类案检索+秘塔写作猫；自研 MetaLLM 通过备案 | 蚂蚁领投 1 亿+，估值 $1.5 亿 |
| **海纳千律** | 六边智慧（北京） | 法律 AI Mentor | 自研法律大模型+法律向量数据库；清华三创全球十强 | 早期 |

#### 财税 / 金融 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[慧算账](https://huisuanzhang.com)** | 慧算账 | 中小微代账+经营赋能 | 自研财税垂类大模型+人机协同；多模态识别+RPA | C+ 轮 $6000 万美元（阳光人寿领投） |
| **[合思](https://ekuaibao.com)** | 合思（原易快报） | 费控/差旅/AP 自动化 | AI 驱动费控审核、差旅、薪酬、发票全流程；7000+ 企业客户；2025 AI Cloud 100 China | 多轮融资 |
| **深蓝财鲸** | 杭州精算家 | 财税"数字员工" | 单日处理百万级账套，效率 20×，人力降 91%；团队来自阿里达摩院、华为 | 早期 |
| **[达观曹植 + Agent 平台](https://datagrand.com)** | 达观数据 | 金融/投研 RPA+文档智能 | 自研"曹植"大模型+ Agent 平台；500+ 头部企业 | 多轮独角兽 |
| **[启信慧眼 / Chaterm Agent](https://intsig.com)** | 合合信息（科创板） | 企业尽调/风控/合规 | 启信整合 3.4 亿+ 境内企业商业数据；Chaterm Agent 口语→操作 | 已上市 |
| **[文因互联](https://memect.com)** | 文因互联（Memect） | 金融认知智能 | 金融知识图谱+认知智能；面向券商、银行 | A+ 轮数千万元 |

---

## 五、医疗 / HR招聘 / 教育 Agent

### 美国 / 海外

#### 医疗 — 临床/医生 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Abridge](https://abridge.com)** | Abridge AI | 环境收音+临床文档 | 实时记录医患对话生成结构化 SOAP 病历，写入 EHR；2025 扩到收入循环 Agent | 2025/6 Series E $300M @ $5B+，ARR $100M |
| **[Ambience Healthcare](https://ambiencehealthcare.com)** | Ambience | 环境 AI+ICD-10 编码 | 环境收听+ICD-10 编码+事前授权+住院摘要 | 2025/7 Series C $243M @ $1.25B |
| **[Suki AI](https://suki.ai)** | Suki AI | 语音助手+病历 | 语音控制临床助手，下医嘱/写转诊/查 EHR；兼容 Epic、Cerner | 累计 $165M+ |
| **[Heidi Health](https://heidihealth.com)** | Heidi（澳） | 多语种环境病历 | 110+ 语言、300+ 专科；服务 116 个国家 | 2024 Series A ~$10M |
| **[DeepScribe](https://deepscribe.ai)** | DeepScribe | 专科病历+编码合规 | 各专科定制 AI 病历，HCC 编码合规洞见 | 累计 $61M，估值 $180M |
| **[Nabla](https://nabla.com)** | Nabla（法/美） | 环境病历+EHR 集成 | 预填病历、临床笔记、医疗编码、患者摘要 | 2024 Series B $24M（Cathay） |
| **[OpenEvidence](https://openevidence.com)** | OpenEvidence | 医学知识库+研究 Agent | 实时医学证据搜索+DeepConsult Agent；日均服务 40% 美国医生 | 2026/1 Series D $250M @ $12B |
| **[Glass Health](https://glass.health)** | Glass Health | 鉴别诊断+抄写 | 三层鉴别诊断+循证评估方案 | 种子+早期机构轮 |
| **[Tennr](https://tennr.com)** | Tennr | 转诊+文书处理 | 处理转诊文档、入院包、福利核查；月 1000+ 万份文档 | 2025 Series C $101M @ $605M |
| **[Corti](https://corti.ai)** | Corti（丹麦） | 急诊呼叫智能分诊 | 实时 AI 助手介入急救调度、临床咨询、病历记录 | 2023 Series B $60M |

#### 医疗 — 患者/护理 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Hippocratic AI](https://hippocraticai.com)** | Hippocratic AI | 电话端 AI 护士 | 患者对话 Agent：术后随访、慢病干预、用药提醒；1000+ 用例，1.15 亿次交互 | 2025/11 Series C $126M @ $3.5B |
| **[Hyro](https://hyro.ai)** | Hyro | 医院 IVR/聊天 | 45 家医院系统部署；解决 85% 常规患者请求；3000 万患者 | 2025 成长轮 $45M |
| **[K Health](https://khealth.com)** | K Health | AI 问诊+医生衔接 | 症状对话+无缝转接值班医生 | 累计 $371M+，估值 $1.5B+ |
| **[Ada Health](https://ada.com)** | Ada Health（德） | C 端症状评估+B 端医院/医保 | 贝叶斯推理症状评估；全球 1.4 亿次评估 | 累计 $191M+ |

#### 制药/生物 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Pharma.AI](https://insilico.com)** | Insilico Medicine | 端到端 AI 制药 | 首个 GenAI 药物（rentosertib）在 IPF Phase 2 阳性结果 | 2025/3 Series E $110M；2025/12 港交所 IPO |
| **[Atomwise](https://atomwise.com)** | Atomwise | 小分子虚拟筛选 | 卷积神经网络的小分子结构-活性预测 | 累计 $175M+ |

#### HR / 招聘 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Mercor](https://mercor.com)** | Mercor | 合同招聘+AI 面试 | 自动简历筛选/匹配/AI 面试/薪酬管理；管理 30,000+ 合同工 | 2025/10 Series C $350M @ $10B |
| **[Maki People](https://makipeople.com)** | Maki（法） | 技能评估+全流程招聘 | "Maria" AI Agent；电话/视频/语音多通道，节省 80% 工作量 | 2025/1 Series A $28.6M |
| **[Paradox (Olivia)](https://paradox.ai)** | Paradox.ai | 蓝领/小时工招聘 | Olivia 通过 SMS/WhatsApp/Web Chat 筛选、调度面试、答疑 | 累计 $93M+ |
| **[Eightfold AI](https://eightfold.ai)** | Eightfold AI | 人才智能+内部移动 | 基于 16 亿职业档案的预测匹配与职业路径 | 累计 $424M @ >$2B |
| **[Findem](https://findem.ai)** | Findem | 3D 数据人才情报 | 专家标注数据集+ agentic 工作流覆盖校准、面试 | 2025/10 Series C $51M |
| **[Juicebox (PeopleGPT)](https://juicebox.ai)** | Juicebox | GenAI 候选人搜索 | AI 原生招聘平台，单日数千次搜索；sourcing/screening/管理 | 2025/9 Series A $30M（Sequoia） |
| **[SeekOut Spot](https://seekout.com)** | SeekOut | Agentic 招聘 14 天交付 | 10 亿+ 档案 sourcing/outreach/screening；750+ 企业 | 累计 $189M @ $1.2B+ |
| **[BrightHire](https://brighthire.ai)** | BrightHire | 面试质量分析 | AI 转录与分析面试，识别招聘官谈话过多等问题 | 2022 Series A $20.5M（Index） |
| **[HiPeople](https://hipeople.io)** | HiPeople（德） | 背景调查自动化 | 候选人背调与人才洞察 | 种子 $3M |

#### 教育 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[MagicSchool AI](https://magicschool.ai)** | MagicSchool | K-12 备课/批改/出题 | 600 万+ 教师，100+ 教学工具 | 2025/1 Series B $45M（Valor） |
| **[Khanmigo](https://khanmigo.ai)** | Khan Academy（非营利） | K-12 苏格拉底式 AI 家教 | 提问引导而非给答案；2024-25 服务 70 万+ K-12 学生 | Microsoft/OpenAI/Google.org 捐赠 |
| **[Speak](https://speak.com)** | Speak Easy Labs | 语言学习 Agent | AI 口语教师，自由对话+发音纠错；OpenAI Startup Fund 战投 | 2024 Series C $78M @ $1B |
| **[Praktika](https://praktika.ai)** | Praktika.ai | AI 虚拟形象口语 | AI 虚拟教师做 1:1 语言对话课 | 2024 Series A $35.5M（Blossom） |
| **[Merlyn Mind](https://merlyn.org)** | Merlyn Mind | 课堂智能语音助手 | 专为课堂设计的语音控制系统 | 累计 $84M |
| **[Querium (StepWise)](https://querium.com)** | Querium | STEM 步骤化辅导 | 高中/大学 STEM 定制 AI 辅导，分步分析答题时长 | 累计 $4.3M |
| **[Cognii](https://cognii.com)** | Cognii Inc. | 开放式 AI 评估+自适应 | NLP 即时评估开放式答题+对话辅导（高校+企业培训） | 早期 |

### 中国

#### 医疗 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[数坤坤](https://shukun.net)** | 数坤科技 | 多模态医疗大模型 | 18 张 NMPA 三类证；接近临床专家的诊疗思维链；登 Nature Communications | 累计 $300M+，独角兽 |
| **[万语医疗大模型](https://airdoc.com)** | 鹰瞳科技 Airdoc（港股上市） | 眼底影像多病种筛查 | 单张眼底照片预测 50+ 种疾病风险；接入 DeepSeek-R1 多模态 | 2021 港交所上市 |
| **[协和·太初罕见病大模型](https://yiducloud.com.cn)** | 医渡云/协和 | 罕见病诊疗辅助 | 全国首个罕见病 AI 大模型，2025 临床试点 | 医渡云 2021 港交所上市 |
| **[领健 LinkedCare](https://linkedcare.cn)** | 领健 | 口腔/医美机构数智化 | 服务 50,000+ 口腔和医美机构 | 2025/1 E 轮数亿元 |
| **[推想 InferRead](https://infervision.com)** | 推想科技 | 医学影像 AI | 肺结节、肿瘤等高精度病灶识别；订阅模式 | 累计 $200M+，独角兽 |

#### HR / 招聘 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Moka Eva 2025](https://mokahr.com)** | Moka（北京希瑞亚斯） | AI 原生招聘智能体 | 处理 140 万份简历、协助 40 万场面试、响应 300 万次员工咨询 | 2021 C 轮 $100M（老虎环球） |
| **[e 成科技](https://echeng.com)** | e 成科技 | 人才战略+AI 招聘 | "画像+Bot"双引擎；服务 4000+ 付费客户（含腾讯、万科） | C 轮 $80M（光速美国基金） |

#### 教育 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[学而思九章](https://jiuzhang.com)** | 好未来（已上市） | K-12 数学 AI 答疑 | 首批教育垂类大模型；苏格拉底式分步引导讲题；用于学习机/AI 教辅 | 集团自研 |
| **[海豚 AI 学](https://haitun.ai)** | 猿辅导 | K-12 AI 答疑+个性化 | 国内首个教育大模型落地；苏格拉底启发式答疑 | 集团内部 |
| **[伴鱼智学 AI 私教](https://banyuyu.com)** | 伴鱼 | K-12 全链路 AI 教育 | 学/练/测/评/复全链路；1 对 1 辅导能力达 99.8% | 累计 $235M+ |

---

## 六、数据分析 / 研究 / 科研 / 企业搜索 Agent

### 美国 / 海外

#### 通用研究 / AI 搜索 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Perplexity](https://perplexity.ai)** | Perplexity AI | AI 答案引擎+企业 | Deep Research + 企业版（跨网页+内部文档）；Search API | 2025/9 $200M @ $20B，ARR $200M |
| **[You.com (ARI)](https://you.com)** | SuSea Inc. | 企业 AI 助手 | ARI 多步推理 Agent；10 亿+ 月级 API 调用 | 2025/9 Series C $100M @ $1.5B |
| **[Exa AI](https://exa.ai)** | Exa Labs | Agent 搜索基础设施 | 为 AI Agent 设计的语义搜索 API + Websets；客户 Cursor、Cognition | 2026/5 Series C $250M @ $2.2B |
| **[Tavily](https://tavily.com)** | Tavily（被 Nebius 收购） | Agent 搜索基础设施 | 面向 AI Agent 的实时网页搜索/抓取/Deep Research | 2025/8 Series A $20M |
| **[AskNews](https://asknews.app)** | Emergent Methods | 新闻研究 Agent/API | 为 Agent/RAG 优化的实时新闻聚合+结构化 API | 早期 |
| **[Genspark](https://genspark.ai)** | Genspark Inc.（Palo Alto） | 多模态 Super Agent | MoA 多智能体编排（80+ 工具，9 LLM）+ Deep Research + 文档/PPT/视频 | 2025/11 Series B $275M @ $1.25B，ARR $50M |
| **[Phind](https://phind.com)** | Phind（YC） | 开发者搜索 Agent | 多步研究+生成式 UI（2026 初已停运） | YC 累计 $10M+ |

#### 企业搜索 / 知识 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Glean](https://glean.com)** | Glean Technologies | 企业知识+Work AI | 跨 Google Workspace/M365/Slack/Salesforce 平台，Glean Agents 自动化 | 2025/6 Series F $150M @ $7.2B，ARR $100M+ |
| **[Hebbia (Matrix)](https://hebbia.com)** | Hebbia | 企业深度研究 | 多 Agent 编排+FlashDocs 生成 PPT | Series B $130M @ $700M |
| **[Sana AI](https://sanalabs.com)** | Sana Labs（被 Workday 收购） | 企业知识 Agent | 跨应用统一搜索+ CTRL 自动化 Agent | 累计 $137M，2025 被 Workday $1.1B 收购 |
| **[Mendable / Firecrabwl](https://mendable.ai)** | SideGuide Technologies | 企业文档 AI 搜索 | 客户 Coinbase Base、MongoDB、Snap、Vercel | YC 早期；Firecrawl 独立融资 |

#### 数据分析 / BI Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Julius AI](https://julius.ai)** | Julius AI（YC） | 数据分析 Agent | 自然语言数据分析+预测建模；直连 PostgreSQL/BigQuery/Snowflake；2M+ 用户 | 2025/7 Seed $10M（Bessemer） |
| **[Hex](https://hex.tech)** | Hex Technologies | Notebook 原生 BI Agent | Notebook Agent 自动 SQL/Python/可视化；客户 Anthropic、Reddit、Figma | 2025/5 Series C $70M |
| **[TextQL](https://textql.com)** | TextQL | 企业级数据仓库 AI Agent | 自然语言→SQL/Python+Auto-metric Diagnosis | YC 早期 |
| **[Defog.ai (SQLCoder)](https://defog.ai)** | Defog Inc. | Text-to-SQL 模型/Agent | 精调 LLM (SQLCoder) 专做企业数据库查询 | — |
| **[Outerbase](https://outerbase.com)** | Outerbase（被 Cloudflare 收购） | 数据库 AI 界面 | EZQL+AI 图表+AI 数据编辑器 | 2025/10 被 Cloudflare 收购 |
| **[AskYourDatabase](https://askyourdatabase.com)** | AskYourDatabase | DB 自然语言交互 | 自然语言聊数据库；MySQL/Postgres/Mongo/Snowflake/BigQuery | 独立小团队 |
| **[Querio](https://querio.ai)** | Querio Inc. | AI-native BI | 自然语言查询/分析/报告，上下文层（语义建模） | 早期 |
| **[Sourcetable](https://sourcetable.com)** | Sourcetable Inc. | AI 电子表格+Superagents | 多 Agent 连接 GA/Shopify/Stripe 等做分析 | 多轮 |
| **[Paradigm](https://paradigm.co)** | Paradigm AI | AI Agent 电子表格 | 5000+ AI Agent 嵌入单元，按列/行抓取网页 | 累计 $7M |
| **[Numerous.ai](https://numerous.ai)** | Numerous AI | Sheets/Excel AI 函数 | Google Sheets/Excel 内 AI 单元函数 | 独立 |

#### 科研 / 学术 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Elicit](https://elicit.com)** | Elicit Research（前 Ought） | 系统综述 Agent | 1.38 亿篇论文+54.5 万临床试验；结构化抽取 20000 数据点 | 2024 系列融资数千万美元 |
| **[Consensus](https://consensus.app)** | Consensus NLP（YC） | 科学搜索 Agent | 2.2 亿+ 同行评议论文证据综合 | 2025 收入 8× 增长 |
| **[Scite.ai](https://scite.ai)** | Scite Inc. | 引用智能 | Smart Citations 分类（支持/反驳/提及）；分析 12 亿+ 引用 | 2023 被 Research Solutions 收购 |
| **[Causaly](https://causaly.com)** | Causaly Inc.（伦敦/纽约） | 生物医药 Agent | 500M 事实知识图谱+Agentic Research；服务前 20 大药企中 12 家 | 2023/7 Series B $60M（ICONIQ），累计 $93M |
| **[Iris.ai](https://iris.ai)** | Iris.ai AS（挪威） | 科研文献 Agent | 含 RSpace 智能搜索/摘要/抽取 | 多轮 |
| **[Scinapse](https://scinapse.io)** | Pluto Labs | 科研搜索+AI 综述 | 170M+ 论文搜索；AI 生成定制综述 | 早期 |

### 中国

#### 通用研究 / AI 搜索 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[秘塔 AI 搜索](https://metaso.cn)** | 秘塔科技（上海） | AI 搜索+Deep Research | 自研 MetaLLM；简洁/深入/研究三档+全网/学术模式；中国版 Perplexity | 蚂蚁领投 1 亿+ @ $1.5 亿 |
| **[天工超级智能体](https://skywork.ai)** | 昆仑万维 Skywork | Workspace Super Agent | Deep Research+5 个专家 Agent；GAIA 榜 #1；含 MCP 生态 | 母公司上市，业务线未单独融资 |
| **[Manus](https://manus.im)** | 蝴蝶效应（Monica） | 通用 AI Agent | 全球首款"通用 AI Agent"；自主调用工具完成多类任务 | Benchmark 投 $75M @ $5 亿；被 Meta 收购 |
| **[Devv AI](https://devv.ai)** | Devv（Forrest Zhang） | 开发者搜索→编程 Agent | 开发者垂直 AI 搜索（自建索引）→编程 Agent，70 万+ 开发者 | 千万级融资 |
| **[智谱 BigModel (GLM)](https://bigmodel.cn)** | 智谱 AI（清华系） | 通用 Agent / 编程 Agent | GLM-5/5.1 在 BrowseComp/MCP-Atlas/τ²-Bench 开源 SOTA；Open-AutoGLM 手机 Agent | 累计估值约 200 亿元 |

#### 数据分析 / BI Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Kyligence Copilot](https://kyligence.io)** | Kyligence（Apache Kylin 团队） | BI+AI Copilot | OLAP 引擎+AI 增强；服务建行/招行/平安/上汽/UBS | 累计 $110M+ |
| **[北极九章 DataAgent](https://polarisxtech.com)** | 北极九章 | Agentic BI | 多智能体协同 BI，数据准确率 99%+ | 多轮 |
| **[DataSimba](https://startdt.com)** | 奇点云（含 GrowingIO） | 数据中台+AI 分析 | DataSimba 平台+智能 CDP/识客；1500+ 客户 | 多轮，2022 与 GrowingIO 合并 |

#### 企业搜索 / 知识 Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[Atlas LLM / Atlas Graph](https://haizhi.com)** | 海致科技（港股上市） | 知识图谱+大模型融合 | 图模融合产业 Agent；金融/能源/制造反幻觉、反欺诈、风控 | 2026/2 港股上市，市值 360 亿港元 |
| **[智齿 AI Agent (Sobot)](https://sobot.com)** | 智齿博创 | 客服+知识 Agent | Agentic AI 客服+知识图谱，准确率 87%+ | D 轮（高瓴/软银愿景/IDG） |
| **[寻知](https://crowddigital.cn)** | 众数信科 | 企业 AI 智能体平台 | 企业知识+业务智能体多智能体编排 | 早期/中期 |

#### 科研 / AI for Science Agent

| 产品 | 公司 | 细分 | 核心能力 | 融资/估值 |
|---|---|---|---|---|
| **[晶泰科技](https://xtalpi.com)** | XtalPi（港股上市） | AI 制药 Agent | 量子物理+AI+机器人闭环实验室；服务全球前 20 大 MNC 中 16 家 | 2024/6 港股上市；累计 $700M+ |
| **[玻尔科研空间站 / Hermite](https://dp.tech)** | 深势科技 DP Technology | AI for Science Agent | 玻尔科研空间站（文献检索/解读 Agent）+ Hermite 药物计算 | 7 轮融资累计十几亿元 |

---

## 关键洞察与趋势

### 资本热度排名（按估值/融资）

**美国超大估值梯队（>$5B）**：
1. Cursor（$29.3B；传 $50B）— AI 编辑器王者
2. Cognition/Devin（$26B）— 自主软件工程
3. Reflection AI/Asimov（$8B）— 代码理解
4. Perplexity（$20B）— AI 搜索
5. OpenEvidence（$12B）— 医疗证据
6. Poolside（$12B）— 私有部署编程模型
7. ElevenLabs（$11B）— 语音/音乐
8. Harvey（$11B）— 法律
9. Mercor（$10B）— HR/招聘
10. Replit（$9B）— Vibe Coding
11. Glean（$7.2B）— 企业搜索
12. Snyk（$7.4B）— AI 安全
13. Lovable（$6.6B）— Vibe Coding
14. Abridge（$5B+）— 医疗

**中国领头梯队**：
- Lovart/LiblibAI 累计近 10 亿元（设计 Agent）
- 智谱 AI 约 200 亿元（通用模型+Agent）
- 晶泰科技港股 IPO（AI 制药）
- 海致科技港股上市市值 360 亿港元（企业知识 Agent）
- Manus 估值 $5 亿，已被 Meta 收购

### 行业渗透深度（创业公司数量）

| 行业 | 美国/海外 | 中国 | 备注 |
|---|---:|---:|---|
| 编程/DevOps | 27 | 6 | 美国遥遥领先，中国独立创业较少（大厂 Trae/通义灵码/Comate 占位） |
| 销售/CRM/客服 | 22 | 9 | 客服赛道资本最密集，Decagon/Sierra/Parloa 合计融资 $2.4B+ |
| 营销/设计 | 16 | 8 | Lovart 是中国唯一全球出圈的 AI Design Agent |
| 法律/金融/财税 | 25 | 10 | 法律 Agent 是 2025-2026 估值最高赛道 |
| 医疗/HR/教育 | 24 | 10 | 医疗 ambient AI 文档赛道单年融资近 $10 亿 |
| 数据分析/研究/科研 | 30+ | 13 | 通用搜索（Perplexity）+ 企业搜索（Glean）+ AI for Science 三足鼎立 |

### 5 大共性趋势

1. **从 Copilot 到 Agent 的范式转换**：所有头部公司在 2025-2026 都升级了产品定位，从"辅助生成"转向"自主完成任务"。Salesforce 称 Agentforce，Jasper 转型营销 Agent，Sourcegraph 拆出 Amp 专做 coding agent。

2. **垂类 Agent 估值飙升远超基础模型层**：Harvey ($11B)、Mercor ($10B)、Decagon ($4.5B)、Sierra ($10B+)、Replit ($9B) 都在 2025-2026 完成大额融资，说明 LP 已将赌注从"通用模型"转向"垂类 Agent"。

3. **大厂并购加速整合**：Zendesk 收购 Forethought、NICE 收购 Cognigy ($955M)、Workday 收购 Sana ($1.1B)、Meta 收购 Manus、Cloudflare 收购 Outerbase、Anysphere 收购 Graphite、Cognition 收购 Windsurf — 垂类 Agent 是大厂"买进去"的核心标的。

4. **中国 Agent 创业三大特征**：
   - **赛道分布**：通用 Agent（Manus、智谱、秘塔）+ 设计 Agent（Lovart）+ AI for Science（晶泰、深势）+ AI 客服（追一、智齿、容联七陌）四足鼎立
   - **融资规模**：单笔最大 8000 万人民币（幂律智能 Pre-B）vs Harvey 单轮 $200M，差距 20 倍以上
   - **出海特色**：百型智能（外贸 Agent）、易蛙（TikTok Shop）、Lovart（海外品牌）、Devv（开发者全球市场）、Genspark（中美双线）形成中国 Agent 出海集群

5. **风险信号**：
   - 11x.ai 客户流失 70-80%、CEO 离职、ZoomInfo 否认许可使用 logo
   - Artisan AI G2 评分仅 3.5
   - Robin AI 工程团队被微软"AI talent acquisition"式收购，实质性解散
   - Phind 2026 初已停运
   - 自治型 Agent 在早期热度后用户在 30-60 天内流失，ROI 仍待证明

### 一句话总结

**2026 是垂类 Agent 大年**：美国市场已形成"基础模型公司（OpenAI/Anthropic）+ 垂类 Agent 独角兽群（Harvey/Decagon/Mercor 等）+ 大厂买家（Salesforce/Workday/Meta）"的成熟分层；中国创业公司在通用 Agent、AI Design Agent、AI for Science、AI 客服四个细分赛道形成局部突破，但融资规模与商业化深度仍与美国对位有 5-20 倍量级差距。

---

> **数据声明**：本调研由 6 个并行子 Agent 通过 web-access skill 联网完成，信息源覆盖 ProductHunt、a16z、Crunchbase、TechCrunch、Bloomberg、Fortune、36氪、量子位、SiliconANGLE、企业官网等。融资/估值数据为公开报道截至 2026/05/28，仅供参考；上市公司、被收购公司均已标注。
