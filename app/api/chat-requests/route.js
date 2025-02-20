import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { formatDistanceToNow } from 'date-fns';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const consultant_id = searchParams.get('consultant_id');

	let query = supabase
		.from('requests')
		.select(
			`
      id,
      student_id,
      consultant_id,
      subject,
      details,
      status,
      created_at,
      students (name, identifier, cgpa)
    `
		)
		.eq('status', 'pending');

	if (consultant_id) {
		query = query.eq('consultant_id', consultant_id);
	}

	const { data, error } = await query;

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });

	const requestsWithRelativeTime = data.map((request) => {
		const istDate = new Date(
			new Date(request.created_at).getTime() + 5.5 * 60 * 60 * 1000
		);
		return {
			...request,
			relativeTime: formatDistanceToNow(istDate, { addSuffix: true }),
			name: request.students.name,
			identifier: request.students.identifier,
			cgpa: request.students.cgpa,
		};
	});

	return NextResponse.json({
		requests: requestsWithRelativeTime,
		totalRequests: data.length,
	});
}

export async function PATCH(req) {
	try {
		const { id, status, consultant_id, student_id } = await req.json();

		if (
			!id ||
			!['accepted', 'declined'].includes(status) ||
			!consultant_id
		) {
			return NextResponse.json(
				{ error: 'Invalid request data' },
				{ status: 400 }
			);
		}

		const { error: updateError } = await supabase
			.from('requests')
			.update({ status, consultant_id })
			.eq('id', id);

		if (updateError) {
			console.error('Supabase Update Error:', updateError);
			return NextResponse.json(
				{ error: 'Failed to update request', details: updateError },
				{ status: 500 }
			);
		}

		if (status === 'accepted') {
			if (!student_id) {
				return NextResponse.json(
					{ error: 'Student ID is missing' },
					{ status: 400 }
				);
			}

			const chatRoom = {
				roomid: uuidv4(),
				consultant_id,
				student_id,
				messages: [],
			};

			const { error: chatRoomError } = await supabase
				.from('chats')
				.insert([chatRoom]);

			if (chatRoomError) {
				console.error(
					'Supabase Chat Room Insert Error:',
					chatRoomError
				);
				console.error('Chat Room Data:', chatRoom);
				return NextResponse.json(
					{
						error: 'Failed to create chat room',
						details: chatRoomError,
					},
					{ status: 500 }
				);
			}
		}

		return NextResponse.json({
			message: `Request ${id} updated to ${status}`,
		});
	} catch (err) {
		console.error('Unexpected Error:', err);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

export async function POST(req) {
	try {
		const { student_id, consultant_id, subject, details } =
			await req.json();

		if (!student_id || !consultant_id || !subject || !details) {
			return NextResponse.json(
				{ error: 'Missing fields' },
				{ status: 400 }
			);
		}

		const id = uuidv4();

		const { data, error } = await supabase.from('requests').insert([
			{
				id,
				student_id,
				consultant_id,
				subject,
				details,
				status: 'pending',
			},
		]);

		if (error) throw error;

		return NextResponse.json({ message: 'Request created', request: data });
	} catch (err) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
