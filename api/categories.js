import supabase from './_lib/supabase.js';

// 处理CORS
function handleCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
}

export default async function handler(req, res) {
  // 处理CORS预检请求
  if (req.method === 'OPTIONS') {
    return handleCors(res).status(204).end();
  }

  try {
    // 获取分类列表
    if (req.method === 'GET') {
      if (req.query.id) {
        // 获取单个分类
        const { id } = req.query;
        const { data: category, error } = await supabase
          .from('categories')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching category:', error);
          return handleCors(res).status(500).json({ error: error.message });
        }

        return handleCors(res).status(200).json({ category });
      } else {
        // 获取分类列表
        const { data: categories, error } = await supabase
          .from('categories')
          .select('*');

        if (error) {
          console.error('Error fetching categories:', error);
          return handleCors(res).status(500).json({ error: error.message });
        }

        return handleCors(res).status(200).json({ categories });
      }
    }

    // 创建分类
    if (req.method === 'POST') {
      const categoryData = req.body;
      const { name } = categoryData;

      const { data: category, error } = await supabase
        .from('categories')
        .insert({
          id: Date.now().toString(),
          name
        })
        .select('*')
        .single();

      if (error) {
        console.error('Error creating category:', error);
        return handleCors(res).status(500).json({ error: error.message });
      }

      return handleCors(res).status(201).json({ category });
    }

    // 更新分类
    if (req.method === 'PUT') {
      const { id } = req.query;
      if (!id) {
        return handleCors(res).status(400).json({ error: 'Category ID is required' });
      }

      const categoryData = req.body;
      const { name } = categoryData;

      const { data: category, error } = await supabase
        .from('categories')
        .update({ name })
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        console.error('Error updating category:', error);
        return handleCors(res).status(500).json({ error: error.message });
      }

      return handleCors(res).status(200).json({ category });
    }

    // 删除分类
    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return handleCors(res).status(400).json({ error: 'Category ID is required' });
      }

      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting category:', error);
        return handleCors(res).status(500).json({ error: error.message });
      }

      return handleCors(res).status(200).json({ message: 'Category deleted successfully' });
    }

    // 方法不允许
    return handleCors(res).status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in categories handler:', error);
    return handleCors(res).status(500).json({ error: error.message });
  }
}