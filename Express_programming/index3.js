const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const PORT = 8000;

app.get("/", (req, res) => {
    res.send("<h1>Welcome to home page</h1>");
});

// Get all students
app.get("/Student", (req, res) => {
    fs.readFile("./Student.json", "utf-8", (err, data) => {
        if (err) return res.status(500).send(err.message);
        res.json(JSON.parse(data || "[]"));
    });
});

// Get student by ID
app.get("/Student/:id/id", (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile("./Student.json", "utf-8", (err, data) => {
        const students = JSON.parse(data || "[]");
        const student = students.find(s => s.id === id);

        if (!student) return res.status(404).send("Data not found");
        res.json(student);
    });
});

// Get by branch
app.get("/Student/:branch/branch", (req, res) => {
    const branch = req.params.branch;

    fs.readFile("./Student.json", "utf-8", (err, data) => {
        const students = JSON.parse(data || "[]");
        const result = students.filter(s => s.branch === branch);

        if (result.length === 0)
            return res.status(404).send("Data not found");

        res.json(result);
    });
});

// Register student
app.post("/Student/register", (req, res) => {
    const { name, branch } = req.body;
    if (!name || !branch)
        return res.status(400).send("Invalid student data");

    fs.readFile("./Student.json", "utf-8", (err, data) => {
        const students = JSON.parse(data || "[]");

        const newStudent = {
            id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
            name,
            branch
        };

        students.push(newStudent);

        fs.writeFile("./Student.json", JSON.stringify(students, null, 2), err => {
            if (err) return res.status(500).send("Write error");
            res.status(201).json(newStudent);
        });
    });
});

// Update student
app.put("/Student/:id", (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile("./Student.json", "utf-8", (err, data) => {
        const students = JSON.parse(data || "[]");
        const index = students.findIndex(s => s.id === id);

        if (index === -1)
            return res.status(404).send("Student not found");

        students[index] = { ...students[index], ...req.body };

        fs.writeFile("./Student.json", JSON.stringify(students, null, 2), err => {
            if (err) return res.status(500).send("Update error");
            res.json(students[index]);
        });
    });
});

app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`);
});     
