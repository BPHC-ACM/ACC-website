'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/userContext';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import LoginButton from '../loginbutton';
import styles from './sidebar.module.css';
import {
	IconUsers,
	IconMessages,
	IconBubbleText,
	IconSchool,
	IconBooks,
	IconLogout,
	IconMenu2,
	IconLayoutSidebarLeftCollapse,
	IconLayoutSidebarLeftExpand,
	IconX,
} from '@tabler/icons-react';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Sidebar({
	setActiveSection,
	isExpanded,
	toggleSidebar,
}) {
	const [activeButton, setActiveButton] = useState(0);
	const { user, loading: userLoading } = useUser();
	const [showLogout, setShowLogout] = useState(false);
	const [identifier, setBranch] = useState(null);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 768);
		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	useEffect(() => {
		setActiveSection('dashboard');
		setActiveButton(0);
	}, []);

	useEffect(() => {
		const fetchIdentifier = async () => {
			if (user && user.email) {
				const table =
					user.role === 'student' ? 'students' : 'consultants';
				const column =
					user.role === 'student' ? 'identifier' : 'department';

				try {
					const { data, error } = await supabase
						.from(table)
						.select(column)
						.eq('email', user.email)
						.single();

					if (error) throw error;
					if (data) setBranch(data[column]);
				} catch (error) {
					console.error(
						`Error fetching ${column} from ${table}:`,
						error.message
					);
					setBranch(null);
				}
			} else {
				setBranch(null);
			}
		};

		if (!userLoading) {
			fetchIdentifier();
		}
	}, [user, userLoading]);

	const handleClick = (sectionName, index) => {
		setActiveSection(sectionName);
		setActiveButton(index);
		setShowLogout(false);

		if (isMobile && typeof toggleSidebar === 'function') {
			toggleSidebar(false);
		}
	};

	const handleLogout = async () => {
		setShowLogout(false);
		await supabase.auth.signOut();

		window.location.reload();
	};

	const handleToggle = (forceState) => {
		if (typeof toggleSidebar === 'function') {
			toggleSidebar(forceState);
		} else {
			console.error(
				'Sidebar: toggleSidebar prop is not a function or not passed correctly.'
			);
		}
	};

	const sections = [
		{
			name: 'Dashboard',
			icon: <IconSchool size={24} className={styles.navIcon} />,
			sectionId: 'dashboard',
		},
		{
			name: 'Messages',
			icon: <IconMessages size={24} className={styles.navIcon} />,
			sectionId: 'messages',
		},
		{
			name: 'Community',
			icon: <IconUsers size={24} className={styles.navIcon} />,
			sectionId: 'community',
		},
		{
			name: user?.role === 'consultant' ? 'Requests' : 'Resources',
			icon:
				user?.role === 'consultant' ? (
					<IconBubbleText size={24} className={styles.navIcon} />
				) : (
					<IconBooks size={24} className={styles.navIcon} />
				),
			sectionId: user?.role === 'consultant' ? 'requests' : 'resources',
		},
	];

	const visibleSections = sections.filter((section) => {
		if (section.sectionId === 'requests' && user?.role !== 'consultant')
			return false;

		if (section.sectionId === 'resources' && user?.role === 'consultant')
			return false;

		return true;
	});

	const sidebarCombinedVariants = {
		expanded: (isMobileCheck) => ({
			// Use custom prop
			// Desktop: Set width, Mobile: Set left to slide in
			width: !isMobileCheck ? '18%' : undefined, // Let CSS handle mobile width
			left: isMobileCheck ? '0%' : '0%',
			transition: { type: 'tween', duration: 0.3, ease: 'easeInOut' },
		}),
		collapsed: (isMobileCheck) => ({
			// Desktop: Set width, Mobile: Set left to slide out
			width: !isMobileCheck ? '80px' : undefined,
			left: isMobileCheck ? '-100%' : '0%',
			transition: { type: 'tween', duration: 0.3, ease: 'easeInOut' },
		}),
	};

	const textVariants = {
		expanded: {
			opacity: 1,
			x: 0,
			display: 'inline',
			transition: { delay: 0.1, duration: 0.2 },
		},
		collapsed: {
			opacity: 0,
			x: -10,
			transitionEnd: { display: 'none' },
			transition: { duration: 0.1 },
		},
	};

	const userDetailsVariants = {
		expanded: { opacity: 1, transition: { delay: 0.15, duration: 0.2 } },
		collapsed: { opacity: 0, transition: { duration: 0.1 } },
	};

	const MobileToggleButton = () => (
		<button
			className={styles.mobileToggleButton}
			onClick={() => handleToggle()}
			aria-label={isExpanded ? 'Close menu' : 'Open menu'}
			aria-expanded={isExpanded}
		>
			{isExpanded ? <IconX size={28} /> : <IconMenu2 size={28} />}
		</button>
	);

	return (
		<>
			{/* Mobile-only elements rendered outside the main nav */}
			{isMobile && <MobileToggleButton />}
			{isMobile && isExpanded && (
				<div
					className={styles.mobileOverlay}
					onClick={() => handleToggle(false)}
				></div>
			)}

			{/* The Sidebar Navigation Element */}
			<motion.nav
				className={`${styles.sidebar} ${
					isExpanded ? styles.expanded : styles.collapsed
				}`}
				animate={isExpanded ? 'expanded' : 'collapsed'}
				custom={isMobile}
				variants={sidebarCombinedVariants}
				initial={false}
				transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
				style={{ position: 'fixed' }}
			>
				{/* 1. Logo Section */}
				<div className={styles.logoContainer}>
					<img
						src='/acc-logo.png'
						width={isExpanded ? 162 : 50}
						height={isExpanded ? 150 : 46}
						alt='ACC Logo'
					/>
				</div>
				{/* 2. Navigation Links Section */}
				<div className={styles.navContainer}>
					{visibleSections.map((section, index) => (
						<motion.div
							key={section.sectionId}
							className={styles.navItemWrapper}
							whileHover={
								isExpanded
									? {
											backgroundColor:
												'rgba(250, 250, 250, 0.1)',
									  }
									: {}
							}
							transition={{ duration: 0.2 }}
							title={!isExpanded ? section.name : ''}
						>
							<button
								className={`${styles.navItem} ${
									activeButton === index ? styles.active : ''
								}`}
								onClick={() =>
									handleClick(section.sectionId, index)
								}
							>
								{section.icon} {/* Icon */}
								{/* Animated Text Label */}
								<motion.span
									className={styles.navItemText}
									variants={textVariants}
									animate={
										isExpanded ? 'expanded' : 'collapsed'
									}
									initial={false}
								>
									{section.name}
								</motion.span>
							</button>
						</motion.div>
					))}
				</div>
				{/* 3. Footer Section (User/Login and Toggle) */}
				<div className={styles.sidebarFooter}>
					{/* Animated Logout Button (appears above user pill) */}
					<AnimatePresence>
						{showLogout && isExpanded && (
							<motion.button
								key='logoutButton'
								className={styles.logoutButton}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								transition={{ duration: 0.2 }}
								onClick={handleLogout}
							>
								<IconLogout size={20} />
								{/* Ensure text animates consistently */}
								<motion.span
									variants={textVariants}
									animate={'expanded'}
									initial={false}
								>
									Logout
								</motion.span>
							</motion.button>
						)}
					</AnimatePresence>

					{/* User Info Pill OR Login Button */}
					{user ? (
						<div className={styles.userContainer}>
							<button
								className={styles.pillButton}
								onClick={() => setShowLogout((prev) => !prev)}
								title={user.name || 'User Profile'}
							>
								{/* User Avatar */}
								<img
									src={`/api/avatar?name=${encodeURIComponent(
										user.name || 'User'
									)}`}
									alt={user.name || 'User Avatar'}
									width={36}
									height={36}
									className={styles.avatar}
								/>
								{/* Animated User Details */}
								<motion.div
									className={styles.userInfo}
									variants={userDetailsVariants}
									animate={
										isExpanded ? 'expanded' : 'collapsed'
									}
									initial={false}
								>
									<span className={styles.name}>
										{user.name}
									</span>
									<span className={styles.identifier}>
										{identifier || ''}
									</span>
								</motion.div>
							</button>
						</div>
					) : (
						<LoginButton isCollapsed={!isExpanded && !isMobile} />
					)}

					{/* 4. Desktop Toggle Button */}
					{!isMobile && (
						<button
							className={styles.desktopToggleButton}
							onClick={() => handleToggle()}
							aria-label={
								isExpanded ? 'Collapse menu' : 'Expand menu'
							}
							aria-expanded={isExpanded}
							title={isExpanded ? 'Collapse' : 'Expand'}
						>
							{/* Switch icon based on state */}
							{isExpanded ? (
								<IconLayoutSidebarLeftCollapse size={24} />
							) : (
								<IconLayoutSidebarLeftExpand size={24} />
							)}
						</button>
					)}
				</div>
				{/* End sidebarFooter */}
			</motion.nav>
		</>
	);
}
