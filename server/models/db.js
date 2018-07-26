import { Pool } from 'pg';

require('dotenv').config();

const dbDetails = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATEBASE_PASSWORD,
  port: process.env.DATABASE_PORT,
};

const pool = new Pool(dbDetails);

export default pool;
