'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface User {
	email: string;
	name: string;
	role: 'student' | 'consultant' | 'unknown';
	id: string;
	identifier?: string;
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
			const developerEmail = process.env.NEXT_PUBLIC_DEVELOPER_EMAIL;

			if (developerEmail === email) {
				setUser({
					email: developerEmail,
					name: 'Developer',
					role: 'consultant',
					id: '7a61c68e-0e82-4b57-bbc6-e28b79561d1f',
					identifier: 'DEV',
				});
				setLoading(false);
				return;
			}

			if (!email.endsWith('bits-pilani.ac.in')) {
				alert(`Unauthorized email: \n${email}`);
				await supabase.auth.signOut();
				setLoading(false);
				return;
			}

			const name = (data.user.user_metadata?.full_name ?? 'Unknown')
				.toLowerCase()
				.split(' ')
				.map(
					(word: string) =>
						word.charAt(0).toUpperCase() + word.slice(1)
				)
				.join(' ');

			let determinedRole: 'student' | 'consultant' = 'student';
			let consultantInfo: {
				id: string;
				department: string | null;
			} | null = null;

			try {
				const { data: consultantData, error: consultantCheckError } =
					await supabase
						.from('consultants')
						.select('id, department')
						.eq('email', email)
						.maybeSingle();

				if (consultantCheckError) {
					console.error(
						'Error checking consultant table:',
						consultantCheckError.message
					);
				} else if (consultantData) {
					determinedRole = 'consultant';
					consultantInfo = {
						id: consultantData.id,
						department: consultantData.department,
					};
				}
			} catch (error) {
				console.error(
					'Unexpected error checking consultant status:',
					error
				);
			}

			const role = determinedRole;
			let userId: string | null = null;
			let identifier: string | null = null;

			if (role === 'student') {
				const { data: studentExists, error: studentError } =
					await supabase
						.from('students')
						.select('id, identifier')
						.eq('email', email)
						.maybeSingle();

				if (studentError) {
					console.error(
						'Error checking student:',
						studentError.message
					);
				}

				if (!studentExists?.id) {
					identifier = `20XXXXH`;

					const formattedname = name
						.toLowerCase()
						.split(' ')
						.map(
							(word: string) =>
								word.charAt(0).toUpperCase() + word.slice(1)
						)
						.join(' ');
					const { data: newStudent, error: insertError } =
						await supabase
							.from('students')
							.insert({
								email,
								name: formattedname,
								identifier,
							})
							.select('id, identifier')
							.single();

					if (insertError) {
						console.error(
							'Error inserting student:',
							insertError.message
						);
					} else if (newStudent) {
						userId = newStudent.id;
						identifier = newStudent.identifier;
					}
				} else {
					userId = studentExists.id;
					identifier = studentExists.identifier;
				}
			} else if (role === 'consultant') {
				if (consultantInfo) {
					userId = consultantInfo.id;
					identifier = consultantInfo.department;
				} else {
					console.error(
						'Data consistency error: Role is consultant but consultantInfo is missing.'
					);
				}
			}

			setUser({
				email,
				name,
				role,
				id: userId ?? 'unknown',
				identifier: identifier ?? undefined,
			});
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
