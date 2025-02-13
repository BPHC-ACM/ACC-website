import { useState, useEffect } from 'react';
import Section from '../section';
import ChatsSidebar from './chats_sidebar';
import ChatsMain from './chats_main.js';
import { connectWebSocket } from '../../utils/chat_socket';
import styles from './section3.css';

export default function Section3() {
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const socket = connectWebSocket((newMessage) => {
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		});

		return () => {
			if (socket) {
				socket.close();
			}
		};
	}, []);

	return (
		<div className='chatsystem'>
			<ChatsSidebar
				professorId='fedac3b1-b250-4b56-961b-9700f796ed13'
				setSelectedRoom={setSelectedRoom}
				selectedRoom={selectedRoom}
			/>
			<ChatsMain selectedRoom={selectedRoom} messages={messages} />
		</div>
	);
}
