import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import styles from './loginbutton.module.css'; // Ensure this path is correct

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Accept isCollapsed prop
const LoginButton = ({ isCollapsed }) => {
	const handleLogin = async () => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					// Ensure window.location.origin is correct, especially if behind proxy/custom domain
					redirectTo:
						typeof window !== 'undefined'
							? window.location.origin
							: '',
				},
			});

			if (error) {
				console.error('Google login failed:', error.message);
			}
		} catch (error) {
			console.error('Unexpected error during login:', error);
		}
	};

	const textVariants = {
		expanded: { opacity: 1, display: 'block', transition: { delay: 0.1 } },
		collapsed: { opacity: 0, transitionEnd: { display: 'none' } },
	};

	return (
		<motion.button
			// Add collapsed class conditionally
			className={`${styles.pillButton} ${
				isCollapsed ? styles.collapsed : ''
			}`}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
			whileHover={
				!isCollapsed ? { backgroundColor: '#fff', color: '#222' } : {}
			} // Disable hover effect when collapsed?
			style={{ transformOrigin: 'center' }}
			transition={{ duration: 0.25 }}
			whileTap={{ scale: 0.95 }}
			onClick={handleLogin}
			title={isCollapsed ? 'Login with Google' : ''} // Add tooltip when collapsed
		>
			<img
				src={'https://img.icons8.com/?size=512&id=17949&format=png'}
				alt={'Google Icon'}
				width={isCollapsed ? 28 : 40} // Adjust icon size when collapsed
				height={isCollapsed ? 28 : 40}
				className={styles.avatar}
			/>
			{/* Animate the text presence */}
			<motion.div
				className={styles.userInfo}
				variants={textVariants}
				animate={isCollapsed ? 'collapsed' : 'expanded'}
				initial={false} // Don't animate initial state based on variant name
			>
				<span className={styles.name}>Login with Google</span>{' '}
				{/* Use span */}
			</motion.div>
		</motion.button>
	);
};

export default LoginButton;
