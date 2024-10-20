import express from 'express';

const app: express.Application = express();
const port: number = 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});