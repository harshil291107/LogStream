const logs = document.getElementById("logs");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

let eventSource;

stopBtn.disabled = true;

startBtn.addEventListener("click", () => {
    const clientId = document.getElementById("clientId").value;

    eventSource = new EventSource(
        `/api/logs?clientId=${encodeURIComponent(clientId)}`
    );

    startBtn.disabled = true;
    stopBtn.disabled = false;

    eventSource.onmessage = (event) => {
        const log = document.createElement("div");

        log.textContent = event.data;

        logs.appendChild(log);

        if (logs.children.length > 100) {
            logs.removeChild(logs.firstElementChild);
        }

        logs.scrollTop = logs.scrollHeight;
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