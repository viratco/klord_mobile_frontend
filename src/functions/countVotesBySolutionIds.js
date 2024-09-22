const db = require("../postgres/db");

const countVotesBySolutionIds = async(solution_ids) => {
  const string_solution_ids = solution_ids?.map(String);
  const single_string_solution_ids = string_solution_ids.toString();
  console.log("string_solution_ids==>>", typeof single_string_solution_ids);
  const query = `SELECT solution_id, 
       COUNT(CASE WHEN vote_type = 'upvote' THEN 1 END) AS upvoteCount,
       COUNT(CASE WHEN vote_type = 'downvote' THEN 1 END) AS downvoteCount
        FROM vote
        WHERE solution_id IN (${single_string_solution_ids})
        GROUP BY solution_id
      `;
  console.log("query===>>", query);
  const res = await db.query(query, []);
  return res?.rows;
}
module.exports = countVotesBySolutionIds;
