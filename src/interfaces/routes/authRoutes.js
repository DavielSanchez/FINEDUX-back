const express = require('express');
const AuthController = require('../controllers/AuthController')
const router = express.Router();
const controller = AuthController();

router.post('/login', controller.login);



module.exports = router;