const Router = require('express').Router();
const productController = require('../controller/Product.Controller');

Router.post('/admin/createProducts', productController.createProduct);

Router.get('/get-all', productController.getAllProduct);

Router.get('/get-pagination', productController.getProductPagination);

Router.get('/getdetail/:id', productController.getProductById);

Router.put('/admin/updateProducts/:id', productController.updateProduct);

Router.delete('/admin/deleteProducts/:id', productController.deleteProduct);

module.exports = Router;