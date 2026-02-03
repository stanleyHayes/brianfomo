import http from "node:http";

import {app} from "../index.js";
import {config} from "./../config/config.js";
import {closeMongoDBConnection, openMongoDBConnection} from "../connections/database.js";

const server = http.createServer(app);
server.keepAliveTimeout = config.server.keepAliveTimeout;
server.headersTimeout = config.server.headersTimeout;
server.requestTimeout = config.server.requestTimeout;

const sockets = new Set();

server.on('connection', (socket) => {
    sockets.add(socket);
    socket.on('close', () => {
        sockets.delete(socket)
    });
});

const start = async () => {
    try {
        await openMongoDBConnection();

        server.listen(port, host, async () => {
            console.log(`Server listening on ${host}:${port} in ${config.app.env} mode.`);
        });
    }catch (e) {
        console.error("Startup failed:", e);
        process.exit(1);
    }
}

const shutdown = (signal) => {
    console.log(`Received ${signal}. Shutting down...`);
    // Stop accepting new connections
    server.close(async () => {
        console.log("HTTP server closed.");
        await closeMongoDBConnection();
        if (config.app.env === "production") {
            process.exit(0);
        }
    });
    // Force close after timeout
    if (config.app.env === "production") {
        setTimeout(() => {
            console.error("Forcing shutdown");
            sockets.forEach(socket => socket.destroy());
            process.exit(1);
        }, 30_000);
    }
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on("uncaughtException", e => {
    console.log("uncaught exception: ", e);
    process.exit(1);
});
process.on("unhandledRejection", reason => {
    console.error("Unhandled Rejection: ", reason);
})

const port = config.server.port || 5000;
const host = config.server.host || 'localhost';


server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.error('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(port, host);
        }, 1000);
    }else{
        console.log(`Server error: ${e}`)
    }
});

start()
