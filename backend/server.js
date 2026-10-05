const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.redirect("/api/logs");
});

app.get("/api/status", (req, res) => {
    res.json({
        status: "running",
        project: "LogStream"
    });
});

function generateLog() {
    const levels = ["INFO", "WARN", "ERROR"];

    const messages = {
        INFO: [
            "Server heartbeat OK",
            "Request processed successfully",
            "Client connected"
        ],
        WARN: [
            "Memory usage elevated",
            "Slow request detected",
            "High traffic detected"
        ],
        ERROR: [
            "Request failed",
            "Database connection failed",
            "Internal server error"
        ]
    };

    const level = levels[Math.floor(Math.random() * levels.length)];

    const messageList = messages[level];
    const message =
        messageList[Math.floor(Math.random() * messageList.length)];

    const now = new Date();

    const timestamp =
        now.toTimeString().split(" ")[0] +
        "." +
        String(now.getMilliseconds()).padStart(3, "0");

    return `[${level}] ${timestamp} - ${message}`;
}

app.get("/api/logs", (req, res) => {

    const clientId = req.query.clientId;

    if (!clientId) {
        return res.status(400).send("Client ID is required");
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    console.log("Client connected:", clientId);

    const interval = setInterval(() => {
        const log = generateLog();

        console.log(`Sending to ${clientId}:`, log);

        res.write(`data: ${log}\n\n`);
    }, 500);

    req.on("close", () => {
        console.log("Client connection closed:", clientId);
        clearInterval(interval);
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});