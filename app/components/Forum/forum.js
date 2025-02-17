'use client';
import styles from './forum.module.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
	PlusIcon,
	CirclePlusIcon,
	MessageSquareIcon,
	SendIcon,
	Search,
} from 'lucide-react';
import { TextField, Button, Chip, Box } from '@mui/material';

export function SkeletonThread() {
	return (
		<div className={styles.skeletonThread}>
			<div className={styles.skeletonHeader}>
				<div className={styles.skeletonAvatar}></div>
				<div
					className={styles.skeletonText}
					style={{ width: '50%' }}
				></div>
			</div>
			<div className={styles.skeletonText} style={{ width: '80%' }}></div>
			<div className={styles.skeletonText} style={{ width: '60%' }}></div>
		</div>
	);
}

export default function Forum() {
	const [query, setQuery] = useState({
		title: '',
		text: '',
		tags: [],
	});
	const [queries, setQueries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [answerInputs, setAnswerInputs] = useState({});
	const [tagInput, setTagInput] = useState('');

	const fetchQueries = useCallback(async () => {
		try {
			const response = await fetch('/api/forums');
			if (!response.ok) throw new Error('Failed to fetch queries');

			const data = await response.json();
			if (!data.success) throw new Error(data.error);

			setQueries(data.data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchQueries();
	}, [fetchQueries]);

	const postQuery = async () => {
		if (!query.text.trim() || !query.title.trim()) return;

		const newQuery = {
			title: query.title,
			query: query.text,
			tags: query.tags,
		};

		try {
			const response = await fetch('/api/forums', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newQuery),
			});
			const data = await response.json();
			if (!data.success) throw new Error(data.error);

			setQuery({ title: '', text: '', tags: [] });
			fetchQueries();
		} catch (error) {
			console.error(error);
		}
	};

	const postAnswer = async (queryId, answerText) => {
		if (!answerText.trim()) return;

		try {
			const response = await fetch('/api/forums', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query_id: queryId, answer: answerText }),
			});
			const data = await response.json();
			if (!data.success) throw new Error(data.error);

			setAnswerInputs((prev) => ({ ...prev, [queryId]: '' }));
			fetchQueries();
		} catch (error) {
			console.error(error);
		}
	};

	const filteredQueries = useMemo(() => {
		if (!searchQuery.trim()) return queries;

		const lowerSearch = searchQuery.toLowerCase();
		return queries.filter(
			(q) =>
				q.title.toLowerCase().includes(lowerSearch) ||
				q.query.toLowerCase().includes(lowerSearch) ||
				q.tags.some((tag) => tag.toLowerCase().includes(lowerSearch))
		);
	}, [queries, searchQuery]);

	return (
		<div className={styles.forumLayout}>
			<Box className={styles.threadSection}>
				<h1 className={styles.pageTitle}>Recent Questions</h1>

				<div className={styles.searchContainer}>
					<div className={styles.searchWrapper}>
						<Search className={styles.searchIcon} size={16} />
						<input
							className={styles.searchInput}
							type='text'
							placeholder='Search questions...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>

				<div className={styles.queryList}>
					{loading ? (
						<>
							<SkeletonThread />
							<SkeletonThread />
							<SkeletonThread />
						</>
					) : (
						filteredQueries.map((query) => (
							<div key={query.id} className={styles.thread}>
								<div className={styles.threadHeader}>
									<img
										src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
											query.name
										)}&background=777&color=fff&size=100`}
										alt='User Avatar'
										className={styles.avatar}
									/>
									<div className={styles.threadInfo}>
										<h3>{query.title}</h3>
										<p className={styles.meta}>
											{query.name}{' '}
											<span className={styles.identifier}>
												{query.identifier}
											</span>
										</p>
									</div>
								</div>

								<p className={styles.threadText}>
									{query.query}
								</p>

								<div className={styles.threadReplies}>
									{query.answers.map((answer) => (
										<div
											key={answer.id}
											className={styles.answer}
										>
											<div
												className={styles.answerHeader}
											>
												<h5 className={styles.meta}>
													{answer.name}{' '}
													<span
														className={
															styles.identifier
														}
													>
														{answer.identifier}
													</span>
												</h5>
											</div>
											<div
												className={styles.answerContent}
											>
												<p>{answer.answer}</p>
											</div>
										</div>
									))}
								</div>

								<div className={styles.threadActions}>
									<button
										className={styles.commentButton}
										onClick={() =>
											setAnswerInputs((prev) => {
												const isOpen = query.id in prev;
												if (isOpen) {
													const newState = {
														...prev,
													};
													delete newState[query.id];
													return newState;
												}
												return {
													...prev,
													[query.id]: '',
												};
											})
										}
									>
										<MessageSquareIcon fontSize='small' />
									</button>
									<button
										className={styles.plusButton}
										onClick={() => {}}
									>
										<CirclePlusIcon />
									</button>
								</div>

								{answerInputs.hasOwnProperty(query.id) && (
									<div
										className={styles.answerInputContainer}
									>
										<input
											type='text'
											placeholder='Your answer...'
											value={answerInputs[query.id]}
											onChange={(e) =>
												setAnswerInputs((prev) => ({
													...prev,
													[query.id]: e.target.value,
												}))
											}
										/>
										<button
											onClick={() =>
												postAnswer(
													query.id,
													answerInputs[
														query.id
													]?.trim()
												)
											}
										>
											<SendIcon size={20} />
										</button>
									</div>
								)}
							</div>
						))
					)}
				</div>
			</Box>

			<Box className={styles.postSection}>
				<h2>Ask a Question</h2>

				<TextField
					label='Title'
					variant='outlined'
					fullWidth
					value={query.title}
					onChange={(e) =>
						setQuery((prev) => ({ ...prev, title: e.target.value }))
					}
					inputProps={{ maxLength: 100 }}
				/>

				<TextField
					label='Description'
					variant='outlined'
					fullWidth
					multiline
					minRows={4}
					value={query.text}
					onChange={(e) =>
						setQuery((prev) => ({ ...prev, text: e.target.value }))
					}
					inputProps={{ maxLength: 500 }}
				/>

				<TextField
					label='Add Tags (Press Enter)'
					variant='outlined'
					fullWidth
					value={tagInput}
					onChange={(e) => setTagInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && tagInput.trim()) {
							const newTag = tagInput
								.trim()
								.toLowerCase()
								.replace(/\b\w/g, (char) => char.toUpperCase());

							if (!query.tags.includes(newTag)) {
								setQuery((prev) => ({
									...prev,
									tags: [...prev.tags, newTag],
								}));
							}
							setTagInput('');
						}
					}}
				/>

				<Box className={styles.tagContainer}>
					{query.tags.map((tag, index) => (
						<Chip
							key={index}
							label={tag}
							onDelete={() =>
								setQuery((prev) => ({
									...prev,
									tags: prev.tags.filter((t) => t !== tag),
								}))
							}
						/>
					))}
				</Box>

				<Button
					variant='contained'
					color='primary'
					fullWidth
					startIcon={<PlusIcon />}
					onClick={postQuery}
				>
					Post Question
				</Button>
			</Box>
		</div>
	);
}
