'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../userContext';
import { createClient } from '@supabase/supabase-js';
import LoginButton from '../loginbutton';
import styles from './sidebar.module.css';
import {
	IconUsers,
	IconMessages,
	IconBubbleText,
	IconHome2,
	IconBooks,
	IconLogout,
} from '@tabler/icons-react';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Sidebar({ setActiveSection }) {
	const [activeButton, setActiveButton] = useState(null);
	const { user, loading } = useUser();
	const [showLogout, setShowLogout] = useState(false);
	const [identifier, setBranch] = useState(null);

	useEffect(() => {
		const fetchIdentifier = async () => {
			if (user && user.email) {
				const table =
					user.role === 'student' ? 'students' : 'consultants';
				const column =
					user.role === 'student' ? 'identifier' : 'department';

				const { data, error } = await supabase
					.from(table)
					.select(column)
					.eq('email', user.email)
					.single();

				if (error) {
					console.error(
						`Error fetching ${column} from ${table}:`,
						error.message
					);
					return;
				}

				if (data) setBranch(data[column]);
			}
		};

		fetchIdentifier();
	}, [user]);

	const handleClick = (sectionName, index) => {
		setActiveSection(sectionName);
		setActiveButton(index);
	};

	const handleLogout = async () => {
		await supabase.auth.signOut();
		window.location.reload();
	};

	const sections = [
		{
			name: 'Dashboard',
			icon: <IconHome2 size={24} className='navIcon' />,
		},
		{
			name: 'Messages',
			icon: <IconMessages size={24} className='navIcon' />,
		},
		{
			name: 'Community',
			icon: <IconUsers size={24} className='navIcon' />,
		},
		{
			name: user?.role === 'consultant' ? 'Requests' : 'Resources',
			icon:
				user?.role === 'consultant' ? (
					<IconBubbleText size={24} className='navIcon' />
				) : (
					<IconBooks size={24} className='navIcon' />
				),
		},
	];

	return (
		<nav className={styles.sidebar}>
			<img src='/acc-logo.png' width={162} height={150} alt='ACC Logo' />
			<div className={styles.navContainer}>
				{sections.map((section, index) => (
					<motion.div
						key={index}
						className={styles.navItemWrapper}
						whileHover={{
							backgroundColor: 'rgba(250, 250, 250, 0.1)',
						}}
						transition={{ duration: 0.25 }}
					>
						<motion.button
							className={`${styles.navItem} ${
								activeButton === index ? styles.active : ''
							}`}
							onClick={() =>
								handleClick(section.name.toLowerCase(), index)
							}
							whileTap={{ scale: 0.95 }}
						>
							{section.icon} {section.name}
						</motion.button>
					</motion.div>
				))}
			</div>

			<div className={styles.sidebarFooter}>
				{user ? (
					<motion.div className={styles.userContainer}>
						{showLogout && (
							<motion.button
								className={styles.logoutButton}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								transition={{ duration: 0.25 }}
								onClick={handleLogout}
								whileTap={{ scale: 0.95 }}
							>
								<IconLogout size={30} />
								<span>Logout</span>
							</motion.button>
						)}
						<motion.button
							className={styles.pillButton}
							whileTap={{ scale: 0.95 }}
							onClick={() => setShowLogout(!showLogout)}
						>
							<img
								src={`/api/avatar?name=${encodeURIComponent(
									user.name || ''
								)}`}
								alt={user.name}
								width={40}
								height={40}
								style={{
									width: '36px',
									height: '36px',
									borderRadius: '50%',
									marginRight: '0.5rem',
									marginLeft: '-0.5rem',
								}}
							/>
							<div className={styles.userInfo}>
								<div className={styles.name}>
									<p className={styles.name}>{user.name}</p>
								</div>
								<div className={styles.identifier}>
									<p>{identifier || ''}</p>
								</div>
							</div>
						</motion.button>
					</motion.div>
				) : (
					<LoginButton />
				)}
			</div>
		</nav>
	);
}
