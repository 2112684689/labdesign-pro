import express from 'express';
import productsController from '../controllers/productsController.js';

const router = express.Router();

// 获取产品列表
router.get('/', productsController.getProducts);

// 获取产品详情
router.get('/:id', productsController.getProductById);

// 创建产品
router.post('/', productsController.createProduct);

// 更新产品
router.put('/:id', productsController.updateProduct);

// 删除产品
router.delete('/:id', productsController.deleteProduct);

export default router;