const logs = document.getElementById("logs");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const filter = document.getElementById("filter");
const downloadBtn = document.getElementById("downloadBtn");

let eventSource;
let allLogs = [];

stopBtn.disabled = true;

startBtn.addEventListener("click", () => {
    const clientId = document.getElementById("clientId").value.trim();

    if (!clientId) {
        alert("Please enter a Client ID");
        return;
    }

    eventSource = new EventSource(
        `/api/logs?clientId=${encodeURIComponent(clientId)}`
    );

    startBtn.disabled = true;
    stopBtn.disabled = false;

    eventSource.onmessage = (event) => {
        allLogs.push(event.data);

        if (allLogs.length > 100) {
            allLogs.shift();
        }

        displayLogs();
    };
});

stopBtn.addEventListener("click", () => {
    if (eventSource) {
        eventSource.close();
        eventSource = null;
    }

    startBtn.disabled = false;
    stopBtn.disabled = true;
});

filter.addEventListener("change", displayLogs);

function displayLogs() {
    const selected = filter.value;

    logs.innerHTML = "";

    const filteredLogs = allLogs.filter((log) => {
        return selected === "ALL" || log.includes(`[${selected}]`);
    });

    filteredLogs.forEach((logText) => {
        const log = document.createElement("div");
        log.textContent = logText;
        logs.appendChild(log);
    });

    logs.scrollTop = logs.scrollHeight;
}

downloadBtn.addEventListener("click", () => {
    if (allLogs.length === 0) {
        alert("No logs to download");
        return;
    }

    const content = allLogs.join("\n");

    const blob = new Blob([content], {
        type: "text/plain"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "logstream-session.txt";
    a.click();

    URL.revokeObjectURL(url);
});