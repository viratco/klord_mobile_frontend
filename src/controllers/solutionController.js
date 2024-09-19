const db = require("../postgres/db");
const solutionTable = require("../constants/solutionTable")

const createSolution = async (req, res) => {
  // write a query to insert post in psql
  try {
    const { post_id, description } = req?.body;
    const user_id = req?.user_id;
    if (!post_id || !description) {
      res.status(404).json({ message: 'All fields are required!' });
    }
    // check before inserting values that the post is still exists or not
    const checkPostQuery = `SELECT * FROM "post" WHERE id=$1`;
    const postOutput = await db.query(checkPostQuery, [post_id]);

    if(!postOutput) throw Error ("Post not found")


    const insertQuery = `INSERT INTO solution (${solutionTable?.POST_ID}, ${solutionTable?.CREATED_BY_USER_ID}, ${solutionTable?.DESCRIPTION}) VALUES($1, $2, $3) RETURNING *`;
    const output = await db.query(insertQuery, [post_id, user_id, description]);
    const insertedPost = output?.rows?.[0];
    res.status(200).json({ code: 200, data: insertedPost });
  } catch (error) {
    res.status(400).json({ code: 400, message: error?.message });
  }
}

module.exports = {
    createSolution
}