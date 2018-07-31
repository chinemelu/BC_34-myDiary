import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const dbConfig = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
};

const pool = new Pool(dbConfig);

const db = (text, params, callback) => pool.query(text, params, callback);
export default db;
