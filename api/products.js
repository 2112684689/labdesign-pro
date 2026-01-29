import supabase from './_lib/supabase.js';

// 处理CORS
function handleCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
}

// 为每个产品获取标签
async function findTagsByProductId(productId) {
  try {
    const { data: productTags, error } = await supabase
      .from('product_tags')
      .select('tag_id')
      .eq('product_id', productId);

    if (error) {
      console.error('Error fetching product tags:', error);
      return [];
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
      console.error('Error fetching tags:', tagsError);
      return [];
    }

    return tags.map(tag => tag.name);
  } catch (error) {
    console.error('Error in findTagsByProductId:', error);
    return [];
  }
}

export default async function handler(req, res) {
  // 处理CORS预检请求
  if (req.method === 'OPTIONS') {
    return handleCors(res).status(204).end();
  }

  try {
    // 获取产品列表
    if (req.method === 'GET') {
      if (req.query.id) {
        // 获取单个产品
        const { id } = req.query;
        const { data: product, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching product:', error);
          return handleCors(res).status(500).json({ error: error.message });
        }

        // 获取产品标签
        const tags = await findTagsByProductId(id);

        return handleCors(res).status(200).json({
          product: {
            ...product,
            tags,
            badgeColor: product.badge_color
          }
        });
      } else {
        // 获取产品列表
        const { category, page = 1, limit = 12 } = req.query;

        let queryBuilder = supabase
          .from('products')
          .select('*', { count: 'exact' });

        if (category && category !== '全部') {
          queryBuilder = queryBuilder.eq('category', category);
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);
        queryBuilder = queryBuilder.range(offset, offset + parseInt(limit) - 1);

        const { data: products, error, count } = await queryBuilder;

        if (error) {
          console.error('Error fetching products:', error);
          return handleCors(res).status(500).json({ error: error.message });
        }

        // 为每个产品获取标签
        const productsWithTags = await Promise.all(
          products.map(async (product) => {
            const tags = await findTagsByProductId(product.id);
            return {
              ...product,
              tags,
              badgeColor: product.badge_color
            };
          })
        );

        return handleCors(res).status(200).json({
          products: productsWithTags,
          total: count || 0,
          page: parseInt(page),
          limit: parseInt(limit)
        });
      }
    }

    // 创建产品
    if (req.method === 'POST') {
      const productData = req.body;
      const { tags, badgeColor, ...restData } = productData;

      const { data: product, error } = await supabase
        .from('products')
        .insert({
          id: Date.now().toString(),
          ...restData,
          badge_color: badgeColor
        })
        .select('*')
        .single();

      if (error) {
        console.error('Error creating product:', error);
        return handleCors(res).status(500).json({ error: error.message });
      }

      return handleCors(res).status(201).json({
        product: {
          ...product,
          tags: tags || [],
          badgeColor: product.badge_color
        }
      });
    }

    // 更新产品
    if (req.method === 'PUT') {
      const { id } = req.query;
      if (!id) {
        return handleCors(res).status(400).json({ error: 'Product ID is required' });
      }

      const productData = req.body;
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
        console.error('Error updating product:', error);
        return handleCors(res).status(500).json({ error: error.message });
      }

      return handleCors(res).status(200).json({
        product: {
          ...product,
          tags: tags || [],
          badgeColor: product.badge_color
        }
      });
    }

    // 删除产品
    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return handleCors(res).status(400).json({ error: 'Product ID is required' });
      }

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
        console.error('Error deleting product:', error);
        return handleCors(res).status(500).json({ error: error.message });
      }

      return handleCors(res).status(200).json({ message: 'Product deleted successfully' });
    }

    // 方法不允许
    return handleCors(res).status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in products handler:', error);
    return handleCors(res).status(500).json({ error: error.message });
  }
}