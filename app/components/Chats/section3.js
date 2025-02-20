import { useState, useEffect } from 'react';
import ChatsSidebar from './chats_sidebar';
import ChatsMain from './chats_main.js';
import { connectWebSocket } from '../../utils/chat_socket';
import { useUser } from 'app/userContext';
import styles from './section3.css';

export default function Section3() {
	const [selectedRoom, setSelectedRoom] = useState(null);
	const { user, loading } = useUser();

	useEffect(() => {
		const socket = connectWebSocket();

		return () => {
			if (socket) {
				socket.close();
			}
		};
	}, []);

	if (!user?.id) return <p>Error: User not found</p>;

	return (
		<div className='chatsystem'>
			<ChatsSidebar
				userId={user.id}
				setSelectedRoom={setSelectedRoom}
				selectedRoom={selectedRoom}
			/>
			<ChatsMain selectedRoom={selectedRoom} userId={user.id} />
		</div>
	);
}
