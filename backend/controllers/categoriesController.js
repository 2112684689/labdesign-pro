import categoryModel from '../models/categoryModel.js';

class CategoriesController {
  // 获取分类列表
  async getCategories(req, res) {
    try {
      const categories = await categoryModel.find();

      res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 创建分类
  async createCategory(req, res) {
    try {
      const categoryData = req.body;

      const category = await categoryModel.create(categoryData);

      res.status(201).json({ category });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 更新分类
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const categoryData = req.body;

      const category = await categoryModel.update(id, categoryData);

      res.status(200).json({ category });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 删除分类
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      await categoryModel.delete(id);

      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CategoriesController();