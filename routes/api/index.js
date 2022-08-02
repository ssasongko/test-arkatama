const express = require('express');

const userController = require('../../app/controllers/api/userController');

const router = express.Router();


/* Size Router */
router.post('/user', userController.store);

module.exports = router; 