const fs = require("fs");
const path = require("path");

const command = process.argv[2];
const filePath = process.argv[3];
const data = process.argv[4];

switch (command) {
    case "read":
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) return console.error(err.message);
            console.log(data);
        });
        break;

    case "write":
        fs.writeFile(filePath, data, err => {
            if (err) return console.error(err.message);
            console.log("File written successfully");
        });
        break;

    case "copy":
        const dest = process.argv[4];
        fs.copyFile(filePath, dest, err => {
            if (err) return console.error(err.message);
            console.log("File copied");
        });
        break;

    case "delete":
        fs.unlink(filePath, err => {
            if (err) return console.error(err.message);
            console.log("File deleted");
        });
        break;

    case "list":
        fs.readdir(filePath, (err, files) => {
            if (err) return console.error(err.message);
            files.forEach(file => console.log(file));
        });
        break;

    default:
        console.log("Invalid command");
}
