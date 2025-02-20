'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface User {
	email: string;
	name: string;
	role: 'student' | 'consultant' | 'unknown';
	id: string;
}

const UserContext = createContext<{ user: User | null; loading: boolean }>({
	user: null,
	loading: true,
});

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

			let studentId: string;

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

				if (!studentExists?.id) {
					const { data: newStudent, error: insertError } =
						await supabase
							.from('students')
							.insert({ email, name })
							.select('id')
							.single();

					if (insertError) {
						console.error(
							'Error inserting student:',
							insertError.message
						);
					} else {
						studentId = newStudent.id;
					}
				} else {
					studentId = studentExists.id;
				}
			}

			setUser({ email, name, role, id: studentId });
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
