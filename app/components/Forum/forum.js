'use client';
import styles from './forum.module.css';
import { useState, useEffect } from 'react';
import { PlusIcon, Search } from 'lucide-react';

export default function Forum() {
	const [queryText, setQueryText] = useState('');
	const [queryTitle, setQueryTitle] = useState('');
	const [queryTags, setQueryTags] = useState('');
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
			title: queryTitle,
			query: queryText,
			tags: queryTags,
		};

		try {
			const response = await fetch('/api/forums', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newQuery),
			});
			const data = await response.json();
			if (!data.success) throw new Error(data.error);

			setQueryText('');
			setQueryTitle('');
			setQueryTags('');
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
							<h3>{query.title}</h3>
							<p>{query.query}</p>
							<div className={styles.answers}>
								{query.answers.map((answer) => (
									<div
										key={answer.timestamp}
										className={styles.answer}
									>
										<p>{answer.answer}</p>
										<span>Answered by {answer.name}</span>
									</div>
								))}
							</div>

							<div className={styles.answerInput}>
								<input
									type='text'
									placeholder='Your answer...'
									value={answerInputs[query.id] || ''}
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
											answerInputs[query.id] || ''
										)
									}
								>
									Post Answer
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={styles.postSection}>
				<h2>Ask a Question</h2>
				<input
					type='text'
					placeholder='Title...'
					value={queryTitle}
					onChange={(e) => setQueryTitle(e.target.value)}
				/>
				<textarea
					placeholder='Description...'
					value={queryText}
					onChange={(e) => setQueryText(e.target.value)}
				/>
				<button onClick={postQuery}>
					<PlusIcon /> Post
				</button>
			</div>
		</div>
	);
}
