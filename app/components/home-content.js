'use client';
import { useUser } from 'app/userContext';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Section1 from './Dashboard/section1';
import Section2 from './Requests/section2';
import Section3 from './Chats/section3';
import Section4 from './Forum/section4';
import Section5 from './Resources/section5';
import Sidebar from './Sidebar/sidebar';
import styles from '../page.module.css';
import Footer from './Footer/footer';
import ScrollToTop from './ScrollToTop/scroll-to-top';

export default function HomeContent() {
	const [activeSection, setActiveSection] = useState('section1');
	const { user, loading } = useUser();

	const renderSection = () => {
		switch (activeSection) {
			case 'dashboard':
				return <Section1 key='dashboard' />;
			case 'messages':
				return <Section3 key='messages' />;
			case 'community':
				return <Section4 key='community' />;
			case 'requests':
				return <Section2 key='requests' />;
			case 'resources':
				return <Section5 key='resources' />;
			default:
				return <Section1 key='dashboard' />;
		}
	};

	return (
		<div className={styles.content}>
			<Sidebar setActiveSection={setActiveSection} />
			<main className={styles.main}>
				<AnimatePresence mode='wait'>{renderSection()}</AnimatePresence>
				<Footer />
				<ScrollToTop selector={'main'} />
			</main>
		</div>
	);
}
