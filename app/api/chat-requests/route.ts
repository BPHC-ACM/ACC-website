import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/utils/supabaseClient';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	secure: process.env.EMAIL_SECURE === 'true',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

async function sendEmail(to, subject, html) {
	try {
		const mailOptions = {
			from: process.env.EMAIL_FROM,
			to,
			subject,
			html,
		};

		await transporter.sendMail(mailOptions);
		return true;
	} catch (error) {
		return false;
	}
}

async function getUserEmail(userId, role) {
	const table = role === 'consultant' ? 'consultants' : 'students';
	const { data, error } = await supabase
		.from(table)
		.select('email')
		.eq('id', userId)
		.single();

	if (error || !data) {
		console.error(`Error fetching ${role} email:`, error);
		return null;
	}

	return data.email;
}

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
		const createdAtDate = new Date(request.created_at);

		return {
			...request,
			relativeTime: formatDistanceToNow(createdAtDate, {
				addSuffix: true,
			}),

			name: request.students?.[0]?.name,
			identifier: request.students?.[0]?.identifier,
			cgpa: request.students?.[0]?.cgpa,
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

		const consultantEmail = await getUserEmail(consultant_id, 'consultant');

		const { data: studentData, error: studentError } = await supabase
			.from('students')
			.select('name')
			.eq('id', student_id)
			.single();

		if (consultantEmail) {
			const studentName = studentData?.name || 'A student';

			await sendEmail(
				consultantEmail,
				'New Consultation Request',
				`
        <h2>New Request Notification</h2>
        <p>${studentName} has submitted a new ${request_type} consultation request.</p>
        <h3>Subject: ${subject}</h3>
        <p><strong>Details:</strong> ${details}</p>
        <p>Please log in to the system to accept or decline this request.</p>
        `
			);
		}

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

		const { data: requestData, error: requestError } = await supabase
			.from('requests')
			.select('subject, details')
			.eq('id', id)
			.single();

		if (requestError) {
			console.error('Error fetching request details:', requestError);
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

		let chatRoomId = null;
		if (status === 'accepted') {
			if (!student_id) {
				return NextResponse.json(
					{ error: 'Student ID is missing' },
					{ status: 400 }
				);
			}

			const { data: existingRooms, error: fetchError } = await supabase
				.from('chats')
				.select('roomid')
				.eq('consultant_id', consultant_id)
				.eq('student_id', student_id);

			if (fetchError) {
				console.error('Supabase Chat Room Fetch Error:', fetchError);
				return NextResponse.json(
					{ error: 'Failed to verify chat room existence' },
					{ status: 500 }
				);
			}

			if (!existingRooms || existingRooms.length === 0) {
				const chatRoom = {
					roomid: uuidv4(),
					consultant_id,
					student_id,
					messages: [],
				};

				const { data: chatRoomData, error: chatRoomError } =
					await supabase.from('chats').insert([chatRoom]).select();

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

				chatRoomId = chatRoom.roomid;
			} else {
				chatRoomId = existingRooms[0].roomid;
			}
		}

		const studentEmail = await getUserEmail(student_id, 'student');
		const consultantData = await supabase
			.from('consultants')
			.select('name')
			.eq('id', consultant_id)
			.single();

		if (studentEmail) {
			const consultantName =
				consultantData?.data?.name || 'The consultant';
			const subject = requestData?.subject || 'your consultation request';

			if (status === 'accepted') {
				await sendEmail(
					studentEmail,
					'Your Consultation Request was Accepted',
					`
          <h2>Request Accepted</h2>
          <p>${consultantName} has <strong>accepted</strong> your consultation request about "${subject}".</p>
          <p>You can now chat with your consultant through the messaging system.</p>
          <p>Log in to access your consultation chat.</p>
          `
				);
			} else {
				await sendEmail(
					studentEmail,
					'Your Consultation Request was Declined',
					`
          <h2>Request Declined</h2>
          <p>${consultantName} has <strong>declined</strong> your consultation request about "${subject}".</p>
          <p>You may submit a new request or try with a different consultant.</p>
          `
				);
			}
		}

		return NextResponse.json({
			message: `Request ${id} updated to ${status}`,
			chatRoomId: status === 'accepted' ? chatRoomId : null,
		});
	} catch (err) {
		console.error('Unexpected error:', err);
		return NextResponse.json(
			{ error: 'Failed to process request' },
			{ status: 500 }
		);
	}
}
