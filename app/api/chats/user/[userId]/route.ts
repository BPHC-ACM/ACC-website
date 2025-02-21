import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: any, { params }: any) {
	const { userId } = await params;

	const { data, error } = await supabase
		.from('chats')
		.select(
			`
      roomid,
      consultant_id,
      student_id,
      messages,
      created_at,
      students:student_id (name, identifier),
      consultants:consultant_id (name, department)
    `
		)
		.or(`consultant_id.eq.${userId},student_id.eq.${userId}`);

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });

	const roomsWithNames = data.map((room: any) => {
		const isConsultant = room.consultant_id === userId;
		return {
			roomid: room.roomid,
			consultant_id: room.consultant_id,
			student_id: room.student_id,
			name: isConsultant
				? room.students?.name || 'Unknown'
				: room.consultants?.name || 'Unknown',
			identifier: isConsultant
				? room.students?.identifier || ''
				: room.consultants?.department || '',
			messages: room.messages,
			created_at: room.created_at,
		};
	});

	return NextResponse.json({ rooms: roomsWithNames });
}
