
import fs from "fs";

const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const end = Date.now();
        const log = `${new Date().toISOString()} | ${req.method} | ${req.originalUrl} | ${res.statusCode} | ${end - start} ms\n`;

        fs.appendFile("requests.log", log, (err) => {
            if (err) console.log(err);
        });
    });

    next();
};

export default requestLogger;
