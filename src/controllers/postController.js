const db = require("../postgres/db");
const postTable = require("../constants/postTable");
const countVotesBySolutionIds = require("../functions/countVotesBySolutionIds");

const createPost = async (req, res) => {
  // write a query to insert post in psql
  try {
    const { title, description, tags } = req?.body;
    const user_id = req?.user_id;
    if (!title || !description || !tags) {
      res.status(404).json({ message: "All fields are required!" });
    }
    const insertQuery = `INSERT INTO post (${postTable?.CREATED_BY_USER_ID}, ${postTable?.TITLE}, ${postTable?.DESCRIPTION}, ${postTable?.TAGS}) VALUES($1, $2, $3, $4) RETURNING *`;
    const output = await db.query(insertQuery, [
      user_id,
      title,
      description,
      tags,
    ]);
    const insertedPost = output?.rows?.[0];
    res.status(200).json({ code: 200, data: insertedPost });
  } catch (error) {
    res.status(400).json({ code: 400, message: error?.message });
  }
};

// Fetch all post
const fetchPost = async (req, res) => {
  try {
    const fetchPost = `SELECT * FROM "post"`;
    const queryOutput = await db.query(fetchPost);
    const fetchedPost = queryOutput?.rows;
    res.status(200).json({ code: 200, data: fetchedPost });
  } catch (error) {
    res.status(400).json({ code: 400, message: error?.message });
  }
};

// Update post
const updatePost = async (req, res) => {
  try {
    const { id } = req?.params;
    const { title, description, tags } = req?.body;

    // Validation
    if (!title) throw new Error("Title is required");
    if (!description) throw new Error("Description is required");
    if (!tags) throw new Error("Tags is required");

    const updateQuery = `UPDATE "post" SET title=$1, description=$2, tags=$3 WHERE id=$4 RETURNING *`;
    const queryOutput = await db.query(updateQuery, [
      title,
      description,
      tags,
      id,
    ]);
    const updatedPost = queryOutput?.rows[0];

    res.status(200).json({
      code: 200,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message });
  }
};

// Fetch single post
const fetchSinglePost = async (req, res) => {
  try {
    const { id } = req?.params;
    const fetchSinglePostQUery = `SELECT * FROM "post" WHERE id=$1`;
    const queryOutput = await db.query(fetchSinglePostQUery, [id]);
    const fetchSinglePost = queryOutput?.rows;
    res.status(200).json({ code: 200, data: fetchSinglePost });
  } catch (error) {
    res.status(400).json({ code: 400, message: error?.message });
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    const { id } = req?.params;
    const deletePostQuery = `DELETE FROM "post" WHERE id=$1 RETURNING *`;
    const queryOutput = await db.query(deletePostQuery, [id]);
    const deletePost = queryOutput?.rows?.[0];
    res.status(200).json({ code: 200, data: deletePost });
  } catch (error) {
    res.status(400).json({ code: 400, message: error?.message });
  }
};

// Fetch single post with solution
const fetchSinglePostWithSolution = async (req, res) => {
  try {
    let { id } = req.params;
    const fetchPostWithSolution = `
     SELECT 
       post.id, 
       post.created_by_user_id, 
       post.title, 
       post.description, 
       post.tags, 
       post.created_at, 
       post.last_modified, 
       COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', solution.id, 'description', solution.description)) FILTER (WHERE solution.id IS NOT NULL), '[]'::json) AS solutions
       FROM "post"
       LEFT JOIN "solution" ON post.id = solution.post_id
       WHERE post.id = $1
       GROUP BY post.id;
    `;

    const queryOutput = await db.query(fetchPostWithSolution, [id]);
    const postWithSolution = queryOutput?.rows?.[0];
    const solution_ids = postWithSolution?.solutions?.map((solution) => solution?.id);
    
    const votesBySolutions = await countVotesBySolutionIds(solution_ids);
    // const 
    const solutions = postWithSolution?.solutions?.map((solution) => {
      const hasVoteIndex = votesBySolutions.findIndex((item) => item?.solution_id === solution?.id);
      return { ...solution, ...votesBySolutions?.[hasVoteIndex]}
    });

    postWithSolution.solutions = solutions

    
    res.status(200).json({ code: 200, data: postWithSolution });
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message });
  }
};

module.exports = {
  createPost,
  fetchPost,
  updatePost,
  fetchSinglePost,
  deletePost,
  fetchSinglePostWithSolution,
};
