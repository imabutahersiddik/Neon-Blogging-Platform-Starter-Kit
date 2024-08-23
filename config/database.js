const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database', err);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = client;
