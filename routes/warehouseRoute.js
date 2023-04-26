const router = require('express').Router();
const warehouseController = require('../controllers/warehouseController');

router.route('/').get(warehouseController.index);
router.route('/').post(warehouseController.addWarehouse);

router.route('/:id').get(warehouseController.singleWarehouse);



module.exports = router;