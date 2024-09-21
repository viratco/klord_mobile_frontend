const express = require('express');
const { upVote } = require('../controllers/voteController');


const router = express.Router();

router.post('/up', upVote);
// router.post('/down', downVote);

module.exports = router;