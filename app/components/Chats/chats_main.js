'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { IconSend } from '@tabler/icons-react';
import styles from './chats_main.css';
import { useState, useEffect, useRef } from 'react';

export default function ChatsMain({ selectedRoom, userId }) {
	const [newMessage, setNewMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [userName, setUserName] = useState('');
	const messagesContainerRef = useRef(null);
	const socketRef = useRef(null);

	// Scroll to bottom whenever messages change or room changes
	useEffect(() => {
		if (messagesContainerRef.current) {
			requestAnimationFrame(() => {
				messagesContainerRef.current.scrollTop =
					messagesContainerRef.current.scrollHeight;
			});
		}
	}, [messages, selectedRoom]);

	// Reset and fetch user data and messages when selected room changes
	useEffect(() => {
		setUserName('');
		setMessages([]);

		if (selectedRoom) {
			// Fetch user data
			fetch(`/api/chats/${selectedRoom}/${userId}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error(
							`Network response was not ok: ${response.status}`
						);
					}
					return response.json();
				})
				.then((data) => {
					setUserName(data.userName);
				})
				.catch((error) => {
					console.error('Error fetching user data:', error);
					setUserName('Unknown User');
				});

			// Fetch messages
			fetch(`/api/chats/${selectedRoom}/messages`)
				.then((response) => response.json())
				.then((data) => {
					if (data.messages && Array.isArray(data.messages)) {
						// Sort messages by timestamp before setting state
						const sortedMessages = sortMessagesByTimestamp(
							data.messages
						);
						setMessages(sortedMessages);
					}
				})
				.catch((error) => {
					console.error('Error fetching messages:', error);
				});
		}
	}, [selectedRoom, userId]);

	// Helper function to sort messages by timestamp
	const sortMessagesByTimestamp = (messagesArray) => {
		return [...messagesArray].sort((a, b) => {
			const timeA = new Date(a.timestamp || 0).getTime();
			const timeB = new Date(b.timestamp || 0).getTime();
			return timeA - timeB;
		});
	};

	// WebSocket connection setup
	useEffect(() => {
		if (!selectedRoom) return;

		if (socketRef.current) {
			socketRef.current.close();
		}

		const socket = new WebSocket('wss://acc-website.onrender.com');
		socketRef.current = socket;

		socket.onopen = () => {
			socket.send(
				JSON.stringify({
					type: 'join',
					room: selectedRoom,
				})
			);
		};

		socket.onmessage = (event) => {
			try {
				const receivedMessage = JSON.parse(event.data);
				if (receivedMessage.room === selectedRoom) {
					// Insert the new message in the correct position based on timestamp
					setMessages((prevMessages) => {
						const newMessages = [...prevMessages, receivedMessage];
						return sortMessagesByTimestamp(newMessages);
					});
				}
			} catch (error) {
				console.error('Error parsing WebSocket message:', error);
			}
		};

		socket.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		socket.onclose = (event) => {
			console.log('WebSocket closed:', event.code, event.reason);
		};

		return () => {
			if (socketRef.current) {
				socketRef.current.close();
				socketRef.current = null;
			}
		};
	}, [selectedRoom]);

	// Default view when no room is selected
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

	// Send message function
	const sendMessage = () => {
		if (newMessage.trim() === '') return;
		const timestamp = new Date().toISOString();

		const messageData = {
			room: selectedRoom,
			id: userId,
			content: newMessage,
			timestamp: timestamp,
		};

		fetch(`/api/chats/${selectedRoom}/messages`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(messageData),
		})
			.then((response) => response.json())
			.then((data) => {
				// Add the new message and ensure messages remain sorted
				setMessages((prevMessages) => {
					const newMessages = [...prevMessages, messageData];
					return sortMessagesByTimestamp(newMessages);
				});
				setNewMessage('');

				// Send to WebSocket if open
				if (socketRef.current?.readyState === WebSocket.OPEN) {
					socketRef.current.send(JSON.stringify(messageData));
				}
			})
			.catch((error) => {
				console.error('Error sending message:', error);
			});
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
						transition={{ duration: 0.25 }}
						style={{
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
						}}
					>
						<div className='header'>
							<img
								src={`/api/avatar?name=${encodeURIComponent(
									userName || ''
								)}`}
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
								flex: 1,
								overflow: 'auto',
								padding: '0.75rem',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							{messages.map((msg, index) => {
								const isUser = msg.id === userId;
								return (
									<div
										key={`${msg.id}-${msg.timestamp}-${index}`}
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
						transition={{ duration: 0.25 }}
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
