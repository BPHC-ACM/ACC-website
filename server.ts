import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const server = createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
	ws.on('error', (error) => {
		console.error('WebSocket error:', error);
	});
});

// Start Server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
