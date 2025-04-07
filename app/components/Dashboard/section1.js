'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import { ChevronDown, Target, ArrowRight, Info } from 'lucide-react';
import { IconUsers, IconMessages, IconBooks } from '@tabler/icons-react';
import {
	motion,
	AnimatePresence,
	useScroll,
	useTransform,
} from 'framer-motion';

const servicesData = [
	{
		heading: 'Mentor-Mentee Program',
		short_description:
			'Connect with experienced mentors for guidance and support',
		long_description: [
			'BITS Pilani has implemented effective mentor-mentee programs through ACC to address academic and psychological issues among students. The objectives of this scheme include',
			'Support System: Serving as a consistent support system for all students.',
			'Personalized Mentoring: Providing one-on-one mentoring privately to ensure overall student growth.',
			'Communication Improvement: Bridging the communication gap between teachers and students to enhance the academic atmosphere on campus.',
			'Feedback Channel: Acting as a feedback channel for issues concerning students, faculty, departments, and the campus director.',
		],
		icon: 'mentor',
	},
	{
		heading: 'Counselling Services',
		short_description:
			'One-on-one help for academic, career, and personal concerns',
		long_description: [
			'Academic Counselling: Assistance with course selection, strategies for academic success, and using academic flexibilities like elective choices and early graduation.',
			'Career Counselling: Talks with experts, guidance on career decisions, and preparation for job placements.',
			'Personal Counselling: Professional counsellors address psychological, emotional, and interpersonal challenges.',
		],
		icon: 'councelling',
	},
	{
		heading: 'Student Support Resources',
		short_description:
			'Year-specific guidance and resources for student success',
		long_description: [
			'First-Year Support: Assistance with study-life balance, managing extracurriculars, choosing a second degree for dualities, job opportunity awareness, and guidance on academic flexibilities.',
			'Second-Year Support: Awareness about minor degrees, projects, Practice School-I, elective choices, and handling CGPA-related issues.',
			'Third and Fourth-Year Support: Guidance on disciplinary electives, placements, internships, and profile building. Connecting students with alumni for career advice.',
		],
		icon: 'support',
	},
];

const useViewport = () => {
	const [width, setWidth] = useState(
		typeof window !== 'undefined' ? window.innerWidth : 1200
	);
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleWindowResize);
		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);
	return {
		width,
		isMobile: width < 768,
		isTablet: width >= 768 && width < 1024,
		isDesktop: width >= 1024,
	};
};

