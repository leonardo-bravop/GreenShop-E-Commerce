const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');

router.get("/",productController.getAll);
router.get("/latest",productController.getLatest);
router.get("/category/:id", productController.getByCategory);
router.get("/getByMultiCategory", productController.getByMultiCategory)
router.get("/getByFamilyId/:familyId", productController.getByFamilyId)

router.get("/:id", productController.getById);
router.post("/add", productController.add);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);
//// Productos I (categoria)
router.get("/name/:name",productController.getByName);


router.put('/valoration/:id',productController.addValoration);
module.exports = router;
