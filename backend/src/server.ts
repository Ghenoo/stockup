import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router as apiRouter } from './routes/api';
import { connectDb, createUserTable } from './models/userModel';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));

app.use(express.json());

connectDb().then(() => {
  createUserTable();
  console.log("Database connected and user table created.");
});

app.use('/api', apiRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
