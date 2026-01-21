const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) {
        console.log("Error reading file");
        return;
    }

    const words = data.trim().split(/\s+/).length;

    fs.writeFile("output.txt", `Word Count: ${words}`, (err) => {
        if (err) {
            console.log("Error writing file");
        } else {
            console.log("Word count written successfully");
        }
    });
});
