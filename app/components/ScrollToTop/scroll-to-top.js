'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './ScrollToTop.module.css';

export default function ScrollToTop({ selector }) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const mainElement = document.querySelector(selector);
		if (!mainElement) {
			return;
		}

		const toggleVisibility = () => {
			setIsVisible(mainElement.scrollTop > 300);
		};

		mainElement.addEventListener('scroll', toggleVisibility);
		return () =>
			mainElement.removeEventListener('scroll', toggleVisibility);
	}, []);

	const scrollToTop = () => {
		document
			.querySelector('main')
			?.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<button
			onClick={scrollToTop}
			className={`${styles.scrollToTop} ${
				isVisible ? styles.visible : ''
			}`}
		>
			<ArrowUp size={18} />
			<span>Scroll to Top</span>
		</button>
	);
}
