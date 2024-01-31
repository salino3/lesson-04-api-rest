// npm install express --save
// npm install --save-dev nodemon
// npm install typescript ts-node npm-run-all --save-dev
// npm install @types/express --save-dev

import express from "express";
import { getBookList, getBook, insertBook, updateBook, deleteBook } from "./mock-db.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("My awesome books portal");
});

app.get("/api/books", async (req, res) => {
  const bookList = await getBookList();
  res.send(bookList);
});

app.get("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const bookId = Number(id);
  const book = await getBook(bookId);
  res.send(book);
});

app.post('/api/books', async (req, res) => {

  const book = req.body;
  const newBook = await insertBook(book);
  res.status(201).send(newBook);
});


app.put("/api/books/:id", async (req, res) => {
    const { id } = req.params;
    const bookId = Number(id);
  const book = req.body;
  const newBook = await updateBook(bookId, book);
  res.status(204).send(newBook);
});

app.delete("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const bookId = Number(id);
  await deleteBook(bookId);
  res.sendStatus(204);
});



app.listen(3000, () => {
  console.log("Server ready at port 3000");
});
