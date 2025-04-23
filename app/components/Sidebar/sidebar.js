'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '@/context/userContext';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/utils/supabaseClient';
import UpdateProfileModal from './update-profile-modal';
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
	IconUserEdit,
} from '@tabler/icons-react';

export default function Sidebar({
	setActiveSection,
	activeSection,
	isExpanded,
	toggleSidebar,
}) {
	const { user, loading: userLoading } = useUser();
	const [showUserActions, setShowUserActions] = useState(false);
	const [identifier, setIdentifier] = useState(null);
	const [isMobile, setIsMobile] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 768);
		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const fetchIdentifier = useCallback(async () => {
		if (user && user.email) {
			const table = user.role === 'student' ? 'students' : 'consultants';
			const column =
				user.role === 'student' ? 'identifier' : 'department';

			try {
				const { data, error } = await supabase
					.from(table)
					.select(column)
					.eq('email', user.email)
					.single();

				if (error && error.code !== 'PGRST116') {
					throw error;
				}
				if (data) {
					setIdentifier(data[column]);
				} else {
					setIdentifier(
						user.role === 'student' ? 'Update Profile' : user.role
					);
				}
			} catch (error) {
				console.error(
					`Error fetching ${column} from ${table}:`,
					error.message
				);
				setIdentifier(
					user.role === 'student' ? 'Update Profile' : user.role
				);
			}
		} else {
			setIdentifier(null);
		}
	}, [user]);

	useEffect(() => {
		if (!userLoading && user) {
			fetchIdentifier();
		} else if (!user) {
			setIdentifier(null);
		}
	}, [user, userLoading, fetchIdentifier]);

	const handleClick = (sectionName) => {
		setActiveSection(sectionName);
		setShowUserActions(false);

		if (isMobile && typeof toggleSidebar === 'function') {
			toggleSidebar(false);
		}
	};

	const handleLogout = async () => {
		setShowUserActions(false);
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;

			window.location.reload();
		} catch (error) {
			console.error('Error logging out:', error.message);
		}
	};

	const handleOpenUpdateModal = () => {
		setIsUpdateModalOpen(true);
		setShowUserActions(false);
	};

	const handleCloseUpdateModal = () => {
		setIsUpdateModalOpen(false);
	};

	const handleUpdateSuccess = () => {
		fetchIdentifier();
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
		if (section.sectionId === 'requests' && user?.role !== 'consultant') {
			return false;
		}
		if (section.sectionId === 'resources' && user?.role === 'consultant') {
			return false;
		}
		return true;
	});

	const sidebarCombinedVariants = {
		expanded: (isMobileCheck) => ({
			width: !isMobileCheck ? '18%' : '70%',
			left: isMobileCheck ? '0%' : '0%',
			transition: { type: 'tween', duration: 0.3, ease: 'easeInOut' },
		}),
		collapsed: (isMobileCheck) => ({
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
			{isMobile && !isExpanded && <MobileToggleButton />}
			{isMobile && isExpanded && (
				<div
					className={styles.mobileOverlay}
					onClick={() => handleToggle(false)}
					aria-hidden='true'
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
				transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
				style={{
					position: 'fixed',
					zIndex: 1000,
				}}
			>
				{/* 1. Logo Section */}
				<div className={styles.logoContainer}>
					{/* Add close button for mobile when sidebar is expanded */}
					{isMobile && isExpanded && (
						<button
							className={styles.mobileSidebarCloseButton}
							onClick={() => handleToggle(false)}
							aria-label='Close sidebar'
						>
							<IconX size={28} />
						</button>
					)}
					<img
						src='/acc-logo.png'
						width={isExpanded ? 162 : 50}
						height={isExpanded ? 150 : 46}
						alt='ACC Logo'
						style={{ transition: 'width 0.3s, height 0.3s' }}
					/>
				</div>

				{/* 2. Navigation Links Section */}
				<div className={styles.navContainer}>
					{visibleSections.map((section) => (
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
									activeSection === section.sectionId
										? styles.active
										: ''
								}`}
								onClick={() => handleClick(section.sectionId)}
							>
								{section.icon} {/* Icon always visible */}
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
					{/* Animated Logout Button */}
					<AnimatePresence>
						{showUserActions && isExpanded && (
							<motion.div
								key='userActionsContainer'
								className={styles.userActionContainer}
								initial={{ opacity: 0, y: 10, x: '-50%' }}
								animate={{ opacity: 1, y: 0, x: '-50%' }}
								exit={{ opacity: 0, y: 10, x: '-50%' }}
								transition={{ duration: 0.2 }}
							>
								{/* Update Profile Button - Only for students */}
								{user?.role === 'student' && (
									<button
										className={styles.actionButton}
										onClick={handleOpenUpdateModal}
									>
										<IconUserEdit size={18} />
										<motion.span
											variants={textVariants}
											animate={'expanded'}
											initial={false}
										>
											Update
										</motion.span>
									</button>
								)}

								{/* Logout Button */}
								<button
									className={styles.actionButton}
									onClick={handleLogout}
								>
									<IconLogout size={18} />
									<motion.span
										variants={textVariants}
										animate={'expanded'}
										initial={false}
									>
										Logout
									</motion.span>
								</button>
							</motion.div>
						)}
					</AnimatePresence>

					{/* User Info Pill OR Login Button */}
					{user ? (
						<div className={styles.userContainer}>
							<button
								className={styles.pillButton}
								onClick={() =>
									setShowUserActions((prev) => !prev)
								} // Toggle action menu
								title={
									user.name
										? `User profile options for ${user.name}`
										: 'User profile options'
								}
								aria-haspopup='true'
								aria-expanded={showUserActions} // Use the renamed state
							>
								<img /* ... avatar props ... */
									src={`/api/avatar?name=${encodeURIComponent(
										user.name || '?'
									)}`}
									alt={
										user.name
											? `${user.name}'s Avatar`
											: 'User Avatar'
									}
									width={36}
									height={36}
									className={styles.avatar}
								/>
								{isExpanded && (
									<motion.div /* ... user info motion ... */
										className={styles.userInfo}
										variants={userDetailsVariants}
										animate={
											isExpanded
												? 'expanded'
												: 'collapsed'
										}
										initial={false}
									>
										<span className={styles.name}>
											{user.name || 'User'}
										</span>
										<span className={styles.identifier}>
											{/* Display identifier or role */}
											{identifier ||
												(user.role === 'student'
													? 'Loading...'
													: user.role)}
										</span>
									</motion.div>
								)}
							</button>
						</div>
					) : (
						<LoginButton isCollapsed={!isExpanded && !isMobile} />
					)}

					{/* 4. Desktop Toggle Button */}
					{/* ... (toggle button remains the same) ... */}
					{!isMobile && (
						<button
							className={styles.desktopToggleButton}
							onClick={() => handleToggle()}
							aria-label={
								isExpanded
									? 'Collapse sidebar'
									: 'Expand sidebar'
							}
							aria-expanded={isExpanded}
							title={isExpanded ? 'Collapse' : 'Expand'}
						>
							{isExpanded ? (
								<IconLayoutSidebarLeftCollapse size={24} />
							) : (
								<IconLayoutSidebarLeftExpand size={24} />
							)}
						</button>
					)}
				</div>
			</motion.nav>

			{/* Render the Update Profile Modal */}
			{user?.role === 'student' && user?.id && (
				<UpdateProfileModal
					isOpen={isUpdateModalOpen}
					onClose={handleCloseUpdateModal}
					studentId={user.id} // Pass the student's actual ID
					onUpdateSuccess={handleUpdateSuccess} // Pass the callback
				/>
			)}
		</>
	);
}
