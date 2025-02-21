'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { IconSend } from '@tabler/icons-react';
import styles from './chats_main.css';
import { useState, useEffect, useRef } from 'react';

export default function ChatsMain({ selectedRoom, userId }) {
	const [newMessage, setNewMessage] = useState('');
	const [sentMessageIds, setSentMessageIds] = useState(new Set());
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
		if (messagesContainerRef.current) {
			setTimeout(() => {
				messagesContainerRef.current.scrollTop =
					messagesContainerRef.current.scrollHeight;
			}, 10);
		}
	}, [messages, selectedRoom]);

	useEffect(() => {
		setUserName('');
		setMessages([]);

		if (selectedRoom) {
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

			fetch(`/api/chats/${selectedRoom}/messages`)
				.then((response) => response.json())
				.then((data) => {
					if (data.messages && Array.isArray(data.messages)) {
						setMessages(data.messages);
					}
				})
				.catch((error) => {
					console.error('Error fetching messages:', error);
				});
		}
	}, [selectedRoom, userId]);

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
					setMessages((prevMessages) => {
						return [...prevMessages, receivedMessage];
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

		const messageId = `${userId}-${Date.now()}`;
		const messageData = {
			messageId,
			room: selectedRoom,
			id: userId,
			content: newMessage,
			timestamp: new Date().toISOString(),
		};

		setSentMessageIds((prev) => new Set(prev).add(messageId));
		fetch(`/api/chats/${selectedRoom}/messages`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(messageData),
		})
			.then((response) => response.json())
			.then((data) => {
				setMessages((prevMessages) => [...prevMessages, messageData]);
				setNewMessage('');

				if (socketRef.current?.readyState === WebSocket.OPEN) {
					socketRef.current.send(JSON.stringify(messageData));
				}
			})
			.catch((error) => {
				console.error('Error sending message:', error);
			});
	};

	useEffect(() => {
		const handleWebSocketMessage = (event) => {
			try {
				const data = JSON.parse(event.data);

				if (data.messageId && sentMessageIds.has(data.messageId)) {
					return;
				}

				setMessages((prevMessages) => [...prevMessages, data]);
			} catch (error) {
				console.error('Error processing WebSocket message:', error);
			}
		};

		if (socketRef.current) {
			socketRef.current.addEventListener(
				'message',
				handleWebSocketMessage
			);
		}

		return () => {
			if (socketRef.current) {
				socketRef.current.removeEventListener(
					'message',
					handleWebSocketMessage
				);
			}
		};
	}, [sentMessageIds]);

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
							{messages
								.sort(
									(a, b) =>
										new Date(a.timestamp) -
										new Date(b.timestamp)
								)
								.map((msg, index) => {
									const isUser = msg.id === userId;
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
