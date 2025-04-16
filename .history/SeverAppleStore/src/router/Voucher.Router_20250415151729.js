const router = require('express').Router();
const voucherController = require('../controller/Voucher.Controller');

router.post('/admin/create', voucherController.createVoucher);

router.get('/list/:usersApplicable', voucherController.getVoucherList);

router.get('/detail/:id', voucherController.getVoucherById);

router.post('/use', voucherController.useVoucher);

router.put('/update/:id', voucherController.updateVoucher);

router.put('/reset-usage', voucherController.resetVoucherUsage);

router.get('/admin/list/get-all', voucherController.getAllVoucher);

router.put('/admin/updateVoucher/:id', voucherController.updateAdminVoucher);

router.delete('/admin/delete/:id', voucherController.deleteVoucher);

router.get('/admin/detail/:id', voucherController.getVoucherById);


module.exports = router;