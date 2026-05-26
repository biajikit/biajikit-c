# biajikit-c

## 📦 安装依赖

```bash
npm install
````

### 开发环境启动（自动打开浏览器）
```bash
npm run start
````

### 生产环境预览模式（用于本地测试生产构建效果）
```bash
npm run pre
````

### 开发环境打包（带 sourceMap，适合测试）
```bash
npm run build-local
````

### 生产环境打包（压缩优化，用于部署）
```bash
npm run build
````

### 本地预览打包产物
```bash
npm run preview
````

### ESLint 自动修复
```bash
npm run lint
````

### TypeScript 类型检查（不输出文件）
```bash
npm run type-check
````

# 目录结构

```text
├── public/                # 静态资源目录
│   └── favicon.svg         # 网站图标
│
├── src/                   # 项目源代码根目录
│   ├── assets/            # 静态资源（css/字典/图标等）
│   │   ├── css/           # 全局样式文件
│   │   │   ├── base.css       # 基础样式
│   │   │   └── globals.css    # 全局样式
│   │   ├── dict/          # 字典/常量数据
│   │   │   ├── language.tsx      # 多语言配置
│   │   │   ├── mediaList.ts      # 媒体配置列表
│   │   │   ├── pageLanguage.ts   # 页面多语言映射
│   │   │   └── payList.ts        # 支付方式列表
│   │   └── iconfont/      # 阿里图标库资源
│   │
│   ├── components/        # 通用业务组件目录
│   │   ├── CategoryNav/       # 分类导航栏组件（小屏/大屏/弹窗）
│   │   ├── GoodsCard/         # 商品卡片组件
│   │   ├── GoodsRecommendCard/# 推荐商品卡片组件
│   │   ├── Img/               # 全局封装图片组件
│   │   ├── ModelTitle/        # 分类标题组件
│   │   ├── PublicFooter/      # 底部公共组件
│   │   ├── PublicHeader/      # 顶部公共组件
│   │   └── ShopCart/          # 购物车组件
│   │
│   ├── core/              # 核心工具/配置
│   │   └── publicFn.ts    # 全局公共工具函数
│   │
│   ├── hooks/             # 自定义 React Hooks
│   │   ├── dialogConfig.tsx       # 弹窗状态管理 Hook
│   │   ├── shopConfigMsg.ts       # 店铺配置消息处理 Hook
│   │   ├── useGoodsList.ts        # 商品列表数据请求（全局缓存）
│   │   └── useTriggerVisibility.tsx # 滚动监听与导航联动 Hook
│   │
│   ├── pages/             # 页面级组件目录
│   │   └── Home.tsx       # 首页（主业务页面）
│   │
│   ├── type/              # TypeScript 类型定义
│   │   ├── common.ts      # 通用基础类型
│   │   ├── goods.ts       # 商品相关类型声明
│   │   └── shop.ts        # 店铺相关类型声明
│   │
│   ├── utils/             # 工具函数目录
│   │   ├── api/           # API 请求目录
│   │   │   ├── goodsCard.ts      # 商品卡片相关接口
│   │   │   ├── order.ts          # 订单相关接口
│   │   │   ├── shopConfig.ts     # 店铺配置相关接口
│   │   │   └── shopRecommendCard.ts # 推荐商品相关接口
│   │   └── request.ts     # Axios 请求封装
│   │
│   ├── App.tsx            # 根组件
│   ├── main.tsx           # 项目入口文件
│   └── env.d.ts           # 环境变量类型声明
│
├── .env.development       # 开发环境变量
├── .env.production        # 生产环境变量
├── .eslint.config.js      # ESLint 配置
├── .gitignore             # Git 忽略配置
├── index.html             # 项目入口 HTML
├── package.json           # 项目依赖与脚本配置
├── package-lock.json      # 依赖版本锁文件
├── tsconfig.json          # TypeScript 主配置
├── tsconfig.node.json     # Node 环境 TypeScript 配置
├── vite.config.ts         # Vite 构建工具配置
└── README.md              # 项目说明文档
```