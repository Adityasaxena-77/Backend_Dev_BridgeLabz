const fs = require("fs");
const path = require("path");
const readline = require("readline");

const logFile = path.join(__dirname, "server.log");

let totalLines = 0;
let errorCount = 0;


if (!fs.existsSync(logFile)) {
    console.error("Error: server.log file not found");
    process.exit(1);
}

const readStream = fs.createReadStream(logFile);


readStream.on("error", (err) => {
    console.error("Read error:", err.message);
});

const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
});

rl.on("line", (line) => {
    totalLines++;
    if (line.toUpperCase().includes("ERROR")) {
        errorCount++;
    }
});

rl.on("close", () => {
    console.log("Log Summary:");
    console.log("Total Lines:", totalLines);
    console.log("Error Count:", errorCount);
});
