---
name: number-verification
description: 数字双重验证 — 对用户上传的任意格式文档（md/txt/docx/pptx/xlsx/pdf/纯文本片段）中的【每一个数字】执行两层 sanity check：① WebSearch 检索数据真实值与权威 source，② 按人口/家庭/单价/百分比等基础常识做量级推算，最后输出一份 6 列 Excel 验证报告（数字值 / 文档位置 / 检索验证 / 检索 source / 常识推算 / 判定）。触发关键词：proofread 数字、核数、数字 sanity check、报告数字校验、验证文档里的数据、Excel 数字验证报告、number verification、数据校验。当用户提到对报告/PPT/文档里的"数字"做核实、查错、proofread、cross-check、量级判断时调用此 skill。
---

# Number Verification Skill

## 核心目标

对用户上传文件中**所有出现的数字**做双重 sanity check，把"凭印象信"的数字变成"可追溯、可推算"的判定。

输出物：**一份新的 .xlsx 报告**，6 列结构（顺序、命名固定）：

| # | 列名（中文） | 列名（英文 sheet 内） | 说明 |
|---|---|---|---|
| 1 | 数字值 | `value` | 文档中出现的原始数字（带单位，如 "1.2亿"、"$5.3B"、"38.7%"） |
| 2 | 文档位置 | `location` | 页码 / sheet 名 / 段落号 / slide N，能定位到行最佳 |
| 3 | 检索验证 | `web_value` | WebSearch 找到的真实值（或当前最新值） |
| 4 | 检索 source | `web_source` | URL + 数据机构名（IMF / 国家统计局 / Pitchbook 等） |
| 5 | 常识推算 | `sanity_calc` | 一段简短文字推算，给出量级估计；例：「全球 80 亿人 / 16 亿家庭，汽车保有量约 10 亿，10 年更换周期 → 年销量约 1 亿」 |
| 6 | 判定结果 | `verdict` | 三选一：`✓ 正确` / `⚠ 存疑` / `✗ 错误`；存疑/错误时第 7 列附简短理由 |

可选第 7 列：`note`（备注，写差异说明 / 推荐替换值）

---

## 工作流（严格按顺序）

### Step 1 · 接收输入文件

用户给一个文件路径或粘贴一段文字。支持的扩展：

| 扩展 | 处理方式 |
|---|---|
| `.md` / `.txt` | 整文本 |
| `.docx` | python-docx 按段落抽取，记 paragraph index |
| `.pptx` | python-pptx 按 slide 抽取，记 slide N |
| `.xlsx` | openpyxl 按 sheet/cell 抽取，记 `SheetName!A1` |
| `.pdf` | pdfplumber 按 page 抽取，记 page N |
| 纯文本片段 | 直接处理，location 标 `inline` |

### Step 2 · 提取候选数字

调用 `scripts/extract_numbers.py`，它会用 regex 抓出所有"可能是数字"的 token + 上下文（前后各 100 字），输出 JSON 到临时文件。

```bash
python3 scripts/extract_numbers.py <input_file> <output_json>
```

JSON schema：

```json
{
  "source_file": "report.docx",
  "extracted_at": "2026-05-31T10:00:00",
  "candidates": [
    {
      "id": 1,
      "value": "1.2亿台",
      "raw": "1.2亿",
      "context": "...过去 10 年里，全球年汽车销量约 1.2 亿台，其中新能源占比 30%...",
      "location": "page 2, paragraph 3"
    }
  ]
}
```

### Step 3 · 对每个候选做双重验证（关键步骤 · AI 亲自来）

对 `candidates` 数组里**每一个** entry：

#### 3a · 网页检索（第一重）
- 用 `WebSearch` 工具，构造精准 query：包含数字的"主语 + 时间 + 地域"，例如：
  - 文档说"全球年汽车销量 1.2 亿台" → 搜 `"global car sales 2024 annual million units"` 或 `"全球汽车年销量 2024"`
  - 文档说"中国新能源车渗透率 38.7%" → 搜 `"China NEV penetration rate 2024 percentage"`
- 从搜索结果挑出**权威来源**（按可信度优先级：政府统计 > 行业协会 > 头部财经媒体 > 一般媒体 > 博客）
- 把"找到的值 + URL + 数据机构名" 写入 `web_value` 和 `web_source`
- 如果检索不到（属于内部数据 / 太具体），写 `web_value: "—（无公开可比对）"`、`web_source: "—"`

