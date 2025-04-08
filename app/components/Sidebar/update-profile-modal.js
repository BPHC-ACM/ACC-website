'use client';
import React, { useState, useEffect } from 'react';
import styles from './update-profile-modal.module.css';
import { IconX } from '@tabler/icons-react';

export default function UpdateProfileModal({
	isOpen,
	onClose,
	studentId,
	onUpdateSuccess,
}) {
	const [branch, setBranch] = useState('');
	const [cgpa, setCgpa] = useState('');
	const [batch, setBatch] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	useEffect(() => {
		if (isOpen) {
			setBranch('');
			setCgpa('');
			setBatch('');
			setError(null);
			setSuccess(null);
			setIsLoading(false);
		}
	}, [isOpen, studentId]);

	if (!isOpen) return null;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		if (!branch || !cgpa || !batch) {
			setError('All fields are required.');
			return;
		}

		const parsedCgpa = parseFloat(cgpa);
		if (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10) {
			setError('Please enter a valid CGPA between 0 and 10.');
			return;
		}

		if (!/^\d{4}$/.test(batch)) {
			setError('Please enter a valid 4-digit batch year.');
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch('/api/students', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					studentid: studentId,
					branch: branch.toUpperCase(),
					cgpa: parsedCgpa,
					batch: batch,
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to update profile.');
			}

			setSuccess('Profile updated successfully!');
			if (onUpdateSuccess) {
				onUpdateSuccess();
			}

			setTimeout(() => {
				onClose();
			}, 1500);
		} catch (err) {
			setError(err.message || 'An unexpected error occurred.');
			console.error('Update error:', err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeButton} onClick={onClose}>
					<IconX size={24} />
				</button>
				<h2>Update Your Profile</h2>
				<p className={styles.instructions}>
					Enter your current academic details. This helps connect you
					with the right resources.
				</p>
				<form onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label htmlFor='batch'>Batch (Year, e.g., 2023)</label>
						<input
							type='text'
							id='batch'
							value={batch}
							onChange={(e) => setBatch(e.target.value)}
							placeholder='YYYY'
							required
							maxLength={4}
							pattern='\d{4}'
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='branch'>
							Branch Code (e.g., A7, B4A7)
						</label>
						<input
							type='text'
							id='branch'
							value={branch}
							onChange={(e) =>
								setBranch(e.target.value.toUpperCase())
							}
							placeholder='e.g., A7 or B4A7'
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='cgpa'>Current CGPA</label>
						<input
							type='number'
							id='cgpa'
							value={cgpa}
							onChange={(e) => setCgpa(e.target.value)}
							placeholder='e.g., 8.75'
							required
							step='0.01'
							min='0'
							max='10'
						/>
					</div>

					{error && <p className={styles.errorMessage}>{error}</p>}
					{success && (
						<p className={styles.successMessage}>{success}</p>
					)}

					<button
						type='submit'
						disabled={isLoading}
						className={styles.submitButton}
					>
						{isLoading ? 'Updating...' : 'Update Profile'}
					</button>
				</form>
			</div>
		</div>
	);
}
