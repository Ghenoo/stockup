import { connectDb, createUserTable } from './models/userModel';

const init = async () => {
  await connectDb();
  await createUserTable();
};

init();
