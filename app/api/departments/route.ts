import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

export async function GET() {
	try {
		const { data: consultants, error } = await supabase
			.from('consultants')
			.select('department, type');

		if (error) throw error;

		const departments = consultants.reduce(
			(acc, consultant) => {
				const category = consultant.type;
				if (category && consultant.department) {
					const individualDepts = consultant.department.split(',');
					individualDepts.forEach((dept) => {
						const trimmedDept = dept.trim();
						if (
							trimmedDept &&
							!acc[category].includes(trimmedDept)
						) {
							acc[category].push(trimmedDept);
						}
					});
				}

				return acc;
			},
			{ professor: [], student: [] }
		);

		departments.professor.sort();
		departments.student.sort();

		return NextResponse.json(departments);
	} catch (error) {
		console.error('Error fetching departments:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch departments' },
			{ status: 500 }
		);
	}
}
