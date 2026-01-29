# Vercel 部署指南

## 项目概述
本项目是一个全栈应用，包含：
- **前端**：React 19 + TypeScript + Vite
- **后端**：Vercel Serverless Functions（Node.js）
- **数据库**：Supabase（PostgreSQL）

## 部署步骤

### 1. 准备工作

#### 1.1 安装 Vercel CLI
```bash
npm install -g vercel
```

#### 1.2 登录 Vercel
```bash
vercel login
```

### 2. 部署项目

#### 2.1 使用 Vercel CLI 部署
```bash
vercel
```

按照提示操作：
- 选择 "Set up and deploy" → "Continue with GitHub"
- 选择你的仓库
- 配置项目设置（见下文）

#### 2.2 使用 Vercel Dashboard 部署
1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Add New Project"
3. 导入你的 GitHub 仓库
4. 配置项目设置

### 3. 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

#### 必需的环境变量
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

#### 如何获取 Supabase 凭证
1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目或选择现有项目
3. 进入 Settings → API
4. 复制以下信息：
   - Project URL → `SUPABASE_URL`
   - anon public key → `SUPABASE_ANON_KEY`

### 4. 配置项目设置

#### 4.1 Build & Development Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### 4.2 Environment Variables
在 Environment Variables 部分添加：
- `SUPABASE_URL`: 你的 Supabase 项目 URL
- `SUPABASE_ANON_KEY`: 你的 Supabase 匿名密钥

### 5. 部署配置说明

项目已包含 `vercel.json` 配置文件，自动处理：
- Serverless Functions 运行时（Node.js 18.x）
- API 路由重写
- CORS 头配置

### 6. 验证部署

部署完成后：
1. 访问 Vercel 提供的域名
2. 检查产品列表是否正常加载
3. 检查分类筛选功能是否正常

### 7. 自定义域名（可选）

在 Vercel 项目设置中：
1. 进入 Domains 标签
2. 添加你的自定义域名
3. 按照提示配置 DNS 记录

### 8. 监控和日志

- 访问 Vercel Dashboard 查看部署日志
- 使用 Functions 标签查看 Serverless Functions 日志
- 使用 Analytics 查看访问统计

### 9. 故障排除

#### 问题：API 请求失败
- 检查环境变量是否正确配置
- 查看 Functions 日志了解错误详情
- 确认 Supabase 项目已正确设置

#### 问题：前端无法连接后端
- 检查 `vercel.json` 中的路由配置
- 确认前端 API 调用使用相对路径（已配置）

#### 问题：Supabase 连接失败
- 验证 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY` 是否正确
- 检查 Supabase 项目是否暂停或过期
- 查看 Supabase Dashboard 的 API 设置

### 10. 持续部署

项目已配置为自动部署：
- 推送到主分支会自动触发部署
- Pull Request 会创建预览部署
- 可以在 Settings → Git 中配置分支规则

## 项目结构

```
labdesign-pro/
├── api/                    # Vercel Serverless Functions
│   ├── _lib/
│   │   └── supabase.js    # Supabase 客户端配置
│   ├── products.js        # 产品 API
│   └── categories.js      # 分类 API
├── components/            # React 组件
├── backend/              # 传统 Express 后端（本地开发使用）
├── dist/                 # 构建输出（自动生成）
├── vercel.json          # Vercel 配置
└── package.json         # 项目依赖
```

## 注意事项

1. **环境变量**：确保在 Vercel 中正确配置所有必需的环境变量
2. **数据库**：Supabase 项目需要保持活跃状态
3. **构建超时**：如果构建时间过长，可能需要优化构建过程
4. **函数超时**：Serverless Functions 有执行时间限制（默认 10 秒）
5. **免费限制**：Vercel 免费计划有带宽和执行次数限制

## 技术支持

- Vercel 文档：https://vercel.com/docs
- Supabase 文档：https://supabase.com/docs
- Vite 文档：https://vitejs.dev