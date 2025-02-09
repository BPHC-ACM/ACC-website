'use client';
import sampleInfo from './sampleinfo.json';
import styles from './chats_sidebar.css';
import { IconUserCircle, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
export default function chats_Sidebar({
	professorId,
	setSelectedRoom,
	selectedRoom,
}) {
	const [searchQuery, setSearchQuery] = useState('');
	const filteredRooms = sampleInfo.rooms.filter(
		(room) => room.consultant.id === professorId
	);
	const searchedRooms = filteredRooms.filter(
		(room) =>
			room.student.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			room.student.id.toLowerCase().includes(searchQuery.toLowerCase())
	);
	return (
		<div className='sidebar'>
			<h2 className='chats_heading'>Chats </h2>
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
							className='chat'
							onClick={() => setSelectedRoom(room.roomid)}
							initial={{
								backgroundColor: '#F4F4F4',
								color: '#222222',
							}}
							whileHover={{
								backgroundColor: '#E0E0E0',
							}}
							animate={{
								backgroundColor:
									selectedRoom === room.roomid
										? '#FFFFFF'
										: '#F4F4F4',
								color:
									selectedRoom === room.roomid
										? '#000000'
										: '#222222',
							}}
							transition={{ duration: 0.2 }}
							style={{
								border: 'none',
								padding: '12px 15px',
								width: '90%',
								marginLeft: '0.75rem',
								cursor: 'pointer',
								borderRadius: '8px',
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
								textAlign: 'left',
								boxShadow:
									selectedRoom === room.roomid
										? '0px 4px 8px rgba(0, 0, 0, 0.1)'
										: 'none',
								transition: 'box-shadow 0.2s ease-in-out',
							}}
						>
							<img
								src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
									room.student.name
								)}&background=cccccc&color=222222`}
								alt={room.student.name}
								style={{
									width: '32px',
									height: '32px',
									borderRadius: '50%',
									flexShrink: 0,
								}}
							/>

							<div style={{ flex: 1 }}>
								<p
									style={{
										margin: '0',
										fontSize: '16px',
										fontWeight: '500',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{room.student.name}
								</p>
								<p
									style={{
										margin: '0',
										fontSize: '14px',
										color: '#666',
									}}
								>
									{room.student.id}
								</p>
							</div>
						</motion.button>
					))}
				</motion.div>
			) : (
				<p>No user found.</p>
			)}
		</div>
	);
}
