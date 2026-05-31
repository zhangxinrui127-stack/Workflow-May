# 中美 2C 通用 Agent 入口级产品标的清单

> **调研时间**：2026-05-28（v2 扩充版，含 Product Hunt + a16z + Crunchbase + 中外媒体）
> **范围**：**创业公司**（非大厂）、**闭源**、**面向消费者（2C）** 的 **通用 Agent 入口级产品**
> **入口级定义**：用户进来就是一个对话框/任务框，可下达自然语言任务，Agent 自主调度工具完成（浏览、操作、研究、订票、生活、办公等）
> **通用 vs 垂类**：本清单**只收录通用 Agent**，明确剔除垂类深度 Agent（编程、设计、写作、销售、客服、视频、招聘等专用）
> **剔除范围**：大厂产品（OpenAI、Anthropic、Google、Microsoft、Meta；百度、阿里、字节、腾讯、华为、小米、昆仑万维等）、纯开源框架（AutoGPT、LangChain、Browser Use 等）、纯 2B 产品

---

## 🇺🇸 美国创业公司

| # | 产品 | 公司 | 官网 | 成立 | 定位 | 备注 |
|---|------|------|------|------|------|------|
| 1 | **Perplexity / Comet** | Perplexity AI（旧金山） | perplexity.ai / comet.perplexity.ai | 2022 | AI 搜索 + AI 浏览器，下达任务后自动导航、对比、下单 | 已上 Mac/Win/iOS/Android |
| 2 | **Genspark Super Agent** | MainFunc Inc.（硅谷，华人团队） | genspark.ai | 2023 | MoA 架构，9 LLM + 80+ 工具，输出带引用的 Sparkpage | 2025 年 $300M B 轮、~$100M ARR |
| 3 | **Dia** | The Browser Company of New York | diabrowser.com | 2019 | Arc 团队转向的 AI 浏览器，URL 栏即指令栏 | 2025-10 被 Atlassian 以 $6.1 亿收购，仍独立运营 |
| 4 | **Poke** | Interaction Company of California（旧金山） | poke.com | YC 2024 | SMS/iMessage 入口的通用助理，发短信即下任务 | a16z 第 6 版上榜 |
| 5 | **Meteor** | Meteor（旧金山） | trymeteor.com | YC S25 | Chrome 替代浏览器，复用用户登录态让 Agent 订票/购物 | 新兴 |
| 6 | **Happycapy** | Happycapy / Trickle | producthunt.com | 近期 | "agent-native computer, for the rest of us"，通用 Agent 计算机式入口 | 早期 |
| 7 | **Pokee AI** | Pokee AI（Bellevue，华人） | pokee.ai | 2024 | RL-native 通用 Agent，跨 Google Workspace/LinkedIn/Salesforce 等多工具串联执行 | 朱哲清（前 Meta 应用 RL 负责人），Point72 Ventures 领投 $12M seed |
| 8 | **Ace** | General Agents Inc. | generalagents.com/ace | — | 桌面 computer-use autopilot，控制鼠标键盘执行任意任务 | 宣称比同类快 20×，公司名即"通用 Agent" |
| 9 | **Sai** | Simular AI | simular.ai | — | 云端虚拟桌面通用 Agent，GUI 操作 + 写代码 + 调 API | Agent S3 在 OSWorld SOTA 69.9% |
| 10 | **Director** | Browserbase（旧金山） | browserbase.com/director | 2024 | 自然语言驱动的无代码 Web 自动化通用 Agent，面向 non-developer | Series B $40M，估值 $300M；母公司 B 端 infra 但 Director 为 2C 入口 |
| 11 | **Please（前 MultiOn）** | Please.ai | please.ai | 2023 | 消费级 Web Agent，"book me a flight / order food / compare X" | a16z/General Catalyst 投资，2025 关注度下滑 |
| 12 | **Viktor** | Zeta Labs（前 Jace AI 团队） | viktor.com | 2025 | 常驻 Slack 的 AI 同事，连接 3000+ 工具栈主动执行任务 | Product Hunt 上 "AI 同事"赛道代表 |

---

## 🇨🇳 中国创业公司

