
const express = require('express');
const { createSolution } = require('../controllers/solutionController');


const router = express.Router();

router.post('/', createSolution);


module.exports = router;