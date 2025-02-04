import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { formatDistanceToNow } from 'date-fns';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Create a .env.local in the project root directory and add the following:

// SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a2R3Y3F4cWlyb2hucGxldGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NTA3NTgsImV4cCI6MjA1NDIyNjc1OH0.vQ5C9_onYsma85zA4402q4udtSnilu5uEmmA5d7qMGg

// SUPABASE_URL = https://xvkdwcqxqirohnpleteu.supabase.co

export async function GET() {
	const { data, error } = await supabase
		.from('requests')
		.select(
			'name, iconurl, subject, cgpa, branch, created_at, status, details'
		);

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });

	const requestsWithRelativeTime = data.map((request) => {
		const istDate = new Date(
			new Date(request.created_at).getTime() + 5.5 * 60 * 60 * 1000
		);
		return {
			...request,
			relativeTime: formatDistanceToNow(istDate, { addSuffix: true }),
		};
	});

	return NextResponse.json({
		requests: requestsWithRelativeTime,
		totalRequests: data.length,
	});
}

export async function PATCH(req) {
	try {
		const { id, status } = await req.json();

		if (!id || !['accepted', 'denied'].includes(status)) {
			return NextResponse.json(
				{ error: 'Invalid request data' },
				{ status: 400 }
			);
		}

		const { error } = await supabase
			.from('requests')
			.update({ status })
			.eq('id', id);
		if (error) throw error;

		return NextResponse.json({
			message: `Request ${id} updated to ${status}`,
		});
	} catch (err) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

export async function POST(req) {
	try {
		const { name, subject, cgpa, branch, details } = await req.json();

		if (!name || !subject || !cgpa || !branch || !details) {
			return NextResponse.json(
				{ error: 'Missing fields' },
				{ status: 400 }
			);
		}

		const iconurl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
			name
		)}&background=random`;

		const { data, error } = await supabase.from('requests').insert([
			{
				name,
				cgpa,
				branch,
				subject,
				details,
				iconurl,
				status: 'pending',
			},
		]);

		if (error) throw error;

		return NextResponse.json({ message: 'Request created', request: data });
	} catch (err) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
