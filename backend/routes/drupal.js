const express = require('express');
const router = express.Router();
const drupalProductController = require('../controller/drupalProductController');

// Route to fetch product by ID from Drupal
router.get('/:id', drupalProductController.fetchProductByIdFromDrupal);
router.get('/', drupalProductController.syncProductsFromDrupal);

exports.router = router;