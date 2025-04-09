import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const type = searchParams.get('type');
	const department = searchParams.get('department');

	try {
		let query;
		if (type === 'all') {
			query = supabase
				.from('consultants')
				.select('name, chamber')
				.not('email', 'ilike', 'f20%');
		} else if (type === 'academic') {
			query = supabase
				.from('consultants')
				.select('*')
				.not('email', 'ilike', 'f20%')
				.eq('department', department);
		} else if (type === 'career') {
			query = supabase
				.from('consultants')
				.select('*')
				.ilike('email', 'f%')
				.eq('department', department);
		} else {
			query = supabase.from('consultants').select('*');
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
