'use client';

import { IconUserCircle, IconSend } from '@tabler/icons-react';
import styles from './chats_main.css';
import sampleInfo from './sampleinfo.json';
import { useState, useEffect, useRef } from 'react';

export default function ChatsMain({ selectedRoom }) {
	const [newMessage, setNewMessage] = useState('');
	const [messages, setMessages] = useState([]); // Start with an empty array
	const messagesContainerRef = useRef(null);

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	}, [messages]);

	useEffect(() => {
		if (selectedRoom) {
			const selectedRoomData = sampleInfo.rooms.find(
				(room) => room.roomid === selectedRoom
			);
			setMessages(selectedRoomData?.messages || []);
		}
	}, [selectedRoom]); // Update messages when selectedRoom changes

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
		if (newMessage.trim() === '') return; // Don't send empty messages

		const newMsg = {
			name: consultant.name,
			content: newMessage,
			timestamp: new Date().toISOString(),
		};

		setMessages((prevMessages) => [...prevMessages, newMsg]); // Append new message to state
		setNewMessage(''); // Clear input box
	};

	return (
		<div className='chat-display' style={{ width: '78%' }}>
			<div className='header'>
				<IconUserCircle size={50} />
				<div>
					<p>{student.name}</p>
					<p>{student.id}</p>
				</div>
			</div>

			{/* Messages Container */}
			<div
				className='messages-container'
				ref={messagesContainerRef}
				style={{
					maxHeight: '80vh',
					overflowY: 'auto',
					padding: '0.5rem',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{messages
					.sort(
						(a, b) => new Date(a.timestamp) - new Date(b.timestamp)
					)
					.map((msg, index) => (
						<div
							key={index}
							className={
								msg.name === student.name
									? 'message student-message'
									: 'message professor-message'
							}
							style={{
								padding: '10px',
								borderRadius: '10px',
								marginBottom: '10px',
								alignSelf:
									msg.name === student.name
										? 'flex-start'
										: 'flex-end',
								backgroundColor:
									msg.name === student.name
										? '#000000'
										: '#e8e6e6',
								color:
									msg.name === student.name
										? '#ffffff'
										: '#000000',
							}}
						>
							{msg.content}
							<br />
							<span style={{ fontSize: '12px', color: 'gray' }}>
								{new Date(msg.timestamp).toLocaleString()}
							</span>
						</div>
					))}
			</div>

			{/* Message Input & Send Button */}
			<div
				className='message-input-container'
				style={{ display: 'flex', padding: '10px' }}
			>
				<input
					type='text'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder='Type a message...'
					className='message-input glass'
					style={{
						flex: 1,
						padding: '10px',
						outline: 'none',
					}}
					onKeyDown={(e) => e.key === 'Enter' && sendMessage()} // Allow sending with Enter key
				/>
				<IconSend
					size={25}
					color='#e8e6e6'
					style={{
						marginLeft: '0.5rem',
						cursor: 'pointer',
						paddingTop: '0.5rem',
					}}
					onClick={sendMessage}
				/>
			</div>
		</div>
	);
}
