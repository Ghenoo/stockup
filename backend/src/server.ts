import express from 'express';
import { router as apiRouter } from './routes/api';

const app = express();

app.use(express.json());
app.use('/api', apiRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
