const express = require('express');
const router = express.Router();
const categoryFamily = require('../controllers/categoryFamilyController');


router.get('/getAll', categoryFamily.getAll);
router.get('/getAllCategories', categoryFamily.getAllCategories);


router.post('/new', categoryFamily.newCategoryFamily);


module.exports = router;
