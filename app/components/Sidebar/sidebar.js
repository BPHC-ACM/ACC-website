'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './sidebar.module.css';
import {
	IconUsers,
	IconMessages,
	IconBubbleText,
	IconHome2,
	IconUserCircle,
} from '@tabler/icons-react';

export default function Sidebar({ setActiveSection }) {
	const [activeButton, setActiveButton] = useState(null);
	const sections = [
		{
			name: 'Dashboard',
			icon: <IconHome2 size={24} className='navIcon' />,
		},
		{
			name: 'Requests',
			icon: <IconBubbleText size={24} className='navIcon' />,
		},
		{
			name: 'Messages',
			icon: <IconMessages size={24} className='navIcon' />,
		},
		{
			name: 'Community',
			icon: <IconUsers size={24} className='navIcon' />,
		},
	];

	const handleClick = (index) => {
		setActiveSection(`section${index + 1}`);
		setActiveButton(index);
	};

	return (
		<nav className={styles.sidebar}>
			<Image
				src='/acc-logo.png'
				width={162}
				height={150}
				alt='ACC Logo'
				priority={true}
			/>
			<div className={styles.navContainer}>
				{sections.map((section, index) => (
					<motion.div
						key={index}
						className={styles.navItemWrapper}
						whileHover={{
							backgroundColor: 'rgba(200, 200, 200, 0.1)',
						}}
						transition={{ duration: 0.2 }}
					>
						<motion.button
							className={`${styles.navItem} ${
								activeButton === index ? styles.active : ''
							}`}
							onClick={() => handleClick(index)}
							whileTap={{ scale: 0.95 }}
						>
							{section.icon} {section.name}
						</motion.button>
					</motion.div>
				))}
			</div>
			<div className={styles.sidebarFooter}>
				<motion.button
					className={styles.pillButton}
					whileTap={{ scale: 0.95 }}
				>
					<IconUserCircle
						size={40}
						style={{
							minWidth: '40px',
							paddingRight: '0.5rem',
							marginLeft: '-0.5rem',
						}}
					/>
					<div className={styles.userInfo}>
						<div className={styles.name}>
							<p className={styles.name}>BVVSN Prabhakar Rao</p>
						</div>
						<div className={styles.branch}>
							<p>EEE</p>
						</div>
					</div>
				</motion.button>
			</div>
		</nav>
	);
}
