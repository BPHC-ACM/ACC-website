'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/userContext';
import { AnimatePresence } from 'framer-motion';
import Section1 from './Dashboard/section1';
import Section2 from './Requests/section2';
import Section3 from './Chats/section3';
import Section4 from './Forum/section4';
import Section5 from './Resources/section5';
import Sidebar from './Sidebar/sidebar';
import pageStyles from '../page.module.css';
import ScrollToTop from './ScrollToTop/scroll-to-top';

export default function HomeContent() {
	const [activeSection, setActiveSection] = useState('dashboard');

	const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const { user, loading } = useUser();

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 768);
		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const toggleSidebar = (forceState) => {
		setIsSidebarExpanded((prevState) =>
			typeof forceState === 'boolean' ? forceState : !prevState
		);
	};

	const renderSection = () => {
		if (loading) {
			return <div>Loading...</div>;
		}

		switch (activeSection) {
			case 'dashboard':
				return <Section1 key='dashboard' />;
			case 'messages':
				return <Section3 key='messages' />;
			case 'community':
				return <Section4 key='community' />;
			case 'resources':
				return user?.role === 'consultant' ? (
					<Section2 key='requests' />
				) : (
					<Section5 key='resources' />
				);
			default:
				return <Section1 key='dashboard' />;
		}
	};

	const getMainContentClass = () => {
		if (isMobile) {
			return pageStyles.mainMobile;
		}

		return isSidebarExpanded
			? pageStyles.mainExpanded
			: pageStyles.mainCollapsed;
	};

	return (
		<div
			className={`${pageStyles.content} ${
				isMobile && isSidebarExpanded
					? pageStyles.mobileSidebarOpen
					: ''
			}`}
		>
			<Sidebar
				setActiveSection={setActiveSection}
				isExpanded={isSidebarExpanded}
				toggleSidebar={toggleSidebar}
			/>
			{/* Apply dynamic class to main */}
			<main className={`${pageStyles.main} ${getMainContentClass()}`}>
				<AnimatePresence mode='wait'>{renderSection()}</AnimatePresence>
				<ScrollToTop selector={'main'} />
			</main>
		</div>
	);
}
