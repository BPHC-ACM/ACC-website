import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(
	req: Request,
	{ params }: { params: { roomId: string } }
) {
	const { roomId } = params;

	// Fetch the student_id based on the roomId
	const { data, error } = await supabase
		.from('chats')
		.select('student_id')
		.eq('roomid', roomId)
		.single();

	if (error) {
		console.error('Supabase Error:', error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	const studentId = data.student_id;

	// Fetch the student's name based on the student_id
	const { data: studentData, error: studentError } = await supabase
		.from('students')
		.select('name')
		.eq('id', studentId)
		.single();

	if (studentError) {
		console.error('Supabase Error:', studentError);
		return NextResponse.json(
			{ error: studentError.message },
			{ status: 500 }
		);
	}

	return NextResponse.json({ userName: studentData.name });
}
