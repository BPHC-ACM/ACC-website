import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest, { params }) {
	const { roomId, userId } = params;

	// Fetch consultant_id and student_id based on roomId
	const { data, error } = await supabase
		.from('chats')
		.select('consultant_id, student_id')
		.eq('roomid', roomId)
		.single();

	if (error || !data) {
		console.error('Supabase Error:', error);
		return NextResponse.json(
			{ error: error?.message || 'Room not found' },
			{ status: 500 }
		);
	}

	const { consultant_id, student_id } = data;

	// Determine the role of the user and get the opposite party's details
	const isConsultant = userId === consultant_id;
	const targetId = isConsultant ? student_id : consultant_id;
	const targetTable = isConsultant ? 'students' : 'consultants';
	const targetColumn = isConsultant ? 'name, identifier' : 'name, department';

	// Fetch details of the opposite participant
	const { data: targetData, error: targetError } = await supabase
		.from(targetTable)
		.select(targetColumn)
		.eq('id', targetId)
		.single();

	if (targetError || !targetData) {
		console.error('Supabase Error:', targetError);
		return NextResponse.json(
			{ error: targetError?.message || 'User not found' },
			{ status: 500 }
		);
	}

	return NextResponse.json({
		userName: targetData.name,
		info:
			'identifier' in targetData
				? targetData.identifier
				: targetData.department,
	});
}
