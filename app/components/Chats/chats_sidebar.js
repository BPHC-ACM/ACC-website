'use client';
import styles from './chats_sidebar.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ChatsSidebar({
	professorId,
	setSelectedRoom,
	selectedRoom,
}) {
	const [searchQuery, setSearchQuery] = useState('');
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		const fetchChatRooms = async () => {
			try {
				const response = await fetch(`/api/chats/user/${professorId}`);
				const data = await response.json();
				if (data.rooms) {
					setRooms(data.rooms);
				} else {
					console.error('No rooms data found');
					setRooms([]);
				}
			} catch (error) {
				console.error('Error fetching chat rooms:', error);
				setRooms([]);
			}
		};

		fetchChatRooms();
	}, [professorId]);

	const filteredRooms = rooms
		? rooms.filter((room) => room.consultant_id === professorId)
		: [];

	const searchedRooms = filteredRooms.filter(
		(room) =>
			room.student_name
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			room.student_id.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className='sidebar'>
			<h2 className='chats-heading'>Chats</h2>

			<input
				type='text'
				placeholder='Search'
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className='searchbox'
			/>

			{searchedRooms.length > 0 ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className='students-container'
				>
					{searchedRooms.map((room) => (
						<motion.button
							key={room.roomid}
							className={`chat ${
								selectedRoom === room.roomid
									? 'selected-chat'
									: ''
							}`}
							onClick={() => setSelectedRoom(room.roomid)}
						>
							<img
								src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
									room.student_name
								)}&background=cccccc&color=222222`}
								alt={room.student_name}
								className='chat-avatar'
							/>

							<div className='chat-info'>
								<p className='chat-name'>{room.student_name}</p>
								<p className='chat-id'>{room.branch}</p>
							</div>
						</motion.button>
					))}
				</motion.div>
			) : (
				<p className='no-users'>No user found.</p>
			)}
		</div>
	);
}