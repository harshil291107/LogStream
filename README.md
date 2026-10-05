# LogStream

A real-time log streaming web application built using Node.js, Express.js and Server-Sent Events (SSE).

## 🔗 Links

- **Live Demo:** https://logstream-5mzh.onrender.com
- **GitHub Repository:** https://github.com/harshil291107/LogStream
- **Demo Video:** [Watch the Demo](./Demo/live-video-demo.mp4)

## Features

- Generates a new log every 500ms
- Supports INFO, WARN and ERROR log levels
- Precise timestamps in `HH:MM:SS.mmm` format
- Real-time streaming using Server-Sent Events (SSE)
- Client ID based sessions
- Start and Stop stream controls
- Keeps only the latest 100 logs
- Supports multiple concurrent clients
- Cleans up the stream when a client disconnects
- Dark terminal-style interface
- Log-level filtering
- Download session logs

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Server-Sent Events (SSE)

## Project Structure

```text
LogStream/
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── Demo/
│   └── live-video-demo.mp4
├── .gitignore
└── README.md