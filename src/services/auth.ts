// src/services/auth.ts
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false
  }
});

export interface User {
  id: number;
  email: string;
  name: string | null;
  avatar_url: string | null;
}

export async function createUser(email: string, password: string, name?: string): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const result = await pool.query(
    'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, avatar_url',
    [email, hashedPassword, name]
  );
  
  return result.rows[0];
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  const result = await pool.query(
    'SELECT id, email, password_hash, name, avatar_url FROM users WHERE email = $1',
    [email]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];
  const isValid = await bcrypt.compare(password, user.password_hash);

  if (!isValid) {
    return null;
  }

  delete user.password_hash;
  return user;
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await pool.query(
    'SELECT id, email, name, avatar_url FROM users WHERE id = $1',
    [id]
  );

  return result.rows[0] || null;
}