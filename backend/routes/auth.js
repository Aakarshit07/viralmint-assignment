const express = require('express');
const { signup, signin } = require('../controllers/auth.js');
const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', verifyToken, logout);
module.exports = router;
