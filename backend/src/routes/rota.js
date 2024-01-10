
const express = require('express');
const router = express.Router();
const { calcularRotaOtimizada } = require('../controllers/rotaController');

router.post('/', calcularRotaOtimizada);

module.exports = router;
