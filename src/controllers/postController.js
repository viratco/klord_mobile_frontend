const db = require("../postgres/db");
const postTable = require("../constants/postTable")

const createPost = async (req, res) => {
  // write a query to insert post in psql
  try {
    const { title, description, tags } = req?.body;
    const user_id = req?.user_id;
    if (!title || !description || !tags) {
      res.status(404).json({ message: 'All fields are required!' });
    }
    const insertQuery = `INSERT INTO post (${postTable?.CREATED_BY_USER_ID}, ${postTable?.TITLE}, ${postTable?.DESCRIPTION}, ${postTable?.TAGS}) VALUES($1, $2, $3, $4) RETURNING *`;
    const output = await db.query(insertQuery, [user_id, title, description, tags]);
    const insertedPost = output?.rows?.[0];
    res.status(200).json({ code: 200, data: insertedPost });
  } catch (error) {
    res.status(400).json({ code: 400, message: error?.message });
  }
}


module.exports = {
  createPost
}