| # | 产品 | 公司 | 官网 | 创始人/背景 | 定位 | 备注 |
|---|------|------|------|------|------|------|
| 1 | **Manus** | 蝴蝶效应 / Butterfly Effect | manus.im | 肖弘（原 Monica 团队） | 全球首个通用自主 Agent，云端虚拟机自主完成研究/编程/报告/订票 | 270 天 ARR 破 1 亿美元（传闻被 Meta 收购，未核实） |
| 2 | **Fellou** | Fellou AI | fellou.ai | 谢扬（前 Authing 创始人，95 后） | 全球首个 Agentic Browser，地址栏即任务框，跨站执行 | 浏览器形态新入口 |
| 3 | **Flowith（Agent Neo）** | Flowith（上海/加州） | flowith.io | Derek | "无限步骤 + 无限上下文"画布式通用 Agent | Oracle 模式可跑数千步 |
| 4 | **Macaron AI** | Mindverse | macaron.im | 陈锴杰（97 后，杭州） | 全球首个 Personal Agent，主打生活而非生产力 | 蚂蚁领投 |
| 5 | **Me.bot** | 心识宇宙 Mindverse（上海） | me.bot | 陶芳波（原 Meta AI） | "第二自我"通用个人 Agent，跨日程/笔记/任务/交互的个人助手 | 红杉中国种子、线性资本，近百万用户 |
| 6 | **智谱 AutoGLM 沉思 / Z.ai** | 智谱 AI | chatglm.cn / z.ai | 六小龙之一 | 国内首个免费"边想边干"通用 Agent，清言中"沉思"即任务框 | 公司 2019 成立，接近 5 年边界 |
| 7 | **MiniMax Agent** | MiniMax 稀宇科技 | agent.minimax.io | 六小龙之一 | 大模型厂商的通用 Agent，强信息检索 + 编程 | 独立 Agent 入口 |
| 8 | **阶跃跃问 Agent** | 阶跃星辰 | stepfun.com | 姜大昕，六小龙之一 | 多模态通用助手 + 深度研究模式 | 边界：仍接近 Chatbot |
| 9 | **II-Agent** | Intology AI（华人团队） | ii.inc | — | GAIA 高分通用 Agent，与 Manus/Genspark 同形态 | 开源 + 闭源托管版均有 |

---

## 🌍 其他国际通用 Agent（参考）

| # | 产品 | 公司 | 国别 | 官网 | 定位 | 备注 |
|---|------|------|------|------|------|------|
| 1 | **Proxy** | Convergence AI | 英国伦敦 | convergence.ai | 浏览器内通用 Web Agent，对标 OpenAI Operator | 创始人 anti-vertical 立场，Balderton 领投 $12M pre-seed |
| 2 | **Runner H / Surfer H** | H Company（原 Holistic AI） | 法国巴黎 | hcompany.ai | 欧洲版 computer-use Agent，Runner H 编排，Surfer H 浏览器执行 | ex-DeepMind 团队，$220M seed（Accel、Eric Schmidt、Amazon、LVMH） |
| 3 | **MuleRun** | MuleRun | 待确认（疑东亚团队） | mulerun.com | "自我进化"的个人 AI，跑在专属云 VM，24/7 学习用户工作习惯 | Product Hunt 高曝光 |
| 4 | **ZooClaw / OctoClaw / Clawdi** | clawd.bot（OpenClaw 母公司） | 待确认 | zooclaw.ai / octoclaw.ai / clawdi.ai | 基于 OpenClaw 的闭源 SaaS 矩阵，"AI 专家团队"分发执行 | 开源核 + 闭源 SaaS 商业模式 |

---

## 👀 观察名单（边界模糊 / 信息不全）

| 产品 | 国别 | 边界 |
|------|------|------|
| **Agentplace** | 待确认 | 从网站 builder 转通用 agent 平台，builder 属性偏强 |
| **Trace** (YC S25) | 美 | 工作流自动化，B 端味更重 |
| **Faby** | 待确认 | 类 Viktor 的 Slack 虚拟同事，产品新信息少 |
| **HyperWrite** | 美 | 起家 AI 写作，2025 才推 Agent，写作色彩重 |
| **Browser Use Cloud** | 德国 | 开源核 + 闭源 Cloud SaaS，混合形态 |

---

## 🚫 已剔除项

### 垂类 Agent（剔除）
| 产品 | 国家 | 垂类 |
|------|------|------|
| Devin | 美 | 编程 |
| Replit Agent | 美 | 编程 |
| Endstack | 美 | 开发者桌面 OS |
| Lovable | 瑞典 | 前端代码生成 |
| Atoms / MGX (DeepWisdom/MetaGPT) | 中 | 已转 Vibe Coding |
| YouWare | 中 | Vibe Coding / 编程 |
| Lovart / 星流 Agent (LiblibAI) | 中 | 设计 |
| RockFlow / Bobby | 中 | 金融投资 |
| Lindy / Saner.AI | 美 | 工作流自动化 (类 Zapier) |
| Sierra / Decagon | 美 | 2B 客服 |
| Glean | 美 | 2B 企业搜索 |
| Skyvern | 美 | 开发者 API |
| 实在 Agent / 司马诸葛 | 中 | 2B 企业 |

### 美国 — 其他剔除
- **Adept ACT-1** — 团队 2024 已被 Amazon 收编、产品停摆
- **OpenClaw 本体 / AutoGPT / Kortix Suna / Camel-Owl / Browser Use 核心** — 开源框架
- **OpenHuman** — 本地优先开源 harness
- **Tobira.ai** — agent 间协议层 infra，非入口
- **Cowork** — Anthropic 大厂产品

