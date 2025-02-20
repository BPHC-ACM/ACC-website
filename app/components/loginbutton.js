import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import styles from './loginbutton.module.css';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const LoginButton = () => {
	const handleLogin = async () => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: window.location.origin,
				},
			});

			if (error) {
				console.error('Google login failed:', error.message);
			}
		} catch (error) {
			console.error('Unexpected error during login:', error);
		}
	};

	return (
		<motion.button
			className={styles.pillButton}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
			whileHover={{ backgroundColor: '#fff', color: '#222' }}
			style={{ transformOrigin: 'center' }}
			transition={{ duration: 0.2 }}
			whileTap={{ scale: 0.95 }}
			onClick={handleLogin}
		>
			<img
				src={'https://img.icons8.com/?size=512&id=17949&format=png'}
				alt={'Google Icon'}
				width={40}
				height={40}
				className={styles.avatar}
			/>
			<div className={styles.userInfo}>
				<div className={styles.name}>
					<p className={styles.name}>Login with Google</p>
				</div>
			</div>
		</motion.button>
	);
};

export default LoginButton;
