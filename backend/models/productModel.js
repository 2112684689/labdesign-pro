import supabase from '../config/supabase.js';
import { v4 as uuidv4 } from 'uuid';

class ProductModel {
  // 查询产品列表，支持分页和分类筛选
  async find(query = {}, options = {}) {
    const {
      category,
      page = 1,
      limit = 12
    } = options;

    let queryBuilder = supabase
      .from('products')
      .select('*', { count: 'exact' });

    if (category && category !== '全部') {
      queryBuilder = queryBuilder.eq('category', category);
    }

    const offset = (page - 1) * limit;
    queryBuilder = queryBuilder.range(offset, offset + limit - 1);

    const { data: products, error, count } = await queryBuilder;

    if (error) {
      throw new Error(error.message);
    }

    // 为每个产品获取标签
    const productsWithTags = await Promise.all(
      products.map(async (product) => {
        const tags = await this.findTagsByProductId(product.id);
        return {
          ...product,
          tags,
          badgeColor: product.badge_color
        };
      })
    );

    return {
      products: productsWithTags,
      total: count || 0
    };
  }

  // 根据ID查询产品
  async findById(id) {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    // 获取产品标签
    const tags = await this.findTagsByProductId(id);

    return {
      ...product,
      tags,
      badgeColor: product.badge_color
    };
  }

  // 查询产品标签
  async findTagsByProductId(productId) {
    const { data: productTags, error } = await supabase
      .from('product_tags')
      .select('tag_id')
      .eq('product_id', productId);

    if (error) {
      throw new Error(error.message);
    }

    if (productTags.length === 0) {
      return [];
    }

    const tagIds = productTags.map(pt => pt.tag_id);

    const { data: tags, error: tagsError } = await supabase
      .from('tags')
      .select('name')
      .in('id', tagIds);

    if (tagsError) {
      throw new Error(tagsError.message);
    }

    return tags.map(tag => tag.name);
  }

  // 创建产品
  async create(productData) {
    const { tags, badgeColor, ...restData } = productData;

    const productId = uuidv4();

    const { data: product, error } = await supabase
      .from('products')
      .insert({
        id: productId,
        ...restData,
        badge_color: badgeColor
      })
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    // 处理产品标签
    if (tags && tags.length > 0) {
      await this.addTags(productId, tags);
    }

    return {
      ...product,
      tags: tags || [],
      badgeColor: product.badge_color
    };
  }

  // 更新产品
  async update(id, productData) {
    const { tags, badgeColor, ...restData } = productData;

    const { data: product, error } = await supabase
      .from('products')
      .update({
        ...restData,
        badge_color: badgeColor
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    // 先删除旧标签
    await supabase
      .from('product_tags')
      .delete()
      .eq('product_id', id);

    // 添加新标签
    if (tags && tags.length > 0) {
      await this.addTags(id, tags);
    }

    return {
      ...product,
      tags: tags || [],
      badgeColor: product.badge_color
    };
  }

  // 删除产品
  async delete(id) {
    // 先删除产品标签关联
    await supabase
      .from('product_tags')
      .delete()
      .eq('product_id', id);

    // 再删除产品
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }

  // 添加产品标签
  async addTags(productId, tagNames) {
    for (const tagName of tagNames) {
      // 检查标签是否存在
      const { data: existingTag } = await supabase
        .from('tags')
        .select('id')
        .eq('name', tagName)
        .single();

      let tagId;

      if (existingTag) {
        tagId = existingTag.id;
      } else {
        // 创建新标签
        const { data: newTag, error } = await supabase
          .from('tags')
          .insert({
            id: uuidv4(),
            name: tagName
          })
          .select('id')
          .single();

        if (error) {
          throw new Error(error.message);
        }

        tagId = newTag.id;
      }

      // 创建产品标签关联
      await supabase
        .from('product_tags')
        .insert({
          product_id: productId,
          tag_id: tagId
        });
    }
  }
}

export default new ProductModel();