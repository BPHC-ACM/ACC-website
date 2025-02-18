'use client';
import styles from './forum.module.css';
import { useState, useEffect } from 'react';
import {
	PlusIcon,
	CirclePlusIcon,
	MessageSquareIcon,
	SendIcon,
	Search,
	MessageSquareDiffIcon,
} from 'lucide-react';

export default function Forum() {
	const [query, setQuery] = useState({
		title: '',
		text: '',
		tags: '',
	});
	const [queries, setQueries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [answerInputs, setAnswerInputs] = useState({});

	useEffect(() => {
		fetchQueries();
	}, []);

	const fetchQueries = async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/forums');
			const data = await response.json();
			if (!data.success) throw new Error(data.error);
			setQueries(data.data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const postQuery = async () => {
		if (!queryText.trim() || !queryTitle.trim()) return;

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

			setQuery({ title: '', text: '', tags: '' });
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

	const filteredQueries = queries.filter(
		(q) =>
			q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			q.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
			q.tags.some((tag) =>
				tag.toLowerCase().includes(searchQuery.toLowerCase())
			)
	);

	return (
		<div className={styles.forumLayout}>
			<div className={styles.threadSection}>
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
					{filteredQueries.map((query) => (
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
										<span className={styles.studentId}>
											{query.student_id}
										</span>
									</p>
								</div>
							</div>

							<p className={styles.threadText}>{query.query}</p>

							<div className={styles.threadReplies}>
								{query.answers.map((answer) => (
									<div
										key={answer.id}
										className={styles.answer}
									>
										<img
											src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
												answer.name
											)}&background=999&color=fff&size=80`}
											alt='User Avatar'
											className={styles.answerAvatar}
										/>
										<div className={styles.answerContent}>
											<h4 className={styles.answerAuthor}>
												{answer.name}
											</h4>
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
												const newState = { ...prev };
												delete newState[query.id];
												return newState;
											}
											return { ...prev, [query.id]: '' };
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
								<div className={styles.answerInputContainer}>
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
												answerInputs[query.id].trim()
											)
										}
									>
										<SendIcon size={20} />
									</button>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			<div className={styles.postSection}>
				<h2>Ask a Question</h2>
				<input
					type='text'
					placeholder='Title...'
					value={query.title}
					onChange={(e) =>
						setQuery((prev) => ({ ...prev, title: e.target.value }))
					}
				/>
				<textarea
					placeholder='Description...'
					value={query.text}
					onChange={(e) =>
						setQuery((prev) => ({ ...prev, text: e.target.value }))
					}
				/>
				<textarea
					placeholder='Tags... (comma separated)'
					value={query.tags}
					onChange={(e) =>
						setQuery((prev) => ({ ...prev, tags: e.target.value }))
					}
				/>
				<button onClick={postQuery}>
					<PlusIcon /> Post
				</button>
			</div>
		</div>
	);
}
