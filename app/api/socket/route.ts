import { NextResponse } from 'next/server';
import { Server as IOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { saveMessage } from '../../utils/db';
import type { Message } from '../../utils/types';

declare global {
	var io: IOServer | undefined;
}

export async function GET(req: Request) {
	const { socket } = global as any;
	if (!socket) {
		return NextResponse.json({ error: 'No socket found' });
	}
	return NextResponse.json({ message: 'Socket.IO is running' });
}

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function SocketHandler(req: Request) {
	if (!global.io) {
		// @ts-ignore
		const res = req.socket?.server;
		if (!res) {
			throw new Error('No underlying HTTP server');
		}

		const io = new IOServer(res, {
			path: '/api/socket',
			cors: {
				origin: '*',
			},
		});

		global.io = io;

		io.on('connection', (socket) => {
			console.log(`Socket connected: ${socket.id}`);

			// Join a room
			socket.on(
				'join_room',
				(data: { roomid: string; userId: string }) => {
					try {
						socket.join(data.roomid);
						console.log(
							`User ${data.userId} joined room ${data.roomid}`
						);
					} catch (err) {
						socket.emit('error', {
							message: 'Failed to join room',
						});
					}
				}
			);

			// Leave a room
			socket.on(
				'leave_room',
				(data: { roomid: string; userId: string }) => {
					try {
						socket.leave(data.roomid);
						console.log(
							`User ${data.userId} left room ${data.roomid}`
						);
					} catch (err) {
						socket.emit('error', {
							message: 'Failed to leave room',
						});
					}
				}
			);

			// Send message event – broadcast to all room members and persist to DB
			socket.on('send_message', async (data: Message) => {
				try {
					// Save the message in Supabase
					await saveMessage(data);
					// Broadcast the message to everyone in the room
					io.to(data.roomid).emit('receive_message', data);
				} catch (err: any) {
					socket.emit('error', {
						message: err.message || 'Failed to send message',
					});
				}
			});

			// Handle reconnection scenario
			socket.on(
				'reconnect_rooms',
				(data: { userId: string; rooms: string[] }) => {
					try {
						data.rooms.forEach((roomid) => {
							socket.join(roomid);
						});
						console.log(
							`User ${
								data.userId
							} rejoined rooms: ${data.rooms.join(', ')}`
						);
					} catch (err) {
						socket.emit('error', {
							message: 'Failed to rejoin rooms',
						});
					}
				}
			);

			// Handle disconnection
			socket.on('disconnect', (reason) => {
				console.log(
					`Socket disconnected: ${socket.id} due to ${reason}`
				);
			});
		});
	}

	return NextResponse.json({ message: 'Socket.IO server initialized' });
}
