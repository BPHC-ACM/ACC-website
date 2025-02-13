let socket = null;

export const connectWebSocket = () => {
	if (socket && socket.readyState === WebSocket.OPEN) {
		console.log('WebSocket already connected');
		return;
	}

	socket = new WebSocket('ws://localhost:4000');

	socket.onopen = () => {
		console.log('Connected to WebSocket server');
	};

	socket.onmessage = (event) => {
		console.log('Message received from server:', event.data);
	};

	socket.onclose = () => {
		console.log('Disconnected from WebSocket server');
	};

	socket.onerror = (event) => {
		console.error('WebSocket error:', event);
	};
};
