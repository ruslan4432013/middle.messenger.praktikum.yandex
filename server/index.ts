import path from 'path';

import express from 'express';

const app = express();
const port = 3000;

const DIR_PATH = path.resolve(__dirname, '../dist');

app.use(express.static(DIR_PATH));

app.use(function (_req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self' 'unsafe-eval' 'unsafe-inline';
    img-src *;
    script-src 'self' 'unsafe-eval';
    media-src https://yandex.ru;
    connect-src 'self' https://ya-praktikum.tech/ wss://ya-praktikum.tech;
    `
  );
  next();
});

app.get('/*', (_, res) => {
  res.sendFile(path.join(DIR_PATH, 'index.html'));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
