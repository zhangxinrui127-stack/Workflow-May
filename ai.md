# AI 

# AI 工作流（2类案例）

### 【Coreweave\_example】文件夹里：Coreweave\_case\_study  放主html页面里，点击标题可以展开这个case study完成的流程图（能够滑动观察，参考 CoreWeave\_AI\_Workflow\.png 和CoreWeave\_AI\_Workflow\.dot 文件） 如下文描述，部分方框点击可以跳转，应该使得边框发光/加粗以提示用户

1. 提纲 \(人对方向的掌握\)  点击 Manual Research \&amp; ReadingS\-1 /10\-K /Industry ReportsHand\-written Research Plan 这个框可以跳转到下面这个文字 做成sub\-html页面A

> 当时的提纲和prompt如下
> 
> 1. 问claude：我打算分几个module来拆分当研究“是否投资coreweave”这个专业buyside hedge fund 命题的时候，有什么研究需要做，最终输出报告需要包含（*Investment Thesis（投/不投的原因），Industry Research，AI Implication（AI对公司业务的影响，利多/利空的逻辑，有什么facts），Moat，Financial Model，Risk，Further Questions（关注可比公司））*
> 
>     1. 请先帮我完善这个问题清单（需要非常solid sharp的研究框架）
> 
>     2. 【完善好问题清单之后】请结合NotebookLM中的source/gemini deep reasoning返回结果，和你的逻辑推演能力做针对每个模块问题的深度思考 （可以分不同session去做）
> 
>     
> 
>     * [ ] 静态行业研究 \(fact\-based industry research\)
> 
>         * [ ] Coreweave 目前的所在的行业的主要商业模式是什么？（上游供应商、下游客户有哪些？客户为什么有该需求？）
> 
>         * [ ] 该市场空间、过去3年和未来3年的增速如何？
> 
>         * [ ] 该行业除了coreweave 还有什么玩家（该行业是一个区域型行业还是全球化的行业？中国美国玩家是否在同一市场中竞争？）
> 
>         * [ ] 各个玩家大致的市场排名/份额如何？分别有什么区别/优劣势？
> 
>         * [ ] 该行业的核心竞争力是什么？为什么？
> 
>         * [ ] 该行业的核心压力来自什么（比如大客户自建算力中心？高杠杆业务模式等）
> 
>     * [ ] 静态Coreweave 公司研究（fact\-based company research）
> 
>         * [ ] 公司的主营业务是什么？有哪几个板块的收入，2024至今by quarter 各板块收入分别是多少（先检索年报/earnings call 一级可信，如果没有则利用其他二级可靠信息源？）
> 
>         * [ ] 每个板块的收入可以如何拆分？（比如GPU租赁收入是GPU块数\*单GPU租赁价格）
> 
>         * [ ] 每个板块业务的portfolio是怎么样的，核心的业务指标是什么（请帮我罗列尽可能多的业务指标数据和变化情况，比如各型号GPU现有量、租赁的capacity利用率、各型号GPU租赁费率……）？
> 
>         * [ ] 业务收入的客户集中度是怎么样的，从2023至今每年的前五大客户分别是谁？
> 
>     * [ ] AI implication
> 
>         * [ ] 从第一性原理出发，AI发展对于公司业务的直接影响是什么（如何作用于公司的P\&amp;L和EBIT）？
> 
>         * [ ] 根据AI发展的最新动态（比如token消耗量的增速、Anthropic /OpenAI ARR的增速 、CSP 自建AIDC的进度和速度）来判断目前AI 对公司业务分别有什么利多和利空的逻辑？核心最关键的变量是什么？
> 
>         * [ ] 公司自身在AI业务中拓展方向是什么？进度如何？管理层意图是什么？
> 
>     * [ ] Moat 
> 
>         * [ ] 公司在AI产业链内的生态位置是如何的
> 
>         * [ ] 最核心的壁垒是什么？
> 
>         * [ ] 针对这些壁垒最大的威胁是什么？
> 
>     * [ ] Risk：最核心的风险（包括但不限于 宏观利率、AI行业整体景气度、neocloud行业生态位、公司运营落实订单能力，股价敏感度从高到低做分析
> 
>     * [ ] Other questions：coreweave 创始人的履历、领导力、学习能力、思考方式与执行力如何（有什么案例）
> 
> 
> 
> 2. 先做完上述的研究，然后问claude关于投资方向的问题\+自己思考 ==\&gt; 迭代报告
> 
> * [ ] **动态公司叙事的bet 差异**
> 
>     * [ ] 目前针对该公司，市场的核心共识是什么？分歧在哪里？ \(what the market sees; what the market misses\) 股价增长/下跌的catalyst分别是什么 
> 
>     * [ ] 目前多方和空方不同的叙事里面，核心差异是什么？（各自坚定自己position的bet是什么？\)
> 
>     * [ ] 我们机构的投资风格/哲学/taste是：1）\&\#34;投资实际上是不需要共识的，能达成共识的项目一般投不出特别好的结果来\&\#34;；2）极度重视创始人的领导力、学习能力、思考方式与执行力； 3）在技术确定性与市场不确定性之间寻找平衡，风险评估更注重技术壁垒与商业化周期（比如利润回正时间点）；针对这一哲学，给出对CRWV的综合评估
> 
> 

