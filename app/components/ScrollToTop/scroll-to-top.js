'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './ScrollToTop.module.css';

export default function ScrollToTop({ selector = 'main' }) {
	const [isVisible, setIsVisible] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		const element = document.querySelector(selector);
		if (!element) return;

		const toggleVisibility = () => {
			setIsVisible(element.scrollTop > 300);
		};

		element.addEventListener('scroll', toggleVisibility);
		return () => element.removeEventListener('scroll', toggleVisibility);
	}, [selector]);

	const scrollToTop = () => {
		const element = document.querySelector(selector);
		if (!element) return;

		element.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<button
			onClick={scrollToTop}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`${styles.scrollToTop} ${
				isVisible ? styles.visible : ''
			} ${isHovered ? styles.hovered : ''}`}
			aria-label='Scroll to top'
			title='Scroll to top'
		>
			<ArrowUp size={18} className={styles.icon} />
			<span>Scroll to Top</span>
		</button>
	);
}
