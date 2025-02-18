import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import 'dotenv/config';

const app = express();
const server = createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
	console.log('🔗 Client connected');

	ws.on('error', (error) => {
		console.error('WebSocket error:', error);
	});
});

server.listen(4000, () => {
	console.log('WebSocket server running on http://localhost:4000');
});
