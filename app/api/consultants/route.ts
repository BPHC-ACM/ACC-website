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
				.eq('type', 'professor');
		} else if (type === 'professor') {
			query = supabase
				.from('consultants')
				.select('*')
				.eq('type', 'professor')
				.like('department', `%${department}%`);
		} else if (type === 'student') {
			query = supabase
				.from('consultants')
				.select('*')
				.eq('type', 'student')
				.like('department', `%${department}%`);
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
