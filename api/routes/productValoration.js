const express = require("express");
const router = express.Router();
const valorationController = require("../controllers/valorationController");

router.post("/add/:productId", valorationController.add);
router.put("/update/:productId", valorationController.update);

router.get("/getAll/:productId", valorationController.getAll);
// router.get("/getComments/:productId", valorationController.getComments);
router.get(
  "/getAverage/:productId",
  valorationController.getAverageByProductId
);
router.get(
  "/getByUserId/:UserId/productId/:productId",
  valorationController.getByUserIdAndProdId
);
router.delete(
  "/deleteAll",
  valorationController.deleteAll
);

module.exports = router;
