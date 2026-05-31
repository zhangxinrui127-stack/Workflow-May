# number-verification · 数字双重验证 Skill

对任意格式的研究 / 投资 / 行业文档里的"每一个数字"做：

1. **网页检索验证** — 用 WebSearch 找权威 source，对比真实值
2. **常识量级推算** — 用人口 / 家庭 / 单价 / 占比等基础公理做 sanity check

最终产出一份 **6 + 1 列 Excel 报告**，按"✗ 错误 → ⚠ 存疑 → ✓ 正确"排序，方便先看异常。

---

## 何时触发

用户提到下列任意一种意图时调用：
- "帮我 proofread 这份报告里的数字"
- "这个 PPT 里的数据靠谱吗"
- "对这份 docx / pdf / xlsx / md 做数字 sanity check"
- "核一下这些数据"
- "number verification / cross-check / fact-check"
- "全篇数字校验 / 量级判断"

---

## 文件清单

```
skills/number-verification/
├── SKILL.md                 # 给 AI 的工作流指令（核心）
├── README.md                # 本文件
├── requirements.txt         # Python 依赖
├── scripts/
│   ├── extract_numbers.py   # 多格式 → JSON 候选清单
│   └── build_report.py      # JSON + 验证 → Excel 报告
└── examples/
    ├── sample_input.md      # 示例输入文档
    └── sample_extracted.json# 示例 extract 输出
```

---

## 依赖

| 输入格式 | 依赖 | 必装？ |
|---|---|---|
| `.md` / `.txt` / stdin | 仅 stdlib | — |
| `.docx` | python-docx | ✓ |
| `.pptx` | python-pptx | ✓ |
| `.xlsx` | openpyxl（build_report.py 也用它） | ✓ |
| `.pdf`  | pdfplumber | 可选（只在用户传 pdf 时） |

当前机器已装：openpyxl / python-docx / python-pptx → 主流格式立即可用。

需要时再装 pdfplumber：

```bash
# macOS + Homebrew Python 受 PEP 668 限制，加 --user --break-system-packages
python3 -m pip install --user --break-system-packages pdfplumber
```

或一次性全部装齐：

```bash
python3 -m pip install --user --break-system-packages -r /Users/liuzhiyuan/Documents/rb/idg/skills/number-verification/requirements.txt
```

---

## 手工调用（不通过 AI 的话）

```bash
# 1. 抽取候选数字 → JSON
python3 scripts/extract_numbers.py path/to/report.docx /tmp/candidates.json

# 2. AI 来填 verification 字段（或自己手填）
#    每个 candidate 添加：
#    "verification": {
#      "web_value":   "...",
#      "web_source":  "URL | 机构名",
#      "sanity_calc": "...",
#      "verdict":     "✓ 正确" | "⚠ 存疑" | "✗ 错误",
#      "note":        "..."
#    }

# 3. 生成 Excel 报告
python3 scripts/build_report.py /tmp/candidates.json   # 默认输出与 json 同目录
# 或指定输出路径：
python3 scripts/build_report.py /tmp/candidates.json /tmp/report.xlsx
```

---

## Excel 报告样式

- 顶部 2 行 summary：source 文件名 + 统计（✓ N / ⚠ M / ✗ K / 未填）
- 第 4 行 header：深蓝底白字，居中
- 数据行按 verdict 排序（✗ 在最上）
- verdict 列按结果配色：
  - ✓ → 浅绿 `#E2EFDA`
  - ⚠ → 浅黄 `#FFF2CC`
  - ✗ → 浅红 `#F8CBAD`
- 冻结表头
- 附第二个 sheet "Legend"：列定义 + 判定规则

---

## 关键约束

- 默认**过滤** 4 位整年（1900–2099）和明显的页码 / 章节号 / 表号 / 图号 / 版本号
- 同一数字出现多次会各算一次（位置不同，口径可能不同）
- 检索不到公开 source 的私有数据 → verdict 默认 `⚠`，靠常识推算判定
- WebSearch 一次失败可换关键词重搜，最多 2 次

---

## 集成进 Claude Code（已完成）

已通过 symlink 注册到全局 skills 目录：

```
~/.claude/skills/number-verification → /Users/liuzhiyuan/Documents/rb/idg/skills/number-verification
```

之后无需重复操作。Claude Code 启动时会自动扫描 `~/.claude/skills/`，发现 `SKILL.md` 后注入到 skill 列表。

### 触发方式

1. **斜杠直调**：在 Claude Code 输入框敲 `/number-verification`，会作为 skill 显式触发。
2. **自然语言触发**：说"帮我对 path/to/file 做数字 sanity check"、"帮我 proofread 这份 PPT 里的数字"、"核一下这份报告的数据"等——AI 会按 description 自动匹配。
3. **传文件**：可以直接拖文件到对话里，再说"帮我核数"。

### 修改 / 更新

由于是 symlink，直接修改 `/Users/liuzhiyuan/Documents/rb/idg/skills/number-verification/` 下任意文件即可生效（重启 Claude Code 让它重新扫描 description）。

### 取消注册

```bash
rm ~/.claude/skills/number-verification    # 只删 symlink，源目录不动
```