#### 3b · 常识推算（第二重）
- 跳出文档，用基础公理做量级估算：
  - 全球人口 ~80 亿 / 中国人口 ~14 亿 / 美国 ~3.3 亿
  - 全球家庭 ~20 亿，户均 ~3.5 人
  - 人均 GDP（中国 ~$13K / 美国 ~$80K / 全球 ~$13K）
  - 大类消费占可支配收入比例（食品 ~25% / 住房 ~30% / 交通 ~15%）
  - 关键耐用品保有量与更新周期（汽车 ~10 年 / 手机 ~3 年 / PC ~5 年）
- 写一段 1–3 句话的推算过程，明示**每一步乘除**。
- 推算结果给出量级（不必精确）— "应在 X 亿台量级 / 应小于 Y%"。

#### 3c · 判定
对比 ①检索值 ②推算量级 ③文档原值，给出 verdict：

| 情况 | verdict |
|---|---|
| 检索值与文档值差异 < 10%，推算量级吻合 | ✓ 正确 |
| 差异 10%–50%，或推算量级勉强吻合 | ⚠ 存疑 |
| 差异 > 50%，或推算量级明显不符（数量级错） | ✗ 错误 |
| 检索不到 + 推算量级吻合 | ⚠ 存疑（待 internal 证据） |
| 检索不到 + 推算量级也不合理 | ✗ 错误 |

如果 verdict 不是 ✓，必须在 `note` 列写一句话说明（推荐替换值 / 差异方向 / 可能口径差异）。

### Step 4 · 生成 Excel 报告

把每个 candidate 的 verification 字段填回 JSON，然后：

```bash
python3 scripts/build_report.py <verified_json> <output_xlsx>
```

报告默认保存到与输入文件**同目录**，文件名 `<原文件名>_verification_<YYYYMMDD-HHMM>.xlsx`。

报告样式（在 build_report.py 中已经写好）：
- **全表统一字体：Arial**（包括 header / body / legend，强制覆盖任何继承字体）
- 表头：深蓝底白字（与 IDG / BCG 财务报告同款）
- 行高 28，列宽自适应
- verdict 列按结果自动染色：✓ 浅绿 / ⚠ 浅黄 / ✗ 浅红
- 冻结首行
- 默认按 verdict 排序：✗ 在最上，⚠ 居中，✓ 在最下（方便用户先看异常）

### Step 5 · 报告交付

最后告诉用户：
1. 报告路径（绝对路径）
2. 整体统计：共 N 个数字 · ✓ A 个 · ⚠ B 个 · ✗ C 个
3. 列出 ✗ 和 ⚠ 的前 5 条（简短）
4. 建议下一步：哪些数字需要去原 source 替换、哪些只是口径差异

---

## 工具使用约定

- **WebSearch**：用于第一重检索。一个 candidate 一次搜索即可，除非首搜没结果再换关键词。
- **Bash**：仅用于调用 `extract_numbers.py` / `build_report.py`。
- **Read**：读取输入文件做交叉核对（确认 location 准确）。
- **不要**：用本地 grep 代替 WebSearch 去"查证"，那只是 echo 原文。

---

## 边界情况

| 情况 | 处理 |
|---|---|
| 数字其实是页码 / 序号 / 章节号 | extract_numbers.py 已尝试过滤；若还有混入，verdict 写 `—（非数据型）` 并 skip |
| 数字是公式中间变量（"+5%"、"×3"） | 验证整段公式而不是孤立数字 |
| 数字是日期（2024 / 2025） | extract_numbers.py 默认过滤 4 位整年；如果用户希望也校验，开 `--include-years` |
| 数字带极长上下文（如"约 1.2 亿"前后是长句） | 在 `context` 字段截取前后 120 字，足够 AI 还原口径 |
| 同一数字出现多次 | 各算一次（位置不同，口径可能不同） |

---

## 一行调用

如果用户已经 pip 装好依赖（见 README），最短指令：

```
对 path/to/file.docx 做数字 sanity check
```

skill 会自动完成 Step 1–5，最后给出 Excel 路径和异常摘要。
