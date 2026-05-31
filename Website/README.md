# Website · 本地 AI 工作流知识库

把投资研究中验证可行的 AI 协作链路沉淀为可点击、可演示、可追溯的静态网页。

## 启动

**所有内容已预渲染为静态 HTML**，可以直接双击打开，无需启动本地服务：

```
双击 Website/index.html
```

如果浏览器对本地 PDF iframe 有限制（Safari 严格），可改用：

```bash
cd /Users/liuzhiyuan/Documents/rb/idg
python3 -m http.server 8000
# 访问 http://localhost:8000/Website/
```

## 目录

```
Website/
├── index.html                  主页（含两个 HTML/CSS 流程图）
├── README.md                   本文件
├── assets/
│   ├── css/main.css
│   ├── js/common.js            复制按钮 / Tab 切换 / 图片灯箱
│   └── lib/                    仅 build.js 使用
│       ├── marked.min.js
│       └── xlsx.full.min.js
├── subpages/                   9 个子页 A–I（全部预渲染，无 fetch）
└── build/
    └── build.js                构建脚本（如果改了源 md/xlsx 重跑即可）
```

源数据（`Coreweave_example/` 和 `Mapping_example/`）位于上一级目录，作为参考保留，不被网站直接 fetch。

## 重新构建

如果修改了 `Coreweave_example/*.md` 或 `Mapping_example/*.md` / `.xlsx`，重跑：

```bash
cd /Users/liuzhiyuan/Documents/rb/idg
node Website/build/build.js
```

会重新生成 `Website/subpages/*.html`。

## 设计要点

- **风格**：IDG Capital 米色 + 黑底红 accent，克制、留白多，不带 AI 风格的装饰。
- **流程图**：用纯 CSS 卡片 + 虚线连接重制，节点按角色配色（Human 蓝 / Claude 橙 / Other AI 紫 / Data 绿 / Review 黄 / Output 粉 / Final 黑）。可跳转节点带 ↗ 标记，hover 时边框发光。
- **可滑动**：流程图包裹在最大高度 760px 的视口内，上下滚动查看完整链路。
- **子页**：md / xlsx 内容全部静态预渲染为 HTML，不依赖 `file://` 下被禁用的 fetch。docx 与 PDF 仍提供原文件链接。
