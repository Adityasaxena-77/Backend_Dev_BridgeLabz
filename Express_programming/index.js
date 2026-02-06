const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.get("/users", (req, res) => {
    res.send("<h1>This is users page</h1>");
});

app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`<h1>You are requesting for user ${userId}</h1>`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
 