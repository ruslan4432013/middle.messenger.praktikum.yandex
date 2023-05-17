import path from 'path';

import express from 'express';

const app = express();
const port = 3000;

const DIR_PATH = path.resolve(__dirname, '../dist');

app.use(express.static(DIR_PATH));

app.get('/*', (_, res) => {
  res.sendFile(path.join(DIR_PATH, 'index.html'));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
