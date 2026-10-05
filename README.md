# LogStream

A real-time log streaming web application built using Node.js, Express.js and Server-Sent Events (SSE).

## Features

- Generates logs every 500ms
- Supports INFO, WARN and ERROR log levels
- Precise timestamps in HH:MM:SS.mmm format
- Real-time streaming using Server-Sent Events
- Client ID based sessions
- Start and Stop stream controls
- Maintains only the latest 100 logs
- Supports multiple concurrent clients
- Cleans up the stream when the client disconnects
- Dark terminal-style interface

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
├── .gitignore
└── README.md