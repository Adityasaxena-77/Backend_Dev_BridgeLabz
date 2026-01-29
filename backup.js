const fs = require("fs");
const path = require("path");

const sourceFile = path.join(__dirname, "data.txt");
const backupDir = path.join(__dirname, "backup");
const backupFile = path.join(backupDir, "data_backup.txt");
const errorLog = path.join(__dirname, "error.log");

// Log errors
function logError(error) {
    const msg = `${new Date().toISOString()} - ${error.message}\n`;
    fs.appendFile(errorLog, msg, () => {});
}

async function backupFileSystem() {
    try {
        await fs.promises.mkdir(backupDir, { recursive: true });

        const readStream = fs.createReadStream(sourceFile);
        const writeStream = fs.createWriteStream(backupFile);

        readStream.on("error", logError);
        writeStream.on("error", logError);

        readStream.pipe(writeStream);

        writeStream.on("finish", () => {
            console.log("Backup completed successfully");
        });
    } catch (error) {
        logError(error);
    }
}

backupFileSystem();
