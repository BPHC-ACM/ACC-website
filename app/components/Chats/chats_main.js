'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { IconSend } from '@tabler/icons-react';
import styles from './chats_main.css';
import { useState, useEffect, useRef } from 'react';

export default function ChatsMain({ selectedRoom }) {
	const [newMessage, setNewMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [userName, setUserName] = useState('');
	const messagesContainerRef = useRef(null);
	const socketRef = useRef(null);

	useEffect(() => {
		if (messagesContainerRef.current) {
			requestAnimationFrame(() => {
				messagesContainerRef.current.scrollTop =
					messagesContainerRef.current.scrollHeight;
			});
		}
	}, [messages, selectedRoom]);

	useEffect(() => {
		if (selectedRoom) {
			// Fetch user data (including user name) when a room is selected
			fetch(`/api/chats/${selectedRoom}/username`)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.then((data) => {
					setUserName(data.userName);
				})
				.catch((error) => {
					console.error('Error fetching user data:', error);
				});

			// Fetch chat data from the server
			fetch(`/api/chats/${selectedRoom}/messages`)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.then((data) => {
					setMessages(data.messages || []);
				})
				.catch((error) => {
					console.error('Error fetching chat data:', error);
				});
		}
	}, [selectedRoom]);

	useEffect(() => {
		if (!selectedRoom) return;

		// Ensure old socket is closed before creating a new one
		if (socketRef.current) {
			socketRef.current.close();
		}

		const socket = new WebSocket('ws://localhost:4000');
		socketRef.current = socket;

		socket.onopen = () => {
			console.log(`Connected to room ${selectedRoom}`);
			// Send initial join message if needed
			socket.send(JSON.stringify({ type: 'join', room: selectedRoom }));
		};

		socket.onmessage = (event) => {
			try {
				const receivedMessage = JSON.parse(event.data);
				setMessages((prevMessages) => [
					...prevMessages,
					receivedMessage,
				]);
			} catch (error) {
				console.error('Error parsing WebSocket message:', error);
			}
		};

		socket.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		socket.onclose = () => {
			console.log(`Disconnected from room ${selectedRoom}`);
		};

		return () => {
			if (socketRef.current) {
				socketRef.current.close();
				socketRef.current = null;
			}
		};
	}, [selectedRoom]);

	if (!selectedRoom) {
		return (
			<div className='chat-display' style={{ width: '78%' }}>
				<div className='defaultmsg'>
					<img src='/acc-logo.png' alt='Logo' />
					<p>Your Academic Network, Simplified.</p>
				</div>
			</div>
		);
	}

	const sendMessage = () => {
		if (newMessage.trim() === '') return;

		const messageData = {
			room: selectedRoom,
			name: 'You',
			content: newMessage,
			timestamp: new Date().toISOString(),
		};

		fetch(`/api/chats/${selectedRoom}/messages`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(messageData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(messages);
				setMessages((prevMessages) => [...prevMessages, messageData]); // Add message to local state
				setNewMessage(''); // Clear input field
			})
			.catch((error) => {
				console.error('Error sending message:', error);
			});

		if (socketRef.current?.readyState === WebSocket.OPEN) {
			socketRef.current.send(JSON.stringify(messageData));
		} else {
			console.error('WebSocket not connected');
		}
	};

	return (
		<div className='chat-display' style={{ width: '78%' }}>
			<AnimatePresence mode='wait'>
				{selectedRoom ? (
					<motion.div
						key={selectedRoom}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						style={{
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
						}}
					>
						<div className='header'>
							<img
								src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
									userName
								)}&background=777&color=fff&size=100`}
								alt='User Avatar'
								className='avatar'
							/>
							<div className='user-info'>
								<p className='user-name'>{userName}</p>
							</div>
						</div>
						<div
							className='messages-container'
							ref={messagesContainerRef}
							style={{
								maxHeight: '81vh',
								padding: '0.75rem',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							{messages
								.sort(
									(a, b) =>
										new Date(a.timestamp) -
										new Date(b.timestamp)
								)
								.map((msg, index) => {
									const isUser = msg.name === 'You';
									return (
										<div
											key={index}
											className={`message ${
												isUser
													? 'user-message'
													: 'other-message'
											}`}
										>
											{msg.content}
											<span
												className='timestamp'
												style={{
													left: isUser
														? '0.5rem'
														: 'auto',
													right: isUser
														? 'auto'
														: '0.5rem',
												}}
											>
												{new Date(
													msg.timestamp
												).toLocaleString('en-GB', {
													day: '2-digit',
													month: '2-digit',
													hour: '2-digit',
													minute: '2-digit',
													hour12: false,
												})}
											</span>
											<style jsx>{`
												.message:hover .timestamp {
													opacity: 1;
												}
											`}</style>
										</div>
									);
								})}
						</div>
						<div className='message-input-container'>
							<input
								type='text'
								value={newMessage}
								onChange={(e) => setNewMessage(e.target.value)}
								placeholder='Type a message...'
								className='message-input'
								onKeyDown={(e) =>
									e.key === 'Enter' && sendMessage()
								}
							/>
							<IconSend
								size={25}
								className='send-icon'
								onClick={sendMessage}
							/>
						</div>
					</motion.div>
				) : (
					<motion.div
						key='default'
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className='defaultmsg'
					>
						<img src='/acc-logo.png' alt='Logo' />
						<p>Your Academic Network, Simplified.</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}