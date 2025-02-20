import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { formatDistanceToNow } from 'date-fns';

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY
);

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

export async function POST(req) {
	try {
		const { student_id, consultant_id, subject, details, request_type } =
			await req.json();

		if (!student_id || !consultant_id || !subject || !details) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		if (!['academic', 'career'].includes(request_type)) {
			return NextResponse.json(
				{ error: 'Invalid request type' },
				{ status: 400 }
			);
		}

		const id = uuidv4();

		const { data, error } = await supabase
			.from('requests')
			.insert([
				{
					student_id,
					consultant_id,
					subject,
					details,
					status: 'pending',
				},
			])
			.select();

		if (error) throw error;

		return NextResponse.json({
			message: 'Request created successfully',
			request: data[0],
		});
	} catch (err) {
		console.error('Error creating request:', err);
		return NextResponse.json(
			{ error: 'Failed to create request' },
			{ status: 500 }
		);
	}
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

			const { data: existingRoom, error: fetchError } = await supabase
				.from('chats')
				.select('roomid')
				.eq('consultant_id', consultant_id)
				.eq('student_id', student_id)
				.maybeSingle();

			if (fetchError) {
				console.error('Supabase Chat Room Fetch Error:', fetchError);
				return NextResponse.json(
					{ error: 'Failed to verify chat room existence' },
					{ status: 500 }
				);
			}

			if (!existingRoom) {
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
					return NextResponse.json(
						{ error: 'Failed to create chat room' },
						{ status: 500 }
					);
				}
			}
		}
		return NextResponse.json({
			message: `Request ${id} updated to ${status}`,
		});
	} catch (err) {
		console.error('Unexpected error:', err);
		return NextResponse.json(
			{ error: 'Failed to process request' },
			{ status: 500 }
		);
	}
}
