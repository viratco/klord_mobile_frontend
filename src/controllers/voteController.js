const db = require("../postgres/db");

const UP_VOTE = 'upvote';
const upVote = async (req, res) => {
    try {
        const { solution_id, vote_type } = req?.body;
        const user_id = req?.user_id;
        const checkIsVoteAvailableQuery = `SELECT * FROM "vote" WHERE solution_id = $1 AND created_by_user_id = $2 LIMIT 1`;
        const existingVoteOutput = await db.query(checkIsVoteAvailableQuery, [solution_id, user_id]);
        const existingVote = existingVoteOutput?.rows?.[0];
        if (existingVote?.id ) {
            if (existingVote?.vote_type !== UP_VOTE) {
                const existingVoteQuery = `UPDATE "vote" SET vote_type = $1 WHERE solution_id = $2 AND created_by_user_id = $3 RETURNING *`;
                const existingVoteOutput = await db.query(existingVoteQuery, [UP_VOTE, solution_id, user_id]);
                res.status(200).json({ code: 200, data: existingVoteOutput?.rows?.[0] });
            } else {
                res.status(200).json({ code: 200, data: existingVote });
            }
        } else {
            const insertVoteQuery = `INSERT INTO "vote" (solution_id, created_by_user_id, vote_type) VALUES($1, $2, $3) RETURNING *`;
            const insertVoteQueryOutput = await db.query(insertVoteQuery, [solution_id, user_id, UP_VOTE]);
            res.status(200).json({ code: 200, data: insertVoteQueryOutput?.rows?.[0] });
        }
    } catch (error) {
        res.status(400).json({ code: 400, message: error?.message });
    }
}

const DOWN_VOTE = 'downvote';
const downVote = async (req, res) => {
    try {
        const { solution_id, vote_type } = req?.body;
        const user_id = req?.user_id;
        const checkIsVoteAvailableQuery = `SELECT * FROM "vote" WHERE solution_id = $1 AND created_by_user_id = $2 LIMIT 1`;
        const existingVoteOutput = await db.query(checkIsVoteAvailableQuery, [solution_id, user_id]);
        const existingVote = existingVoteOutput?.rows?.[0];
        if (existingVote?.id ) {
            if (existingVote?.vote_type !== DOWN_VOTE) {
                const existingVoteQuery = `UPDATE "vote" SET vote_type = $1 WHERE solution_id = $2 AND created_by_user_id = $3 RETURNING *`;
                const existingVoteOutput = await db.query(existingVoteQuery, [DOWN_VOTE, solution_id, user_id]);
                res.status(200).json({ code: 200, data: existingVoteOutput?.rows?.[0] });
            } else {
                res.status(200).json({ code: 200, data: existingVote });
            }
        } else {
            const insertVoteQuery = `INSERT INTO "vote" (solution_id, created_by_user_id, vote_type) VALUES($1, $2, $3) RETURNING *`;
            const insertVoteQueryOutput = await db.query(insertVoteQuery, [solution_id, user_id, DOWN_VOTE]);
            res.status(200).json({ code: 200, data: insertVoteQueryOutput?.rows?.[0] });
        }
    } catch (error) {
        res.status(400).json({ code: 400, message: error?.message });
    }
}


module.exports = {
    upVote, downVote
}