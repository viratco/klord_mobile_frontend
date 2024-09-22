const express = require('express');
const { upVote, downVote } = require('../controllers/voteController');


const router = express.Router();

router.post('/up', upVote);

router.post('/down', downVote);

module.exports = router;