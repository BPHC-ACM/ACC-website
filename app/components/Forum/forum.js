'use client';
import styles from './forum.module.css';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PlusIcon, Search, Loader2, MessageSquareText } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from './input';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RedditForum() {
	const [queryText, setQueryText] = useState('');
	const [queryTitle, setQueryTitle] = useState('');
	const [queryTags, setQueryTags] = useState('');
	const [queries, setQueries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [userRole, setUserRole] = useState('student');
	const [answerInputs, setAnswerInputs] = useState({});
	const [page, setPage] = useState(1);
	const questionsPerPage = 5;

	useEffect(() => {
		fetchQueries();
	}, []);

	const fetchQueries = async () => {
		try {
			const { data: queriesData, error: queriesError } = await supabase
				.from('queries')
				.select('*')
				.order('created_at', { ascending: false });

			if (queriesError) throw queriesError;

			const { data: answersData, error: answersError } = await supabase
				.from('answers')
				.select('*');

			if (answersError) throw answersError;

			const mappedQueries = queriesData.map((query) => ({
				...query,
				answers: answersData.filter(
					(answer) => answer.query_id === query.id
				),
			}));

			setQueries(mappedQueries);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const postQuery = async () => {
		if (!queryText.trim() || !queryTitle.trim()) return;

		const newQuery = {
			id: crypto.randomUUID(),
			name: 'Student', // Replace with actual user data from authentication
			title: queryTitle,
			query: queryText,
			tags: queryTags.split(',').map((tag) => tag.trim()),
			created_at: new Date().toISOString(),
			student_id: '2023A8H', // Replace with actual student ID
		};

		const { error } = await supabase.from('queries').insert([newQuery]);
		if (error) console.error(error);
		setQueryText('');
		setQueryTitle('');
		setQueryTags('');
		fetchQueries();
	};

	const postAnswer = async (queryId, answerText) => {
		if (!answerText.trim()) return;

		const newAnswer = {
			query_id: queryId,
			name: 'Professor',
			department: 'CS',
			answer: answerText,
			timestamp: new Date().toISOString(),
		};

		const { error } = await supabase.from('answers').insert([newAnswer]);
		if (error) console.error(error);
		setAnswerInputs((prev) => ({ ...prev, [queryId]: '' }));
		fetchQueries();
	};

	const filteredQueries = queries.filter(
		(q) =>
			q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			q.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
			q.tags.some((tag) =>
				tag.toLowerCase().includes(searchQuery.toLowerCase())
			)
	);

	const totalPages = Math.ceil(filteredQueries.length / questionsPerPage);
	const displayedQueries = filteredQueries.slice(
		(page - 1) * questionsPerPage,
		page * questionsPerPage
	);

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleString();
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.pageTitle}>Recent Questions</h1>

			{/* Role Toggle */}
			<div className={styles.roleToggle}>
				<button
					className={userRole === 'student' ? styles.activeRole : ''}
					onClick={() => setUserRole('student')}
				>
					Student
				</button>
				<button
					className={
						userRole === 'professor' ? styles.activeRole : ''
					}
					onClick={() => setUserRole('professor')}
				>
					Professor
				</button>
			</div>

			{/* Query Input (Visible only for students) */}
			{userRole === 'student' && (
				<div className={styles.inputContainer}>
					<input
						type='text'
						placeholder='Enter your question title...'
						value={queryTitle}
						onChange={(e) => setQueryTitle(e.target.value)}
					/>
					<textarea
						placeholder='Describe your question...'
						value={queryText}
						onChange={(e) => setQueryText(e.target.value)}
					/>
					<input
						type='text'
						placeholder='Tags (comma separated)...'
						value={queryTags}
						onChange={(e) => setQueryTags(e.target.value)}
					/>
					<button className={styles.askButton} onClick={postQuery}>
						<PlusIcon size={16} /> Ask Question
					</button>
				</div>
			)}

			{/* Search Bar */}
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

			{/* Loading & Error Handling */}
			{loading && (
				<div className={styles.loading}>
					<Loader2 className={styles.spinner} size={16} /> Loading
					questions...
				</div>
			)}
			{error && <div className={styles.error}>Error: {error}</div>}

			{/* Queries List */}
			<div className={styles.queryList}>
				{displayedQueries.map((query) => (
					<div key={query.id} className={styles.card}>
						<div className={styles.cardHeader}>
							<h3 className={styles.cardTitle}>{query.title}</h3>
							<p className={styles.cardBody}>{query.query}</p>
							<div className={styles.tags}>
								{query.tags.map((tag, index) => (
									<span key={index} className={styles.tag}>
										{tag}
									</span>
								))}
							</div>
							<p className={styles.author}>
								Asked by {query.name}
							</p>
						</div>

						{/* Answers Section */}
						<div className={styles.answers}>
							{query.answers.map((answer) => (
								<div
									key={answer.timestamp}
									className={styles.answer}
								>
									<p>{answer.answer}</p>
									<span>
										Answered by {answer.name} (
										{answer.department})
									</span>
									<br />
									<span>
										{formatTimestamp(answer.timestamp)}
									</span>
								</div>
							))}
						</div>

						{/* Answer Input (Visible only for professors) */}
						{userRole === 'professor' && (
							<div className={styles.answerInputContainer}>
								<textarea
									className={styles.answerInput}
									placeholder='Write an answer...'
									value={answerInputs[query.id] || ''}
									onChange={(e) =>
										setAnswerInputs({
											...answerInputs,
											[query.id]: e.target.value,
										})
									}
								/>
								<button
									className={styles.answerButton}
									onClick={() =>
										postAnswer(
											query.id,
											answerInputs[query.id] || ''
										)
									}
								>
									<MessageSquareText size={16} /> Post Answer
								</button>
							</div>
						)}
					</div>
				))}
			</div>

			{/* Pagination */}
			<div className={styles.pagination}>
				<button
					className={`${styles.paginationButton} ${
						page === 1 ? styles.disabled : ''
					}`}
					onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					disabled={page === 1}
				>
					<ChevronLeft className={styles.paginationIcon} />
				</button>
				<span>
					Page {page} of {totalPages}
				</span>
				<button
					className={`${styles.paginationButton} ${
						page === totalPages ? styles.disabled : ''
					}`}
					onClick={() =>
						setPage((prev) => Math.min(prev + 1, totalPages))
					}
					disabled={page === totalPages}
				>
					<ChevronRight className={styles.paginationIcon} />
				</button>
			</div>
		</div>
	);
}