### 中国 — 大厂剔除
- **百度**：心响、秒哒、GenFlow、文心
- **阿里**：夸克 AI、心流、通义
- **字节**：豆包、扣子、Coze 空间、Tars、纳米 AI
- **腾讯**：元宝、元器
- **华为**：小艺
- **小米**：超级小爱
- **昆仑万维**：Skywork / 天工 AI（已上市）
- **Kimi（月之暗面）**：Chatbot 形态为主

---

## 📊 关键观察

1. **核心阵营扩至 21 + 4 国际**：美 12 + 中 9 + 其他 4 = 25 个明确通用 Agent 入口产品。

2. **华人创业占国际阵营半壁**：Genspark、Flowith、Fellou、Pokee AI 团队均以华人为主，部分总部已迁至旧金山/Bellevue，"中美"在 Agent 赛道地理边界已很模糊。

3. **AI 浏览器成为新入口形态**：Comet / Dia / Fellou / Meteor / Proxy / Surfer H / Director 都把"浏览器地址栏 = 任务框"作为入口，正在挑战传统对话框形态。这是中、美、英、法**共同**出现的形态趋势。

4. **三种入口形态分化**：
   - **浏览器型**：Comet、Dia、Fellou、Meteor、Proxy、Surfer H、Director、Browser Use Cloud
   - **对话框型**：Manus、Genspark、Flowith、Runner H、II-Agent、智谱/MiniMax/阶跃
   - **桌面/OS 型**：Ace、Sai、Happycapy、Macaron、Me.bot
   - **嵌入即时通讯型**：Poke (SMS)、Viktor/Faby (Slack)

5. **欧洲不容忽视**：H Company（法）拿到 $220M 巨额融资、Convergence（英）有 DeepMind 背景，且都明确 anti-vertical 走通用路线。

6. **中国阵营两条路线**：
   - "硅谷化"创业：Manus、Fellou、Flowith、Macaron、Me.bot
   - 大模型六小龙的 Agent 形态延伸：智谱、MiniMax、阶跃（这三家公司均接近或超 5 年边界）

7. **Product Hunt 上新赛道：Slack/IM 内的 "AI 同事"**：Viktor、Faby 等代表，正在形成独立品类。

---

## 📚 来源

### 美国 / 国际
- [a16z: Top 100 Gen AI Consumer Apps – 6th Edition](https://a16z.com/100-gen-ai-apps-6/)
- [Product Hunt: AI Agents 分类页](https://www.producthunt.com/categories/ai-agents)
- [Product Hunt: 2025 年度 / 2026 月榜](https://www.producthunt.com/leaderboard)
- [TechCrunch: 10 startups to watch from YC W25 Demo Day](https://techcrunch.com/2025/03/13/10-startups-to-watch-from-y-combinators-w25-demo-day/)
- [AI Browser Landscape 2026: Atlas vs Comet vs Arc vs Dia](https://www.digitalapplied.com/blog/ai-browser-landscape-2026-atlas-comet-arc-dia)
- [TechCrunch: Perplexity brings Comet to Android](https://techcrunch.com/2025/11/20/perplexity-brings-its-ai-browser-comet-to-android/)
- [Convergence Proxy 1.0 发布](https://convergence.ai/introducing-proxy/)
- [H Company BusinessWire 公告](https://www.businesswire.com/news/home/20250603660208/en/H-Company-Launches-Next-Generation-Autonomous-AI-Agents-for-Enterprise-and-Consumer-Markets)
- [Pokee AI GeekWire 报道](https://www.geekwire.com/2025/point72-ventures-leads-12m-seed-round-for-a-new-ai-agent-startup-founded-by-ex-meta-manager/)
- [Simular Agent S3 SOTA 论文](https://www.simular.ai/articles/agent-s3)
- [Browserbase Director 发布](https://www.prnewswire.com/news-releases/browserbase-launches-director-to-automate-the-web-for-everyone-announces-40m-series-b-302483761.html)
- [General Agents Ace 主页](https://generalagents.com/ace/)

### 中国
- [MIT Tech Review: Manus kick-started an AI agent boom](https://www.technologyreview.com/2025/06/05/1117958/china-ai-agent-boom/)
- [36氪：2025 上半年 AI Agent 变化](https://www.36kr.com/p/3373124328462336)
- [界面新闻：通用 Agent 混战](https://www.jiemian.com/article/12767840.html)
- [Manus 9 个月 ARR 破亿 - PingWest](https://www.pingwest.com/a/309964)
- [Fellou 95 后团队报道](https://news.qq.com/rain/a/20250420A05XJS00)
- [Flowith CEO Derek 对谈](https://news.qq.com/rain/a/20250529A078C500)
- [Macaron 陈锴杰对谈](https://news.qq.com/rain/a/20250911A08D3D00)
- [心识宇宙 Me.bot 访谈](https://zhuanlan.zhihu.com/p/1928444639209300148)
- [智谱 AutoGLM 沉思发布](https://www.ithome.com/0/841/978.htm)
- [AICPB 中国 AI 产品榜](https://www.aicpb.com/)
