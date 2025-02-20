import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY
);

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const type = searchParams.get('type');
	const department = searchParams.get('department');

	try {
		let query = supabase.from('consultants').select('*');

		if (type === 'academic') {
			query = query
				.not('email', 'ilike', 'f20%')
				.eq('department', department);
		} else if (type === 'career') {
			query = query.ilike('email', 'f%').eq('department', department);
		}

		const { data, error } = await query;

		if (error) throw error;

		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching consultants:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch consultants' },
			{ status: 500 }
		);
	}
}