export default function Section1({ setActiveSection }) {
	const viewport = useViewport();
	const icons = {
		mentor: IconUsers,
		councelling: IconMessages,
		support: IconBooks,
	};
	const [services] = useState(servicesData);

	const [modalContent, setModalContent] = useState(null);

	const colors = {
		primaryLight: '#dbeafe',
		primary: '#3b82f6',
		primaryDark: '#2563eb',
		secondary: '#ec4899',
		tertiary: '#10b981',
		lightBg: '#f8faff',
		darkBg: '#1f2937',
		textDark: '#111827',
		textLight: '#f9fafb',
		textMuted: '#6b7280',
		textMutedLight: '#d1d5db',

		glassBg: 'rgba(255, 255, 255, 0.65)',
		neonMistColorPrimary: 'rgba(59, 130, 246, 0.20)',
	};

	const { scrollYProgress } = useScroll();
	const blobY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
	const blobY2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

	const styles = {
		header: {
			logoContainer: {
				width: viewport.isMobile
					? '80px'
					: viewport.isTablet
					? '95px'
					: '110px',
				height: viewport.isMobile
					? '80px'
					: viewport.isTablet
					? '95px'
					: '110px',
				marginBottom: '1.5rem',
				backgroundColor: colors.primaryDark,
				maskImage: 'url(/acc-logo.png)',
				maskSize: 'contain',
				maskRepeat: 'no-repeat',
				maskPosition: 'center',
				WebkitMaskImage: 'url(/acc-logo.png)',
				WebkitMaskSize: 'contain',
				WebkitMaskRepeat: 'no-repeat',
				WebkitMaskPosition: 'center',
			},
			h1: {
				fontSize: viewport.isMobile
					? '2.5rem'
					: viewport.isTablet
					? '3.2rem'
					: '4rem',
				marginBottom: viewport.isMobile ? '1rem' : '1.5rem',
				background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryDark})`,
				WebkitBackgroundClip: 'text',
				backgroundClip: 'text',
				color: 'transparent',
				fontWeight: 700,
				cursor: 'default',
			},
			paragraph: {
				fontSize: viewport.isMobile ? '1rem' : '1.15rem',
				maxWidth: viewport.isMobile ? '100%' : '32rem',
				marginBottom: viewport.isMobile ? '2rem' : '3rem',
				color: colors.textMuted,
			},
			parallaxBlob: {
				position: 'absolute',
				borderRadius: '50%',
				opacity: 0.7,
				filter: 'blur(70px)',
				zIndex: 1,
			},
		},
		section: {
			padding: viewport.isMobile ? '3.5rem 1rem' : '5rem 1rem',
			position: 'relative',
			overflow: 'hidden',
		},
		sectionHeading: {
			fontSize: viewport.isMobile
				? '1.8rem'
				: viewport.isTablet
				? '2.2rem'
				: '2.5rem',
			marginBottom: viewport.isMobile ? '0.75rem' : '1rem',
			color: colors.textDark,
			fontWeight: 600,
		},
		divider: {
			width: viewport.isMobile ? '3rem' : '4rem',
			height: '4px',
			borderRadius: '9999px',
			marginBottom: viewport.isMobile ? '1.5rem' : '2rem',
			background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryDark})`,
		},
		grid: {
			visionMission: {
				display: 'grid',
				gridTemplateColumns: viewport.isMobile
					? '1fr'
					: 'repeat(2, 1fr)',
				gap: viewport.isMobile ? '1.5rem' : '2.5rem',
			},
			services: {
				display: 'grid',
				gridTemplateColumns: viewport.isMobile
					? '1fr'
					: viewport.isTablet
					? 'repeat(2, 1fr)'
					: 'repeat(3, 1fr)',
				gap: viewport.isMobile ? '1.5rem' : '2rem',
				marginTop: viewport.isMobile ? '2rem' : '3rem',
			},
			footer: {
				display: 'grid',
				gridTemplateColumns: viewport.isMobile
					? '1fr'
					: 'repeat(3, 1fr)',
				gap: viewport.isMobile ? '2rem' : '2.5rem',
			},
		},

		cardButtonContainer: {
			display: 'flex',
			flexDirection: viewport.isMobile ? 'column' : 'row',
			gap: '0.75rem',
			marginTop: '1.5rem',
			width: '100%',
		},

		cardActionButton: {
			flexGrow: 1,
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			gap: '0.5rem',
			color: colors.textLight,
			fontSize: '0.9rem',
			fontWeight: 500,
			padding: '0.7rem 1rem',
			borderRadius: '0.5rem',
			cursor: 'pointer',
			border: 'none',
			textAlign: 'center',
		},

		cardLearnMoreButton: {
			flexGrow: 1,
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			gap: '0.5rem',
			backgroundColor: 'transparent',
			fontSize: '0.9rem',
			fontWeight: 500,
			padding: '0.7rem 1rem',
			borderRadius: '0.5rem',
			cursor: 'pointer',
			borderWidth: '1.5px',
			borderStyle: 'solid',
			textAlign: 'center',
		},

		modal: {
			width: viewport.isMobile ? '95%' : '90%',
			maxWidth: '42rem',
			padding: viewport.isMobile ? '1.5rem' : '2.5rem',
			backgroundColor: 'white',
			borderRadius: '0.75rem',
			maxHeight: '85vh',
			overflowY: 'auto',
			boxShadow: '0 25px 30px -10px rgba(0, 0, 0, 0.2)',
			borderTop: `4px solid ${colors.primary}`,
			textAlign: 'left',
			position: 'relative',
			zIndex: 2150,
			display: 'flex',
			flexDirection: 'column',
		},
		modalBackdrop: {
			position: 'fixed',
			inset: 0,
			backgroundColor: colors.glassBg,
			backdropFilter: 'blur(10px)',
			WebkitBackdropFilter: 'blur(10px)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			zIndex: 2100,
			padding: viewport.isMobile ? '1rem' : 0,
		},
		modalCloseButton: {
			backgroundColor: colors.textMutedLight,
			color: colors.textDark,
			padding: '0.6rem 1.5rem',
			borderRadius: '0.5rem',
			cursor: 'pointer',
			border: 'none',
			fontSize: '0.9rem',
			fontWeight: 500,
			width: 'fit-content',
			margin: '1rem auto 0 auto',
		},
	};

	const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(true);
	const scrollButtonTargetId = 'overview';

	useEffect(() => {
		const handleScrollForButton = () => {
			setIsScrollButtonVisible(window.scrollY < 50);
		};
		handleScrollForButton();
		window.addEventListener('scroll', handleScrollForButton, {
			passive: true,
		});
		return () =>
			window.removeEventListener('scroll', handleScrollForButton);
	}, []);

	const handleScrollButtonClick = () => {
		document
			.getElementById(scrollButtonTargetId)
			?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	const getIconBgColor = (index) => {
		const bgColors = [
			colors.primaryLight,
			`rgba(236, 72, 153, 0.15)`,
			`rgba(16, 185, 129, 0.15)`,
		];
		return bgColors[index % bgColors.length];
	};
	const getIconColor = (index) => {
		const iconColors = [colors.primary, colors.secondary, colors.tertiary];
		return iconColors[index % iconColors.length];
	};

	const getServiceActionProps = (serviceType) => {
		let buttonText = 'Go to Section';
		let ButtonIcon = ArrowRight;
		let targetSection = 'dashboard';
		switch (serviceType) {
			case 'mentor':
				buttonText = 'Community';
				ButtonIcon = IconUsers;
				targetSection = 'community';
				break;
			case 'councelling':
				buttonText = 'Connect';
				ButtonIcon = IconMessages;
				targetSection = 'messages';
				break;
			case 'support':
				buttonText = 'Resources';
				ButtonIcon = IconBooks;
				targetSection = 'resources';
				break;
		}
		return { buttonText, ButtonIcon, targetSection };
	};

	return (
		<div style={{ backgroundColor: 'white', position: 'relative' }}>
			{/* Header */}
			<header
				style={{
					position: 'relative',
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: `linear-gradient(135deg, white, ${colors.primaryLight} 90%)`,
					overflow: 'hidden',
					paddingBottom: '10vh',
				}}
			>
				{/* Parallax Blobs */}
				{/* ... Blobs remain the same ... */}
				<motion.div
					style={{
						...styles.header.parallaxBlob,
						width: '450px',
						height: '450px',
						backgroundColor: colors.primaryLight,
						top: '-120px',
						left: '-180px',
						y: blobY1,
						boxShadow: `0 0 120px 60px ${colors.neonMistColorPrimary}`,
					}}
				/>
				<motion.div
					style={{
						...styles.header.parallaxBlob,
						width: '400px',
						height: '400px',
						backgroundColor: colors.primaryLight,
						opacity: 0.6,
						bottom: '-80px',
						right: '-120px',
						y: blobY2,
						filter: 'blur(80px)',
						boxShadow: `0 0 110px 55px ${colors.neonMistColorPrimary}`,
					}}
				/>
				{/* Header Content */}
				<div
					style={{
						position: 'relative',
						zIndex: 10,
						textAlign: 'center',
						padding: '0 1rem',
						maxWidth: '64rem',
						margin: '0 auto',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					{/* ... Logo, H1, Tag remain the same ... */}
					<motion.div
						initial={{ opacity: 0, y: -25 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						style={styles.header.logoContainer}
						aria-label='Academic Counselling Cell Logo'
					/>
					<motion.h1
						initial={{ opacity: 0, y: -25 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						whileHover={{ scale: 1.01 }}
						style={{ ...styles.header.h1, lineHeight: 1.2 }}
					>
						Academic Counselling Cell
					</motion.h1>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4, delay: 0.5 }}
						style={{
							display: 'inline-block',
							marginBottom: viewport.isMobile ? '1.5rem' : '2rem',
							padding: '0.4rem 1.2rem',
							backgroundColor: `${colors.primary}1A`,
							borderRadius: '9999px',
						}}
					>
						<p
							style={{
								fontSize: viewport.isMobile
									? '0.75rem'
									: '0.875rem',
								fontWeight: 500,
								color: colors.primaryDark,
								margin: 0,
							}}
						>
							BITS Pilani, Hyderabad Campus
						</p>
					</motion.div>
					<motion.p
						initial={{ opacity: 0, y: 25 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						style={{
							...styles.header.paragraph,
							margin: `0 auto ${styles.header.paragraph.marginBottom}`,
							lineHeight: 1.7,
						}}
					>
						Your dedicated partner in academic success, providing
						personalized guidance and support throughout your
						educational journey.
					</motion.p>
				</div>
				{/* Scroll Down Button */}
				{/* ... Scroll button remains the same ... */}
				{isScrollButtonVisible && (
					<motion.div
						key='scroll-button-wrapper'
						initial={{ opacity: 0, y: 25, x: '-50%' }}
						animate={{ opacity: 1, y: 0, x: '-50%' }}
						exit={{
							opacity: 0,
							y: 25,
							transition: { duration: 0.2 },
						}}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						style={{
							position: 'absolute',
							bottom: '5vh',
							top: 'auto',
							left: '50%',
							zIndex: 50,
						}}
					>
						<motion.button
							onClick={handleScrollButtonClick}
							aria-label='Scroll down'
							whileHover={{
								scale: 1.15,
								y: -4,
								boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
							}}
							whileTap={{ scale: 0.95 }}
							style={{
								background: 'white',
								color: colors.primary,
								borderRadius: '50%',
								width: '48px',
								height: '48px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								border: 'none',
								cursor: 'pointer',
								boxShadow: '0 5px 15px rgba(0, 0, 0, 0.12)',
								padding: 0,
							}}
						>
							<motion.div
								animate={{ y: [0, -4, 0, 4, 0] }}
								transition={{
									duration: 1.5,
									repeat: Infinity,
									ease: 'easeInOut',
									delay: 0.1,
								}}
							>
								<ChevronDown size={26} />
							</motion.div>
						</motion.button>
					</motion.div>
				)}
			</header>

			{/* Overview Section */}
			<section
				id='overview'
				style={{ ...styles.section, backgroundColor: 'white' }}
			>
				{/* ... Overview content remains the same ... */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: `radial-gradient(ellipse at top right, ${colors.primaryLight} 0%, transparent 65%)`,
						opacity: 0.35,
						zIndex: 0,
					}}
				></div>
				<div
					style={{
						maxWidth: '72rem',
						margin: '0 auto',
						position: 'relative',
						zIndex: 1,
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							textAlign: 'center',
							marginBottom: viewport.isMobile ? '1rem' : '1.5rem',
						}}
					>
						<motion.h2
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.5 }}
							style={styles.sectionHeading}
						>
							Overview (ACC)
						</motion.h2>
						<motion.div
							initial={{ scaleX: 0 }}
							whileInView={{ scaleX: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{
								duration: 0.6,
								delay: 0.1,
								ease: 'easeOut',
							}}
							style={{ ...styles.divider, originX: 0.5 }}
						></motion.div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							style={{
								fontSize: viewport.isMobile ? '1rem' : '1.1rem',
								color: colors.textMuted,
								maxWidth: '48rem',
								margin: '0 auto',
								lineHeight: 1.7,
							}}
						>
							The Academic Counselling Cell (ACC) at BITS Pilani,
							Hyderabad Campus, is committed to empowering your
							academic journey. We focus on supporting students'
							academic progress and personal development through
							effective mentor-mentee programs and personalized
							guidance.
						</motion.p>
					</div>
				</div>
			</section>

			{/* Vision & Mission Section */}
			<section
				id='vision-mission'
				style={{ ...styles.section, backgroundColor: colors.lightBg }}
			>
				{/* ... Vision/Mission content remains the same ... */}
				<div style={{ maxWidth: '72rem', margin: '0 auto' }}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							textAlign: 'center',
							marginBottom: viewport.isMobile ? '2rem' : '3rem',
						}}
					>
						<motion.h2
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							style={styles.sectionHeading}
						>
							Our Vision & Mission
						</motion.h2>
						<motion.div
							initial={{ scaleX: 0 }}
							whileInView={{ scaleX: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{
								duration: 0.6,
								delay: 0.1,
								ease: 'easeOut',
							}}
							style={{ ...styles.divider, originX: 0.5 }}
						></motion.div>
					</div>
					<div style={styles.grid.visionMission}>
						<motion.div
							initial={{ opacity: 0, y: 25 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							whileHover={{
								scale: viewport.isMobile ? 1 : 1.03,
								boxShadow: `0 10px 28px -5px ${colors.primary}40`,
								y: -5,
							}}
							style={{
								backgroundColor: 'white',
								padding: viewport.isMobile ? '1.5rem' : '2rem',
								borderRadius: '0.75rem',
								boxShadow:
									'0 5px 8px -1px rgba(0,0,0,0.05), 0 3px 5px -1px rgba(0,0,0,0.04)',
								border: `1px solid ${colors.primary}26`,
								display: 'flex',
								flexDirection: 'column',
								transition:
									'transform 0.25s ease-out, box-shadow 0.25s ease-out',
							}}
						>
							<div
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: viewport.isMobile
										? '2.8rem'
										: '3rem',
									height: viewport.isMobile
										? '2.8rem'
										: '3rem',
									backgroundColor: getIconBgColor(0),
									borderRadius: '0.6rem',
									marginBottom: '1rem',
								}}
							>
								<Target
									size={viewport.isMobile ? 22 : 24}
									style={{ color: getIconColor(0) }}
								/>
							</div>
							<h3
								style={{
									fontSize: viewport.isMobile
										? '1.2rem'
										: '1.3rem',
									fontWeight: 600,
									color: colors.textDark,
									marginBottom: '0.75rem',
								}}
							>
								Vision
							</h3>
							<p
								style={{
									color: colors.textMuted,
									lineHeight: 1.65,
									fontSize: viewport.isMobile
										? '0.9rem'
										: '0.95rem',
								}}
							>
								To help students transform challenges into
								opportunities for academic achievement and
								personal growth, fostering resilience and
								success.
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 25 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							whileHover={{
								scale: viewport.isMobile ? 1 : 1.03,
								boxShadow: `0 10px 28px -5px ${colors.secondary}40`,
								y: -5,
							}}
							style={{
								backgroundColor: 'white',
								padding: viewport.isMobile ? '1.5rem' : '2rem',
								borderRadius: '0.75rem',
								boxShadow:
									'0 5px 8px -1px rgba(0,0,0,0.05), 0 3px 5px -1px rgba(0,0,0,0.04)',
								border: `1px solid ${colors.secondary}26`,
								display: 'flex',
								flexDirection: 'column',
								transition:
									'transform 0.25s ease-out, box-shadow 0.25s ease-out',
							}}
						>
							<div
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: viewport.isMobile
										? '2.8rem'
										: '3rem',
									height: viewport.isMobile
										? '2.8rem'
										: '3rem',
									backgroundColor: getIconBgColor(1),
									borderRadius: '0.6rem',
									marginBottom: '1rem',
								}}
							>
								<IconBooks
									size={viewport.isMobile ? 22 : 24}
									style={{ color: getIconColor(1) }}
								/>
							</div>
							<h3
								style={{
									fontSize: viewport.isMobile
										? '1.2rem'
										: '1.3rem',
									fontWeight: 600,
									color: colors.textDark,
									marginBottom: '0.75rem',
								}}
							>
								Mission
							</h3>
							<p
								style={{
									color: colors.textMuted,
									lineHeight: 1.65,
									fontSize: viewport.isMobile
										? '0.9rem'
										: '0.95rem',
								}}
							>
								Provide personalized guidance, support, and
								resources. Promote holistic development,
								addressing personal, emotional, social, and
								academic growth to fully utilize BITS Pilani's
								resources.
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section
				id='services'
				style={{ ...styles.section, backgroundColor: 'white' }}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: `radial-gradient(ellipse at bottom left, ${colors.primaryLight} 0%, transparent 65%)`,
						opacity: 0.35,
						zIndex: 0,
					}}
				></div>
				<div
					style={{
						maxWidth: '72rem',
						margin: '0 auto',
						position: 'relative',
						zIndex: 1,
					}}
				>
					{/* Section Header */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							textAlign: 'center',
						}}
					>
						{/* ... Section Heading, Divider, Paragraph ... */}
						<motion.h2
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							style={styles.sectionHeading}
						>
							Our Core Services
						</motion.h2>
						<motion.div
							initial={{ scaleX: 0 }}
							whileInView={{ scaleX: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{
								duration: 0.6,
								delay: 0.1,
								ease: 'easeOut',
							}}
							style={{ ...styles.divider, originX: 0.5 }}
						></motion.div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							style={{
								fontSize: viewport.isMobile ? '1rem' : '1.1rem',
								color: colors.textMuted,
								maxWidth: '48rem',
								margin: '0 auto',
								lineHeight: 1.7,
							}}
						>
							Explore our services or learn more about specific
							programs.
						</motion.p>
					</div>

					{/* Service Card Grid */}
					<div style={styles.grid.services}>
						{services.map((service, index) => {
							const IconComponent =
								icons[service.icon] || IconBooks;
							const cardColor = getIconColor(index);

							const { buttonText, ButtonIcon, targetSection } =
								getServiceActionProps(service.icon);

							const gradientEndColor =
								cardColor === colors.primary
									? colors.primaryDark
									: cardColor === colors.secondary
									? '#d946ef'
									: '#059669';

							return (
								<motion.div
									key={service.heading}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										duration: 0.55,
										delay: index * 0.09,
									}}
									whileHover={{
										boxShadow: `0 14px 30px -6px ${cardColor}30`,
									}}
									style={{
										padding: viewport.isMobile
											? '1.5rem'
											: '2rem',
										borderRadius: '0.75rem',
										backgroundColor: 'white',
										boxShadow:
											'0 6px 18px rgba(0, 0, 0, 0.06)',
										minHeight: viewport.isMobile
											? '280px'
											: '320px',
										/* Adjusted minHeight for buttons */ display:
											'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
										border: '1px solid #e5e7eb',
										borderTop: `4px solid ${cardColor}`,
										transition:
											'transform 0.25s ease-out, box-shadow 0.25s ease-out',
									}}
								>
									{/* Card Content */}
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: '0.8rem',
											flexGrow: 1 /* Allow content to take space */,
										}}
									>
										{/* Icon */}
										<div
											style={{
												backgroundColor:
													getIconBgColor(index),
												borderRadius: '0.6rem',
												width: viewport.isMobile
													? '44px'
													: '52px',
												height: viewport.isMobile
													? '44px'
													: '52px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											<IconComponent
												size={
													viewport.isMobile ? 22 : 26
												}
												style={{ color: cardColor }}
											/>
										</div>
										{/* Text Content */}
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												gap: '0.4rem',
											}}
										>
											<h3
												style={{
													fontSize: viewport.isMobile
														? '1.15rem'
														: '1.25rem',
													fontWeight: 600,
													color: colors.textDark,
													margin: 0,
												}}
											>
												{service.heading}
											</h3>
											<p
												style={{
													fontSize: viewport.isMobile
														? '0.9rem'
														: '0.95rem',
													color: colors.textMuted,
													lineHeight: 1.65,
													margin: 0,
												}}
											>
												{service.short_description}
											</p>
										</div>
									</div>

									{/* *** Button Container *** */}
									<div style={styles.cardButtonContainer}>
										{/* Button 1: Action (Filled) */}
										<motion.button
											onClick={() =>
												setActiveSection(targetSection)
											}
											whileHover={{
												scale: 1.03,
												filter: 'brightness(1.1)',
											}}
											whileTap={{ scale: 0.97 }}
											transition={{
												type: 'spring',
												stiffness: 400,
												damping: 17,
											}}
											style={{
												...styles.cardActionButton,

												background: `linear-gradient(to right, ${cardColor}, ${gradientEndColor})`,
											}}
										>
											<ButtonIcon size={16} />
											{buttonText}
										</motion.button>

										{/* Button 2: Learn More (Outlined) */}
										<motion.button
											onClick={() =>
												setModalContent(service)
											}
											whileHover={{
												scale: 1.03,
												backgroundColor: `${cardColor}1A` /* Slight bg tint on hover */,
											}}
											whileTap={{ scale: 0.97 }}
											transition={{
												type: 'spring',
												stiffness: 400,
												damping: 17,
											}}
											style={{
												...styles.cardLearnMoreButton,

												borderColor: cardColor,
												color: cardColor,
											}}
										>
											<Info size={16} /> {/* Info icon */}
											Learn More
										</motion.button>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>

				{/* *** MODAL Implementation *** */}
				<AnimatePresence>
					{modalContent && (
						<motion.div
							key='modal-backdrop'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.35 }}
							style={styles.modalBackdrop}
							onClick={() => setModalContent(null)}
						>
							{/* Modal Content Container */}
							<motion.div
								key='modal-content'
								initial={{ scale: 0.93, opacity: 0, y: 30 }}
								animate={{ scale: 1, opacity: 1, y: 0 }}
								exit={{
									scale: 0.93,
									opacity: 0,
									y: 30,
									transition: { duration: 0.25 },
								}}
								transition={{
									type: 'spring',
									damping: 22,
									stiffness: 280,
								}}
								onClick={(e) => e.stopPropagation()}
								style={styles.modal}
							>
								{/* Modal Content Top (Title, Description) */}
								<div style={{ flexGrow: 1 }}>
									<h2
										style={{
											fontSize: viewport.isMobile
												? '1.3rem'
												: '1.6rem',
											fontWeight: 600,
											marginBottom: '1.5rem',
											color: colors.textDark,
											textAlign: 'center',
											paddingBottom: '0.75rem',
											borderBottom: `1px solid ${colors.primaryLight}`,
										}}
									>
										{modalContent.heading} Details
									</h2>
									<div
										style={{
											color: colors.textMuted,
											display: 'flex',
											flexDirection: 'column',
											gap: '0.9rem',
											maxHeight: '55vh',
											overflowY: 'auto',
											paddingRight:
												'0.5rem' /* For scrollbar */,
										}}
									>
										{modalContent.long_description.map(
											(point, index) => (
												<motion.p
													key={index}
													initial={{
														x: -20,
														opacity: 0,
													}}
													animate={{
														x: 0,
														opacity: 1,
													}}
													transition={{
														delay:
															0.1 + index * 0.05,
														type: 'spring',
														stiffness: 300,
														damping: 20,
													}}
													style={{
														margin: 0,
														lineHeight: 1.7,
														fontSize:
															viewport.isMobile
																? '0.9rem'
																: '0.98rem',
													}}
												>
													<span
														style={{
															color: colors.primary,
															marginRight:
																'0.6em',
															fontWeight: 500,
														}}
													>
														•
													</span>
													{point}
												</motion.p>
											)
										)}
									</div>
								</div>

								{/* Modal Buttons Container */}
								<div
									style={{
										marginTop: 'auto',
										paddingTop: '1.5rem',
										borderTop: `1px solid ${colors.primaryLight}`,
									}}
								>
									{/* Close Button */}
									<motion.button
										onClick={() => setModalContent(null)}
										whileHover={{
											filter: 'brightness(0.95)',
										}}
										whileTap={{ scale: 0.95 }}
										style={styles.modalCloseButton}
									>
										Close
									</motion.button>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</section>

			{/* Footer */}
			<footer
				style={{
					position: 'relative',
					backgroundColor: colors.darkBg,
					color: colors.textMutedLight,
					padding: viewport.isMobile
						? '3.5rem 1rem 1.5rem'
						: '4.5rem 1rem 2rem',
					borderTop: `5px solid ${colors.primary}`,
				}}
			>
				{/* ... Footer content remains the same ... */}
				<div style={{ maxWidth: '72rem', margin: '0 auto' }}>
					<div style={styles.grid.footer}>
						<div
							style={{
								marginBottom: viewport.isMobile ? '1.5rem' : 0,
							}}
						>
							<h3
								style={{
									fontSize: '1.3rem',
									fontWeight: 600,
									marginBottom: '0.85rem',
									color: 'white',
								}}
							>
								Academic Counselling Cell
							</h3>
							<p
								style={{
									fontSize: '0.9rem',
									lineHeight: 1.65,
									maxWidth: '22rem',
								}}
							>
								Empowering Your Academic Journey at BITS Pilani,
								Hyderabad Campus. Discover your potential,
								define your path, achieve your goals.
							</p>
						</div>
						<div>
							<h4
								style={{
									fontSize: '1.05rem',
									fontWeight: 500,
									marginBottom: '1.1rem',
									color: 'white',
									borderLeft: `3px solid ${colors.primary}`,
									paddingLeft: '0.85rem',
								}}
							>
								Quick Links
							</h4>
							<ul
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.7rem',
									padding: 0,
									listStyle: 'none',
									margin: 0,
								}}
							>
								{['Overview', 'Services', 'Contact'].map(
									(link) => (
										<motion.li
											key={link}
											whileHover={{
												x: 6,
												color: colors.primary,
											}}
											transition={{
												duration: 0.2,
												ease: 'easeOut',
											}}
										>
											<a
												onClick={(e) => {
													e.preventDefault();
													const targetId = link
														.toLowerCase()
														.replace(' & ', '');
													const targetElement =
														document.getElementById(
															targetId
														);
													targetElement?.scrollIntoView(
														{
															behavior: 'smooth',
															block: 'start',
														}
													);
												}}
												href={`#${link
													.toLowerCase()
													.replace(' & ', '')}`}
												style={{
													color: 'inherit',
													textDecoration: 'none',
													fontSize: '0.92rem',
												}}
											>
												{link}
											</a>
										</motion.li>
									)
								)}
							</ul>
						</div>
						<div>
							<h4
								style={{
									fontSize: '1.05rem',
									fontWeight: 500,
									marginBottom: '1.1rem',
									color: 'white',
									borderLeft: `3px solid ${colors.secondary}`,
									paddingLeft: '0.85rem',
								}}
							>
								Explore
							</h4>
							<ul
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.7rem',
									padding: 0,
									listStyle: 'none',
									margin: 0,
								}}
							>
								{['community', 'messages', 'resources'].map(
									(link) => (
										<motion.li
											key={link}
											whileHover={{
												x: 6,
												color: colors.secondary,
												cursor: 'pointer',
											}}
											transition={{
												duration: 0.2,
												ease: 'easeOut',
											}}
										>
											<a
												onClick={() =>
													setActiveSection(link)
												}
												style={{
													color: 'inherit',
													textDecoration: 'none',
													fontSize: '0.92rem',
												}}
											>
												{link.charAt(0).toUpperCase() +
													link.slice(1)}
											</a>
										</motion.li>
									)
								)}
							</ul>
						</div>
					</div>
					<div
						style={{
							textAlign: 'center',
							marginTop: '4rem',
							paddingTop: '1.8rem',
							borderTop: `1px solid ${colors.textMutedLight}33`,
							fontSize: '0.8rem',
							color: colors.textMutedLight,
						}}
					>
						© {new Date().getFullYear()} Academic Counselling Cell
						(ACC), BITS Pilani Hyderabad Campus. All Rights
						Reserved.
					</div>
				</div>
			</footer>
		</div>
	);
}