2. 主页面点击 Claude Session 2Parallel Research （NLM APIx 12 \+ Web x 10\) 方框跳转 initial\-report\-8modules\.md 内容（做成sub\-html 页面B / 同时可以页面上有个小提示：可以现场演示）

> 因为网页有登录状态 \(现在很多AI爬虫工具也是利用这一点\) 连接notebooklm  解释 web\-access  skills \(如果需要管控source 但source很多直接用cc很麻烦\) 写好的报告存md文档
> 
> 

3. 主页面点击 Human Reads Draft ReportsIdentifies Review Direction\&amp; Key Issues to Investigate 方框跳 report\-reviewed\.md 文件 （做成sub\-html 页面C / 同时可以页面上有个小提示：可以现场演示）

4. 渲染PPT（产出格式文件），主页面点击Co\-design pptx\-research Skill7\-Step State Machine9 Global Rules \+ Resume Protocol 方框跳转 pptx\-skill\-generated\.md 文件 （做成sub\-html 页面D / 同时可以页面上有个小提示：可以现场演示）

    

### 【Mapping\_example文件夹】赛道扫描 mapping 案例（AI agent）放主html页面里，点击标题可以展开workflow（参考 perplexity\_workflow\_v3\.png 同上，能够滑动观察） 如下文描述，部分方框点击可以跳转，应该使得边框发光/加粗以提示用户

> 人工选取工具：考虑perplexity连接的pitchbook/statista等数据库原生MCP，更适合一级扫描；
> 人\+perplexity deep research同步明确研究对象和定义、初步了解
> 3A\. 人工撰写核心研究问题/报告提纲→ 分session perplexity分步deep research 产出md文档
> 3B\. 并行 perplexity customize workflow \(market map\) 通过pitchbook/CB insights mapping Long list 并根据数据库里的信息系统对比产品和公司（同时也可以websearch获得初步产品信息，还可以并行定制化研究核心问题） 产出 long list 的excel
> 看产品/公司，部分进行试用/social hearing/研究差异，输入核心investment thesis，得到shortlist，撰写md文件
> 合并md文件 / review \+ 质疑追问 \+ model council
> word模板\+渲染产出
> 
> 

1. 提纲 \(人对方向的掌握\)  点击 【Human:明确研究赛道\&amp;核心投资问题\(边界/变量/框架\) 】这个框可以跳转到下面这个文字 做成sub\-html页面E 

> 细化问题提纲：
> 
> 1. Mapping AI Agent 赛道中8\-10家国内及海外第三方创业公司，对比其技术架构、产品能力和使用场景的差异；在Mapping的公司中，最看好的1\-2家投资标的是什么？阐述投资逻辑及潜在风险
> 
> 2. 如何选取/定义一个可量化的Agent成熟度指标，评估当前的技术水位；技术演进将解锁哪些应用场景，解锁的时间窗口是什么？
> 
> 3. 如何看待2C及2B Agent/Agent OS类产品与模型公司的长期竞争？创业公司的关键成功要素是什么？
> 
> 

2. 点击【OUTPUT:多章节\.md研究报告初稿】 跳转 deep research的md文件 （做成sub\-html F）

3. 点击【OUTPUT:Long List Excel\(公司/产品/融资/差异化维度\)】 跳转 excel mapping结果 （做成sub\-html G，上面加文字 写 perplexity原session的url：https://www\.perplexity\.ai/computer/tasks/6325c6aa\-8cac\-4d7e\-86fb\-a17ea49d3229）可以加文字 提示用claude 去浏览器自动化检索product hunt上的产品

