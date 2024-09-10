require('dotenv').config({ path: './.env' });
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT;
const fs = require('fs');
const path = require('path');

// Create a new pool instance
const pool = new Pool({
  user: process.env.POSTGRES_USERNAME,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Current time from Postgres: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

app.get('/setup', async (req, res) => {
  try {
    const createTableQuery = fs.readFileSync(path.join(__dirname, 'queries', 'createTables.sql'), 'utf8');
    const result = await pool.query(createTableQuery);
    res.send(`Current time from Postgres: ${result.rows[0]}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
