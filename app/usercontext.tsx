'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface User {
	email: string;
	name: string;
	role: 'student' | 'consultant' | 'unknown';
}

const UserContext = createContext<{ user: User | null; loading: boolean }>({
	user: null,
	loading: true,
});

const SUPABASE_URL = 'https://xvkdwcqxqirohnpleteu.supabase.co';
const SUPABASE_ANON_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a2R3Y3F4cWlyb2hucGxldGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NTA3NTgsImV4cCI6MjA1NDIyNjc1OH0.vQ5C9_onYsma85zA4402q4udtSnilu5uEmmA5d7qMGg';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (error || !data?.user) {
				setLoading(false);
				return;
			}

			const email = data.user.email ?? '';
			const name = data.user.user_metadata?.full_name ?? 'Unknown';
			const role = email.includes('bits-pilani.ac.in')
				? email.startsWith('f20')
					? 'student'
					: 'consultant'
				: 'unknown';

			if (role === 'student') {
				const { data: studentExists, error: studentError } =
					await supabase
						.from('students')
						.select('id')
						.eq('email', email)
						.maybeSingle();

				if (studentError) {
					console.error(
						'Error checking student:',
						studentError.message
					);
				}

				if (!studentExists) {
					await supabase.from('students').insert({ email, name });
				}
			}

			setUser({ email, name, role });
			setLoading(false);
		};

		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, loading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
