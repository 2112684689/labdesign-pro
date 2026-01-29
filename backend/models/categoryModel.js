import supabase from '../config/supabase.js';
import { v4 as uuidv4 } from 'uuid';

class CategoryModel {
  // 查询分类列表
  async find() {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    return categories;
  }

  // 根据ID查询分类
  async findById(id) {
    const { data: category, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return category;
  }

  // 创建分类
  async create(categoryData) {
    const { name } = categoryData;

    const { data: category, error } = await supabase
      .from('categories')
      .insert({
        id: uuidv4(),
        name
      })
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return category;
  }

  // 更新分类
  async update(id, categoryData) {
    const { name } = categoryData;

    const { data: category, error } = await supabase
      .from('categories')
      .update({ name })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return category;
  }

  // 删除分类
  async delete(id) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }
}

export default new CategoryModel();