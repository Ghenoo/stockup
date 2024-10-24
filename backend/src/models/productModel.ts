import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';

let db: Database<sqlite3.Database, sqlite3.Statement>;

const connectDb = async (): Promise<void> => {
  db = await open({
    filename: './sqlite.db',
    driver: sqlite3.Database
  });
};

export default connectDb;
export const createProductTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      quantity INTEGER
    )
  `;
  await db.exec(query);
};

export const addProduct = async (name: string, price: number, quantity: number) => {
  await db.run('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)', [
    name,
    price,
    quantity,
  ]);
};

export const getProducts = async () => {
  return await db.all('SELECT * FROM products');
};
