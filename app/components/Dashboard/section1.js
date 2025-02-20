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
							color: '#222222',
							marginBottom: '2rem',
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
							marginBottom: '2rem',
							padding: '0.5rem 1.5rem',
							backgroundColor: 'rgba(17,24,39,0.05)',
							borderRadius: '9999px',
						}}
					>
						<p
							style={{
								fontSize: '0.875rem',
								fontWeight: 500,
								color: '#222222',
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
								color: '#222222',
								marginBottom: '1.5rem',
							}}
						>
							Overview
						</h2>
						<div
							style={{
								width: '5rem',
								height: '0.375rem',
								backgroundColor: '#222222',
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
								color: '#222222',
								marginBottom: '1.5rem',
							}}
						>
							Vision & Mission
						</h2>
						<div
							style={{
								width: '5rem',
								height: '0.375rem',
								backgroundColor: '#222222',
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
						<div
							style={{
								backgroundColor: 'white',
								padding: '3rem',
								borderRadius: '1rem',
								boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
								transition: 'all 0.3s ease',
								':hover': {
									boxShadow:
										'0 20px 25px -5px rgba(0,0,0,0.1)',
								},
							}}
						>
							<div
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
										color: '#222222',
									}}
								/>
							</div>
							<h3
								style={{
									fontSize: '1.5rem',
									fontWeight: 700,
									color: '#222222',
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
						</div>
						<div
							style={{
								backgroundColor: 'white',
								padding: '3rem',
								borderRadius: '1rem',
								boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
								transition: 'all 0.3s ease',
								':hover': {
									boxShadow:
										'0 20px 25px -5px rgba(0,0,0,0.1)',
								},
							}}
						>
							<div
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
										color: '#222222',
									}}
								/>
							</div>
							<h3
								style={{
									fontSize: '1.5rem',
									fontWeight: 700,
									color: '#222222',
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
						</div>
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
								color: '#222222',
								marginBottom: '1.5rem',
							}}
						>
							Our Services
						</h2>
						<div
							style={{
								width: '5rem',
								height: '0.375rem',
								backgroundColor: '#222222',
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
								<div
									key={index}
									style={{
										padding: '2rem',
										backgroundColor: 'white',
										border: '1px solid #F3F4F6',
										borderRadius: '1rem',
										transition: 'all 0.3s ease',
									}}
								>
									<div
										style={{
											display: 'inline-flex',
											alignItems: 'center',
											justifyContent: 'center',
											width: '4rem',
											height: '4rem',
											backgroundColor: '#F3F4F6',
											borderRadius: '0.75rem',
											marginBottom: '1.5rem',
										}}
									>
										<IconComponent
											style={{
												width: '2rem',
												height: '2rem',
												color: '#222222',
											}}
										/>
									</div>
									<h3
										style={{
											fontSize: '1.25rem',
											fontWeight: 700,
											color: '#222222',
											marginBottom: '1rem',
										}}
									>
										{service.heading}
									</h3>
									<p
										style={{
											color: '#4B5563',
											marginBottom: '1.5rem',
										}}
									>
										{service.short_description}
									</p>
									<button
										onClick={() => setModalContent(service)}
										style={{
											display: 'inline-flex',
											alignItems: 'center',
											color: 'white',
											fontFamily: 'Poppins',
											fontWeight: 500,
											backgroundColor: '#222222',
											padding: '0.5rem 1rem',
											borderRadius: '0.5rem',
											transition: 'all 0.3s ease',
											cursor: 'pointer',
										}}
									>
										Learn More{' '}
										<ArrowRight
											style={{
												width: '1rem',
												height: '1rem',
												marginLeft: '0.25rem',
											}}
										/>
									</button>
								</div>
							);
						})}
					</div>
				</div>
				{modalContent && (
					<div
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
						<div
							style={{
								backgroundColor: 'white',
								padding: '3rem',
								borderRadius: '1rem',
								maxWidth: '40rem',
								textAlign: 'center',
							}}
						>
							<h2
								style={{
									fontSize: '1.5rem',
									fontWeight: 700,
									marginBottom: '1rem',
								}}
							>
								{modalContent.heading}
							</h2>
							<div
								style={{
									color: '#4B5563',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								{modalContent.long_description.map(
									(point, index) => (
										<p
											key={index}
											style={{ marginBottom: '0.5rem' }}
										>
											{point}
										</p>
									)
								)}
							</div>
							<button
								onClick={() => setModalContent(null)}
								style={{
									marginTop: '1rem',
									backgroundColor: '#222222',
									color: 'white',
									fontFamily: 'Poppins',
									padding: '0.5rem 1rem',
									borderRadius: '0.5rem',
									cursor: 'pointer',
								}}
							>
								Close
							</button>
						</div>
					</div>
				)}
			</section>
			<footer
				style={{
					backgroundColor: '#222222',
					color: 'white',
					padding: '5rem 1rem',
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
								<li>
									<a
										href='#'
										style={{
											color: '#9CA3AF',
											transition: 'color 0.3s ease',
											':hover': { color: 'white' },
										}}
									>
										Contact
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