4. 【无跳转】标注在 【产品试用/social hearing】框旁边：去试用产品（AI可以阅读别人的评测，但是体感需要自己获取）➕social hearing  \(这一步可以用playwright来看社区 / 访谈深度用户）

5. 点击【观点稳健?无重大漏洞?】框跳转：question\&amp;verification\.png图片

6. 点击 【Human:Word/PPT 模板套用品牌格式/图表占位】跳转 模板\.docx文件 （sub\-html H，上面加文字 写perplexity 源网页https://www\.perplexity\.ai/search/a62e91e2\-3089\-448e\-8c61\-b1f5a2dcf93b

7. 点击 【AI辅助图表生成\&amp;数据可视化Perplexity / Python / Flourish】跳转 Agent\_report\.pdf 文件 （sub\-html I，并在上面标清楚 以下prompt）

    > Prompt：请帮我生成一个格式完整的研究分析投资报告（docx文件）1\. 读取当前目录下的【投资报告书标准模板\.docx】作为固定文档骨架，模板里所有标题、段落、格式、文字、占位符都可以修改、删除、新增、调整顺序与层级，但不要参考任何内容，只把它当作排版框架使用。2\. 生成一个AI\_agent\_report\.docx文件，将md里面的提纲内容完整精准填入模板占位位置（但是字体修改成STKaiti）3\. 在完成这个任务之后，请重新 review 一遍生成的 docx 文件，检查其逻辑与md参考文件是否一致
    > 
    > 

8. 【无跳转】标注在 最后的 框旁边人工\+模型（新开session）是一种multi\-agent的思路，需要新的context/视角/目标



### **理解和认知层 放在主html页面，点击可展开下文**

1. 应该用AI来做什么？目前能力边界如何？

    - 工作流的流程化 （outsource 认知带宽和重复性工作给它 **但是自己要把握关键问题和判断能力 **

    - 个人知识 沉淀（embedding RAG / 或者直接存md文件）  做自己的Agent友好型数据库

2. 从Agent的结构，来理解 Agent的能力边界？

    - 执行环境（claude code 能直接读 / 写本地文件、有完整的文件系统权限 \+ 命令执行权限）

    - 权限 / 工具链 \- 展示 Github 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjBmMWI1MjM5YmI3MzM5MzMwZGVlYzc4Yjg0MDI0MzZfYTFiODdjM2ZjYzgyNWZiNjA3MGJkNjA5MGE4MTI2ZDhfSUQ6NzY0NTUyODg4NDg1MDc0MDQyMF8xNzgwMTUzMjgxOjE3ODAyMzk2ODFfVjM)

    - 上下文管理 （可以自己写projects 里的md文件记录进度，也可以/compact）

3. AI目前明显不能替代的部分，如何人机协同？

    - 提供信息源 寻找资源 包括寻找工具

    - 判断（尤其是方向性的、需要体感的、不一定是在语言边界里的判断，例如投资），所以人无法从这个过程里off 出去



### **其他tips 放在主html页面，点击可展开下文**

1. 要提高AI产出质量，需要的是输入更多信息（包括问能够提升置信空间的问题），包括更相关的参考文献和思路更清晰的提纲，还有人看到产出物后，给出的具体修改意见

2. 每一步可拆解 有中间结果 控制context上下文和方向

3. 想清楚功能/目标，让AI生成requirement prompt；然后用此prompt去发起任务；对于渲染rendering类工作，最好是有模板来复刻，否则需要写很长的PRD才能harness住格式

4. 没有什么工程问题是Codex开十几个子代理解决不了，而非得在一个群聊里@好几个Agent来完成的（吐槽Slock

5. 寻找工具 AI （word excel ppt 小工具/产品 三大件的skills）其余的一些需求我会找合适的产品

    - 信息：https://aihot\.virxact\.com/

    - PPT：最后希望把要求的Grid、边距、占位符、字体、色值全部规定在skills里面，python\-pptx等引擎去执行

    - word：也是python\-docx去做执行，核心是格式，但已经通过perplexity试验过它可以执行复刻动作

    - 其他工具我暂时是不做的，不是很喜欢重复造轮子，收集/处理信息和做判断/思考是我最重要的工作，如果有通用类型的工具，我会找合适的产品/插件/skills；没有足够的时间打磨的情况下，自己做一些玩具





### 网页呈现 初步PRD

- 关于网页去除AI味道的skills（群里 可以点开看一下）

> 以下是网页呈现部分工作流
> 
> 



![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGViZmIyOGEzZDQzMTBhZjgzMzMyMmFkMzVlYzI0YTZfYzE3MGEzNTgwZWFlNmU4MTRjMjhhMmZiMzU3NDA4MzVfSUQ6NzY0NTYzMTI4MTQxNzc2ODE0NV8xNzgwMTUzMjgxOjE3ODAyMzk2ODFfVjM)

## 项目名称

本地 AI 工作流知识库网页

## 核心目标

创建一个本地运行的静态 HTML 主页，作为个人 AI 工作流、方法论、技巧 Tips 的统一展示入口，通过跳转链接整合关联资料。

## 功能需求

1. **主页面**：纯 HTML/CSS 编写，核心展示 AI 工作流步骤、方法论总结、小技巧清单；

2. **页面整体风格：**参考 https://idgcapital\.com/

3. **跳转交互**：主页面所有关联内容支持点击跳转，分为两类：

    - 外部跳转：点击链接直接打开 GitHub 主页等外部网址；

    - 本地跳转：点击链接打开本地存放的文本文件、Markdown \(\.md\) 文件、Excel 表格文件；

4. **特殊文件展示**：针对本地markdown/excel/PPTX 演示文件，**不能直接下载打开**，必须实现**网页端预览展示**（转换为 HTML/PDF 网页形式呈现）；

## 运行环境

纯本地环境，无需后端、无需服务器、无需联网，双击主 HTML 文件即可在浏览器正常运行。

## 技术要求

使用基础前端技术（HTML\+CSS），文件采用**相对路径**管理，保证本地移动文件夹后链接不失效。

