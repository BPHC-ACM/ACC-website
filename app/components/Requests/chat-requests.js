'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './chat-requests.module.css';

const ChatRequestSkeleton = () => (
	<motion.div
		className={`${styles.chatRequest} ${styles.skeleton}`}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5 }}
	>
		<div className={styles.avatar}>
			<div className={styles.skeletonAvatar} />
		</div>
		<div className={styles.content}>
			<div className={styles.skeletonText} />
			<div className={styles.skeletonSubText} />
		</div>
	</motion.div>
);

const ChatRequest = ({
	id,
	name,
	iconurl,
	subject,
	branch,
	cgpa,
	details,
	relativeTime,
	onClick,
}) => {
	return (
		<motion.div
			className={styles.chatRequest}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			onClick={() =>
				onClick({ id, name, iconurl, subject, branch, cgpa, details })
			}
		>
			<div className={styles.avatar}>
				<Image
					src={iconurl || '/placeholder.svg'}
					alt={name}
					width={40}
					height={40}
				/>
			</div>
			<div className={styles.content}>
				<h3 className={styles.name}>{name}</h3>
				<p className={styles.subject}>{subject}</p>
			</div>
			<p className={styles.time}>{relativeTime}</p>
		</motion.div>
	);
};

const ChatRequestModal = ({ request, onClose, onStatusChange }) => {
	if (!request) return null;

	const [loadingStatus, setLoadingStatus] = useState(null);

	const handleStatusUpdate = async (newStatus) => {
		if (!request.id) {
			console.error('Request ID is missing!');
			return;
		}

		setLoadingStatus(newStatus);
		try {
			const response = await fetch('/api/chat-requests', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: request.id, status: newStatus }),
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || 'Failed to update request');
			}

			onStatusChange(request.id, newStatus);
			onClose();
		} catch (error) {
			console.error('Error updating status:', error);
		} finally {
			setLoadingStatus(null);
		}
	};

	return (
		<div className={styles.modalBackground} onClick={onClose}>
			<div
				className={styles.modalContainer}
				onClick={(e) => e.stopPropagation()}
			>
				<button className={styles.closeButton} onClick={onClose}>
					&times;
				</button>

				<div className={styles.modalRow}>
					<Image
						src={request.iconurl || '/placeholder.svg'}
						alt={request.name}
						width={60}
						height={60}
						className={styles.modalAvatar}
					/>
					<div>
						<h3 className={styles.modalHeader}>{request.name}</h3>
						{(request.branch || request.cgpa) && (
							<p className={styles.modalSubHeader}>
								{request.branch ? `${request.branch}` : ''}
								{request.branch && request.cgpa ? ' | ' : ''}
								{request.cgpa !== undefined
									? `CGPA: ${request.cgpa.toFixed(1)}`
									: ''}
							</p>
						)}
					</div>
				</div>

				<div className={styles.modalContent}>
					<h3 className={styles.subject}>{request.subject}</h3>
					{request.details ? (
						<p className={styles.details}>{request.details}</p>
					) : (
						<p className={styles.detailsPlaceholder}>
							No additional details provided.
						</p>
					)}
				</div>

				<div className={styles.modalActions}>
					<motion.button
						className={styles.rejectButton}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => handleStatusUpdate('declined')}
						disabled={loadingStatus === 'declined'}
					>
						Decline
					</motion.button>

					<motion.button
						className={styles.acceptButton}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => handleStatusUpdate('accepted')}
						disabled={loadingStatus === 'accepted'}
					>
						Accept
					</motion.button>
				</div>
			</div>
		</div>
	);
};

export default function ChatRequests() {
	const [requests, setRequests] = useState([]);
	const [totalRequests, setTotalRequests] = useState(0);
	const [loading, setLoading] = useState(true);
	const [selectedRequest, setSelectedRequest] = useState(null);
	const [showPastRequests, setShowPastRequests] = useState(false);
	const [pastRequests, setPastRequests] = useState([]);

	const fetchPastRequests = async () => {
		try {
			const response = await fetch('/api/chat-requests/past');
			if (!response.ok) throw new Error('Failed to fetch past requests');

			const data = await response.json();
			setPastRequests(data.requests);
			setShowPastRequests(true);
		} catch (error) {
			console.error('Error fetching past requests:', error);
		}
	};

	useEffect(() => {
		const fetchChatRequests = async () => {
			try {
				const response = await fetch('/api/chat-requests');
				const data = await response.json();
				setRequests(data.requests);
				setTotalRequests(data.totalRequests);
			} catch (error) {
				console.error('Error fetching chat requests:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchChatRequests();
	}, []);

	const handleStatusChange = (id, newStatus) => {
		setRequests((prevRequests) =>
			prevRequests
				.filter(
					(request) =>
						!(
							request.id === id &&
							(newStatus === 'accepted' ||
								newStatus === 'declined')
						)
				)
				.map((request) =>
					request.id === id
						? { ...request, status: newStatus }
						: request
				)
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>Incoming Requests</h2>
				<button
					className={styles.pastRequestsButton}
					onClick={fetchPastRequests}
				>
					Past Requests
				</button>
			</div>
			<div className={styles.requestsContainer}>
				{loading
					? Array.from({ length: 3 }).map((_, index) => (
							<ChatRequestSkeleton key={index} />
					  ))
					: requests.map((request) => (
							<ChatRequest
								key={request.id}
								id={request.id}
								name={request.name}
								iconurl={request.iconurl}
								subject={request.subject}
								branch={request.branch}
								cgpa={request.cgpa}
								details={request.details}
								relativeTime={request.relativeTime}
								onClick={setSelectedRequest}
							/>
					  ))}
			</div>

			{selectedRequest && (
				<ChatRequestModal
					request={selectedRequest}
					onClose={() => setSelectedRequest(null)}
					onStatusChange={handleStatusChange}
				/>
			)}

			{showPastRequests && (
				<div
					className={styles.modalBackground}
					onClick={() => setShowPastRequests(false)}
				>
					<div
						className={styles.modalContainer}
						onClick={(e) => e.stopPropagation()}
					>
						<h3 className={styles.modalHeader}>Past Requests</h3>
						<button
							className={styles.closeButton}
							onClick={() => setShowPastRequests(false)}
						>
							&times;
						</button>

						<div className={styles.pastRequestsList}>
							{pastRequests.length > 0 ? (
								pastRequests.map((request) => (
									<div
										key={request.id}
										className={styles.requestCard}
									>
										<div className={styles.requestHeader}>
											<img
												src={request.iconurl}
												alt={request.name}
												className={styles.avatar}
											/>
											<div className={styles.requestInfo}>
												<h4 className={styles.name}>
													{request.name}
												</h4>
											</div>
											<span
												className={`${
													styles.statusTag
												} ${styles[request.status]}`}
											>
												{request.status}
											</span>
										</div>

										<div className={styles.requestDetails}>
											<p className={styles.subject}>
												{request.subject}
											</p>
											<span className={styles.time}>
												{request.relativeTime}
											</span>
										</div>
									</div>
								))
							) : (
								<p className={styles.noRequests}>
									No past requests found.
								</p>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
