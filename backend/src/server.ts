// to start server

import dotenv from 'dotenv';
dotenv.config(); // w/o this process.env.port gives undefined
import {app} from './app.js';
import {connectDB} from './db/db.js';
connectDB();

const PORT: string | number = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});