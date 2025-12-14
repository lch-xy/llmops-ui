# 目录结构说明

```markdown
├── public/                     # 项目的公共资源文件夹
├── src/                        # 项目的核心代码目录
│   ├── assets/                 # 静态资源（图片 / 样式 / 图标）
│   │   ├── images/
│   │   └── styles/
│   ├── components/             # 通用组件
│   │   └── __tests__/           # 组件测试文件
│   ├── config/                 # 项目配置
│   │   └── index.ts
│   ├── hooks/                  # 自定义 Hooks
│   ├── router/                 # 路由配置
│   │   └── index.ts
│   ├── services/               # API / 业务服务层
│   │   ├── apps.ts
│   │   └── datasets.ts
│   ├── stores/                 # 状态管理（如 Pinia）
│   │   ├── account.ts
│   │   └── auth.ts
│   ├── utils/                  # 工具函数
│   │   ├── auth.ts
│   │   ├── request.ts
│   │   └── storage.ts
│   ├── layouts/                # 布局组件
│   │   ├── DefaultLayout.vue
│   │   └── BlankLayout.vue
│   ├── views/                  # 页面视图
│   │   ├── pages/
│   │   │   └── HomeView.vue
│   │   └── auth/
│   │       └── LoginView.vue
│   ├── App.vue                 # 根组件
│   └── main.ts                 # 应用入口文件
├── .gitignore                  # Git 忽略文件
├── .prettierrc.json            # Prettier 格式化配置
├── eslint.config.ts            # ESLint 配置
├── env.d.ts                    # TypeScript 环境变量声明
├── index.html                  # HTML 入口
├── package.json                # 项目依赖与脚本
├── README.md                   # 项目说明文档
├── tsconfig.app.json           # TS 应用配置
├── tsconfig.json               # TS 基础配置
├── tsconfig.node.json          # TS Node 配置
├── tsconfig.vitest.json        # TS 测试配置
├── vite.config.ts              # Vite 构建配置
├── vitest.config.ts            # Vitest 测试配置
└── yarn.lock                   # Yarn 锁文件
```