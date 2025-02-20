'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './chat-requests.module.css';
import ScrollToTop from '../ScrollToTop/scroll-to-top';

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
	subject,
	branch,
	cgpa,
	details,
	relativeTime,
	student_id,
	consultant_id,
	onClick,
}) => {
	const iconurl = `/api/avatar?name=${encodeURIComponent(name || '')}`;

	return (
		<motion.div
			className={styles.chatRequest}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			onClick={() =>
				onClick({
					id,
					name,
					iconurl,
					subject,
					branch,
					cgpa,
					details,
					student_id,
					consultant_id,
				})
			}
		>
			<div className={styles.avatar}>
				<Image
					src={iconurl}
					alt={name}
					width={40}
					height={40}
					unoptimized
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
				body: JSON.stringify({
					id: request.id,
					status: newStatus,
					consultant_id: request.consultant_id,
					student_id: request.student_id,
				}),
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
		<div
			className={styles.modalBackground}
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<div
				className={styles.modalContainer}
				onClick={(e) => e.stopPropagation()}
			>
				<button className={styles.closeButton} onClick={onClose}>
					&times;
				</button>

				<div className={styles.modalRow}>
					<Image
						src={`/api/avatar?name=${encodeURIComponent(
							request.name || ''
						)}`}
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
								{typeof request.cgpa === 'number'
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
						disabled={loadingStatus !== null}
					>
						{loadingStatus === 'declined' ? (
							<>
								<span className={styles.loader}></span>{' '}
								Declining...
							</>
						) : (
							'Decline'
						)}
					</motion.button>

					<motion.button
						className={styles.acceptButton}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => handleStatusUpdate('accepted')}
						disabled={loadingStatus !== null}
					>
						{loadingStatus === 'accepted' ? (
							<>
								<span className={styles.loader}></span>{' '}
								Accepting...
							</>
						) : (
							'Accept'
						)}
					</motion.button>
				</div>
			</div>
		</div>
	);
};

const NotificationPopup = ({ message, type, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(onClose, 3000);
		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<motion.div
			className={`${styles.notificationPopup} ${
				type === 'success'
					? styles.notificationSuccess
					: styles.notificationError
			}`}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
		>
			{message}
		</motion.div>
	);
};
export default function ChatRequests() {
	const [notification, setNotification] = useState(null);
	const [requests, setRequests] = useState([]);
	const [totalRequests, setTotalRequests] = useState(0);
	const [loading, setLoading] = useState(true);
	const [selectedRequest, setSelectedRequest] = useState(null);
	const [showPastRequests, setShowPastRequests] = useState(false);
	const [pastRequests, setPastRequests] = useState([]);

	const fetchPastRequests = async () => {
		if (pastRequests.length > 0) {
			setShowPastRequests(true);
			return;
		}
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

		setNotification({
			message:
				newStatus === 'accepted'
					? 'Chat request accepted!'
					: 'Chat request declined.',
			type: newStatus === 'accepted' ? 'success' : 'error',
		});

		setTimeout(() => setNotification(null), 3000);
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

			{notification && (
				<NotificationPopup
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification(null)}
				/>
			)}

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
								student_id={request.student_id}
								consultant_id={request.consultant_id}
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
											<Image
												src={`/api/avatar?name=${encodeURIComponent(
													request.name || ''
												)}`}
												alt={request.name}
												className={styles.avatar}
												width={40}
												height={40}
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
			<ScrollToTop selector={'[class*="requestsContainer"]'} />
		</div>
	);
}
