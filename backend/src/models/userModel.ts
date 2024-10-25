import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
import { open as openDb } from 'sqlite';

let db: Database<sqlite3.Database, sqlite3.Statement>;

export const connectDb = async () => {
  db = await openDb({ filename: './sqlite.db', driver: sqlite3.Database });
};

export const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    );
  `;
  await db.exec(query);
};

export const createUser = async (email: string, password: string) => {
  await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
};

export const getUserByEmail = async (email: string) => {
  return await db.get('SELECT * FROM users WHERE email = ?', [email]);
};
