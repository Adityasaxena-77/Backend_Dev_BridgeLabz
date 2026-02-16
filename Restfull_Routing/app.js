const express = require("express");
const app = express();

app.use(express.json());

/* Dummy Data */
let books = [
  { id: 1, title: "Java Basics", author: "Aditya", year: 2020 },
  { id: 2, title: "Node Mastery", author: "Rahul", year: 2022 },
  { id: 3, title: "Python Pro", author: "Aditya", year: 2019 },
  { id: 4, title: "Web Dev", author: "Aman", year: 2021 },
];

let authors = [
  { id: 1, name: "Aditya" },
  { id: 2, name: "Rahul" },
];

/* ---------------- Exercise 2: Validation Middleware ---------------- */
function validateYear(req, res, next) {
  const { year } = req.body;
  if (year && (isNaN(year) || year < 1900 || year > new Date().getFullYear())) {
    return res.status(400).json({ error: "Invalid year" });
  }
  next();
}

/* ---------------- Exercise 1 + 3: Filter + Pagination ---------------- */
app.get("/books", (req, res) => {
  let result = [...books];
  const { author, year, page = 1, limit = 10 } = req.query;

  if (author) {
    result = result.filter(b => b.author.toLowerCase() === author.toLowerCase());
  }

  if (year) {
    result = result.filter(b => b.year == year);
  }

  const start = (page - 1) * limit;
  const end = start + Number(limit);

  res.json({
    total: result.length,
    page: Number(page),
    data: result.slice(start, end)
  });
});

/* ---------------- Exercise 5: Search by Title ---------------- */
app.get("/books/search", (req, res) => {
  const { title } = req.query;
  const result = books.filter(b =>
    b.title.toLowerCase().includes(title.toLowerCase())
  );
  res.json(result);
});

/* ---------------- Exercise 4: Authors CRUD ---------------- */

// CREATE
app.post("/authors", (req, res) => {
  const author = { id: Date.now(), name: req.body.name };
  authors.push(author);
  res.json(author);
});

// READ ALL
app.get("/authors", (req, res) => {
  res.json(authors);
});

// READ ONE
app.get("/authors/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  res.json(author);
});

// UPDATE
app.put("/authors/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  author.name = req.body.name;
  res.json(author);
});

// DELETE
app.delete("/authors/:id", (req, res) => {
  authors = authors.filter(a => a.id != req.params.id);
  res.json({ message: "Author deleted" });
});

/* ---------------- Book Create with Validation ---------------- */
app.post("/books", validateYear, (req, res) => {
  const book = { id: Date.now(), ...req.body };
  books.push(book);
  res.json(book);
});

app.listen(3000, () => console.log("API running on port 3000"));
