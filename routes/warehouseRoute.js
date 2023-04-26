const router = require('express').Router();
const warehouseController = require('../controllers/warehouseController');

router.route('/').get(warehouseController.index);
router.route('/').post(warehouseController.addWarehouse);

router
    .route('/:id')
    .get(warehouseController.singleWarehouse)
    .delete(warehouseController.deleteWarehouse)

//Gabi's ticket #27
router
    .route('/:id/inventories')
    .get(warehouseController.warehouseInventories);


module.exports = router;

// router
//     .route('/')
//     .get(warehouseController.index)
//     .post(warehouseController.addWarehouse);

// router
//     .route('/:id')
//     .get(warehouseController.singleWarehouse)
//     .put(warehouseController.updateWarehouse)
//     .delete(warehouseController.deleteWarehouse);

// router
//     .route('/:id/inventories')
//     .get(warehouseController.warehouseInventories);
