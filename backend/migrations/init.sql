-- 创建categories表
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY COMMENT '分类ID',
  name VARCHAR(100) NOT NULL UNIQUE COMMENT '分类名称',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
) COMMENT '产品分类表';

-- 创建products表
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(50) PRIMARY KEY COMMENT '产品ID',
  name VARCHAR(255) NOT NULL COMMENT '产品名称',
  sku VARCHAR(50) NOT NULL UNIQUE COMMENT '产品SKU',
  description TEXT NOT NULL COMMENT '产品描述',
  image VARCHAR(500) NOT NULL COMMENT '产品图片URL',
  category VARCHAR(100) NOT NULL COMMENT '产品分类',
  badge VARCHAR(50) COMMENT '产品徽章',
  badge_color VARCHAR(50) COMMENT '徽章颜色',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
) COMMENT '产品表';

-- 创建tags表
CREATE TABLE IF NOT EXISTS tags (
  id VARCHAR(50) PRIMARY KEY COMMENT '标签ID',
  name VARCHAR(100) NOT NULL UNIQUE COMMENT '标签名称',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) COMMENT '产品标签表';

-- 创建product_tags表
CREATE TABLE IF NOT EXISTS product_tags (
  id SERIAL PRIMARY KEY COMMENT '主键ID',
  product_id VARCHAR(50) NOT NULL REFERENCES products(id) COMMENT '产品ID',
  tag_id VARCHAR(50) NOT NULL REFERENCES tags(id) COMMENT '标签ID',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  UNIQUE(product_id, tag_id)
) COMMENT '产品标签关联表';

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category) COMMENT '产品分类索引';
CREATE INDEX IF NOT EXISTS idx_product_tags_product_id ON product_tags(product_id) COMMENT '产品ID索引';
CREATE INDEX IF NOT EXISTS idx_product_tags_tag_id ON product_tags(tag_id) COMMENT '标签ID索引';