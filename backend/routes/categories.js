import express from 'express';
import categoriesController from '../controllers/categoriesController.js';

const router = express.Router();

// 获取分类列表
router.get('/', categoriesController.getCategories);

// 创建分类
router.post('/', categoriesController.createCategory);

// 更新分类
router.put('/:id', categoriesController.updateCategory);

// 删除分类
router.delete('/:id', categoriesController.deleteCategory);

export default router;