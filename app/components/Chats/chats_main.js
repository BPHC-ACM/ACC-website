'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { IconUserCircle, IconSend } from '@tabler/icons-react';
import styles from './chats_main.css';
import sampleInfo from './sampleinfo.json';
import { useState, useEffect, useRef } from 'react';

export default function ChatsMain({ selectedRoom }) {
	const [newMessage, setNewMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const messagesContainerRef = useRef(null);

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
			const selectedRoomData = sampleInfo.rooms.find(
				(room) => room.roomid === selectedRoom
			);
			setMessages(selectedRoomData?.messages || []);
		}
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

	const selectedRoomData = sampleInfo.rooms.find(
		(room) => room.roomid === selectedRoom
	);
	const student = selectedRoomData?.student;
	const consultant = selectedRoomData?.consultant;

	const sendMessage = () => {
		if (newMessage.trim() === '') return;

		const newMsg = {
			name: consultant.name,
			content: newMessage,
			timestamp: new Date().toISOString(),
		};

		setMessages((prevMessages) => [...prevMessages, newMsg]);
		setNewMessage('');
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
									student.name
								)}&background=777&color=fff&size=100`}
								alt='User Avatar'
								className='avatar'
							/>
							<div className='user-info'>
								<p className='user-name'>{student.name}</p>
								<p className='user-id'>{student.id}</p>
							</div>
						</div>
						<div
							className='messages-container'
							ref={messagesContainerRef}
							style={{
								maxHeight: '81vh',
								overflowY: 'auto',
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
									const isStudent = msg.name === student.name;
									return (
										<div
											key={index}
											className={`message ${
												isStudent
													? 'student-message'
													: 'professor-message'
											}`}
										>
											{msg.content}

											<span
												className='timestamp'
												style={{
													left: isStudent
														? '0.5rem'
														: 'auto',
													right: isStudent
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
						</div>{' '}
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
