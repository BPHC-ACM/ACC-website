import Section from '../section';
import servicesData from './services.json';
import { useState } from 'react';
import React from 'react';
import {
	BookOpen,
	Target,
	Users,
	MessageSquare,
	HeartHandshake,
	ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Section1() {
	const icons = {
		mentor: Users,
		councelling: MessageSquare,
		support: HeartHandshake,
	};
	const [services] = useState(servicesData.services); // Use imported data
	const [modalContent, setModalContent] = useState(null);

	return (
		<div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
			<header
				style={{
					position: 'relative',
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background:
						'linear-gradient(to bottom, rgb(249, 250, 251), white)',
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
					<h1
						style={{
							fontSize: '4.5rem',
							fontWeight: 700,
							color: '#111111',
							marginBottom: '3rem',
							marginTop: '1rem',
							lineHeight: 1.1,
						}}
					>
						Academic{' '}
						<span style={{ position: 'relative' }}>
							Counselling
						</span>{' '}
						Cell
					</h1>
					<div
						style={{
							display: 'inline-block',
							marginBottom: '3rem',
							padding: '0.5rem 1.5rem',
							backgroundColor: 'rgba(17,24,39,0.05)',
							borderRadius: '9999px',
						}}
					>
						<p
							style={{
								fontSize: '0.875rem',
								fontWeight: 500,
								color: '#111111',
								margin: '2px',
							}}
						>
							BITS Pilani, Hyderabad Campus
						</p>
					</div>
					<p
						style={{
							fontSize: '1.25rem',
							color: '#4B5563',
							maxWidth: '32rem',
							margin: '0 auto 3rem',
							lineHeight: 1.7,
						}}
					>
						Your dedicated partner in academic success, providing
						personalized guidance and support throughout your
						educational journey.
					</p>
				</div>
			</header>
			{/* Overview Section */}
			<section
				style={{
					padding: '3rem 1rem',
					backgroundColor: 'white',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'radial-gradient(circle at top right, #f3f4f6 0%, transparent 60%)',
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
							marginBottom: '2rem',
						}}
					>
						<h2
							style={{
								fontSize: '3rem',
								fontWeight: 700,
								color: '#111111',
								marginBottom: '1.5rem',
							}}
						>
							Overview
						</h2>
						<div
							style={{
								width: '5rem',
								height: '0.375rem',
								backgroundColor: '#111111',
								borderRadius: '9999px',
								marginBottom: '2rem',
							}}
						></div>
						<p
							style={{
								fontSize: '1.25rem',
								color: '#4B5563',
								maxWidth: '48rem',
								margin: '0 auto',
								lineHeight: 1.7,
							}}
						>
							The Academic Counselling Cell (ACC) at BITS Pilani,
							Hyderabad Campus, focuses on supporting students'
							academic journey and personal development. ACC
							implements effective mentor-mentee programs to
							address both educational and psychological
							challenges. The program ensures a structured support
							system for students, enhancing communication between
							teachers and students and ultimately improving the
							academic environment on campus.
						</p>
					</div>
				</div>
			</section>
			<section
				style={{
					padding: '8rem 1rem',
					backgroundColor: '#F9FAFB',
				}}
			>
				<div style={{ maxWidth: '72rem', margin: '0 auto' }}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							textAlign: 'center',
							marginBottom: '5rem',
						}}
					>
						<h2
							style={{
								fontSize: '3rem',
								fontWeight: 700,
								color: '#111111',
								marginBottom: '1.5rem',
							}}
						>
							Vision & Mission
						</h2>
						<div
							style={{
								width: '5rem',
								height: '0.375rem',
								backgroundColor: '#111111',
								borderRadius: '9999px',
								marginBottom: '2rem',
							}}
						></div>
					</div>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							gap: '3rem',
						}}
					>
						<motion.div
							whileHover={{
								scale: 1.01,
								boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
							}}
							transition={{ duration: 0.2 }}
							style={{
								backgroundColor: 'white',
								padding: '3rem',
								borderRadius: '1rem',
								boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
							}}
						>
							<motion.div
								transition={{ duration: 0.2 }}
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '4rem',
									height: '4rem',
									backgroundColor: '#F3F4F6',
									borderRadius: '0.75rem',
									marginBottom: '2rem',
								}}
							>
								<Target
									style={{
										width: '2rem',
										height: '2rem',
										color: '#111111',
									}}
								/>
							</motion.div>
							<h3
								style={{
									fontSize: '1.5rem',
									fontWeight: 700,
									color: '#111111',
									marginBottom: '1.5rem',
								}}
							>
								Vision
							</h3>
							<p
								style={{
									color: '#4B5563',
									lineHeight: 1.7,
								}}
							>
								To help students transform challenges into
								opportunities for academic achievement and
								personal growth, making them valuable assets to
								society.
							</p>
						</motion.div>

						<motion.div
							whileHover={{
								scale: 1.01,
								boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
							}}
							transition={{ duration: 0.2 }}
							style={{
								backgroundColor: 'white',
								padding: '3rem',
								borderRadius: '1rem',
								boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
							}}
						>
							<motion.div
								transition={{ duration: 0.2 }}
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '4rem',
									height: '4rem',
									backgroundColor: '#F3F4F6',
									borderRadius: '0.75rem',
									marginBottom: '2rem',
								}}
							>
								<BookOpen
									style={{
										width: '2rem',
										height: '2rem',
										color: '#111111',
									}}
								/>
							</motion.div>
							<h3
								style={{
									fontSize: '1.5rem',
									fontWeight: 700,
									color: '#111111',
									marginBottom: '1.5rem',
								}}
							>
								Mission
							</h3>
							<p
								style={{
									color: '#4B5563',
									lineHeight: 1.7,
								}}
							>
								The ACC promotes holistic student development,
								addressing personal, emotional, social, and
								academic growth. It aims to enable students to
								fully benefit from the resources and
								opportunities provided by BITS Pilani.
							</p>
						</motion.div>
					</div>
				</div>
			</section>
			<section
				style={{
					padding: '8rem 1rem',
					backgroundColor: 'white',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'radial-gradient(circle at bottom left, #f3f4f6 0%, transparent 60%)',
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
							marginBottom: '5rem',
						}}
					>
						<h2
							style={{
								fontSize: '3rem',
								fontWeight: 700,
								color: '#111111',
								marginBottom: '1.5rem',
							}}
						>
							Our Services
						</h2>
						<div
							style={{
								width: '5rem',
								height: '0.375rem',
								backgroundColor: '#111111',
								borderRadius: '9999px',
								marginBottom: '2rem',
							}}
						></div>
						<p
							style={{
								fontSize: '1.25rem',
								color: '#4B5563',
								maxWidth: '48rem',
								margin: '0 auto',
							}}
						>
							Comprehensive support services designed to enhance
							your academic journey and personal growth.
						</p>
					</div>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(3, 1fr)',
							gap: '2rem',
						}}
					>
						{services.map((service, index) => {
							const IconComponent =
								icons[service.icon] || BookOpen;
							return (
								<motion.div
									initial={{ scale: 1 }}
									transition={{ duration: 0.2 }}
									style={{
										padding: '2rem',
										borderRadius: '1rem',
										backgroundColor: 'white',
										boxShadow:
											'0 4px 20px rgba(0, 0, 0, 0.08)',
										minHeight: '280px',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
										gap: '1.5rem',
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: '1.5rem',
										}}
									>
										<div
											style={{
												backgroundColor: '#f4f4f4',
												borderRadius: '12px',
												width: '56px',
												height: '56px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											<IconComponent
												style={{
													width: '28px',
													height: '28px',
													color: '#111111',
												}}
											/>
										</div>

										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												gap: '0.75rem',
											}}
										>
											<h3
												style={{
													fontSize: '1.25rem',
													fontWeight: '600',
													color: '#111111',
													margin: 0,
												}}
											>
												{service.heading}
											</h3>

											<p
												style={{
													fontSize: '1rem',
													color: '#666666',
													lineHeight: '1.6',
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
											scale: 1.05,
											backgroundColor: '#000000',
										}}
										whileTap={{ scale: 0.95 }}
										style={{
											display: 'inline-flex',
											alignItems: 'center',
											gap: '0.5rem',
											color: 'white',
											fontFamily: 'Poppins',
											fontSize: '0.85rem',
											fontWeight: '500',
											backgroundColor: '#111111',
											padding: '0.75rem 1.25rem',
											borderRadius: '0.5rem',
											cursor: 'pointer',
											border: 'none',
											width: 'fit-content',
										}}
									>
										Learn More
										<svg
											width='16'
											height='16'
											viewBox='0 0 16 16'
											fill='none'
											style={{ marginLeft: '4px' }}
										>
											<path
												d='M3.33334 8H12.6667'
												stroke='currentColor'
												strokeWidth='1.5'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
											<path
												d='M8 3.33334L12.6667 8.00001L8 12.6667'
												stroke='currentColor'
												strokeWidth='1.5'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</motion.button>
								</motion.div>
							);
						})}
					</div>
				</div>
				<AnimatePresence>
					{modalContent && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							style={{
								position: 'fixed',
								inset: 0,
								backgroundColor: 'rgba(0,0,0,0.3)',
								backdropFilter: 'blur(5px)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								zIndex: 1000,
							}}
						>
							<motion.div
								initial={{ scale: 0.9, opacity: 0, y: 20 }}
								animate={{ scale: 1, opacity: 1, y: 0 }}
								exit={{ scale: 0.9, opacity: 0, y: 20 }}
								transition={{
									type: 'spring',
									duration: 0.5,
									bounce: 0.3,
								}}
								style={{
									backgroundColor: 'white',
									padding: '3rem',
									borderRadius: '1rem',
									maxWidth: '40rem',
									textAlign: 'center',
									boxShadow:
										'0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
									width: '90%',
									position: 'relative',
								}}
							>
								<motion.h2
									initial={{ y: -10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.2 }}
									style={{
										fontSize: '1.5rem',
										fontWeight: 700,
										marginBottom: '1.5rem',
										color: '#111111',
									}}
								>
									{modalContent.heading}
								</motion.h2>

								<motion.div
									style={{
										color: '#4B5563',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: '1rem',
									}}
								>
									{modalContent.long_description.map(
										(point, index) => (
											<motion.p
												key={index}
												initial={{ x: -20, opacity: 0 }}
												animate={{ x: 0, opacity: 1 }}
												transition={{
													delay: 0.3 + index * 0.1,
												}}
												style={{
													margin: 0,
													lineHeight: '1.6',
												}}
											>
												{point}
											</motion.p>
										)
									)}
								</motion.div>

								<motion.button
									onClick={() => setModalContent(null)}
									whileHover={{
										scale: 1.05,
										backgroundColor: '#000000',
									}}
									whileTap={{ scale: 0.95 }}
									transition={{ duration: 0.2 }}
									style={{
										marginTop: '2rem',
										backgroundColor: '#111111',
										color: 'white',
										fontFamily: 'Poppins',
										padding: '0.75rem 1.5rem',
										borderRadius: '0.5rem',
										cursor: 'pointer',
										border: 'none',
										fontSize: '0.95rem',
										fontWeight: '500',
									}}
								>
									Close
								</motion.button>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</section>
			<footer
				style={{
					position: 'relative',
					backgroundColor: '#111111',
					color: 'white',
					padding: '5rem 1rem',
					zIndex: 95,
				}}
			>
				<div
					style={{
						maxWidth: '72rem',
						margin: '0 auto',
					}}
				>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(4, 1fr)',
							gap: '3rem',
						}}
					>
						<div style={{ gridColumn: 'span 2' }}>
							<h3
								style={{
									fontSize: '1.5rem',
									fontWeight: 700,
									marginBottom: '1.5rem',
								}}
							>
								Academic Counselling Cell
							</h3>
							<p
								style={{
									color: '#9CA3AF',
									marginBottom: '2rem',
									maxWidth: '24rem',
								}}
							>
								Empowering students through comprehensive
								guidance, support, and mentorship to achieve
								academic excellence.
							</p>
						</div>
						<div>
							<h4
								style={{
									fontSize: '1.125rem',
									fontWeight: 600,
									marginBottom: '1.5rem',
								}}
							>
								Quick Links
							</h4>
							<ul
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '1rem',
								}}
							>
								<li>
									<a
										href='#'
										style={{
											color: '#9CA3AF',
											transition: 'color 0.3s ease',
											':hover': { color: 'white' },
										}}
									>
										Overview
									</a>
								</li>
								<li>
									<a
										href='#'
										style={{
											color: '#9CA3AF',
											transition: 'color 0.3s ease',
											':hover': { color: 'white' },
										}}
									>
										Vision & Mission
									</a>
								</li>
								<li>
									<a
										href='#'
										style={{
											color: '#9CA3AF',
											transition: 'color 0.3s ease',
											':hover': { color: 'white' },
										}}
									>
										Services
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4
								style={{
									fontSize: '1.125rem',
									fontWeight: 600,
									marginBottom: '1.5rem',
								}}
							>
								Resources
							</h4>
							<ul
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '1rem',
								}}
							>
								<li>
									<a
										href='#'
										style={{
											color: '#9CA3AF',
											transition: 'color 0.3s ease',
											':hover': { color: 'white' },
										}}
									>
										Mentor Program
									</a>
								</li>
								<li>
									<a
										href='#'
										style={{
											color: '#9CA3AF',
											transition: 'color 0.3s ease',
											':hover': { color: 'white' },
										}}
									>
										Events Calendar
									</a>
								</li>
								<li>
									<a
										href='#'
										style={{
											color: '#9CA3AF',
											transition: 'color 0.3s ease',
											':hover': { color: 'white' },
										}}
									>
										Support Services
									</a>
								</li>
								<li>
									<a
										href='#'
										style={{
											color: '#9CA3AF',
											transition: 'color 0.3s ease',
											':hover': { color: 'white' },
										}}
									>
										FAQ
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
