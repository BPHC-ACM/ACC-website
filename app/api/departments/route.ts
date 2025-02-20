import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY
);

export async function GET() {
	try {
		const { data: consultants, error } = await supabase
			.from('consultants')
			.select('department, email');

		if (error) throw error;

		const departments = consultants.reduce(
			(acc, consultant) => {
				const isAcademic = !consultant.email.startsWith('f');
				const category = isAcademic ? 'academic' : 'career';

				if (!acc[category].includes(consultant.department)) {
					acc[category].push(consultant.department);
				}

				return acc;
			},
			{ academic: [], career: [] }
		);

		departments.academic.sort();
		departments.career.sort();

		return NextResponse.json(departments);
	} catch (error) {
		console.error('Error fetching departments:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch departments' },
			{ status: 500 }
		);
	}
}
