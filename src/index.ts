// npm install express --save
// npm install --save-dev nodemon
// npm install typescript ts-node npm-run-all --save-dev
// npm install @types/express --save-dev

import express, { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import path from 'path';
import url from 'url';
import {booksApi} from './books.api.js';

const app = express();


app.use(express.json());

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use('/', express.static(path.resolve( __dirname, '../public')));

app.use(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  next();
});

app.use(async (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500);
  next();
});

app.use('/api/books', booksApi);


app.listen(3000, () => {
  console.log("Server ready at port 3000");
});
