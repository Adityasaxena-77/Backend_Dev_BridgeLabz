const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("form");
});

app.post("/student/registration", (req, res) => {
    console.log(req.body);
    res.send("Student Registered");
});

app.listen(3000, () => {
    console.log("Server running on 3000");
});
