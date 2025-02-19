import { useState, useEffect } from 'react';
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
				consultantId='23442b1f-e236-460f-b076-51d290a72916'
				setSelectedRoom={setSelectedRoom}
				selectedRoom={selectedRoom}
			/>
			<ChatsMain selectedRoom={selectedRoom} messages={messages} />
		</div>
	);
}
