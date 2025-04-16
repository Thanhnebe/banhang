const Router = require('express').Router();
const CateogoryController = require('../controller/Categories.Controller');

Router.post('/admin/create', CateogoryController.createCategory);

Router.get('/get-all', CateogoryController.getAllCategory);

Router.get('/detail/:id', CateogoryController.getCategoryById);

Router.put('/admin/update/:id', CateogoryController.updateCategory);

Router.delete('/admin/delete/:id', CateogoryController.deleteCategory);

module.exports = Router;