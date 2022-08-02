const express = require('express');
const viewController = require('../../app/controllers/web/viewController');

const router = express.Router();


/* Car Router */
router.get('/', viewController.index);

module.exports = router; 