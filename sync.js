const fs = require("fs");
const path = require("path");

const dir1 = path.join(__dirname, "dir1");
const dir2 = path.join(__dirname, "dir2");

async function syncDirectories() {
    try {
        const files1 = await fs.promises.readdir(dir1);
        const files2 = await fs.promises.readdir(dir2);

        for (let file of files1) {
            if (!files2.includes(file)) {
                await fs.promises.copyFile(
                    path.join(dir1, file),
                    path.join(dir2, file)
                );
                console.log(`Copied: ${file}`);
            }
        }
    } catch (error) {
        console.error("Sync Error:", error.message);
    }
}

syncDirectories();
