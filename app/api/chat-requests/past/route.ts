import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { formatDistanceToNow } from 'date-fns';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const consultantId = searchParams.get('consultant_id');

	if (!consultantId) {
		return NextResponse.json(
			{ error: 'Missing consultant_id' },
			{ status: 400 }
		);
	}

	const { data, error } = await supabase
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
		.eq('consultant_id', consultantId)
		.in('status', ['accepted', 'declined']);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	const requestsWithRelativeTime = data.map((request) => {
		const istDate = new Date(
			new Date(request.created_at).getTime() + 5.5 * 60 * 60 * 1000
		);

		const student = request.students as unknown as {
			name: string;
			identifier: string;
			cgpa: number;
		};

		return {
			...request,
			relativeTime: formatDistanceToNow(istDate, { addSuffix: true }),
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
