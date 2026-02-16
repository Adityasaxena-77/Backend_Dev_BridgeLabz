const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* 2. Middleware - Response Time */
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.url} - ${Date.now() - start}ms`);
  });
  next();
});

/* 1. Filter Users with Query */
const users = [
  { name: "Aditya" },
  { name: "Rahul" },
  { name: "Aman" },
  { name: "Rohit" }
];

app.get("/users", (req, res) => {
  const { name } = req.query;
  const result = name
    ? users.filter(u => u.name.toLowerCase().includes(name.toLowerCase()))
    : users;
  res.json(result);
});

/* 3. Contact Form */
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  res.send("Form submitted successfully");
});

/* 5. Photo Gallery */
app.get("/gallery", (req, res) => {
  const images = ["1.jpg", "2.jpg", "3.jpg"];
  res.render("gallery", { images });
});

/* 6. Simple Blog */
let posts = [];

app.get("/blog", (req, res) => {
  res.render("blog", { posts });
});

app.get("/blog/new", (req, res) => {
  res.render("newPost");
});

app.post("/blog", (req, res) => {
  posts.push(req.body);
  res.redirect("/blog");
});

app.get("/blog/:id", (req, res) => {
  res.render("post", { post: posts[req.params.id] });
});

/* 4. Custom 404 */
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
