# AGENTS.md

## 项目概览
MBTI 16型人格测试应用，30道题目，测试完成后展示人格类型及详细介绍。

## 技术栈
- Next.js 16 (App Router) + React 19 + TypeScript 5
- Tailwind CSS 4 + shadcn/ui
- 纯前端应用，无后端 API

## 目录结构
```
src/
├── app/
│   ├── page.tsx          # 首页 - 欢迎页 + 开始测试入口
│   ├── test/page.tsx     # 测试页 - 30题答题交互
│   ├── result/page.tsx   # 结果页 - 人格类型展示
│   ├── layout.tsx        # 根布局
│   └── globals.css       # 全局样式
├── data/
│   ├── mbti-questions.ts # 30道测试题目数据
│   └── mbti-types.ts     # 16种人格类型详细描述
└── components/ui/        # shadcn/ui 组件
```

## 核心逻辑
- 4个维度：E/I（能量来源）、S/N（信息获取）、T/F（决策方式）、J/P（生活态度）
- 每维度 7-8 题，共 30 题
- 答题后自动进入下一题，支持返回上一题
- 完成后计算各维度得分，生成 4 字母人格代码
- 结果页展示：人格描述、优势、成长方向、适合职业、代表人物

## 设计规范
详见 DESIGN.md，核心：暖白底色 #FAF9F6，深墨文字 #2D2A26，琥珀金强调 #D4A574
