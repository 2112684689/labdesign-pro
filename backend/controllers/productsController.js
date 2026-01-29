import productModel from '../models/productModel.js';

class ProductsController {
  // 获取产品列表
  async getProducts(req, res) {
    try {
      const { category, page = 1, limit = 12 } = req.query;

      const result = await productModel.find({}, {
        category,
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.status(200).json({
        products: result.products,
        total: result.total,
        page: parseInt(page),
        limit: parseInt(limit)
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 获取产品详情
  async getProductById(req, res) {
    try {
      const { id } = req.params;

      const product = await productModel.findById(id);

      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 创建产品
  async createProduct(req, res) {
    try {
      const productData = req.body;

      const product = await productModel.create(productData);

      res.status(201).json({ product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 更新产品
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const productData = req.body;

      const product = await productModel.update(id, productData);

      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 删除产品
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      await productModel.delete(id);

      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ProductsController();