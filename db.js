require('dotenv').config();
const { Pool } = require('pg');

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = { pool };
// postgres://wvsrhrxlowbnkc:02021bb22dace62e1a9b54ab1670edbff8b36767065250e94746be62362ec89f@ec2-34-225-103-117.compute-1.amazonaws.com:5432/d99jvgaoos1sq9
