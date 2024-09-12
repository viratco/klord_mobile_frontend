require('dotenv').config({ path: './.env' });
const express = require('express');
const app = express();
const port = process.env.PORT;
const fs = require('fs');
const path = require('path');
const db = require('./postgres/db');
app.use(express.json());


app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.send(`Current time from Postgres: ${result.rows[0].now} ${__dirname}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

app.get('/setup', async (req, res) => {
  try {
    const createTableQuery = fs.readFileSync(path.join(__dirname, 'queries', 'createTables.sql'), 'utf8');
    const result = await db.query(createTableQuery);
    res.send(`Current time from Postgres: ${result.rows[0]}`);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});


// docker-compose up --build
// docker ps
// docker exec -it </container_id> sh
// psql -U </username> -h <host>
// \c mydatabase
// select * from "user";
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req?.body;
    if (!username) throw Error("Username not found");
    if (!password) throw Error("Password not found");

    // length
    if (username?.length < 3 && username?.length > 12) throw Error("Username length must be between 3 to 12 characters long");
    if (password?.length < 3 && password?.length > 12) throw Error("password length must be between 3 to 12 characters long");

    const insertQuery = `INSERT INTO "user" (username, password) VALUES($1, $2) RETURNING *`;
    const output = await db.query(insertQuery, [username, password]);
    console.log("output=>", output);
    const user = output?.rows?.[0];
    // [{'username':'virat'}]
    res.status(200).json({ message: `User ${user?.username} registered successfully`});
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

db.connect().then(() => {
  app.listen(port, () => {
    console.log(`Connected to Database and Server is running on port ${port}`);
  });
}).catch(error => {
  console.log("Error: ", error?.message);
});
