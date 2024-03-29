import { Router } from "express";
import {
  getBookList,
  getBook,
  insertBook,
  updateBook,
  deleteBook,
} from "./mock-db.js";

export const booksApi = Router();


booksApi.get("/", async (req, res) => {
    try {
     const page: number = Number(req.query?.page);
     const pageSize: number = Number(req.query?.pageSize);

        let bookList = await getBookList();
      if (page && pageSize) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, bookList.length);
        bookList = bookList.slice(startIndex, endIndex);
      }
        res.send(bookList);
    } catch (error) {
        console.error(error);
    };
})
.get("/:id", async (req, res) => {
  const { id } = req.params;
  const bookId = Number(id);
  const book = await getBook(bookId);
  res.cookie("my-cookie-key", "my-token-value", {
    sameSite: 'none',
    secure: true // necessary for SameSite: "none"
  });
  res.send(book);
})
.post("/", async (req, res) => {
  const book = req.body;
  const newBook = await insertBook(book);
  res.status(201).send(newBook);
})
.put("/:id", async (req, res) => {
  const { id } = req.params;
  const bookId = Number(id);
  const book = req.body;
  const newBook = await updateBook(bookId, book);
  res.status(204).send(newBook);
})

.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const bookId = Number(id);
  await deleteBook(bookId);
  res.sendStatus(204);
});


