import express from 'express';
import route from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(route);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

