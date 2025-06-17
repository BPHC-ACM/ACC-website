import { NextResponse } from 'next/server';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/utils/supabaseClient';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: Number(process.env.EMAIL_PORT),
	secure: process.env.EMAIL_SECURE === 'true',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

async function sendEmail(to, subject, html) {
	try {
		const mailOptions = {
			from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
			to,
			subject,
			html,
		};
		await transporter.sendMail(mailOptions);
		return true;
	} catch (error) {
		console.error('Nodemailer error:', error);
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
		console.error(`Error fetching ${role} email for ID ${userId}:`, error);
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
      request_type,
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
		const student = request.students?.[0];

		return {
			...request,
			relativeTime: formatDistanceToNow(createdAtDate, {
				addSuffix: true,
			}),

			name: student?.name,
			identifier: student?.identifier,
			cgpa: student?.cgpa,
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

		if (
			!student_id ||
			!consultant_id ||
			!subject ||
			!details ||
			!request_type
		) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		if (!['professor', 'student'].includes(request_type)) {
			return NextResponse.json(
				{ error: 'Invalid request type' },
				{ status: 400 }
			);
		}

		const { data, error } = await supabase
			.from('requests')
			.insert([
				{
					student_id,
					consultant_id,
					subject,
					details,
					status: 'pending',
					request_type,
				},
			])
			.select()
			.single();

		if (error) throw error;

		const consultantEmail = await getUserEmail(consultant_id, 'consultant');
		const { data: studentData } = await supabase
			.from('students')
			.select('name')
			.eq('id', student_id)
			.single();

		if (consultantEmail) {
			const studentName = studentData?.name || 'A student';

			const requestTypeDescription =
				request_type === 'professor' ? 'an academic' : 'a peer';

			await sendEmail(
				consultantEmail,
				'New Consultation Request Received',
				`
        <h2>New Request Notification</h2>
        <p>${studentName} has submitted ${requestTypeDescription} consultation request.</p>
        <h3>Subject: ${subject}</h3>
        <p><strong>Details:</strong> ${details}</p>
        <p>Please log in to the system to accept or decline this request.</p>
        `
			);
		}

		return NextResponse.json({
			message: 'Request created successfully',
			request: data,
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
			.select('subject, request_type')
			.eq('id', id)
			.single();

		if (requestError) {
			console.error('Error fetching request details:', requestError);
		}

		const { error: updateError } = await supabase
			.from('requests')
			.update({ status })
			.eq('id', id);

		if (updateError) throw updateError;

		let chatRoomId = null;
		if (status === 'accepted') {
			if (!student_id) {
				return NextResponse.json(
					{ error: 'Student ID is missing' },
					{ status: 400 }
				);
			}

			const { data: existingRoom } = await supabase
				.from('chats')
				.select('roomid')
				.eq('consultant_id', consultant_id)
				.eq('student_id', student_id)
				.maybeSingle();

			if (!existingRoom) {
				const { data: newChatRoom, error: chatRoomError } =
					await supabase
						.from('chats')
						.insert({ consultant_id, student_id, messages: [] })
						.select('roomid')
						.single();

				if (chatRoomError) throw chatRoomError;
				chatRoomId = newChatRoom.roomid;
			} else {
				chatRoomId = existingRoom.roomid;
			}
		}

		const studentEmail = await getUserEmail(student_id, 'student');
		const { data: consultantData } = await supabase
			.from('consultants')
			.select('name')
			.eq('id', consultant_id)
			.single();

		if (studentEmail && consultantData) {
			const consultantName = consultantData.name || 'The consultant';
			const subject = requestData?.subject || 'your consultation request';

			const consultantTitle =
				requestData?.request_type === 'professor'
					? 'The faculty mentor,'
					: 'The student consultant,';

			const emailSubject = `Your Consultation Request was ${
				status.charAt(0).toUpperCase() + status.slice(1)
			}`;
			const emailHtml =
				status === 'accepted'
					? `
          <h2>Request Accepted</h2>
          <p>${consultantTitle} ${consultantName}, has <strong>accepted</strong> your consultation request about "${subject}".</p>
          <p>You can now chat with your consultant through the messaging system.</p>
          <p>Log in to access your consultation chat.</p>
          `
					: `
          <h2>Request Declined</h2>
          <p>${consultantTitle} ${consultantName}, has <strong>declined</strong> your consultation request about "${subject}".</p>
          <p>You may submit a new request or try with a different consultant.</p>
          `;

			await sendEmail(studentEmail, emailSubject, emailHtml);
		}

		return NextResponse.json({
			message: `Request ${id} updated to ${status}`,
			chatRoomId: status === 'accepted' ? chatRoomId : null,
		});
	} catch (err) {
		console.error('Unexpected error in PATCH:', err);
		return NextResponse.json(
			{
				error: 'Failed to process request',
				details: (err as Error).message,
			},
			{ status: 500 }
		);
	}
}
