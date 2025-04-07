'use client';

import servicesData from './services.json';
import { useState, useEffect } from 'react';
import React from 'react';
import {
	BookOpen,
	ChevronDown,
	Target,
	Users,
	MessageSquare,
	HeartHandshake,
	ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function Section1_V1_GridFix() {
	const viewport = useViewport();
	const icons = {
		mentor: Users,
		councelling: MessageSquare,
		support: HeartHandshake,
	};
	const [services] = useState(servicesData.services);
	const [modalContent, setModalContent] = useState(null);

	const colors = {
		primaryLight: '#dbeafe',
		primary: '#3b82f6',
		primaryDark: '#2563eb',
		secondary: '#ec4899',
		tertiary: '#10b981',
		lightBg: '#f9fafb',
		darkBg: '#1f2937',
		textDark: '#111827',
		textLight: '#f9fafb',
		textMuted: '#6b7280',
		textMutedLight: '#d1d5db',
	};

	const styles = {
		header: {
			h1: {
				fontSize: viewport.isMobile
					? '2.5rem'
					: viewport.isTablet
					? '3.2rem'
					: '4rem',
				marginBottom: viewport.isMobile ? '1.5rem' : '2rem',
				background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryDark})`,
				WebkitBackgroundClip: 'text',
				backgroundClip: 'text',
				color: 'transparent',
			},
			paragraph: {
				fontSize: viewport.isMobile ? '1rem' : '1.15rem',
				maxWidth: viewport.isMobile ? '100%' : '32rem',
				marginBottom: viewport.isMobile ? '1.5rem' : '2.5rem',
				color: colors.textMuted,
			},
		},
		section: {
			padding: viewport.isMobile ? '3rem 1rem' : '5rem 1rem',
		},
		sectionHeading: {
			fontSize: viewport.isMobile
				? '1.8rem'
				: viewport.isTablet
				? '2.2rem'
				: '2.5rem',
			marginBottom: viewport.isMobile ? '0.75rem' : '1rem',
			color: colors.textDark,
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
				gap: viewport.isMobile ? '1.5rem' : '2rem',
			},
			services: {
				display: 'grid',
				gridTemplateColumns: viewport.isMobile
					? '1fr'
					: viewport.isTablet
					? 'repeat(2, 1fr)'
					: 'repeat(3, 1fr)',
				gap: viewport.isMobile ? '1.5rem' : '2rem',
			},
			footer: {
				display: 'grid',
				gridTemplateColumns: viewport.isMobile
					? '1fr'
					: 'repeat(3, 1fr)',
				gap: viewport.isMobile ? '2rem' : '2.5rem',
			},
		},
		modal: {
			width: viewport.isMobile ? '95%' : '90%',
			maxWidth: '40rem',
			padding: viewport.isMobile ? '1.5rem' : '2rem',
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
			`rgba(236, 72, 153, 0.1)`,
			`rgba(16, 185, 129, 0.1)`,
		];
		return bgColors[index % bgColors.length];
	};
	const getIconColor = (index) => {
		const iconColors = [colors.primary, colors.secondary, colors.tertiary];
		return iconColors[index % iconColors.length];
	};

	return (
		<div
			style={{
				minHeight: '100vh',
				backgroundColor: 'white',
				position: 'relative',
			}}
		>
			{/* Header */}
			<header
				style={{
					position: 'relative',
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: `linear-gradient(135deg, white, ${colors.primaryLight})`,
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'relative',
						zIndex: 10,
						textAlign: 'center',
						padding: '0 1rem',
						maxWidth: '64rem',
						margin: '0 auto',
					}}
				>
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						style={{ ...styles.header.h1, lineHeight: 1.25 }}
					>
						Academic Counselling Cell
					</motion.h1>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4, delay: 0.3 }}
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
								margin: '2px',
							}}
						>
							BITS Pilani, Hyderabad Campus
						</p>
					</motion.div>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
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
			</header>

			{isScrollButtonVisible && (
				<motion.div
					key='scroll-button-wrapper'
					initial={{ opacity: 0, y: 20, x: '-50%' }}
					animate={{ opacity: 1, y: 0, x: '-50%' }}
					exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
					style={{
						position: 'absolute',
						top: '80vh',
						left: '50%',
						zIndex: 50,
					}}
				>
					<motion.button
						onClick={handleScrollButtonClick}
						aria-label='Scroll down'
						whileHover={{
							scale: 1.1,
							y: -3,
							boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
						}}
						whileTap={{ scale: 0.95 }}
						style={{
							background: 'white',
							color: '#3b82f6',
							borderRadius: '50%',
							width: '44px',
							height: '44px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							border: 'none',
							cursor: 'pointer',
							boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
							padding: 0,
						}}
					>
						{/* Bouncing Animation Container */}
						<motion.div
							animate={{ y: [0, -3, 0, 3, 0] }}
							transition={{
								duration: 1.6,
								repeat: Infinity,
								ease: 'easeInOut',
								delay: 0.2,
							}}
						>
							<ChevronDown size={24} /> {/* Icon */}
						</motion.div>
					</motion.button>
				</motion.div>
			)}

			{/* Overview Section */}
			<section
				id='overview'
				style={{
					padding: `${viewport.isMobile ? '2rem' : '3rem'} 1rem`,
					backgroundColor: 'white',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: `radial-gradient(ellipse at top right, ${colors.primaryLight} 0%, transparent 70%)`,
						opacity: 0.5,
					}}
				></div>
				<div
					style={{
						maxWidth: '72rem',
						margin: '0 auto',
						position: 'relative',
						zIndex: 10,
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
							Overview
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
							initial={{ opacity: 0, y: 15 }}
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
							Hyderabad Campus, focuses on supporting students'
							academic journey and personal development through
							effective mentor-mentee programs.
						</motion.p>
					</div>
				</div>
			</section>

			{/* Vision & Mission Section */}
			<section
				style={{ ...styles.section, backgroundColor: colors.lightBg }}
			>
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
							Vision & Mission
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
					{/* This div now correctly uses display: 'grid' */}
					<div style={styles.grid.visionMission}>
						{/* Vision Card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							whileHover={{
								scale: viewport.isMobile ? 1 : 1.02,
								boxShadow: `0 8px 20px -5px ${colors.primary}33`,
								y: -4,
							}}
							style={{
								backgroundColor: 'white',
								padding: viewport.isMobile ? '1.5rem' : '2rem',
								borderRadius: '0.75rem',
								boxShadow:
									'0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
								border: `1px solid ${colors.primary}26`,
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<div
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: viewport.isMobile
										? '2.5rem'
										: '3rem',
									height: viewport.isMobile
										? '2.5rem'
										: '3rem',
									backgroundColor: getIconBgColor(0),
									borderRadius: '0.5rem',
									marginBottom: '1rem',
								}}
							>
								<Target
									style={{
										width: '60%',
										height: '60%',
										color: getIconColor(0),
									}}
								/>
							</div>
							<h3
								style={{
									fontSize: viewport.isMobile
										? '1.15rem'
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
									lineHeight: 1.6,
									fontSize: viewport.isMobile
										? '0.9rem'
										: '0.95rem',
								}}
							>
								To help students transform challenges into
								opportunities for academic achievement and
								personal growth.
							</p>
						</motion.div>
						{/* Mission Card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							whileHover={{
								scale: viewport.isMobile ? 1 : 1.02,
								boxShadow: `0 8px 20px -5px ${colors.secondary}33`,
								y: -4,
							}}
							style={{
								backgroundColor: 'white',
								padding: viewport.isMobile ? '1.5rem' : '2rem',
								borderRadius: '0.75rem',
								boxShadow:
									'0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
								border: `1px solid ${colors.secondary}26`,
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<div
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: viewport.isMobile
										? '2.5rem'
										: '3rem',
									height: viewport.isMobile
										? '2.5rem'
										: '3rem',
									backgroundColor: getIconBgColor(1),
									borderRadius: '0.5rem',
									marginBottom: '1rem',
								}}
							>
								<BookOpen
									style={{
										width: '60%',
										height: '60%',
										color: getIconColor(1),
									}}
								/>
							</div>
							<h3
								style={{
									fontSize: viewport.isMobile
										? '1.15rem'
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
									lineHeight: 1.6,
									fontSize: viewport.isMobile
										? '0.9rem'
										: '0.95rem',
								}}
							>
								Promote holistic student development, addressing
								personal, emotional, social, and academic growth
								to utilize BITS Pilani's resources fully.
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section
				id='services'
				style={{
					...styles.section,
					backgroundColor: 'white',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: `radial-gradient(ellipse at bottom left, ${colors.primaryLight} 0%, transparent 70%)`,
						opacity: 0.4,
					}}
				></div>
				<div
					style={{
						maxWidth: '72rem',
						margin: '0 auto',
						position: 'relative',
						zIndex: 10,
					}}
				>
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
							Our Services
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
							initial={{ opacity: 0, y: 15 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							style={{
								fontSize: viewport.isMobile ? '1rem' : '1.1rem',
								color: colors.textMuted,
								maxWidth: '48rem',
								margin: '0 auto',
							}}
						>
							Comprehensive support to enhance your academic
							journey and personal growth.
						</motion.p>
					</div>
					{/* This div now correctly uses display: 'grid' */}
					<div style={styles.grid.services}>
						{services.map((service, index) => {
							const IconComponent =
								icons[service.icon] || BookOpen;
							const cardColor = getIconColor(index);
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 25 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										duration: 0.5,
										delay: index * 0.08,
									}}
									whileHover={{
										y: -6,
										boxShadow: `0 12px 25px -5px ${cardColor}20`,
									}}
									style={{
										padding: viewport.isMobile
											? '1.5rem'
											: '2rem',
										borderRadius: '0.75rem',
										backgroundColor: 'white',
										boxShadow:
											'0 4px 15px rgba(0, 0, 0, 0.05)',
										minHeight: viewport.isMobile
											? '240px'
											: '280px',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
										border: '1px solid #e5e7eb',
										borderTop: `3px solid ${cardColor}`,
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: '0.8rem',
										}}
									>
										<div
											style={{
												backgroundColor:
													getIconBgColor(index),
												borderRadius: '0.5rem',
												width: viewport.isMobile
													? '40px'
													: '48px',
												height: viewport.isMobile
													? '40px'
													: '48px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											<IconComponent
												style={{
													width: '55%',
													height: '55%',
													color: cardColor,
												}}
											/>
										</div>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												gap: '0.3rem',
											}}
										>
											<h3
												style={{
													fontSize: viewport.isMobile
														? '1.1rem'
														: '1.2rem',
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
													lineHeight: 1.6,
													margin: 0,
												}}
											>
												{service.short_description}
											</p>
										</div>
									</div>
									<motion.button
										onClick={() => setModalContent(service)}
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
											display: 'inline-flex',
											alignItems: 'center',
											gap: '0.4rem',
											color: colors.textLight,
											fontSize: '0.85rem',
											fontFamily: 'Poppins',
											fontWeight: 500,
											background: `linear-gradient(to right, ${cardColor}, ${
												cardColor === colors.primary
													? colors.primaryDark
													: cardColor ===
													  colors.secondary
													? '#d946ef'
													: '#059669'
											})`,
											padding: viewport.isMobile
												? '0.5rem 0.9rem'
												: '0.6rem 1.1rem',
											borderRadius: '0.375rem',
											cursor: 'pointer',
											border: 'none',
											width: 'fit-content',
											marginTop: '1rem',
										}}
									>
										Learn More
										<ArrowRight size={14} />
									</motion.button>
								</motion.div>
							);
						})}
					</div>
				</div>

				{/* Modal (remains the same functionally) */}
				<AnimatePresence>
					{modalContent && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							style={{
								position: 'fixed',
								inset: 0,
								backgroundColor: `${colors.primary}33`,
								backdropFilter: 'blur(6px)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								zIndex: 1000,
								padding: viewport.isMobile ? '1rem' : 0,
							}}
							onClick={() => setModalContent(null)}
						>
							<motion.div
								initial={{ scale: 0.95, opacity: 0, y: 20 }}
								animate={{ scale: 1, opacity: 1, y: 0 }}
								exit={{ scale: 0.95, opacity: 0, y: 20 }}
								transition={{
									type: 'spring',
									damping: 20,
									stiffness: 250,
								}}
								onClick={(e) => e.stopPropagation()}
								style={{
									backgroundColor: 'white',
									...styles.modal,
									borderRadius: '0.75rem',
									maxHeight: '85vh',
									overflowY: 'auto',
									boxShadow:
										'0 20px 25px -5px rgba(0, 0, 0, 0.15)',
									borderTop: `4px solid ${colors.primary}`,
									textAlign: 'left',
								}}
							>
								<h2
									style={{
										fontSize: viewport.isMobile
											? '1.25rem'
											: '1.5rem',
										fontWeight: 600,
										marginBottom: '1.5rem',
										color: colors.textDark,
										textAlign: 'center',
									}}
								>
									{modalContent.heading}
								</h2>
								<div
									style={{
										color: colors.textMuted,
										display: 'flex',
										flexDirection: 'column',
										gap: '0.8rem',
									}}
								>
									{modalContent.long_description.map(
										(point, index) => (
											<motion.p
												key={index}
												initial={{ x: -15, opacity: 0 }}
												animate={{ x: 0, opacity: 1 }}
												transition={{
													delay: 0.1 + index * 0.05,
												}}
												style={{
													margin: 0,
													lineHeight: 1.65,
													fontSize: viewport.isMobile
														? '0.9rem'
														: '0.95rem',
												}}
											>
												{point}
											</motion.p>
										)
									)}
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										marginTop: '2rem',
									}}
								>
									<motion.button
										onClick={() => setModalContent(null)}
										whileHover={{
											scale: 1.03,
											filter: 'brightness(1.1)',
										}}
										whileTap={{ scale: 0.97 }}
										style={{
											backgroundColor: colors.primary,
											color: colors.textLight,
											padding: '0.6rem 1.5rem',
											borderRadius: '0.375rem',
											cursor: 'pointer',
											border: 'none',
											fontSize: '0.9rem',
											fontWeight: 500,
										}}
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
					color: colors.textLight,
					padding: viewport.isMobile
						? '2.5rem 1rem 1.5rem'
						: '3rem 1rem 2rem',
					zIndex: 95,
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: '3px',
						background: colors.primary,
					}}
				></div>
				<div style={{ maxWidth: '72rem', margin: '0 auto' }}>
					<div style={styles.grid.footer}>
						{/* Column 1 */}
						<div
							style={{
								marginBottom: viewport.isMobile ? '1.5rem' : 0,
							}}
						>
							<h3
								style={{
									fontSize: '1.25rem',
									fontWeight: 600,
									marginBottom: '0.75rem',
									color: 'white',
								}}
							>
								Academic Counselling Cell
							</h3>
							<p
								style={{
									color: colors.textMutedLight,
									fontSize: '0.9rem',
									lineHeight: 1.6,
									maxWidth: '22rem',
								}}
							>
								Guiding students towards academic success and
								personal growth at BITS Pilani, Hyderabad.
							</p>
						</div>
						{/* Column 2 */}
						<div>
							<h4
								style={{
									fontSize: '1rem',
									fontWeight: 500,
									marginBottom: '1rem',
									color: 'white',
									borderLeft: `3px solid ${colors.primary}`,
									paddingLeft: '0.5rem',
								}}
							>
								Quick Links
							</h4>
							<ul
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.5rem',
									padding: 0,
									listStyle: 'none',
								}}
							>
								{['Overview', 'Services', 'Contact'].map(
									(link) => (
										<motion.li
											key={link}
											whileHover={{
												x: 4,
												color: colors.primary,
											}}
											transition={{ duration: 0.2 }}
										>
											<a
												href={`#${link
													.toLowerCase()
													.replace(' & ', '')}`}
												style={{
													color: colors.textMutedLight,
													textDecoration: 'none',
													fontSize: '0.9rem',
												}}
											>
												{link}
											</a>
										</motion.li>
									)
								)}
							</ul>
						</div>
						{/* Column 3 */}
						<div>
							<h4
								style={{
									fontSize: '1rem',
									fontWeight: 500,
									marginBottom: '1rem',
									color: 'white',
									borderLeft: `3px solid ${colors.secondary}`,
									paddingLeft: '0.5rem',
								}}
							>
								Resources
							</h4>
							<ul
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.5rem',
									padding: 0,
									listStyle: 'none',
								}}
							>
								{['Mentorship', 'Events', 'FAQ'].map((link) => (
									<motion.li
										key={link}
										whileHover={{
											x: 4,
											color: colors.secondary,
										}}
										transition={{ duration: 0.2 }}
									>
										<a
											href='#'
											style={{
												color: colors.textMutedLight,
												textDecoration: 'none',
												fontSize: '0.9rem',
											}}
										>
											{link}
										</a>
									</motion.li>
								))}
							</ul>
						</div>
					</div>
					<div
						style={{
							textAlign: 'center',
							marginTop: '3rem',
							paddingTop: '1rem',
							borderTop: `1px solid ${colors.textMutedLight}33`,
							fontSize: '0.8rem',
							color: colors.textMutedLight,
						}}
					>
						© {new Date().getFullYear()} ACC, BITS Pilani Hyderabad.
					</div>
				</div>
			</footer>
		</div>
	);
}
